var val : int;
private var cache: int;
private var applied : boolean = false;

function Apply (gscript : GunScript) {
	cache = val-gscript.penetrateVal;
	gscript.penetrateVal += cache;
}
function Remove (gscript : GunScript) {
	gscript.penetrateVal -= cache;
}