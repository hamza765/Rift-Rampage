// Helper Class for configuring which weapon classes are allowed in which slots
var slotName : String[];;
var allowed : int[]; 

function clearAllowed(slot : int) {
	allowed[slot] = 0;
}

function setAllowed(slot : int, wc : weaponClasses, b : boolean) {

	if(b) {
		allowed[slot] = allowed[slot] | 1 << parseInt(wc);
	} else {
		allowed[slot] = allowed[slot] & ~ (1 << parseInt(wc));
	}
}


function isWCAllowed(slot: int, wc: weaponClasses):boolean {
	var ret: boolean = false;
	if(allowed[slot] &  1 << parseInt(wc))
		ret = true;
	return ret; 
}

function isWeaponAllowed(slot: int, w : WeaponInfo) : boolean {
	var ret: boolean = false;
	if(allowed[slot] & 1 << parseInt(w.weaponClass))
		ret = true;
	return ret; 	
}