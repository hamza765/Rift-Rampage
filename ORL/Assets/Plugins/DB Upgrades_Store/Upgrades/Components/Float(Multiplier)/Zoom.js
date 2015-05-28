private var gscript : AimMode;
var multiplier : float = 1.5;
private var cache: float;
private var applied : boolean = false;

function Start () {
	gscript = this.transform.parent.GetComponent(GunScript).GetComponentInChildren(AimMode);
}
function Apply () {
	cache = gscript.zoomFactor1*(multiplier-1);
	gscript.zoomFactor1 += cache;
	gscript.zoomFactor = gscript.zoomFactor1;

}
function Remove () {
	gscript.zoomFactor1 -= cache;
	gscript.zoomFactor = gscript.zoomFactor1;
}