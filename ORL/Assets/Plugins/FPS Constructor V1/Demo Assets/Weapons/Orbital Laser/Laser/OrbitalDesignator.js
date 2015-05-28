var gscript : GunScript;
var designator : Transform;
private var desigLight : Light;
var laser : Transform;
var lockTime : float = 0;
var lockRange : float;
var targetError : float;
private var lockedOn : boolean = false;
var lockMax : float;
var line : LineRenderer;

function Start () {
	desigLight = designator.GetComponentInChildren(Light);
	line = this.GetComponent(LineRenderer);
}

function Update () {
	if(Random.value <lockTime/lockMax){
		line.enabled = true;
		desigLight.enabled = true;
		desigLight.transform.GetComponent.<AudioSource>().volume = lockTime/lockMax;
		desigLight.transform.GetComponent.<AudioSource>().pitch = lockTime/lockMax*3;
		if(!desigLight.transform.GetComponent.<AudioSource>().isPlaying){
			desigLight.transform.GetComponent.<AudioSource>().Play();
		}
	} else {
		line.enabled = false;
		desigLight.enabled = false;
	}
	if(lockTime <= 0)
		desigLight.transform.GetComponent.<AudioSource>().Stop();

	if(gscript.chargeLevel <= 0){
		lockTime = Mathf.Clamp(lockTime- Time.deltaTime, 0, lockMax);
		lockedOn = false;
		//desigLight.enabled = false;
		line.enabled = false;
		return;
	}
	if(lockTime >= lockMax || lockedOn){
		lockedOn = true;
		if(gscript.chargeLevel < gscript.minCharge){
			gscript.chargeLevel = gscript.minCharge;
		}			
		lockTime = 0;
		return;
	}
	if(!lockedOn ){
		gscript.chargeLevel = .1;
	}
	if(lockTime>0){
		var temp : Quaternion = Quaternion.LookRotation(designator.position - transform.position);
		var tAngle : float  = Quaternion.Angle(transform.rotation, temp);
		if(tAngle <= targetError){
			lockTime = Mathf.Clamp(lockTime+ Time.deltaTime, 0, lockMax);
		} else {
			lockTime = Mathf.Clamp(lockTime- Time.deltaTime, 0, lockMax);
		}
	} else {
		var layer1 = 1 << PlayerWeapons.playerLayer;
		var layer2 = 1 << 2; 
		var layerMask = layer1 | layer2;
  		layerMask = ~layerMask;
		var hit : RaycastHit;
		if (Physics.Raycast (transform.position, transform.TransformDirection(0,0,1), hit, lockRange, layerMask)) {
			if(lockTime <= 0) {
				designator.position = hit.point;
				lockTime = Mathf.Clamp(lockTime+ Time.deltaTime, 0, lockMax);
			}
		}
	}
}