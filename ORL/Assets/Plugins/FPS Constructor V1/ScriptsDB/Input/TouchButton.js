#pragma strict
var input : InputItem;

var position : Vector2; //position of button
var dimensions : Vector2; //size of button
var label : String; //text in button
var toggle : boolean = false; //is this button a toggle?
@HideInInspector
var toggled : boolean = false; //are we currently toggled on?
var showInStore : boolean = false;
private var used : boolean = false;

private var touched : boolean = false; //had we already touched the button
private var touching : boolean = false; //are we currently touching the button
@HideInInspector
var curTouch : int = -1; //what touch id is this using?
var useUpdate : boolean = true;

function Update () {
	if(useUpdate)
		UpdateFunction();
}

function UpdateInput() {
	if(!useUpdate)
		UpdateFunction();
}

function UpdateFunction () { 	
	//are we touching the button this frame?
	if(Input.touches.Length > 0){
		for(var touch : Touch in Input.touches){ //for each touch
			//Is this touch within our button?
			touching = Within(touch.position, Rect(position.x, position.y, dimensions.x,dimensions.y));
			if(touching){
				curTouch = touch.fingerId; //save which touch we are using
				break;
			}
		}
	} else {
		touching = false;
	}
	
	if(toggle){ //Toggle button
		input.got = toggled;
		
		if(touching){
			if(!touched){ //first frame touching the button
				touched = true;
				
				input.up = toggled;
				toggled = !toggled; //invert the toggle
				input.down = toggled;
			} else {
				input.down = false;
				input.up = false;
			}
		} else {
			input.down = false;
			input.up = false;
			touched = false;
			curTouch = -1;
		}
		
	} else { //Normal Button
		if (touching){ //We are touching
    		input.got = true; //the button is down
    		input.up = false; //the button is not up
    	    	
    		if(!touched){// we hadn't already touched the button (first frame holding it)
				input.down = true; //the button was got
				touched = true; //we have touched	
			} else {
				input.down = false; //it isn't down because this isn't the first fram holding it
			}
		} else { //We are not touching
    		curTouch = -1;
    		if (touched) {
    			input.up = true; //if we were holding the button last fram, then up is true because this is the frame it was released
    		} else {
    			input.up = false;
    		}
	    		touched = false;
   		 		input.got = false;
    			input.down = false;
    	}
	}
}

function OnGUI () {
	if(!DBStoreController.inStore || showInStore)
		GUI.Button(Rect(position.x, position.y, dimensions.x,dimensions.y),label);
}

function Within (pos : Vector2, bounds : Rect) : boolean {	
	pos.y = Screen.height - pos.y;
	return (pos.x > bounds.x && pos.x < (bounds.x + bounds.width) && pos.y > bounds.y && pos.y < (bounds.y + bounds.height));
}