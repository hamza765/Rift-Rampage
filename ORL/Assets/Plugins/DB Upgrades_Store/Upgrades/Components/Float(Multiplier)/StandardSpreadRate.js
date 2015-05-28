var multiplier : float = 1.5;
private var cache: float;
private var applied : boolean = false;

function Apply (gscript : GunScript) {
	cache = gscript.standardSpreadRate*(multiplier-1);
	gscript.standardSpreadRate += cache;
}
function Remove (gscript : GunScript) {
	gscript.standardSpreadRate -= cache;
}