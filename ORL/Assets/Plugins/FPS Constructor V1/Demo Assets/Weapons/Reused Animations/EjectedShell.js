var force : Vector3;
var randomFactorForce : float;
//var gravity : float;
var torque : Vector3;
var randomFactorTorque : float;
function Start () {
	GetComponent.<Rigidbody>().AddRelativeForce(force *Random.Range(1, randomFactorForce));
	GetComponent.<Rigidbody>().AddRelativeTorque(torque* Random.Range(-randomFactorTorque, randomFactorTorque));

}