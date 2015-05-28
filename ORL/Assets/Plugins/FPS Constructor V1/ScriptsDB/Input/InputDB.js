static var thisObj : InputDB;
var buttons : InputItem[];
var axes : InputItem[];
static var updated : boolean = false;

function Awake () {
	thisObj = this;
}

static function GetButtonDown (s : String) {
	/*if(!updated){
		thisObj.BroadcastMessage("UpdateInput");
		updated = true;
	}*/
	for(var i : int = 0; i < thisObj.buttons.length; i++){
		if(s == thisObj.buttons[i].id) {
			thisObj.buttons[i].BroadcastMessage("UpdateInput", SendMessageOptions.DontRequireReceiver);
			return thisObj.buttons[i].down;
		}
	}
	return false;
}

static function GetButton (s : String) {
	/*if(!updated){
		thisObj.BroadcastMessage("UpdateInput");
		updated = true;
	}*/
	for(var i : int = 0; i < thisObj.buttons.length; i++){
		if(s == thisObj.buttons[i].id) {
			thisObj.buttons[i].BroadcastMessage("UpdateInput", SendMessageOptions.DontRequireReceiver);
			return thisObj.buttons[i].got;
		}
	}
	return false;
}

static function GetButtonUp (s : String) {
	/*if(!updated){
		thisObj.BroadcastMessage("UpdateInput");
		updated = true;
	}*/
	for(var i : int = 0; i < thisObj.buttons.length; i++){
		if(s == thisObj.buttons[i].id) {
			thisObj.buttons[i].BroadcastMessage("UpdateInput", SendMessageOptions.DontRequireReceiver);
			return thisObj.buttons[i].up;
		}
	}
	return false;
}

static function GetAxis (s : String ) {
	/*if(!updated){
		thisObj.BroadcastMessage("UpdateInput");
		updated = true;
	}*/
	for(var i : int = 0; i < thisObj.axes.length; i++){
		if(s == thisObj.axes[i].id) {
			thisObj.axes[i].BroadcastMessage("UpdateInput", SendMessageOptions.DontRequireReceiver);
			return thisObj.axes[i].axis;
		}
	}
	return false;
}

static function ResetInputAxes () {
	for(var i : int = 0; i < thisObj.axes.length; i++){
		thisObj.axes[i].axis = 0;
	}
}

function LateUpdate() {
	updated = false;
}