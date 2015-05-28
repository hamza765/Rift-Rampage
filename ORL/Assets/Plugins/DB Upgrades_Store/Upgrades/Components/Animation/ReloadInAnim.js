var val : String;
private var cache: String;
private var applied : boolean = false;


function Apply (gScript : GunScript) {
	cache = gScript.GetComponentInChildren(GunChildAnimation).reloadIn;
	gScript.GetComponentInChildren(GunChildAnimation).reloadIn = val;
}
function Remove (gScript : GunScript) {
	gScript.GetComponentInChildren(GunChildAnimation).reloadIn = cache;
}