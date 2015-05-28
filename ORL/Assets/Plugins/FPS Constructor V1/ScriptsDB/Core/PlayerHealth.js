#pragma strict
#pragma downcast
/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/

@HideInInspector
var health : float = 100; 
var maxHealth : float = 100;
var hitKickBack : float;
var hitKickBackX : float;
var kickMaxY : float;
var kickMaxX : float;
var kickInt : float;
private var nextKickTime : float = 0;
var redWindow : Texture;
var redFlashTime : float;
var directionalFlashTime : float;
private var hitEffectTime : float;
private var dirEffectTime : float;
private var cam : GameObject;
var hitSounds : AudioClip[];
var landSounds : AudioClip[];
var hitSoundInterval : float = .6;
var hitSoundVolume : float = 1;
private var nextSoundTime : float = 0;
private var pWeapons : PlayerWeapons;
private var mainCam : GameObject;
static var dead : boolean = false;
var deathSound : AudioClip;
var directionalTexture : GameObject;

static var singleton : PlayerHealth;

function Start(){
	singleton = this;
	dead = false;
	cam = PlayerWeapons.weaponCam;
	hitEffectTime = 0;
	mainCam = PlayerWeapons.mainCam;
	pWeapons = this.GetComponentInChildren(PlayerWeapons);
	health = maxHealth;
	
}
function ApplyFallDamage(d : float){
	if(dead)
		return;
	
	health = Mathf.Clamp(health-d, 0, health);
	HitEffects(d);

	if(health <= 0){
		GetComponent.<AudioSource>().clip = deathSound;
		GetComponent.<AudioSource>().volume = hitSoundVolume;
		GetComponent.<AudioSource>().Play();
		Die();
	}
}

function ApplyDamage(d : float){
	if(dead)
		return;
	hitEffectTime = redFlashTime;
	
//	float.TryParse(Arr[0], tempFloat);
	health = Mathf.Clamp(health-d, 0, health);
	HitEffects(d);

	if(health <= 0){
		GetComponent.<AudioSource>().clip = deathSound;
		GetComponent.<AudioSource>().volume = hitSoundVolume;
		GetComponent.<AudioSource>().Play();
		Die();
	}
}
	
function ApplyDamage(Arr : Object[]){
	if(dead)
		return;
	
	var tempFloat : float;
	tempFloat = Arr[0];
	health = Mathf.Clamp(health-tempFloat, 0, health);
	HitEffects(tempFloat);

	if(health <= 0){
		GetComponent.<AudioSource>().clip = deathSound;
		GetComponent.<AudioSource>().volume = hitSoundVolume;
		GetComponent.<AudioSource>().Play();
		Die();
	}
}

function OnGUI(){
	hitEffectTime-=Time.deltaTime;
	if(hitEffectTime > 0){
		GUI.color = Color(1,1,1, hitEffectTime);
		GUI.DrawTexture(Rect (0, 0, Screen.width, Screen.height), redWindow);
	}
}

function Direction(h : Transform){
	var temp : GameObject = Instantiate(directionalTexture, transform.position, transform.rotation);
	temp.transform.parent = cam.transform;
	temp.GetComponent(HitDirectional).Init(h, directionalFlashTime);
}

static function ScreenDamage (t : float){
	singleton.hitEffectTime = t;
}

static function ScreenDamage (damage : float, where : Transform){
	singleton.Direction(where);
	singleton.HitEffects(damage);	
}

function HitEffects (damage : float) {
	hitEffectTime = redFlashTime;
	if(Time.time > nextKickTime){
		cam.GetComponent(MouseLookDBJS).offsetY = Mathf.Clamp(hitKickBack*damage*Random.value, 0, kickMaxY);
		GameObject.FindWithTag("Player").GetComponent(MouseLookDBJS).offsetX = Mathf.Clamp(hitKickBackX*damage*Random.value, 0, kickMaxX);
		nextKickTime = Time.time + kickInt;
	}
	if(Time.time > nextSoundTime){
		nextSoundTime = Time.time + hitSoundInterval;
		var temp : int = Mathf.Round(Random.value*hitSounds.length);
		if(temp == 0)
			temp =1;
		GetComponent.<AudioSource>().clip = hitSounds[temp-1];
		GetComponent.<AudioSource>().volume = hitSoundVolume;
		GetComponent.<AudioSource>().Play();
	}
}

function Die(){
	PlayerWeapons.HideWeapon();
	PlayerWeapons.playerActive = false;
	this.GetComponent(CharacterMotorDB).canControl = false;
	BroadcastMessage("Death");
	BroadcastMessage("Freeze");
	LockCursor.HardUnlock();
	dead = true;
}