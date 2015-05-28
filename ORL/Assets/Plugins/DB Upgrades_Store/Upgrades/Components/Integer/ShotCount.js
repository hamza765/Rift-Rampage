var val : int;
private var cache: int;
private var applied : boolean = false;

function Apply (gscript : GunScript) {
	cache = val-gscript.shotCount;
	gscript.shotCount += cache;
}
function Remove (gscript : GunScript) {
	gscript.shotCount -= cache;
}