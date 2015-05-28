#pragma strict
var removeAnim : String;
var applyAnim : String;

function Apply (g : GunScript) {
	if(applyAnim != "" && g.gunActive)
		transform.parent.BroadcastMessage("PlayAnim",applyAnim);
}
function Remove (g : GunScript) {
	if(removeAnim != "" && g.gunActive)
		transform.parent.BroadcastMessage("PlayAnim",applyAnim);
}