/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/

@HideInInspector
var aim : PlayerSprint;

function Start(){
	aim = this.GetComponent(PlayerSprint);
}

function OnGUI(){
	if(!aim.weaponsInactive){
		return;
	}

	//temp is the percentage of sprint remaining
	var temp : float = AimMode.sprintNum/aim.values.sprintDuration;
	//baselength is the length of the bar at full sprint
	var baseLength : float = Screen.width*.5;
	//ypos is the y position of the sprint bar
	var yPos : float = Screen.height;
	yPos -= (Screen.height/10);
	
	//tempLength is the length of the sprint bar we want to display
	var tempLength : float = Mathf.Clamp(baseLength * (temp),baseLength *.03, baseLength);
	
	//only display the bar if we are sprinting, and don't display if sprint is full
	if(aim.sprinting || AimMode.sprintNum < aim.values.sprintDuration){
		//display the sprint bar - change this to modify the display.
		GUI.Box(Rect((Screen.width-baseLength)/2, yPos, tempLength, 10), "");
	}
}