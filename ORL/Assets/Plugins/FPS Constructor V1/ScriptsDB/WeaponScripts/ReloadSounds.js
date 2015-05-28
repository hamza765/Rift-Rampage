/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/

var sound1 : AudioClip;
var sound2 : AudioClip;
var sound3 : AudioClip;
var sound4 : AudioClip;
var sound5 : AudioClip;
var sound6 : AudioClip;

function play1(){
	GetComponent.<AudioSource>().clip = sound1;
	GetComponent.<AudioSource>().Play();
}

function play2(){
	GetComponent.<AudioSource>().clip = sound2;
	GetComponent.<AudioSource>().Play();
}

function play3(){
	GetComponent.<AudioSource>().clip = sound3;
	GetComponent.<AudioSource>().Play();
}

function play4(){
	GetComponent.<AudioSource>().clip = sound4;
	GetComponent.<AudioSource>().Play();
}

function play5(){
	GetComponent.<AudioSource>().clip = sound5;
	GetComponent.<AudioSource>().Play();
}

function play6(){
	GetComponent.<AudioSource>().clip = sound6;
	GetComponent.<AudioSource>().Play();
}