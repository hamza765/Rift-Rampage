/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/

var isPrimary : boolean = true;

function MuzzleFlash(temp : boolean){
	BroadcastMessage("Activate", SendMessageOptions.DontRequireReceiver);
	if(temp != isPrimary)
		return;
	var emitters = new Array();
	emitters = this.GetComponentsInChildren(ParticleEmitter);
	for(var i : int = 0; i < emitters.length; i++){
		var p : ParticleEmitter = emitters[i] as ParticleEmitter;
		p.Emit();
	}
}