/*
 FPS Constructor - Weapons
 Copyright� Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
 For additional information contact us info@dastardlybanana.com.
*/

private var selected : boolean = false;
var weapon : GameObject;
@HideInInspector
var WeaponInfo : WeaponInfo;
var isEquipped : boolean = false;
var ammo : int = 0;
//@HideInInspector
var upgradesApplied : boolean[];

function Start(){
	WeaponInfo = weapon.GetComponent("WeaponInfo") as WeaponInfo;
}

function Interact(){
	PickupWeapon.Pickup(this.gameObject);
}

function select(a : boolean){
	this.SendMessage("HighlightOn", SendMessageOptions.DontRequireReceiver);
	isEquipped = a;
}


//Apply any additional effects to the gunscript
function Apply (g : GunScript) {
	g.ammoLeft = ammo;
	if(!PlayerWeapons.saveUpgradesToDrops)
		return;
	for (var i : int = 0; i < WeaponInfo.upgrades.length; i++){
		if(i >= upgradesApplied.length){
			WeaponInfo.upgrades[i].RemoveUpgradeInstant();
			continue;
		}
		if(upgradesApplied[i]){
			WeaponInfo.upgrades[i].ApplyUpgradeInstant();
		} else {
			WeaponInfo.upgrades[i].RemoveUpgradeInstant();
		}
	} 
}

function PopulateDrop () {
	WeaponInfo = weapon.GetComponent("WeaponInfo") as WeaponInfo;
	ammo = WeaponInfo.gun.ammoLeft;
	
	if(!PlayerWeapons.saveUpgradesToDrops)
		return;
	upgradesApplied = new boolean[WeaponInfo.upgrades.length];
	for (var i : int = 0; i < WeaponInfo.upgrades.length; i++){
		upgradesApplied[i] = WeaponInfo.upgrades[i].applied;
	} 
}