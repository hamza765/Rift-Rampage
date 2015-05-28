/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/

var GunScript : GunScript;
var damage : float;
var force : float;
private var isActive = false;
private var effectsManager : EffectsManager;

function Start(){
	effectsManager = GameObject.FindWithTag("Manager").GetComponent(EffectsManager);
}

function Update(){
	transform.localPosition = Vector3(0,0,0);
	if(GunScript.hitBox){
		isActive = true;
		this.GetComponent(BoxCollider).isTrigger = false;
	} else {
		isActive = false;
		this.GetComponent(BoxCollider).isTrigger = true;
	}
}

function OnCollisionEnter(c : Collision){
	if(isActive){
		var sendArray : Object[] = new Object[2];
		sendArray[0] = damage;
		sendArray[1] = true;			
		c.collider.SendMessageUpwards("ApplyDamage", sendArray, SendMessageOptions.DontRequireReceiver);
		if(c.gameObject.GetComponent(UseEffects)){
			var layer1 = 1 << PlayerWeapons.playerLayer;
			var layer2 = 1 << 2;
		  	var layerMask = layer1 | layer2;
		  	layerMask = ~layerMask;
			var hit : RaycastHit;
				if(Physics.Raycast(GunScript.gameObject.transform.position, GunScript.gameObject.transform.forward, hit, Mathf.Infinity, layerMask)){
				//The effectsManager needs five bits of information
				var hitRotation : Quaternion = Quaternion.FromToRotation(Vector3.up, hit.normal);
				var hitSet : int = c.gameObject.GetComponent(UseEffects).setIndex;
				var hitInfo = new Array(hit.point, hitRotation, c.transform, hit.normal, hitSet);
				effectsManager.SendMessage("ApplyDent", hitInfo, SendMessageOptions.DontRequireReceiver);
			}		
		}
		if(c.collider.GetComponent(Rigidbody) != null){
			c.collider.GetComponent(Rigidbody).AddForce(c.relativeVelocity*force);
		}
		GunScript.hitBox = false;
		isActive = false;
		GetComponent.<AudioSource>().loop = false;
	}
}