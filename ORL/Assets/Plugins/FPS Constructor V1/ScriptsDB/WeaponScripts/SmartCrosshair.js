/*
 FPS Constructor - Weapons
 Copyright� Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/

var length1 : float;
var width1 : float;
var scale : boolean = false;
private var textu : Texture;
private var lineStyle : GUIStyle;
var debug : boolean = false;
static var displayWhenAiming : boolean = false;
var useTexture: boolean = false;
static var ownTexture : boolean = false;
var crosshairObj : GameObject;
static var cObj : GameObject;
static var scl : boolean;
static var cSize : float;
static var sclRef : float;
static var draw : boolean = false;
var crosshairSize : float;
var minimumSize : float;
var maximumSize : float;
var crosshairTexture : Texture2D;
var friendTexture : Texture2D;
var foeTexture : Texture2D;
var otherTexture : Texture2D;
var colorFoldout : boolean;
var colorDist : float = 40;

private var hitEffectOn : boolean;
var hitEffectTexture : Texture2D;
private var hitEffectTime : float;
var hitLength : float;
var hitWidth : float;
var hitEffectOffset : Vector2 = Vector2(0,0);
var hitSound : AudioClip;
var hitEffectFoldout : boolean;


var crosshairRange : int = 200;

static var crosshair : boolean = true;

function Awake(){
	DefaultCrosshair();
	sclRef = 1;
	crosshair = true;
	lineStyle = GUIStyle();
	lineStyle.normal.background = crosshairTexture;
}

//Right now this script fires a raycast every frame
//This might impact performance, and is an area to consider when optimizing
function Update(){
	if(!PlayerWeapons.playerActive){
		if(cObj)
			cObj.GetComponent.<Renderer>().enabled = false;
		return;
	} else if (cObj){
		cObj.GetComponent.<Renderer>().enabled = true;
	}
	if(cObj != null){
		if(crosshair && ownTexture){
			cObj.GetComponent.<Renderer>().enabled = true;
		} else {
			cObj.GetComponent.<Renderer>().enabled = false;
		}
	}
	var temp : float;
	var temp2 : float;
	if(!scl){
		temp = 1;
		temp2 = 1/Screen.width;
	} else {
		temp  = GunScript.crosshairSpread;
		temp = temp/180;
		temp = temp*GunScript.weaponCam.GetComponent.<Camera>().fieldOfView;
		temp = temp/Screen.height;
		temp = temp/sclRef;
		temp2 = cSize*temp;
	}
	if(cObj != null){
		if(scl){
			cObj.transform.localScale = Vector3(Mathf.Clamp(temp2, minimumSize, maximumSize), 1 ,Mathf.Clamp(temp2, minimumSize,maximumSize));
		} else {
			cObj.transform.localScale = Vector3(cSize, 1 ,cSize);
		}
	}
	
	var hit : RaycastHit;
	var layerMask = 1 << PlayerWeapons.playerLayer;
  	layerMask = ~layerMask;
	var direction = transform.TransformDirection(Vector3(0,0,1));
	if(Physics.Raycast(transform.position, direction, hit, crosshairRange, layerMask)){
		if(hit.collider && hit.transform.gameObject.GetComponent(CrosshairColor) != null && (hit.distance <= colorDist || colorDist <0)){
			var colorScript : CrosshairColor = hit.transform.gameObject.GetComponent(CrosshairColor);
			if(colorScript.crosshairType == crosshairTypes.Friend){
				ChangeColor("Friend");
			}else if(colorScript.crosshairType == crosshairTypes.Foe){
				ChangeColor("Foe");
			}else if(colorScript.crosshairType == crosshairTypes.Other){
				ChangeColor("Other");
			}
		}else{
			ChangeColor(""); //Any string not recognized by ChangeColor is the default color
		}
	}else{
		ChangeColor("");
	}
	
	if(hitEffectTime <= 0){
		hitEffectOn = false;
	}
}

function OnGUI(){
	if(!PlayerWeapons.playerActive){
		return;
	}
	GUI.color = Color.white;
	if(!ownTexture){
		var distance1 : float = GunScript.crosshairSpread;
		if(!(distance1 > (Screen.height/2)) &&(crosshair || debug || displayWhenAiming)){
	
			GUI.Box(Rect((Screen.width - distance1)/2 - length1, (Screen.height - width1)/2, length1, width1), textu, lineStyle);
			GUI.Box(Rect((Screen.width + distance1)/2, (Screen.height- width1)/2, length1, width1), textu, lineStyle);
		
			GUI.Box(Rect((Screen.width - width1)/2, (Screen.height - distance1)/2 - length1, width1, length1), textu, lineStyle);
			GUI.Box(Rect((Screen.width - width1)/2, (Screen.height + distance1)/2, width1, length1), textu, lineStyle);
		}
	}
	if(hitEffectOn){
		hitEffectTime -= Time.deltaTime *.5;
		GUI.color = Color(1,1,1, hitEffectTime);
		GUI.DrawTexture(Rect((Screen.width - hitEffectOffset.x)/2 - hitLength/2, (Screen.height - hitEffectOffset.y)/2 - hitWidth/2, hitLength, hitWidth), hitEffectTexture);
	}
}

function ChangeColor(targetStatus : String){
	if(targetStatus == "Friend"){
		lineStyle.normal.background = friendTexture;
	}else if(targetStatus == "Foe"){
		lineStyle.normal.background = foeTexture;
	}else if (targetStatus == "Other"){
		lineStyle.normal.background = otherTexture;
	}else{
		lineStyle.normal.background = crosshairTexture;
	}
}

function Aiming(){
	crosshair=false;
}

function NormalSpeed(){
	crosshair=true;
}

function Sprinting(){
	crosshair=false;
}

function SetCrosshair(){
	if(cObj != null){
		cObj.GetComponent.<Renderer>().enabled = false;
	}
}

function DefaultCrosshair(){
	if(cObj != null){
		cObj.GetComponent.<Renderer>().enabled = false;
	}
	ownTexture = useTexture;
	if(crosshairObj != null){
		cObj = crosshairObj;
	}
	if(scale){
		cSize = maximumSize;
	} else {
		cSize = crosshairSize;
	}
	scl = scale;
}

function HitEffect(){
	hitEffectOn = true;
	hitEffectTime = 1;
	if(GetComponent.<AudioSource>() && !GetComponent.<AudioSource>().isPlaying){
		GetComponent.<AudioSource>().clip = hitSound;
		GetComponent.<AudioSource>().Play();
	}
}
