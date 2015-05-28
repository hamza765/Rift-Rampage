/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/

var fireAnim : String = "Fire";
var emptyFireAnim : String = "";
var reloadAnim : String = "Reload";
var emptyReloadAnim : String = "Reload";
var takeOutAnim : String = "TakeOut";
var putAwayAnim : String = "PutAway";
var enterSecondaryAnim : String = "EnterSecondary";
var exitSecondaryAnim : String = "ExitSecondary";
var reloadIn : String = "ReloadIn";
var reloadOut : String = "ReloadOut";

var walkAnimation : String = "Walk";
var secondaryWalkAnim : String = "";
var secondarySprintAnim : String = "";
var walkSpeedModifier : float = 20;
var walkWhenAiming  : boolean = false;
var sprintAnimation : String = "Sprint";
var nullAnim : String = "Null";
var secondaryNullAnim : String = "";
var idleAnim : String = "Idle";
var secondaryIdleAnim : String = "";
var chargeAnim : String = "Charge";
private var stopAnimTime : float = 0;
var aim : boolean = false;
private var CM : CharacterMotorDB;
private var idle : boolean = false;
private var secondary : boolean = false;
private var walkAnim : String = "";
private var sprintAnim : String = "";
private var nullAnimation : String = "";
var hasSecondary : boolean = false;

var secondaryReloadAnim : String = "";
var secondaryReloadEmpty : String = "";
var secondaryFireAnim : String = "";
var secondaryEmptyFireAnim : String = "";

//melee
var animCount : int = 2;
var fireAnims = new String[15];
var reloadAnims = new String[15];
var index : int = -1;
var lastIndex : int = -1;
var melee : boolean = false;
var random : boolean = false;
var lastSwingTime : float;
var resetTime : float;
var gs : GunScript;

private var dir : Vector3;
private var moveWeight : float = 1;
private var nullWeight : float = 1;
private var useStrafe : boolean = true;

function PlayAnim (name : String){
	idle = false;
	if(GetComponent.<Animation>()[name] == null || !gs.gunActive){
		return;
	}
	GetComponent.<Animation>().Stop(name);
	GetComponent.<Animation>().Rewind(name);
	GetComponent.<Animation>().CrossFade(name, .2);
	stopAnimTime = Time.time + GetComponent.<Animation>()[name].length;
}

function PlayAnim (name : String, time : float){
	idle = false;
	if(GetComponent.<Animation>()[name] == null || !gs.gunActive){
		return;
	}
	GetComponent.<Animation>().Stop(name);
	GetComponent.<Animation>().Rewind(name);
	GetComponent.<Animation>()[name].speed = (GetComponent.<Animation>()[name].clip.length/time);
	GetComponent.<Animation>().CrossFade(name, .2);
	stopAnimTime = Time.time + GetComponent.<Animation>()[name].length;
}

function Update () {
	if(gs != null){
		if(!gs.gunActive){
			return;
		}
	}
	if(GetComponent.<Animation>()[nullAnim] == null)
		return;
	if(GetComponent.<Animation>()[walkAnimation] == null)
		return;
	
	var CM : CharacterMotorDB = PlayerWeapons.CM;
	
	if (!CM.grounded){
		nullWeight = Mathf.Lerp(nullWeight, 1, Time.deltaTime * 5);
		moveWeight = 0;
	} 
	if(Time.time > stopAnimTime+.1){
		moveWeight = Mathf.Lerp(moveWeight, 1, Time.deltaTime * 5);
		nullWeight = Mathf.Lerp(nullWeight, 1, Time.deltaTime * 5);
	} else {
		moveWeight = 0;
		nullWeight = 0;
	}
	
	GetComponent.<Animation>()[nullAnim].weight = nullWeight;
		
	var veloc : Vector3 = PlayerWeapons.CM.movement.velocity;
	var trans : Transform = PlayerWeapons.player.transform;		
	dir = Vector3.Lerp(dir, trans.InverseTransformDirection(veloc), Time.deltaTime*6);
	var dirN = dir.normalized;
    
    var forwardWeight : float = dirN.z;
    var rightWeight = dirN.x;
    
    //Weight and speed from direction
    GetComponent.<Animation>()[walkAnimation].weight = Mathf.Abs(forwardWeight)*moveWeight;    
    GetComponent.<Animation>()[walkAnimation].speed = dir.z/CM.movement.maxForwardSpeed;
    
    var strafeWeight : float = Mathf.Abs(rightWeight)*moveWeight;
    var strafeSpeed : float = dir.x/CM.movement.maxSidewaysSpeed*moveWeight;
    
    //Apply to strafe animation
   /* if(useStrafe){
    	animation[strafeRightAnimation].weight = strafeWeight;
   		animation[strafeRightAnimation].speed = strafeSpeed;
   	} else {*/
   		//Handle if we don't have a strafe animation by applying to walk animation
   		GetComponent.<Animation>()[walkAnimation].weight = Mathf.Max(GetComponent.<Animation>()[walkAnimation].weight, strafeWeight);
   		if(Mathf.Abs(strafeSpeed) > Mathf.Abs(GetComponent.<Animation>()[walkAnimation].speed)){
   			GetComponent.<Animation>()[walkAnimation].speed = strafeSpeed;
   		}
  // 	}
}

/*function LateUpdate(){
	if(gs)
		if(!gs.gunActive)
			return;
	if(animation[walkAnim] != null){
		var temp : boolean = animation[walkAnim].enabled;
	} else {
		temp = false;
	}
	
	if(animation[sprintAnim] != null){
		var temp2 : boolean = animation[sprintAnim].enabled;
	} else {
		temp2 = false;
	}

	/*if(!animation.IsPlaying(nullAnim))
		animation.CrossFade(nullAnim, .4);
}*/

function ReloadAnim (reloadTime : float){
	idle = false;
	if(GetComponent.<Animation>()[reloadAnim] == null){
		return;
	}
	//animation.Stop(reloadAnim);
	GetComponent.<Animation>().Rewind(reloadAnim);
	GetComponent.<Animation>()[reloadAnim].speed = (GetComponent.<Animation>()[reloadAnim].clip.length/reloadTime);
	GetComponent.<Animation>().Play(reloadAnim);
	stopAnimTime = Time.time + reloadTime;
}

function ReloadEmpty(reloadTime : float){
	idle = false;
	if(GetComponent.<Animation>()[emptyReloadAnim] == null){
		return;
	}
	GetComponent.<Animation>().Rewind(emptyReloadAnim);
	GetComponent.<Animation>()[emptyReloadAnim].speed = (GetComponent.<Animation>()[emptyReloadAnim].clip.length/reloadTime);
	GetComponent.<Animation>().Play(emptyReloadAnim);
	stopAnimTime = Time.time + reloadTime;
}

function FireAnim(){
	idle = false;
	if(GetComponent.<Animation>()[fireAnim] == null){
		return;
	}
	GetComponent.<Animation>().Rewind(fireAnim);
	GetComponent.<Animation>().CrossFade(fireAnim, .05);
	stopAnimTime = Time.time + GetComponent.<Animation>()[fireAnim].clip.length;
}

function SecondaryReloadEmpty(reloadTime : float){
	idle = false;
	if(GetComponent.<Animation>()[secondaryReloadEmpty] == null){
		return;
	}
	GetComponent.<Animation>()[secondaryReloadEmpty].speed = (GetComponent.<Animation>()[secondaryReloadEmpty].clip.length/reloadTime);
	GetComponent.<Animation>().Rewind(secondaryReloadEmpty);
	GetComponent.<Animation>().CrossFade(secondaryReloadEmpty, .2);
	stopAnimTime = Time.time + reloadTime;
}

function SecondaryReloadAnim(reloadTime : float){
	idle = false;
	if(GetComponent.<Animation>()[secondaryReloadAnim] == null){
		return;
	}
	GetComponent.<Animation>()[secondaryReloadAnim].speed = (GetComponent.<Animation>()[secondaryReloadAnim].clip.length/reloadTime);
	GetComponent.<Animation>().Rewind(secondaryReloadAnim);
	GetComponent.<Animation>().CrossFade(secondaryReloadAnim, .2);
	stopAnimTime = Time.time + reloadTime;
}

function SecondaryFireAnim(){
	idle = false;
	if(GetComponent.<Animation>()[secondaryFireAnim] == null){
		return;
	}
	GetComponent.<Animation>().Rewind(secondaryFireAnim);
	GetComponent.<Animation>().CrossFade(secondaryFireAnim, .2);
	stopAnimTime = Time.time + GetComponent.<Animation>()[secondaryFireAnim].clip.length;
}

function TakeOutAnim(takeOutTime : float){
	idle = false;
	if(takeOutTime <= 0)
		return;
	if(GetComponent.<Animation>()[takeOutAnim] == null){
		return;
	}
	GetComponent.<Animation>().Stop(putAwayAnim);
	GetComponent.<Animation>().Stop(takeOutAnim);
	GetComponent.<Animation>().Rewind(takeOutAnim);
	GetComponent.<Animation>()[takeOutAnim].speed = (GetComponent.<Animation>()[takeOutAnim].clip.length/takeOutTime);
	GetComponent.<Animation>().Play(takeOutAnim);
	stopAnimTime = Time.time + takeOutTime;
}

function PutAwayAnim(putAwayTime : float){
	idle = false;
	secondary = false;
	nullAnimation = nullAnim;
	if(putAwayTime <= 0)
		return;
	if(GetComponent.<Animation>()[putAwayAnim] == null){
		return;
	}
	GetComponent.<Animation>().Stop(putAwayAnim);
	GetComponent.<Animation>().Rewind(putAwayAnim);
	GetComponent.<Animation>()[putAwayAnim].speed = (GetComponent.<Animation>()[putAwayAnim].clip.length/putAwayTime);
	GetComponent.<Animation>().CrossFade(putAwayAnim, .1
	);
	stopAnimTime = Time.time + putAwayTime;
}

function SingleFireAnim(fireRate : float){
	idle = false;
	if(GetComponent.<Animation>()[fireAnim] == null){
		return;
	}
	GetComponent.<Animation>().Stop(fireAnim);
	GetComponent.<Animation>()[fireAnim].speed = (GetComponent.<Animation>()[fireAnim].clip.length/fireRate);
	GetComponent.<Animation>().Rewind(fireAnim);
	GetComponent.<Animation>().CrossFade(fireAnim, .05);
	stopAnimTime = Time.time + fireRate;
}

function EmptyFireAnim () {
	idle = false;
	if(GetComponent.<Animation>()[emptyFireAnim] == null){
		return;
	}
	GetComponent.<Animation>().Stop(emptyFireAnim);
	GetComponent.<Animation>().Rewind(emptyFireAnim);
	GetComponent.<Animation>().CrossFade(emptyFireAnim, .05);
	stopAnimTime = Time.time + GetComponent.<Animation>()[emptyFireAnim].length;
}

function SecondaryEmptyFireAnim () {
	idle = false;
	if(GetComponent.<Animation>()[secondaryEmptyFireAnim] == null){
		return;
	}
	GetComponent.<Animation>().Stop(secondaryEmptyFireAnim);
	GetComponent.<Animation>().Rewind(secondaryEmptyFireAnim);
	GetComponent.<Animation>().CrossFade(secondaryEmptyFireAnim, .05);
	stopAnimTime = Time.time + GetComponent.<Animation>()[secondaryEmptyFireAnim].length;
}

function EnterSecondary(t : float){
	if(GetComponent.<Animation>()[secondaryNullAnim] != null){
		nullAnimation = secondaryNullAnim;
	}
	idle = false;
	secondary = true;
	if(GetComponent.<Animation>()[enterSecondaryAnim] == null){
		return;
	}
	GetComponent.<Animation>().Stop(enterSecondaryAnim);
	GetComponent.<Animation>()[enterSecondaryAnim].speed = (GetComponent.<Animation>()[enterSecondaryAnim].clip.length/t);
	GetComponent.<Animation>().Rewind(enterSecondaryAnim);
	GetComponent.<Animation>().CrossFade(enterSecondaryAnim, .2);
	stopAnimTime = Time.time + t;
}

function ExitSecondary(t : float){
	nullAnimation = nullAnim;
	idle = false;
	secondary = false;
	if(GetComponent.<Animation>()[exitSecondaryAnim] == null){
		return;
	}
	GetComponent.<Animation>().Stop(exitSecondaryAnim);
	GetComponent.<Animation>()[exitSecondaryAnim].speed = (GetComponent.<Animation>()[exitSecondaryAnim].clip.length/t);
	GetComponent.<Animation>().Rewind(exitSecondaryAnim);
	GetComponent.<Animation>().CrossFade(exitSecondaryAnim, .2);
	stopAnimTime = Time.time + t;
}

function SingleSecFireAnim(fireRate : float){
	idle = false;
	if(GetComponent.<Animation>()[secondaryFireAnim] == null){
		return;
	}
	GetComponent.<Animation>().Stop(secondaryFireAnim);
	GetComponent.<Animation>()[secondaryFireAnim].speed = (GetComponent.<Animation>()[secondaryFireAnim].clip.length/fireRate);
	GetComponent.<Animation>().Rewind(secondaryFireAnim);
	GetComponent.<Animation>().CrossFade(secondaryFireAnim, .05);
	stopAnimTime = Time.time + fireRate;
}

function ReloadIn(reloadTime : float){
	idle = false;
	if(GetComponent.<Animation>()[reloadIn] == null){
		return;
	}
	GetComponent.<Animation>()[reloadIn].speed = (GetComponent.<Animation>()[reloadIn].clip.length/reloadTime);
	GetComponent.<Animation>().Rewind(reloadIn);
	GetComponent.<Animation>().Play(reloadIn);
	stopAnimTime = Time.time + reloadTime;
}

function ReloadOut(reloadTime : float){
	idle = false;
	if(GetComponent.<Animation>()[reloadOut] == null){
		return;
	}
	GetComponent.<Animation>()[reloadOut].speed = (GetComponent.<Animation>()[reloadOut].clip.length/reloadTime);
	GetComponent.<Animation>().Rewind(reloadOut);
	GetComponent.<Animation>().Play(reloadOut);
	stopAnimTime = Time.time + reloadTime;
}

function IdleAnim(){
	if(GetComponent.<Animation>()[idleAnim] == null || idle || Time.time < stopAnimTime){
		return;
	}
	if(!PlayerWeapons.doesIdle){
		idle = true;
		return;
	}
	idle = true;
	if(secondary){
		GetComponent.<Animation>().Stop(secondaryIdleAnim);
		GetComponent.<Animation>().Rewind(secondaryIdleAnim);
		GetComponent.<Animation>().CrossFade(secondaryIdleAnim, .2);
		stopAnimTime = Time.time + GetComponent.<Animation>()[secondaryIdleAnim].clip.length;
		return;
	}
	GetComponent.<Animation>().Stop(idleAnim);
	GetComponent.<Animation>().Rewind(idleAnim);
	GetComponent.<Animation>().CrossFade(idleAnim, .2);
	stopAnimTime = Time.time + GetComponent.<Animation>()[idleAnim].clip.length;
	yield new WaitForSeconds(GetComponent.<Animation>()[idleAnim].clip.length);
	idle = false;
}

function Start(){
	idle = false;
	CM = PlayerWeapons.CM;
	stopAnimTime = 10;
	aim = false;
	nullAnimation = nullAnim;
	
	/*for (s : AnimationState in animation) {
    	s.layer = 1;
	}*/
	
	if(GetComponent.<Animation>()[nullAnim] != null){
		GetComponent.<Animation>()[nullAnim].layer = -2;
		GetComponent.<Animation>()[nullAnim].enabled = true;
	}
	if(GetComponent.<Animation>()[walkAnimation] != null){
		GetComponent.<Animation>()[walkAnimation].layer = -1;
		GetComponent.<Animation>()[walkAnimation].enabled = true;
	}
		
/*	if(animation[strafeRightAnimation] != null){
		animation[strafeRightAnimation].layer = -1;
		animation[strafeRightAnimation].enabled = true;
	} else {
		useStrafe = false;
	}*/
		
	if(GetComponent.<Animation>()[sprintAnim] != null){
		GetComponent.<Animation>()[sprintAnim].layer = -1;
	}
		
	GetComponent.<Animation>().SyncLayer(-1);
	
	stopAnimTime = -1;
}

function Aiming(){
	idle = false;
	aim = true;
	var temp : boolean =  false;
	var temp2 : boolean = false;
	if(GetComponent.<Animation>()[walkAnim] != null && !walkWhenAiming){
		GetComponent.<Animation>().Stop(walkAnim);
	}
	if(GetComponent.<Animation>()[sprintAnim] != null){
		 GetComponent.<Animation>().Stop(sprintAnim);
	}
	if(GetComponent.<Animation>()[nullAnim] != null)
		GetComponent.<Animation>().CrossFade(nullAnimation, .2);
}

function StopAiming () {
	aim = false;
}

function FireMelee (fireRate : float) {
	var temp : String;
	if(random){
		lastIndex = index;
		index = Mathf.Round(Random.Range(0, animCount-1));
		if(index == lastIndex){
			if(index == animCount-1){
				index = Mathf.Clamp(index-1,0,animCount-1);
			} else {
				index += 1;
			}
		}
	} else {
		if(Time.time > lastSwingTime+resetTime){
			index = 0;
		} else {
			index += 1;
		}
		if (index == animCount){
			index = 0;
		}
		lastSwingTime = Time.time;
	}
	temp = fireAnims[index];
	
		idle = false;
	if(temp == "" || GetComponent.<Animation>()[temp] == null){
		return;
	}
	//animation.Stop(temp);
	GetComponent.<Animation>()[temp].speed = (GetComponent.<Animation>()[temp].clip.length/fireRate);
	//animation.Rewind(temp);
	GetComponent.<Animation>().CrossFade(temp, .05);
	stopAnimTime = Time.time + fireRate;
}

function ReloadMelee (fireRate : float) {
	var temp : String;
	temp = reloadAnims[index];
	idle = false;
	if(GetComponent.<Animation>()[temp] == null){
		return;
	}
	GetComponent.<Animation>().Stop(fireAnims[index]);
	GetComponent.<Animation>()[temp].speed = (GetComponent.<Animation>()[temp].clip.length/fireRate);
	//animation.Rewind(temp);
	GetComponent.<Animation>().CrossFadeQueued(temp, .05);
	stopAnimTime = Time.time + fireRate;

}
