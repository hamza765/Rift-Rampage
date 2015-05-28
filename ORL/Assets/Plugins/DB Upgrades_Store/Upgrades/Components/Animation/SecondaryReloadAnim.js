var val : String;
private var cache: String;
private var applied : boolean = false;


function Apply (gScript : GunScript) {
	cache = gScript.GetComponentInChildren(GunChildAnimation).secondaryReloadAnim;
	gScript.GetComponentInChildren(GunChildAnimation).secondaryReloadAnim = val;
}
function Remove (gScript : GunScript) {
	gScript.GetComponentInChildren(GunChildAnimation).secondaryReloadAnim = cache;
}