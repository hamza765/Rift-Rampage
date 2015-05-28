/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/
var health : float;
private var curHealth : float;
private var dead : boolean = false;
var dieTime : float;
var minimum : float;

function Start(){
	curHealth = health;
}

function ApplyDamagePlayer(damage : float){
	if(dead)
		return;
	var tempFloat : float;
//	float.TryParse(Arr[0], tempFloat);
	curHealth -= damage;
	if(curHealth <= 0){
		dead = true;
		this.GetComponent(HingeJoint).useSpring = false;
		this.GetComponent(HingeJoint).limits.min = -90;
		yield new WaitForSeconds(dieTime);
		curHealth = health;
		this.GetComponent(HingeJoint).useSpring = true;
		this.GetComponent(HingeJoint).limits.min = minimum;
		dead = false;
	}
}
