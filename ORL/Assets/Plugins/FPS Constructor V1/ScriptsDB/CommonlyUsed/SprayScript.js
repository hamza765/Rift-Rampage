/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/

@HideInInspector var gunScript : GunScript;
private var trueDamage : float = 0;
private var trueForce : float = 0;
@HideInInspector var isActive : boolean = false;
private var emitters : ParticleEmitter[];
private var i : int = 0;

function Awake(){
	gunScript = transform.parent.GetComponent(GunScript);
	emitters = gameObject.GetComponentsInChildren.<ParticleEmitter>();
	isActive = false;
}

function OnParticleCollision(hitObj : GameObject){
	var dist : float = Vector3.Distance(hitObj.transform.position, transform.position);
	trueDamage = gunScript.damage;
	if(dist > gunScript.maxFalloffDist){
		trueDamage = gunScript.damage * Mathf.Pow(gunScript.falloffCoefficient, (gunScript.maxFalloffDist - gunScript.minFalloffDist)/gunScript.falloffDistanceScale) * Time.deltaTime;
	}else if(dist < gunScript.maxFalloffDist && dist > gunScript.minFalloffDist){
		trueDamage = gunScript.damage * Mathf.Pow(gunScript.falloffCoefficient, (dist - gunScript.minFalloffDist)/gunScript.falloffDistanceScale) * Time.deltaTime;
	}
	var sendArray : Object[] = new Object[2];
	sendArray[0] = trueDamage;
	sendArray[1] = true;		
	hitObj.SendMessageUpwards("ApplyDamage", sendArray, SendMessageOptions.DontRequireReceiver);
	trueForce = gunScript.force * Mathf.Pow(gunScript.forceFalloffCoefficient, dist);
	if(hitObj.GetComponent(Rigidbody)){
		var rigid : Rigidbody = hitObj.GetComponent(Rigidbody);
		var vectorForce : Vector3 = -Vector3.Normalize(transform.position - hitObj.transform.position) * trueForce;
		rigid.AddForce(vectorForce);
	}
}

function ToggleActive(activate : boolean){
	if(activate == false){
		isActive = false;
		for(var emitter : ParticleEmitter in emitters){
			emitter.emit = false;
		}
	}else{
		isActive = true;
		for(var emitter : ParticleEmitter in emitters){
			emitter.emit = true;
		}
	}
}
