#pragma strict
var key : String;
var input : InputItem;

function UpdateInput () {
	//Just get the values from Unity's input
	input.got = Input.GetButton(key);
	input.down = Input.GetButtonDown(key);
	input.up = Input.GetButtonUp(key);	
}
