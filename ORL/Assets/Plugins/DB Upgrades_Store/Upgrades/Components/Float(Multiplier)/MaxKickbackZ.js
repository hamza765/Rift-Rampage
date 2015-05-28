var multiplier : float = 1.5;
private var cache: float;
private var applied : boolean = false;

function Apply (gscript : GunScript) {
	cache = gscript.maxZ*(multiplier-1);
	gscript.maxZ += cache;
}
function Remove (gscript : GunScript) {
	gscript.maxZ -= cache;
}