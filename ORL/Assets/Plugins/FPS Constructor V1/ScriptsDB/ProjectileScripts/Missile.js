/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/
var delay = 1.0;
var timeOut = 1.0;
var detachChildren = false;
var explosion : Transform;
var explodeAfterBounce : boolean = false;
private var hasCollided : boolean = false;
private var explodeTime : float;
private var initiateTime : float;
var playerThings : GameObject[];
var t : Transform;
var turnSpeed : float;
var flySpeed : float;
var initiatedSpeed : float;
var em : ParticleEmitter;
var soundPlaying : boolean = false;
var lockObj : GameObject;
private var cam : Camera;

//private var hasExploded : boolean = false;

function Start (){
	explodeTime = Time.time+timeOut;
	initiateTime = Time.time + delay;
	cam = GameObject.FindWithTag("WeaponCamera").GetComponent.<Camera>();
}

function OnCollisionEnter (collision : Collision){
	if(hasCollided || !explodeAfterBounce)
		DestroyNow();
	yield new WaitForSeconds(delay);
	hasCollided = true;
}

function ChargeLevel(charge : float){
	var temp : LockOnMissile;
	temp = GameObject.FindWithTag("Missile").GetComponent(LockOnMissile);
	t = temp.Target();
	if(t != null){
		lockObj.transform.position = t.position;
		lockObj.transform.parent = null;
	}
}

function DestroyNow(){
	if (detachChildren) {
		transform.DetachChildren ();
	}
	if(lockObj != null)
		Destroy(lockObj);
	DestroyObject (gameObject);
	if (explosion)
		Instantiate (explosion, transform.position, Quaternion(0,0,0,0));
}

function LateUpdate(){
	if(lockObj != null){
		if(t != null){
			lockObj.GetComponentInChildren(Renderer).enabled = true;
			lockObj.transform.position = t.position;
		} else {
			lockObj.GetComponentInChildren(Renderer).enabled = false;
		}
		lockObj.transform.LookAt(cam.transform);
	}

	if(Time.time > initiateTime){
//		if(!soundPlaying){
//			GetComponent.<AudioSource>().Play();
//			soundPlaying = true;
//		}
		if(t!= null){
			var temp : Quaternion;
			temp = Quaternion.LookRotation(t.position - transform.position, Vector3.up);
			transform.rotation = Quaternion.Slerp(transform.rotation, temp, Time.deltaTime * turnSpeed);
		} else {
			Destroy(lockObj);
		}
		GetComponent.<Rigidbody>().velocity = transform.TransformDirection(Vector3.forward)*initiatedSpeed;
		em.emit = true;
	} else {
		GetComponent.<Rigidbody>().velocity = transform.TransformDirection(Vector3.forward)*flySpeed;
		em.emit = false;
	}
   if(Time.time > explodeTime){
   		DestroyNow();
   }
}