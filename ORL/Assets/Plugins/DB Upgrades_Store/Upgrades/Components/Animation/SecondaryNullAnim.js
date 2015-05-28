var val : String;
private var cache: String;
private var applied : boolean = false;


function Apply (gScript : GunScript) {
	cache = gScript.GetComponentInChildren(GunChildAnimation).secondaryNullAnim;
	gScript.GetComponentInChildren(GunChildAnimation).secondaryNullAnim = val;
}
function Remove (gScript : GunScript) {
	gScript.GetComponentInChildren(GunChildAnimation).secondaryNullAnim = cache;
}