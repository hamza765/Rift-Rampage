var multiplier : float = 1.5;
private var cache: float;
private var applied : boolean = false;

function Apply (gscript : GunScript) {
	cache = gscript.kickBackZ*(multiplier-1);
	gscript.kickBackZ += cache;
}
function Remove (gscript : GunScript) {
	gscript.kickBackZ -= cache;
}