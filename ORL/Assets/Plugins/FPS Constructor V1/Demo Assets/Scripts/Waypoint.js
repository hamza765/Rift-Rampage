#pragma strict
var nextWaypoint : Waypoint;
static var Waypoints : Waypoint[];

function Awake () {
	if(Waypoints == null){
		Waypoints = GameObject.FindObjectsOfType(Waypoint) as Waypoint[];
	}
}

function OnTriggerEnter (other : Collider) {
	var AI : EnemyMovement = other.transform.root.GetComponent(EnemyMovement);
	
	if(AI != null){
		AI.waypoint = nextWaypoint.transform;
	}
}

static function GetClosestWaypoint (pos : Vector3) : Transform {
	var dist : float = 100000000;
	var closest : Transform;
	var temp : float;
	for(var i : int = 0; i < Waypoints.length; i++){
		if(Waypoints[i]){
			temp = (Waypoints[i].transform.position-pos).magnitude;
			if(temp < dist){
				dist = temp;
				closest = Waypoints[i].transform;
			}
		}
	}
	return closest;
}