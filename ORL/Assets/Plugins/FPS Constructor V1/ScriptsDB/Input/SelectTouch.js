#pragma strict
var input : InputItem;
var pos1 : Vector2; //position of button 1
var pos2 : Vector2; //position of button 2
var dimensions : Vector2; //size of buttons
private var selected : int = 0;

//was either button already being touched?
private var touched1 : boolean = false;
private var touched2 : boolean = false;

var numWeapons : int; //number of weapons in PlayerWeapons array

var label1 : String;
var label2 : String;

function UpdateInput () { 

	//are we touching one of the buttons this frame? Used in loop
	var touching1 : boolean = false;
	var touching2 : boolean = false;
	
	//flag variables for if touch 
	var t1 = false; 
	var t2 = false;
	
	if(Input.touches.Length > 0){
		for(var touch : Touch in Input.touches){
			touching1 = false;
			touching2 = false;
			//Is the touch within the bounds of wither button?
			touching1 = Within(touch.position, Rect(pos1.x, pos1.y, dimensions.x,dimensions.y));
			touching2 = Within(touch.position, Rect(pos2.x, pos2.y, dimensions.x,dimensions.y));
			if(touching1)
				t1 = true;
			if(touching2)
				t2 = true;
		}
	}

	if(!AimMode.canSwitchWeaponAim || !PlayerWeapons.canSwitchWeapon){
		return;
	}
	
    if(t1 && ! touched1) { //we hit the first button
   		CycleWeapon(-1); //previous weapon
   		WeaponSelector.selectedWeapon = selected;
   		touched1 = true;
   		input.down = true;
   	} else if (t2 && !touched2) { //we hit the second button
   		CycleWeapon(1); 
   		WeaponSelector.selectedWeapon = selected;   		
   		touched2 = true;
   		input.down = true;
    } else if (!(t1 || t2)) { //We are not touching
   		input.down = false;
   		touched1 = false;
   		touched2 = false;
    }
    
    //Wraparound on weapon array
    
    if (selected < 0){
    	selected = numWeapons-1;
    	WeaponSelector.selectedWeapon = selected;  
    } 
    if (selected >= numWeapons) {
    	selected = 0;
    	WeaponSelector.selectedWeapon = selected;  
    }
}

function CycleWeapon(dir : int) : int {
	selected += dir;
	if(selected >= PlayerWeapons.PW.weapons.length){
			selected = 0;
	} else if (selected <0){
		selected = PlayerWeapons.PW.weapons.length-1;
	}
	
	var temp : int = selected;
	
	for(var i : int = 0; i < PlayerWeapons.PW.weapons.length; i++){
		if(PlayerWeapons.PW.weapons[selected] != null){
			return selected;
		}
		selected+=dir;
		if(selected >= PlayerWeapons.PW.weapons.length){
			selected = 0;
		} else if(selected < 0){
			selected = PlayerWeapons.PW.weapons.length-1;
		}
	}
	return temp;
}

function LateUpdate () {
	selected = PlayerWeapons.PW.selectedWeapon;
}

function OnGUI () {
	//Just buttons for display, not acutally used
	GUI.Button(Rect(pos1.x, pos1.y, dimensions.x,dimensions.y),label1);
	GUI.Button(Rect(pos2.x, pos2.y, dimensions.x,dimensions.y),label2);
}

function Within (pos : Vector2, bounds : Rect) : boolean {	
	pos.y = Screen.height - pos.y;
	return (pos.x > bounds.x && pos.x < (bounds.x + bounds.width) && pos.y > bounds.y && pos.y < (bounds.y + bounds.height));
}