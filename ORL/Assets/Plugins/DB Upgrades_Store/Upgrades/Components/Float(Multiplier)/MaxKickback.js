var multiplier : float = 1.5;
private var cache: float;
private var applied : boolean = false;

function Apply (gscript : GunScript) {
	cache = gscript.maxKickback*(multiplier-1);
	gscript.maxKickback += cache;
}
function Remove (gscript : GunScript) {
	gscript.maxKickback -= cache;
}