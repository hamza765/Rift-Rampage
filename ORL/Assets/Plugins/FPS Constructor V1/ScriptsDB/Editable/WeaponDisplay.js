/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
 For additional information contact us info@dastardlybanana.com.
*/

// Sample script to display weapon info when a weapon is selected.

private var display: boolean = false;
private var endTime : float;
private var weapon : GameObject;
private var WeaponInfo : WeaponInfo;

var displayTime : float = 2;

function Start(){
	WeaponInfo = GetComponent("WeaponInfo");
	display = false;
}
function Select() {
	display = true;
	endTime = Time.time + displayTime;
}

function OnGUI() {
	if(display && Time.time != 0.0) {
		if (Time.time > endTime) display = false;
		GUI.Box(Rect(Screen.width - 255,Screen.height-85,135,75), WeaponInfo.gunName + "\n" + WeaponInfo.gunDescription + "\n");
	}
}