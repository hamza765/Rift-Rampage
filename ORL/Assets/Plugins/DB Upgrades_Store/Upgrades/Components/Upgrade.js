@HideInInspector var applied : boolean = false;
var owned : boolean = false;
var locked : boolean = false;
var upgradeType : String;
var upgradeName : String;
var description : String = "Upgrade Locked";
var lockedDescription : String;
var buyPrice : float;
var sellPrice: float;
var scriptID : int = 0;
var showInStore : boolean = true;

private var gScript : GunScript;

function Start () {
	Init();
}

function Init () {
	var gscripts = this.transform.parent.GetComponents.<GunScript>() as GunScript[];
	for(var q = 0; q < gscripts.length; q++){
		if(q == scriptID){
			gScript = gscripts[q];
		}
	}
}

function ApplyUpgrade () {
	var upgrades : Upgrade[];
	upgrades = this.transform.parent.GetComponentsInChildren.<Upgrade>();
	for(var i = 0; i < upgrades.length; i++){
		if(upgrades[i].upgradeType == upgradeType && upgrades[i] != this)
			upgrades[i].RemoveUpgrade();
	}
	if(applied)
		return;
	this.SendMessage("Apply", gScript);
	applied = true;
	this.SendMessageUpwards("ApplyUpgrade");
}

function ApplyUpgradeInstant () {
	if(applied)
		return;
	BroadcastMessage("TempInstant");
	ApplyUpgrade();
}

function RemoveUpgrade () {
	if(!applied)
		return;
	this.SendMessage("Remove", gScript);
	applied = false;
}

function RemoveUpgradeInstant () {
	if(!applied)
		return;
	this.SendMessage("TempInstant");
	RemoveUpgrade();
}
function DeleteUpgrade () {
	RemoveUpgrade();
	Destroy(gameObject);
}