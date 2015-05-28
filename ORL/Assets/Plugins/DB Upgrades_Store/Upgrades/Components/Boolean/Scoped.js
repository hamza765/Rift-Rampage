private var gscript : AimMode;
var val : boolean;
private var cache: boolean;
private var applied : boolean = false;

function Start () {
	gscript = this.transform.parent.GetComponent(GunScript).GetComponentInChildren(AimMode);
}
function Apply () {
	cache = gscript.scoped1;
	gscript.scoped = val;
	gscript.scoped1 = val;
}
function Remove () {
	gscript.scoped = cache;
	gscript.scoped1 = cache;
}