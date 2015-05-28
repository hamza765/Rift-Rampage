#pragma strict

enum axes {x, y, z} //which rotation axis should we use?
var axis : axes = axes.z;

enum directions {positive, negative} //should it be inverted?
var direction = directions.positive;

var input : InputItem;
var sensitivity : float;
var offset : float;
var buffer : float;

function UpdateInput () {
	if(axis == axes.x){
		input.axis = Input.acceleration.x;
	} else if (axis == axes.y) {
		input.axis = Input.acceleration.y;
	} else if (axis ==axes.z) {
		input.axis = Input.acceleration.z;
	}
	
	input.axis += offset;
	if(input.axis > 0) {
		input.axis = Mathf.Clamp(input.axis-buffer, 0, input.axis);
	} else {
		input.axis = Mathf.Clamp(input.axis+buffer, input.axis, 0);
	}
	input.axis *= sensitivity;
	if(direction == directions.negative)
		input.axis *= -1;
}
