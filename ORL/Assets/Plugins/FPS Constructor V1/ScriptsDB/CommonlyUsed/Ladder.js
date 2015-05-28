#pragma strict
var sensitivity : float = .05;
var moveSpeed : float = 1;
var exitPos : Transform;
var enterPos : Transform;
var minHeight : float = .1;
var soundInterval : float;

private var ladder : boolean = false;
private var temp : boolean = false;
private var soundAmt : float;
private var player : Transform;
private var belowHeight : boolean;

private var val : float = 0;

function MoveTo (what : Transform, where : Vector3, time : float) {
	var i : float = 0;
	var pos : Vector3 = what.position;
	
	while(i <= 1){
		i += Time.deltaTime/time;
		what.position = Vector3.Lerp(pos, where, Mathf.SmoothStep(0,1, i));
		yield WaitForFixedUpdate;
	}
}

function RotateTo (what : Transform, where : Vector3, time : float, local : boolean) {
	var i : float = 0;
	var pos : Vector3;
	if(local){
		pos = what.localEulerAngles;
	} else {
		pos = what.eulerAngles;
	}
	
	while(i <= 1){
		i += Time.deltaTime/time;
		if(local){
			what.localEulerAngles.x = Mathf.LerpAngle(pos.x, where.x, Mathf.SmoothStep(0,1, i));
			what.localEulerAngles.y = Mathf.LerpAngle(pos.y, where.y, Mathf.SmoothStep(0,1, i));
			what.localEulerAngles.z = Mathf.LerpAngle(pos.z, where.z, Mathf.SmoothStep(0,1, i));
		} else {
			what.eulerAngles.x = Mathf.LerpAngle(pos.x, where.x, Mathf.SmoothStep(0,1, i));
			what.eulerAngles.y = Mathf.LerpAngle(pos.y, where.y, Mathf.SmoothStep(0,1, i));
			what.eulerAngles.z = Mathf.LerpAngle(pos.z, where.z, Mathf.SmoothStep(0,1, i));
		}
		yield WaitForFixedUpdate;
	}
	what.GetComponent(MouseLookDBJS).UpdateIt();
}

function MoveToStart (what : Transform, where : Vector3, time : float) {
	var i : float = 0;
	var pos : Vector3 = what.position;
	
	while(i <= 1){
		i += Time.deltaTime/time;
		var targetVect : Vector3 = Vector3.Lerp(pos, where, Mathf.SmoothStep(0,1, i));
		what.position.x = targetVect.x;
		what.position.z = targetVect.z;
		yield WaitForFixedUpdate;
	}
}

function Update () {
	if(player == null)
		return;
		
	if(ladder){
		if(Input.GetButtonDown("Jump")){
			ReleasePlayer();
		}
		var lastVal : float = val;
		val += InputDB.GetAxis("Vertical")*sensitivity*Time.deltaTime;
		val = Mathf.Clamp01(val);
		soundAmt -= Mathf.Abs(lastVal- val);
		if(soundAmt <= 0){
			soundAmt = soundInterval;
			GetComponent.<AudioSource>().Play();
		}		
		player.position.y = Mathf.Lerp(transform.position.y, exitPos.position.y, val);
		
		if(val == 1 && !GunScript.takingOut && !GunScript.puttingAway)
			ExitLadder();
					
		if(val < minHeight && ((lastVal > val) || val == 0)  && !GunScript.takingOut && !GunScript.puttingAway){
			ReleasePlayer();
		}
	}
}

//Locks player to ladder
function LockPlayer () {
	if(GunScript.takingOut || GunScript.puttingAway || ladder)
		return;
	if(PlayerWeapons.PW.weapons[PlayerWeapons.PW.selectedWeapon]){
		temp = PlayerWeapons.PW.weapons[PlayerWeapons.PW.selectedWeapon].GetComponent(GunScript).gunActive;
	} else {
		temp = true;
	}
		
	player.SendMessage("StandUp");
	belowHeight = true;
	CharacterMotorDB.paused = true;
	SmartCrosshair.draw = false;
	PlayerWeapons.playerActive = false;
	DBStoreController.canActivate = false;
	PlayerWeapons.HideWeapon();
	val = (player.position.y-transform.position.y)/(exitPos.position.y-transform.position.y);
	
	RotateTo(player, enterPos.eulerAngles, moveSpeed, false);
	RotateTo(PlayerWeapons.weaponCam.transform, Vector3(0,0,0), moveSpeed, true);
	player.GetComponent(MouseLookDBJS).individualFreeze = true;
	PlayerWeapons.weaponCam.GetComponent(MouseLookDBJS).individualFreeze = true;
	
	yield MoveToStart(player, enterPos.position, moveSpeed);
	
	player.GetComponent(MouseLookDBJS).LockIt(60,60);
	PlayerWeapons.weaponCam.GetComponent(MouseLookDBJS).LockItSpecific(-40,80);
	player.GetComponent(MouseLookDBJS).individualFreeze = false;
	PlayerWeapons.weaponCam.GetComponent(MouseLookDBJS).individualFreeze = false;
	PlayerWeapons.canLook = true;
		
	ladder = true;
	soundAmt = soundInterval;
}

//Removes player from ladder to exit position
function ExitLadder () {
	ladder = false;
	yield MoveTo(player, exitPos.position, moveSpeed);
	ReleasePlayer();
}

//Reactivates player to normal function
function ReleasePlayer(){
	player.GetComponent(MouseLookDBJS).UnlockIt();	
	PlayerWeapons.weaponCam.GetComponent(MouseLookDBJS).UnlockIt();
	ladder = false;
	SmartCrosshair.draw = true;
	DBStoreController.canActivate = true;
	PlayerWeapons.playerActive = true;
	CharacterMotorDB.paused = false;
	if(temp)
		PlayerWeapons.ShowWeapon();
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "Player" && !GunScript.takingOut && !GunScript.puttingAway){
		player = other.transform;
		LockPlayer();
	}
}