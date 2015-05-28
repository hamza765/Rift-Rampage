var multiplier : float = 1.5;
private var cache: float;
private var applied : boolean = false;

function Apply (gscript : GunScript) {
	cache = gscript.kickbackAngle*(multiplier-1);
	gscript.kickbackAngle += cache;
}
function Remove (gscript : GunScript) {
	gscript.kickbackAngle -= cache;
}