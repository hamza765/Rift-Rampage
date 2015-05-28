var val : boolean;
private var cache: boolean;
private var applied : boolean = false;

function Apply (gScript : GunScript) {
	cache = gScript.progressiveReload;
	gScript.progressiveReload = val;
}
function Remove (gScript : GunScript) {
	gScript.progressiveReload = cache;
}