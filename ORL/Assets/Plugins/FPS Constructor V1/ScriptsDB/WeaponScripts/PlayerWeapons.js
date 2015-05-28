/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
 For additional information contact us info@dastardlybanana.com.
*/

var weapons : GameObject[]; //Array of equipped weapons (accessible by number keys)
var selectedWeapon : int = 0; //index of currently selected weapon in array
var reloadWhileSprinting : boolean = false;
var displayTime : float = 1; //How long slot-related message is shown for
var sensitivity : float = 13; //Sensitivity of mouse
var inverted : boolean = false;	//Is the mouse y-axis inverted
var interactDistance : float = 5; //How far can an object be to be interacted with
private var lastHit : Transform; //the last object we hit
var interactMask : LayerMask; //Mask for raycast

//Settings
static var autoReload : boolean = true; //Do guns automatically reload when emptied?
static var fieldOfView : float = 60; //Base field of view for cameras
static var playerLayer : int = 8;
static var ignorePlayerLayer : int = 8;
static var canSwapSameWeapon : boolean = true; //Can we pick up multiples of the same weapon? (Replacing it)
static var saveUpgradesToDrops : boolean = true;
var RaycastsIgnore : LayerMask; //Layers that gun raycasts hit


//Control Variables
static var canMove : boolean = true;
static var canSprint : boolean = true;
static var canLook : boolean = true; //Can the player look around?
static var canFire : boolean = true;
static var canAim : boolean = true;
static var canCrouch : boolean = true;
static var doesIdle : boolean = true;
static var canInteract : boolean = true;
static var canSwitchWeapon : boolean = true;

//Status
static var hidden : boolean = false;
static var sprinting : boolean = false;

//Don't change
static var player : GameObject;
static var controller : CharacterController;
static var CM : CharacterMotorDB;
static var weaponCam : GameObject;
static var mainCam : GameObject;
static var autoFire : boolean;
static var charge : boolean = false;
private var canKickback : boolean = true;
private var emptyMessageTime : float;
private var emptyMessage : String;
private var displayMessage : boolean = false;
static var playerActive : boolean = true;
static var PW : PlayerWeapons; //Singleton object


function Start(){
	// Select the first weapon
	//playerActive = true;
	ActivateWeapon();
}
function Awake () {
	if(PW)
		Debug.LogError("Too many instances of PlayerWeapons! There should only be one per scene");
	PW = this;
	weaponCam = GameObject.FindWithTag("WeaponCamera");
	mainCam = GameObject.FindWithTag("MainCamera");
	player = GameObject.FindWithTag("Player");
	CM = player.GetComponent(CharacterMotorDB);
	controller = player.GetComponent(CharacterController);
	hidden = false;

	SetSensitivity();
}
function SetSensitivity () {
	transform.parent.GetComponent(MouseLookDBJS).sensitivityStandardX = sensitivity;
	if(inverted)
		sensitivity *= -1;
	this.GetComponent(MouseLookDBJS).sensitivityStandardY = sensitivity;
	sensitivity = Mathf.Abs(sensitivity);

}

function LateUpdate(){
	if(!playerActive)
		return;
	if(InputDB.GetButtonDown ("Fire1") && canKickback){
		canKickback = false;
	} else if(InputDB.GetButtonUp("Fire1")){
		canKickback = true;
		gameObject.BroadcastMessage("ReleaseFire", 1, SendMessageOptions.DontRequireReceiver); 
	}
	if(weapons[selectedWeapon] != null)
		if (/*!InputDB.GetButton ("Fire1") || */Time.time > weapons[selectedWeapon].GetComponent(GunScript).nextFireTime){
			BroadcastMessage("Cooldown");
		}
	if(InputDB.GetButtonUp("Aim")){
		gameObject.SendMessageUpwards("ReleaseFire", 2, SendMessageOptions.DontRequireReceiver);
	}
}

function Update(){
	if(!playerActive)
		return;
	
	/************************Interact****************************/
	if(interactDistance >0){
		//Set up ray
		var ray : Ray;
		var hit : RaycastHit;
		ray = Camera.main.ScreenPointToRay (Vector3(Screen.width/2.0,Screen.height/2.0,0));
		if(Physics.Raycast(ray,hit, interactDistance, interactMask)) {
			//We hit something new
			if(lastHit != hit.transform){
				//Last object isn't still highlighted
				if(lastHit)
					lastHit.SendMessage("HighlightOff", SendMessageOptions.DontRequireReceiver);
				//New one is
				lastHit = hit.transform;
				lastHit.SendMessage("HighlightOn", SendMessageOptions.DontRequireReceiver);
			}
		} else if(lastHit!=null){
			//We hit nothing, but still have a object highlighted, so unhighlight it
			lastHit.SendMessage("HighlightOff", SendMessageOptions.DontRequireReceiver);
			lastHit = null;
		}
		
		//Interact
		if(InputDB.GetButtonDown ("Interact") && lastHit!=null){
			lastHit.SendMessage("Interact", this.gameObject, SendMessageOptions.DontRequireReceiver);
		}
	}
	/**********************Fire & Reload******************************/
		
	// Did the user press fire?
	if (InputDB.GetButton ("Fire1") && (autoFire || charge) && canFire){
		transform.root.BroadcastMessage("Fire", SendMessageOptions.DontRequireReceiver);
	} else if(InputDB.GetButtonDown ("Fire1") && canFire){
		transform.root.BroadcastMessage("Fire", SendMessageOptions.DontRequireReceiver);
	} 	
	if (InputDB.GetButton ("Fire2") && canFire && (autoFire || charge)){
		BroadcastMessage("Fire2", SendMessageOptions.DontRequireReceiver);
	} else if(InputDB.GetButtonDown ("Fire2") && canFire){
		BroadcastMessage("Fire2", SendMessageOptions.DontRequireReceiver);
	} 	
	
	if (InputDB.GetButtonDown("Reload")){
		BroadcastMessage("Reload", SendMessageOptions.DontRequireReceiver);
	}
		
	/*************************Weapon Switching***************************/
	
	if(!AimMode.canSwitchWeaponAim || hidden || !canSwitchWeapon || Avoidance.collided){
		return;
	}
		
	if (InputDB.GetButtonDown("SelectWeapon")){ 
		var temp : int = WeaponSelector.selectedWeapon;
		if(weapons.length > temp && (selectedWeapon != temp || weapons[selectedWeapon] == null) && temp >= 0){
			if(weapons[temp] != null){
				if(!weapons[temp].gameObject.GetComponent(WeaponInfo).locked){
					SelectWeapon(temp);
					selectedWeapon = temp;
					displayMessage = false;
				} else {
					SlotEmptyMessage(temp+1);
				}
			} else {
				SlotEmptyMessage(temp+1);
			}
		}
	}
			
}

function SelectWeapon(index : int){
	var allNull : boolean = true;
	for (var i : int=0 ;i<weapons.length; i++)	{
		if (i != index && weapons[i] != null){
			weapons[i].gameObject.BroadcastMessage("DeselectWeapon");
			allNull = false;
		}
	}
	if(allNull){
		ActivateWeapon();
	}
}

function ActivateWeapon(){
	if(hidden)
		return;
	if(weapons[selectedWeapon] != null){
		weapons[selectedWeapon].BroadcastMessage("SelectWeapon");
	}
}

function FullAuto(){
	autoFire = true;
}

function SemiAuto(){
	autoFire = false;
}

function Charge(){
	charge = true;
}

function NoCharge(){
	charge = false;
}

function DeactivateWeapons(){
	for (var i : int=0 ;i<weapons.length; i++){
		if(weapons[i] != null)
			weapons[i].gameObject.BroadcastMessage("DeselectWeapon");
	}
}

function SetWeapon(gun : GameObject, element : int){
	weapons[element] = gun;
}

function SlotEmptyMessage( s : int){
	//display message
	displayMessage = true;
	emptyMessageTime = Time.time + displayTime;
	emptyMessage = "No Weapon Equipped in Slot " + s;
}

function OnGUI(){
	if(Time.time < emptyMessageTime && displayMessage) {
		GUI.BeginGroup(new Rect(Screen.width/2 - 120, Screen.height - 60,240,60), "");
		GUI.Box(new Rect(0,0,240,60), "");
		GUI.Label(new Rect(20,20,200,20),emptyMessage);
		GUI.EndGroup();
	} else {
		displayMessage = false;
	}
}

//Hides Player's weapon, with put away animation
static function HideWeapon () {
	hidden = true;
	if(PW.weapons[PW.selectedWeapon] != null)
		PW.weapons[PW.selectedWeapon].gameObject.BroadcastMessage("DeselectWeapon");
	SmartCrosshair.crosshair = true;
}

//Hides Player's weapon instantly
static function HideWeaponInstant() {
	hidden = true;
	if(PW.weapons[PW.selectedWeapon] != null)
		PW.weapons[PW.selectedWeapon].gameObject.BroadcastMessage("DeselectInstant");
	SmartCrosshair.crosshair = true;
}

//Unhides Player's weapon
static function ShowWeapon() {
	hidden = false;
	if(PW.weapons[PW.selectedWeapon] != null)
		PW.weapons[PW.selectedWeapon].gameObject.BroadcastMessage("SelectWeapon");
}

static function HasEquipped() : int {
	var num : int = 0;
	for(var i : int = 0; i < PW.weapons.length; i++){
		if(PW.weapons[i] != null)
			num++;
	}
	return num;
}