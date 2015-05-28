/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/

var jumpHeight : float = .15;
var crouchHeight : float = -.1;
var proneHeight : float = -.2;

var crouchSpeed : float = 1;
var jumpAdjustSpeed : float = 1;
var landingHeight : float = -.06;
var landAdjustSpeed : float = 1;
private var airborne : boolean = false;
private var landingAdjusted = true;
private var targetHeight : float = 0;
private var aim : boolean = false;
private var speed : float;
private var CM : CharacterMotorDB;
private var aimSpeed : float = 1;

function Update(){
	if(!CM.grounded){
		targetHeight = jumpHeight;
		airborne = true;
		speed = jumpAdjustSpeed;
	} else if (airborne){
		airborne = false;
		targetHeight = landingHeight;
		landingAdjusted = false;
		speed = landAdjustSpeed;
	} else if (CharacterMotorDB.crouching && landingAdjusted){
		targetHeight = crouchHeight;
		speed = crouchSpeed;
	}else if (CharacterMotorDB.prone && landingAdjusted){
		targetHeight = proneHeight;
		speed = crouchSpeed;
	} else if(landingAdjusted){
		targetHeight = 0;
		speed = crouchSpeed;
	}
	
	if(aim && landingAdjusted){
		targetHeight = 0;
		speed = crouchSpeed*2;
	}
	
	transform.localPosition.y= Mathf.Lerp(transform.localPosition.y, targetHeight, Time.deltaTime*speed);
	if(Mathf.Abs(transform.localPosition.y - targetHeight) < .1){
		landingAdjusted = true;
	}
}

function Start (){
	CM = GameObject.FindWithTag("Player").GetComponent(CharacterMotorDB);
	targetHeight = 0;
}

function Aiming(){
	aim = true;
}

function StopAiming(){
	aim = false;
}