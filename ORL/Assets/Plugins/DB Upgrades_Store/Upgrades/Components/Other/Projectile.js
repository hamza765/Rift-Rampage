var val : Rigidbody;
private var cache: Rigidbody;
private var applied : boolean = false;


function Apply (gScript : GunScript) {
	cache = gScript.projectile;
	gScript.projectile = val;
}
function Remove (gScript : GunScript) {
	gScript.projectile = cache;
}