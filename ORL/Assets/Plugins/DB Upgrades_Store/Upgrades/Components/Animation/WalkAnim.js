var val : String;
private var cache: String;
private var applied : boolean = false;


function Apply (gScript : GunScript) {
	cache = gScript.GetComponentInChildren(GunChildAnimation).walkAnimation;
	gScript.GetComponentInChildren(GunChildAnimation).walkAnimation = val;
}
function Remove (gScript : GunScript) {
	gScript.GetComponentInChildren(GunChildAnimation).walkAnimation = cache;
}