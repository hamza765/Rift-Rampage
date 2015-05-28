//This script stores values to be taken by CharacterMotorDB, to allow a simpler customEditor

var defaultForwardSpeed : float = 10;
var maxCrouchSpeed : float = 6;
var maxSprintSpeed : float = 13;
var minSprintSpeed : float = 10;
var maxAimSpeed : float = 4;
var maxProneSpeed : float = 4;

var defaultSidewaysSpeed : float = 10;
var sprintSidewaysSpeed : float = 15;
var crouchSidewaysSpeed : float = 6;
var aimSidewaysSpeed : float = 4;
var proneSidewaysSpeed : float = 2;

var defaultBackwardsSpeed : float = 10;
var crouchBackwardsSpeed : float = 6;
var aimBackwardsSpeed : float = 4;
var proneBackwardsSpeed : float = 2;

var sprintFoldout : boolean = false;
var crouchFoldout : boolean = false;
var defaultFoldout : boolean = false;
var proneFoldout : boolean = false;
var aimFoldout : boolean = false;
var jumpFoldout : boolean = false;

var CM : CharacterMotorDB;

var sprintDuration = 5; //how long can we sprint for?
var sprintAddStand : float = 1; //how quickly does sprint replenish when idle?
var sprintAddWalk : float = .3; //how quickly does sprint replenish when moving?
var sprintMin : float = 1; //What is the minimum value ofsprint at which we can begin sprinting?
var recoverDelay : float = .7;	//how much time after sprinting does it take to start recovering sprint?
var exhaustedDelay : float = 1; //how much time after sprinting to exhaustion does it take to start recovering sprint?

static var singleton : MovementValues;

function Awake(){
	singleton = this;
}