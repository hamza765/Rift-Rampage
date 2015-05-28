private var gscript : GunScript;
var s : int;
private var script : GunScript;
private var cache: GunScript;
private var applied : boolean = false;

function Start () {
	var gscripts = this.transform.parent.GetComponents.<GunScript>();
	for(var q = 0; q < gscripts.length; q++){
		if(gscripts[q] != null && gscripts[q].isPrimaryWeapon){
			gscript = gscripts[q];
		}
		if(q == s){
			script = gscripts[q];
		}
	}
	cache = gscript.secondaryWeapon;
}
function Apply () {
	gscript.secondaryWeapon = script;
}
function Remove () {
	gscript.secondaryWeapon = cache;
}