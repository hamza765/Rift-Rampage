var val : int;
private var cache: int;
private var applied : boolean = false;

function Apply (gscript : GunScript) {
	cache = val-gscript.maxClips;
	gscript.maxClips += cache;
}
function Remove (gscript : GunScript) {
	gscript.maxClips -= cache;
}