#pragma strict

/// MouseLook rotates the transform based on the mouse delta.

/// Minimum and Maximum values can be used to constrain the possible rotation



/// To make an FPS style character:

/// - Create a capsule.

/// - Add a rigid body to the capsule

/// - Add the MouseLook script to the capsule.

///   -> Set the mouse look to use LookX. (You want to only turn character but not tilt it)

/// - Add FPSWalker script to the capsule



/// - Create a camera. Make the camera a child of the capsule. Reset it's transform.

/// - Add a MouseLook script to the camera.

///   -> Set the mouse look to use LookY. (You want the camera to tilt up and down like a head. The character already turns.)

//[AddComponentMenu("Camera-Control/Mouse Look")]

enum RotationAxes { MouseX = 0, MouseY = 1 }

var axes : RotationAxes = RotationAxes.MouseX;

@HideInInspector

var sensitivityX : float = 15F;

@HideInInspector

var sensitivityY : float = 15F;

@HideInInspector

var sensitivityStandardX : float = 15F;

@HideInInspector

var sensitivityStandardY : float = 15F;

@HideInInspector

var offsetY : float = 0;

@HideInInspector

var offsetX : float = 0;

@HideInInspector

var totalOffsetY : float = 0;

@HideInInspector

var totalOffsetX : float = 0;

@HideInInspector

var resetSpeed : float = 1;

@HideInInspector

var resetDelay : float = 0;

@HideInInspector

var maxKickback : float = 0;

@HideInInspector

var xDecrease : float = 0;



var minimumX : float = -360F;

var maximumX : float = 360F;



var minimumY : float = -60F;

var maximumY : float = 60F;

var smooth : boolean = true;
var smoothFactor : float = 2;
var smoothIterations = new Array();
var iterations : int = 10;
	
private var tRotation : Quaternion;

var idleSway : float;

private var minStored : int;
private var maxStored : int;

//added by dw to pause camera when in store

@HideInInspector
static var freeze : boolean = false;

@HideInInspector
var individualFreeze : boolean = false;


@HideInInspector
var rotationX : float = 0F;
@HideInInspector
var rotationY : float = 0F;


@HideInInspector
var originalRotation : Quaternion;

private var temp : Quaternion[];
private var smoothRotation : Quaternion;


function Freeze() {

freeze = true;

}


function UnFreeze() {

freeze = false;

}

function SetRotation (target : Vector3) {
	rotationX = target.y;
	//rotationY = target.x;
}

function Update ()

{
	if(freeze|| !PlayerWeapons.canLook || individualFreeze) return;
	
	var xQuaternion : Quaternion;
	var yQuaternion : Quaternion;
	var offsetVal : float;

	if (axes == RotationAxes.MouseX)

	{

		rotationX += InputDB.GetAxis("Mouse X") * sensitivityX;
		
		var xDecrease : float;
		
		if(totalOffsetX > 0){
			xDecrease = Mathf.Clamp(resetSpeed*Time.deltaTime, 0, totalOffsetX);
		} else {
			xDecrease = Mathf.Clamp(resetSpeed*-Time.deltaTime, totalOffsetX, 0);
		}

		if(resetDelay > 0){

			xDecrease = 0;

			resetDelay = Mathf.Clamp(resetDelay-Time.deltaTime, 0, resetDelay);

		}
		
		if(Random.value < .5)
			offsetX *= -1;

		if((totalOffsetX < maxKickback && totalOffsetX >= 0) || (totalOffsetX > -maxKickback && totalOffsetX <= 0)){

			totalOffsetX += offsetX;

		}  else {
			
			//offsetX = 0;
			resetDelay *= .5f;

		}
	
		rotationX = ClampAngle (rotationX, minimumX, maximumX)+ offsetX - xDecrease;
	
		if((Input.GetAxis("Mouse X") * sensitivityX) < 0){
	
			totalOffsetX += Input.GetAxis("Mouse X") * sensitivityX;
	
		}
		
		rotationX+=Mathf.Sin(Time.time)*idleSway;
	
		totalOffsetX -= xDecrease;
	
		if(totalOffsetX < 0) 
			
			totalOffsetX = 0;
	
		xQuaternion = Quaternion.AngleAxis (rotationX, Vector3.up);
	
		tRotation = originalRotation * xQuaternion;
				
		offsetVal = Mathf.Clamp(totalOffsetX*smoothFactor,1, smoothFactor);
		
		if(smooth){
			transform.localRotation=Quaternion.Slerp(transform.localRotation,tRotation,Time.deltaTime*25/smoothFactor*offsetVal);
		} else {
			transform.localRotation = tRotation;
		}

	}
	
	else

	{

		rotationY += InputDB.GetAxis("Mouse Y") * sensitivityY;
		
		var yDecrease : float = Mathf.Clamp(resetSpeed*Time.deltaTime, 0, totalOffsetY);

		if(resetDelay > 0){

			yDecrease = 0;

			resetDelay = Mathf.Clamp(resetDelay-Time.deltaTime, 0, resetDelay);

		}

		if(totalOffsetY < maxKickback){

			totalOffsetY += offsetY;

		}  else {

			offsetY = 0;

			resetDelay *= .5f;

		}
	
		rotationY = ClampAngle (rotationY, minimumY, maximumY)+ offsetY - yDecrease;
	
		if((Input.GetAxis("Mouse Y") * sensitivityY) < 0){
	
			totalOffsetY += Input.GetAxis("Mouse Y") * sensitivityY;
	
		}
		
		rotationY+=Mathf.Sin(Time.time)*idleSway;
	
		totalOffsetY -= yDecrease;
	
		if(totalOffsetY < 0) 
			
			totalOffsetY = 0;
	
		yQuaternion = Quaternion.AngleAxis (rotationY, Vector3.left);
	
		tRotation = originalRotation * yQuaternion;
		
		offsetVal = Mathf.Clamp(totalOffsetY*smoothFactor,1, smoothFactor);
		
		if(smooth){
			transform.localEulerAngles.x=Quaternion.Slerp(transform.localRotation,tRotation,Time.deltaTime*25/smoothFactor*offsetVal).eulerAngles.x;
		} else {
			transform.localEulerAngles.x = tRotation.x;
		}

	}

	offsetY = 0;

	offsetX = 0;

}


function Start ()

{

// Make the rigid body not change rotation

	if (GetComponent.<Rigidbody>())

	GetComponent.<Rigidbody>().freezeRotation = true;

	originalRotation = transform.localRotation;

	sensitivityX = sensitivityStandardX;

	sensitivityY = sensitivityStandardY;
	
	if(smoothFactor <=1){
		smoothFactor = 1;
	}
		
}


static function ClampAngle (angle : float, min : float, max : float) : float

{

if (angle < -360F)

angle += 360F;

if (angle > 360F)

angle -= 360F;

return Mathf.Clamp (angle, min, max);

}


function Aiming(zoom : float) {

sensitivityX = sensitivityX/zoom;

sensitivityY = sensitivityY/zoom;

}

function StopAiming() {

sensitivityX = sensitivityStandardX;

sensitivityY = sensitivityStandardY;

}

function LockIt (min : int, max : int) {
	if (axes == RotationAxes.MouseX) {
		maxStored = maximumX;
		minStored = minimumX;
		maximumX = rotationX+max;
		minimumX = rotationX-min;
	} else {
		maxStored = maximumY;
		minStored = minimumY;
		maximumY = rotationY+max;
		minimumY = rotationY-min;
	}
}

function LockItSpecific (min : int, max : int) {
	if (axes == RotationAxes.MouseX) {
		maxStored = maximumX;
		minStored = minimumX;
		maximumX = max;
		minimumX = min;
	} else {
		maxStored = maximumY;
		minStored = minimumY;
		maximumY = max;
		minimumY = min;
	}
}

function UnlockIt () {
	if (axes == RotationAxes.MouseX) {
	 	maximumX = maxStored;
		minimumX = minStored;
	} else {
		maximumY = maxStored;
		minimumY = minStored;
	}
}

function UpdateIt(){
	rotationX = transform.localEulerAngles.y - originalRotation.eulerAngles.y;
	rotationY = transform.localEulerAngles.x- originalRotation.eulerAngles.x;
	totalOffsetX = 0;
}