var dps : float;
var power : float;
var forceRadius : float;
var vFactor : float;

function OnTriggerStay (other : Collider) {
	var sendArray : Object[] = new Object[2];
	sendArray[0] = dps*Time.deltaTime;
	sendArray[1] = true;		
	other.SendMessageUpwards("ApplyDamage", sendArray, SendMessageOptions.DontRequireReceiver);
	if(other.GetComponent.<Rigidbody>())
	other.GetComponent.<Rigidbody>().AddExplosionForce(power, transform.position, forceRadius, vFactor);
}

function Finish(){
	Destroy(transform.parent);
}

function ChargeLevel(){
	transform.parent.position = GameObject.FindWithTag("Laser").transform.position;
}