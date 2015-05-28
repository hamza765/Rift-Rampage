#pragma strict
var leanAmount : float; //how far does the camera lean?
var leanRate : float; //how fast does the camera move when leaning? 

var leanRotate : float; //how much does the camera rotate when leaning
private var rotateRate : float; //how fast do we rotate;

private var startPos : float; //standard position of the camera
private var targetPos : float; //current target position
private var targetRot : float;
private var leaning : boolean = false; //are we currently leaning? 
private var left : boolean = false;
private var colliding : boolean = false;
var mask : LayerMask = ~(1<<PlayerWeapons.playerLayer + 1<<PlayerWeapons.ignorePlayerLayer);

var skinWidth : float = .2;

function Awake () {
	startPos = transform.localPosition.x;
	leaning = false; 
	rotateRate = leanRate * ( leanRotate / leanAmount);
}

function LateUpdate () {
	var maxLean : float;
	if(InputDB.GetButton("LeanRight") && PlayerWeapons.CM.grounded && !PlayerWeapons.CM.walking){
		if(!leaning || left){
			leaning = true;
			targetPos = startPos + leanAmount;
			targetRot = -leanRotate;
			left = false;
			colliding = false;
		}
	} else if (InputDB.GetButton("LeanLeft") && PlayerWeapons.CM.grounded && !PlayerWeapons.CM.walking){
		if(!leaning || !left){
			leaning = true;
			targetPos = startPos - leanAmount;
			targetRot = leanRotate;
			left = true;
			colliding = false;
		}
	} else if (leaning) {
		colliding = false;
		leaning = false;
		targetPos = startPos; 
	}
	
	if(left && leaning){
		maxLean = Check(-1*transform.right);
		targetPos = Mathf.Max(startPos - leanAmount, -maxLean+skinWidth);
	} else if (leaning) {
		maxLean = Check(transform.right);
		targetPos = Mathf.Min(startPos + leanAmount, maxLean-skinWidth);
	}
	
	//lerp into the lean
	transform.localPosition.x = Mathf.Lerp(transform.localPosition.x, targetPos,Time.deltaTime*leanRate*4);
	transform.localEulerAngles.z = Mathf.LerpAngle(0,targetRot,Mathf.Abs(transform.localPosition.x)/leanAmount);
	//transform.localEulerAngles.z = Mathf.Clamp(transform.localEulerAngles.z,-leanRotate,leanRotate);
	
	//clamp our position if necessary
	if(colliding)
		transform.localPosition.x = Mathf.Clamp(transform.localPosition.x,-maxLean, maxLean);
}

function Check(dir : Vector3) {
	var hit : RaycastHit;
	if(Physics.Raycast(transform.parent.position, dir,hit,leanAmount, mask)) {
		colliding = true;
		return hit.distance;
	} else {
		colliding = false;
		return leanAmount+skinWidth;
	}
}