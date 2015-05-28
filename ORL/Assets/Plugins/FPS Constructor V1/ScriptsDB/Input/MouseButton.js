#pragma strict
var key : int;
var input : InputItem;

function UpdateInput () {
	//Just get the values from Unity's input
	input.got = Input.GetMouseButton(key);
	input.down = Input.GetMouseButtonDown(key);
	input.up = Input.GetMouseButtonUp(key);	
}
