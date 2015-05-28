var val : String;
private var cache: String;
private var applied : boolean = false;


function Apply (gScript : GunScript) {
	cache = gScript.GetComponentInChildren(GunChildAnimation).secondaryReloadEmpty;
	gScript.GetComponentInChildren(GunChildAnimation).secondaryReloadEmpty = val;
}
function Remove (gScript : GunScript) {
	gScript.GetComponentInChildren(GunChildAnimation).secondaryReloadEmpty = cache;
}