/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/

// You can change the WeaponClasses enum to define your own Weapon Classes, 
// "Null" must be the last value in the enum and should be applied to one empty weapon object.
// The store will replace any underscores with a space in the display name. Sniper_Rifle will be displayed as "Sniper Rifle"

var drops : GameObject;
enum weaponClasses {Sidearm, Primary, Special, Null}; 
var owned: boolean = false;
var locked: boolean = false;
var weaponClass : weaponClasses;
@HideInInspector
var weaponClassName : String;
var gunDescription : String; 
var lockedDescription : String = "Weapon Locked";
var gunName : String;
var buyPrice : int;
var ammoPrice : int;
var sellPrice : float;
@HideInInspector
var sellPriceUpgraded: float;
var icon : Texture; //Icon should be X by Y pixels for store.
@HideInInspector
var upgradesApplied : boolean[];
@HideInInspector
var upgrades : Upgrade[];
private var storeUpgrades : Upgrade[];
var canBeSold : boolean = true; //Can this weapon be sold (it's often best to have one base weapon which cannot)
@HideInInspector
var gun: GunScript;
private var guns : GunScript[];

function Awake() {
	gun = getPrimaryGunscript();
	upgrades =Array(GetComponentsInChildren(Upgrade)).ToBuiltin(Upgrade);
	var tempArr = new Array();
	upgradesApplied = new boolean[upgrades.length];
	// Initialize array of applied;
	for(var i = 0; i < upgrades.length ; i ++) {
		upgradesApplied[i] = upgrades[i].applied;
		if(upgrades[i].showInStore){
			tempArr.Push(upgrades[i]);
		}
	}	
	storeUpgrades = tempArr.ToBuiltin(Upgrade);
	// Create Display string for gunClass 
	weaponClassName = weaponClass.ToString().Replace("_", " " );
}

function getPrimaryGunscript() {
	guns = Array(GetComponents(GunScript)).ToBuiltin(GunScript);
	for(var i : int = 0; i < guns.Length ; i++) {
		if (guns[i].isPrimaryWeapon) 
			return guns[i];
		}
	return null;
}

function getUpgrades() : Upgrade[] {
	return storeUpgrades;
}

function getUpgradesApplied() : boolean[] {
	return upgradesApplied;
}

function ApplyUpgrade() {
	var tmpPrice: float;
	tmpPrice = sellPrice;
	for (var i: int = 0; i < upgrades.length ; i++) {
		if(upgrades[i].owned) {
			tmpPrice += upgrades[i].sellPrice;
		}
	}
	sellPriceUpgraded=tmpPrice;
}

function updateApplied() {
	for(var i : int = 0; i < upgrades.length; i ++) {
		upgradesApplied[i] = upgrades[i].applied;
	}
}
