var multiplier : float = 1.5;
private var cache: float;
private var applied : boolean = false;

function Apply (gscript : GunScript) {
	cache = gscript.firePitch*(multiplier-1);
	gscript.firePitch += cache;
}
function Remove (gscript : GunScript) {
	gscript.firePitch -= cache;
}