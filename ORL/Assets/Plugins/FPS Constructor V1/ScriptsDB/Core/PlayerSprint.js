#pragma strict
static var sprinting : boolean = false;
private var exhausted : boolean = false;
private var sprintEndTime : float;
private var CM : CharacterMotorDB;
@HideInInspector
var weaponsInactive : boolean = false;
@HideInInspector
var values : MovementValues;

function Start () {
	CM = PlayerWeapons.CM;
	values = MovementValues.singleton;
}

function Update () {
	weaponsInactive = (PlayerWeapons.PW.weapons[PlayerWeapons.PW.selectedWeapon] == null);
	if(!weaponsInactive)
		weaponsInactive = (PlayerWeapons.PW.weapons[PlayerWeapons.PW.selectedWeapon].GetComponent(GunScript).gunActive == false);
	if(!weaponsInactive) return;

	//Replenish Sprint time
	var tempSprintTime : float;
	if(PlayerWeapons.controller.velocity.magnitude == 0){
		tempSprintTime = sprintEndTime;
	}
	if(AimMode.sprintNum < values.sprintDuration  && !AimMode.sprintingPublic && Time.time > tempSprintTime){
		if(PlayerWeapons.controller.velocity.magnitude == 0){
			AimMode.sprintNum = Mathf.Clamp(AimMode.sprintNum + values.sprintAddStand*Time.deltaTime, 0, values.sprintDuration);
		}else{
			AimMode.sprintNum = Mathf.Clamp(AimMode.sprintNum + values.sprintAddWalk*Time.deltaTime, 0, values.sprintDuration);
		}
	}	
	if(AimMode.sprintNum > values.sprintMin){
		exhausted = false;
	}
	
	//Handle sprint
	if(InputDB.GetButton("Sprint")&& !InputDB.GetButton("Aim")&& PlayerWeapons.canSprint && CM.grounded && !exhausted  && (PlayerWeapons.controller.velocity.magnitude > CM.movement.minSprintSpeed || (/*CM.prone || */CM.crouching))){
		AimMode.sprintNum = Mathf.Clamp(AimMode.sprintNum - Time.deltaTime, 0, values.sprintDuration);
		if (!AimMode.sprintingPublic){
			AimMode.sprintingPublic = true;			
			BroadcastMessage("Sprinting", SendMessageOptions.DontRequireReceiver);
			AimMode.canSwitchWeaponAim = false;	
		}
		
		//Check if we're out of sprint
		if(AimMode.sprintNum <= 0){
			exhausted = true;
			sprintEndTime = Time.time + values.recoverDelay;
		}
	} else if(AimMode.sprintingPublic){
		AimMode.sprintingPublic = false;
		BroadcastMessage("StopSprinting", SendMessageOptions.DontRequireReceiver);
		BroadcastMessage("NormalSpeed");
		AimMode.canSwitchWeaponAim = true;	
	}
}