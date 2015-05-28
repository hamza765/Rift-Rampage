var multiplier : float = 1.5;
private var cache: float;
private var applied : boolean = false;

function Apply (gscript : GunScript) {
	cache = gscript.spDecRate*(multiplier-1);
	gscript.spDecRate += cache;
}
function Remove (gscript : GunScript) {
	gscript.spDecRate -= cache;
}