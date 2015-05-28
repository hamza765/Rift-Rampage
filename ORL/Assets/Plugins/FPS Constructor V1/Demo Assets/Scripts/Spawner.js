#pragma strict
var curWave : int = 0;
var waypoints : Waypoint[];
var waves : Wave[];
var spawners : Transform[];
var spawnDelay : float = 3;

var spawnTime : float = .2;
private var spawning : boolean = false;
private var nextSpawnTimme : float;


function Spawn () {
	var w : Wave;
	var cs : CubeSet;
	
	while(curWave < waves.length){	
		w = waves[curWave];
		for(var i : int = 0; i < w.cubeSets.length; i++){
			cs = w.cubeSets[i];
			cs.SpawnCS(spawners[i], waypoints[i], spawnTime);
		}
		while(EnemyMovement.enemies > 0){
			yield WaitForFixedUpdate;
		}
		curWave++;
		yield new WaitForSeconds(spawnDelay + 1*curWave);
		if(curWave >= waves.length)
			curWave = 0;
	}
}

function OnTriggerEnter (other : Collider) {
	//if(other.tag == "Player")
	if(!spawning){
		spawning = true;
		Spawn();
	}
}