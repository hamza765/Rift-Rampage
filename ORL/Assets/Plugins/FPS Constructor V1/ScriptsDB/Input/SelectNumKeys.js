#pragma strict
var input : InputItem;

function UpdateInput () {
	if (Input.GetKeyDown("1")){
		WeaponSelector.selectedWeapon = 0;
		input.down = true;	
	} else if (Input.GetKeyDown("2")){
		WeaponSelector.selectedWeapon = 1;
		input.down = true;	
	} else if (Input.GetKeyDown("3")){
		WeaponSelector.selectedWeapon = 2;
		input.down = true;	
	} else if (Input.GetKeyDown("4")){
		WeaponSelector.selectedWeapon = 3;
		input.down = true;	
	} else if (Input.GetKeyDown("5")){
		WeaponSelector.selectedWeapon = 4;
		input.down = true;	
	} else if (Input.GetKeyDown("6")){
		WeaponSelector.selectedWeapon = 5;
		input.down = true;	
	} else if (Input.GetKeyDown("7")){
		WeaponSelector.selectedWeapon = 6;
		input.down = true;	
	} else if (Input.GetKeyDown("8")){
		WeaponSelector.selectedWeapon = 7;
		input.down = true;	
	} else if (Input.GetKeyDown("9")){
		WeaponSelector.selectedWeapon = 8;
		input.down = true;	
	} else if (Input.GetKeyDown("0")){
		WeaponSelector.selectedWeapon = 9;
		input.down = true;	
	} else {
		input.down = false;
	}
}
