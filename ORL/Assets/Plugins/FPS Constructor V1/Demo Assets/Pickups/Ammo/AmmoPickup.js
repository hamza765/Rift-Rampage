#pragma strict
var amount : int;
var target : GunScript;
private var wp : GunScript;
var delay : float;
private var nextTime : float = 0;
var limited : boolean;
var limit : int;
private var removed : boolean = false;
var destroyAtLimit : boolean = false;

//Called via message
//Adds ammo to player
function Interact () {
	if(Time.time > nextTime && (limit || !limited)){ //if it has been long enough, and we are either not past our limit or not limited
		nextTime = Time.time + delay; //set next use time
		if(target == null){ //if there isn't a target, use currently equipped weapon
			wp = PlayerWeapons.PW.weapons[PlayerWeapons.PW.selectedWeapon].GetComponent(GunScript); //currently equipped weapon	
		} else { //otherwise use target
			wp = target;
		}
		if(wp.clips < wp.maxClips){ //if ammo isn't already full
			wp.clips = Mathf.Clamp(wp.clips+amount, wp.clips, wp.maxClips); //add up to max
			if(GetComponent.<AudioSource>())
				GetComponent.<AudioSource>().Play(); //play sound
			removed = true; //decrement limit
		}
		wp.ApplyToSharedAmmo();
		
		if(wp.secondaryWeapon != null)
			wp = wp.secondaryWeapon;
		if(wp.clips < wp.maxClips){ //if ammo isn't already full
			wp.clips = Mathf.Clamp(wp.clips+amount, wp.clips, wp.maxClips); //add up to max
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
			removed = true;
		}
		wp.ApplyToSharedAmmo();
		
		if(removed){
			limit--;
			removed = false;
		}
		
		if(limit <= 0 && destroyAtLimit){
			Destroy(gameObject);
		}
	}
}
