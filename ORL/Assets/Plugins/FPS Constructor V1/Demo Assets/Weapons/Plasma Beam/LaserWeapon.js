var gscript : GunScript;
var emitters : ParticleEmitter[];
var laser : ParticleRenderer;
var laserScript : GameObject;
private var emitting : boolean = false;
var range : float = 50;
private var targetObj : GameObject;
private var lastHit : Transform;
private var hasTarget : boolean = true;
var loseAngle : float = 7; 
private var hitEnemy : boolean = false;
var randomAngle : float =.01;
var dps : float;
var overheatTime : float;
var force : float;
@HideInInspector
var curHeat : float;
private var display : boolean = false;
private var timeOnTarget : float;
var powerTime : float;
var damageMultiplier : float;


function Update () {

	if(gscript.chargeLevel > 0.05){
		gscript.idleTime = 0;
		
		if(curHeat >= overheatTime){
			gscript.chargeLevel = gscript.maxCharge;
			curHeat = 0;
			return;
		}
		
		gscript.chargeLevel = 1;
		FindTarget();
		curHeat = Mathf.Clamp(curHeat+Time.deltaTime, 0, overheatTime);

		if(!emitting){
			EmitCharge(true);
		}
		
	} else if (gscript.chargeLevel > 0){
		GetComponent.<AudioSource>().Play();
		FindTarget();
		EmitHit(false);
		EmitCharge(false);
	} else {
		timeOnTarget = 0;
		curHeat = Mathf.Clamp(curHeat-(Time.deltaTime*(((overheatTime-curHeat)/overheatTime)))*2, 0, overheatTime);
		EmitCharge(false);
		EmitHit(false);
		lastHit = null;
	}
	
}

function EmitCharge (s : boolean) {
	laser.enabled = s;
	laserScript.SendMessage("EmitCharge", s);
	emitting = s;
}
function EmitHit (s : boolean){

	for(var i : int = 0; i < emitters.length; i++){
		emitters[i].emit = s;
	}
	
	hasTarget = s;
}

function FindTarget () {

	if(targetObj == null){
		targetObj = new GameObject();
		laserScript.SendMessage("Target", targetObj.transform);
	}
	
	var layer1 = 1 << PlayerWeapons.playerLayer;
	var layer2 = 1 << 2; 
	var layerMask = layer1 | layer2;  		
	layerMask = ~layerMask;
	var hit : RaycastHit;
	var tempAngle : float = 0;
	
	if(lastHit != null && hitEnemy) {
	 	var temp : Quaternion = Quaternion.LookRotation(targetObj.transform.position - transform.position);
		tempAngle  = Quaternion.Angle(transform.rotation, temp);
	} else {
		tempAngle = loseAngle+1;
	}
	
	if(lastHit == null) lastHit = this.transform;
	
	if (Physics.Raycast (PlayerWeapons.weaponCam.transform.position, SprayDirection(randomAngle), hit, range, layerMask)) {
	
		if (tempAngle >= loseAngle || lastHit == hit.transform){
			if(lastHit != hit.transform){
				timeOnTarget = 0;
				if(hit.transform.GetComponent(EnemyDamageReceiver) != null){
					hitEnemy = true;
				} else {
					hitEnemy = false;
				}
			} else {
				timeOnTarget =Mathf.Clamp( timeOnTarget+Time.deltaTime, 0, powerTime);
			}
			lastHit = hit.transform;
			targetObj.transform.position = hit.point;
			targetObj.transform.parent = hit.transform;
			SendDamage(hit);
		} else {
			timeOnTarget = Mathf.Clamp(timeOnTarget+Time.deltaTime, 0, powerTime);
			SendDamage(hit);
		}
		
		if(!hasTarget){
			EmitHit(true);
		}
		
	} else if (tempAngle < loseAngle) {
			timeOnTarget =Mathf.Clamp(timeOnTarget+Time.deltaTime, 0, powerTime);
			SendDamage(hit);
	} else {
		lastHit = null;
		if(hasTarget) {				
			EmitHit(false);
		}
		targetObj.transform.parent = null;
		targetObj.transform.position = transform.position+SprayDirection(randomAngle)*range;
	}
	
}

function SendDamage (hit : RaycastHit) {
	var sendArray : Object[] = new Object[2];
	sendArray[0] = (dps+((timeOnTarget/powerTime)*damageMultiplier))*Time.deltaTime;
	sendArray[1] = true;		
	if(hit.collider == null)
		return;
	hit.collider.SendMessageUpwards("ApplyDamage", sendArray, SendMessageOptions.DontRequireReceiver);
	if (hit.rigidbody && hit.transform.gameObject.layer != "Player")
			hit.rigidbody.AddForceAtPosition(force * SprayDirection(randomAngle), hit.point);
}
function SprayDirection(c : float){
/*
	var vx = (1 - 2 * Random.value) * c;
	var vy = (1 - 2 * Random.value) * c;
	var vz = 1.0;
	return PlayerWeapons.weaponCam.transform.TransformDirection(Vector3(vx,vy,vz));
	*/
	return PlayerWeapons.weaponCam.transform.TransformDirection(Vector3.forward);
}
function OnGUI(){
	if(display){	
		GUI.Box(Rect(Screen.width - 130,Screen.height-50,120,40),"Heat: "+Mathf.Round(curHeat/overheatTime*100)+"%" +"\n" +"Power: " +Mathf.Round((dps+((timeOnTarget/powerTime)*damageMultiplier))/(dps+damageMultiplier)*100) +"%");
	}
}
function SelectWeapon(){
	display = true;
}

function DeselectWeapon(){
	display = false;
}

