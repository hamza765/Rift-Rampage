var val : boolean;
private var cache: boolean;
private var applied : boolean = false;

function Apply (gScript : GunScript) {
	cache = gScript.infiniteAmmo;
	gScript.infiniteAmmo = val;
}
function Remove (gScript : GunScript) {
	gScript.infiniteAmmo = cache;
}