var val : String;
private var cache: String;
private var applied : boolean = false;


function Apply (gScript : GunScript) {
	cache = gScript.GetComponentInChildren(GunChildAnimation).secondaryFireAnim;
	gScript.GetComponentInChildren(GunChildAnimation).secondaryFireAnim = val;
}
function Remove (gScript : GunScript) {
	gScript.GetComponentInChildren(GunChildAnimation).secondaryFireAnim = cache;
}