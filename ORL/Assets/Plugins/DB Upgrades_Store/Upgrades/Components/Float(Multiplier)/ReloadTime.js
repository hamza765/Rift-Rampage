var multiplier : float = 1.5;
private var cache: float;
private var applied : boolean = false;

function Apply (gscript : GunScript) {
	cache = gscript.reloadTime*(multiplier-1);
	gscript.reloadTime += cache;
}
function Remove (gscript : GunScript) {
	gscript.reloadTime -= cache;
}