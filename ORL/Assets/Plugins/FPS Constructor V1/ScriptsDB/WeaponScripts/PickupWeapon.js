/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
 For additional information contact us info@dastardlybanana.com.
*/

var hit : RaycastHit;
var ray : Ray;
//@HideInInspector
//static var selectedWeapon: GameObject;
//@HideInInspector
static var lastSelectedWeapon : GameObject;
//@HideInInspector
static var playerWeapons : PlayerWeapons;
var throwWeapons : boolean = true;
var throwForce : float;
var throwTorque : float;
var destroyPickups : boolean = false;
static var store : DBStoreController;
static var singleton : PickupWeapon;


function Start(){
	playerWeapons = PlayerWeapons.PW;
	store = FindObjectOfType(DBStoreController);
	singleton = this;
}

static function CheckWeapons (selectedWeapon : GameObject) : boolean {
	for (var i : int=0 ;i<playerWeapons.weapons.length; i++){
		if (playerWeapons.weapons[i] == selectedWeapon.GetComponent(SelectableWeapon).weapon){
			return true;
		}
	}
	return false;
}
	
//Drops weapon at given index in Weapons[]
static function DropWeapon (wep : int){
	//Weapon Drop
	
	//Ceck if we have a weapon to switch to
	var prevWeapon : int = -1;
	for(var i : int = wep-1; i >= 0; i--){
		if(playerWeapons.weapons[i] != null){
			prevWeapon = i;
			break;
		}
	}
	
	var nextWeapon : int = -1;
	if(prevWeapon == -1){
		for(i = wep+1; i < playerWeapons.weapons.length; i++){
			if(playerWeapons.weapons[i] != null){
				nextWeapon = i;
				break;
			}
		}
		prevWeapon = nextWeapon;
		
		if(nextWeapon == -1)
			return;
	}
		
	DropObject(wep, null);
	
	playerWeapons.selectedWeapon = prevWeapon;
	playerWeapons.SelectWeapon(prevWeapon);
}

//Swaps out currently selected for given one, dropping currently selected weapon
static function Pickup (selectedWeapon : GameObject) {
	if(GunScript.takingOut)
		return;
		
	var hasFlag : boolean = false;
		
	if(!PlayerWeapons.canSwapSameWeapon){
		for (var i : int=0 ;i<playerWeapons.weapons.length; i++){
			if(playerWeapons.weapons[i] == selectedWeapon.GetComponent(SelectableWeapon).weapon){
				return;
			}
		}
	}
	
	if(playerWeapons.weapons[playerWeapons.selectedWeapon] == selectedWeapon.GetComponent(SelectableWeapon).weapon){
		hasFlag = true;
	}
	var selectedWeaponInfo : WeaponInfo = selectedWeapon.GetComponent(SelectableWeapon).weapon.GetComponent(WeaponInfo);

	//Get applicable slot
	var theSlot : int;
	theSlot = store.autoEquipWeaponWithReplacement(selectedWeaponInfo,true);
	if(theSlot < 0 && !playerWeapons.weapons[playerWeapons.selectedWeapon] == null){
		return;
	}
	
	//We now own the weapon
	if(selectedWeaponInfo != null){
		selectedWeaponInfo.owned = true;
		selectedWeaponInfo.locked = false;
	}
	
	DropObject(theSlot, selectedWeapon);
	
	var gscript : GunScript;
	if(playerWeapons.weapons[playerWeapons.selectedWeapon] != null)
		gscript = playerWeapons.weapons[playerWeapons.selectedWeapon].GetComponent(GunScript).GetPrimaryGunScript();
	
	//Get new weapon
	if(hasFlag){
		gscript = playerWeapons.weapons[playerWeapons.selectedWeapon].GetComponent(GunScript).GetPrimaryGunScript();
		selectedWeapon.GetComponent(SelectableWeapon).Apply(gscript);
		playerWeapons.weapons[playerWeapons.selectedWeapon].BroadcastMessage("DeselectInstant");
		playerWeapons.ActivateWeapon();
		//playerWeapons.weapons[playerWeapons.selectedWeapon].BroadcastMessage("SelectWeapon");
	} else {
		playerWeapons.weapons[theSlot] = selectedWeapon.GetComponent(SelectableWeapon).weapon;
		playerWeapons.selectedWeapon = theSlot;
		gscript = playerWeapons.weapons[playerWeapons.selectedWeapon].GetComponent(GunScript).GetPrimaryGunScript();
		selectedWeapon.GetComponent(SelectableWeapon).Apply(gscript);
		playerWeapons.ActivateWeapon();
	} 
	
	if(singleton.destroyPickups)
		Destroy(selectedWeapon);
}


static function DropObject(index : int, selectedWeapon : GameObject) {
	//Deselect old weapon
	if(playerWeapons.weapons[playerWeapons.selectedWeapon]){
		if(selectedWeapon.GetComponent(SelectableWeapon) != null){
			if(playerWeapons.weapons[playerWeapons.selectedWeapon] != selectedWeapon.GetComponent(SelectableWeapon).weapon){
				playerWeapons.weapons[playerWeapons.selectedWeapon].gameObject.BroadcastMessage("DeselectWeapon");
			}
		}
	}
		
	//Weapon Drop
	if(playerWeapons.weapons[index] != null){
		var dropObj = playerWeapons.weapons[index].GetComponent(WeaponInfo).drops;
		if(dropObj != null){
			var temp : GameObject =Instantiate(dropObj, Vector3(singleton.transform.position.x,singleton.transform.position.y-1,singleton.transform.position.z), Quaternion.identity);
			temp.GetComponent(SelectableWeapon).weapon = playerWeapons.weapons[index];
			temp.GetComponent(SelectableWeapon).PopulateDrop();
			if(singleton.throwWeapons || selectedWeapon == null){
				temp.GetComponent(Rigidbody).AddForce(singleton.transform.forward*singleton.throwForce, ForceMode.Impulse);
				temp.GetComponent(Rigidbody).AddTorque(singleton.transform.forward*singleton.throwTorque, ForceMode.Impulse);
			} else {
				var pos : Vector3 = selectedWeapon.transform.position;
				temp.transform.position = Vector3(pos.x,pos.y+.4,pos.z);
			}
		}
	}
}