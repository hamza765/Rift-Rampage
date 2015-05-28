#pragma strict
static var selectedWeapon : int; //this value must be changed to switch weapons.

function Awake() {
	selectedWeapon = 0;
}

function LateUpdate () {
	selectedWeapon = PlayerWeapons.PW.selectedWeapon;
}	