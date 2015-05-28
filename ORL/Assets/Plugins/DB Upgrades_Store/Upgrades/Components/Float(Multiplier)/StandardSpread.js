var multiplier : float = 1.5;
private var cache: float;
private var applied : boolean = false;

function Apply (gscript : GunScript) {
	cache = gscript.standardSpread*(multiplier-1);
	gscript.standardSpread += cache;
}
function Remove (gscript : GunScript) {
	gscript.standardSpread -= cache;
}