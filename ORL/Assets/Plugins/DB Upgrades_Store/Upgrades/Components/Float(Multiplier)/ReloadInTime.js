var multiplier : float = 1.5;
private var cache: float;
private var applied : boolean = false;

function Apply (gscript : GunScript) {
	cache = gscript.reloadInTime*(multiplier-1);
	gscript.reloadInTime += cache;
}
function Remove (gscript : GunScript) {
	gscript.reloadInTime -= cache;
}