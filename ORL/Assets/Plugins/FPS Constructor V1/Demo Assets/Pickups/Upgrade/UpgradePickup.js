#pragma strict
var apply : boolean = true;
var own : boolean = true;
var mustBeEquipped : boolean = true;
var upgrade : Upgrade;
var destroys : boolean = false;
private var nextTime : float = 0;
var delay : float = 1;
var limited : boolean;
var limit : int;

//Called via message
//Gives Upgrade
function Interact () {
	if(Time.time > nextTime && (limit || !limited) && (upgrade.transform.parent.GetComponent(GunScript).gunActive || !mustBeEquipped)){ //if it has been long enough, and we are either not past our limit or not limited
		nextTime = Time.time + delay; //set next time
		if((own && !upgrade.owned) || (apply && !upgrade.applied)){ //if the upgrade isn't already applied
			if(own)
				upgrade.owned = true;
			if(apply)
				upgrade.ApplyUpgrade();
			if(GetComponent.<AudioSource>()){
				var audioObj : GameObject = new GameObject("PickupSound");
				audioObj.transform.position = transform.position;
				audioObj.AddComponent(TimedObjectDestructorDB).timeOut = GetComponent.<AudioSource>().clip.length + .1;;
				var aO : AudioSource = audioObj.AddComponent(AudioSource); //play sound
				aO.clip = GetComponent.<AudioSource>().clip;
				aO.volume = GetComponent.<AudioSource>().volume;
				aO.pitch = GetComponent.<AudioSource>().pitch;
				aO.Play();
				aO.loop = false;
				aO.rolloffMode = AudioRolloffMode.Linear;
			}
			limit--; //decrement limit
		}
	}
	if(limit <= 0 && destroys)
		Destroy(gameObject);
}
