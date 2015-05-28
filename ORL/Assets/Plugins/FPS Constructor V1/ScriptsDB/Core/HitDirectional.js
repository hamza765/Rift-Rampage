#pragma strict
private var hitPos : Transform;
private var lastHitPos : Vector3;
private var dirEffectTime : float;
var obj : Transform;
var thePos : Vector3;
var theRot : Vector3;

function Init (pos : Transform, time : float) {
	hitPos = pos;
	dirEffectTime = time;
	transform.localPosition = thePos;
	transform.localEulerAngles = theRot;
	yield new WaitForSeconds(time);
	Destroy(gameObject);
}
function LateUpdate(){
	obj.GetComponent.<Renderer>().material.color.a = dirEffectTime;
	dirEffectTime -= Time.deltaTime;
	if(hitPos != null)
		lastHitPos = hitPos.position;
	if(dirEffectTime > 0 && hitPos && obj != null){
		var hitDir = Vector3(lastHitPos.x, 0, lastHitPos.z) - Vector3(transform.position.x, 0, transform.position.z);
		var relativePoint = transform.InverseTransformPoint(lastHitPos);
		var temp : float;
		if (relativePoint.x < 0.0){
			temp = -(Vector3.Angle(PlayerWeapons.mainCam.transform.forward, hitDir));
   		} else if (relativePoint.x > 0.0) {
        	temp = (Vector3.Angle(PlayerWeapons.mainCam.transform.forward, hitDir));
    	} else {
    		temp = 0;
    	}
		obj.transform.localEulerAngles.y = temp+180;
	}
}