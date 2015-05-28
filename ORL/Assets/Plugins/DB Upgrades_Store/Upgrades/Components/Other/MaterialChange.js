class rendererChanged {
	var r : Renderer;
	var index : int;
	
	function rendererChanged (render1 : Renderer, num : int){
		r = render1;
		index = num;
	}
}

private var gscript : Renderer;
private var materialsChanged : rendererChanged[];
var startMat : Material;
var targetMat : Material;
private var name1 : String;
private var cache: float;
private var applied : boolean = false;

function Start () {
	findMaterials ();	
}


function Apply () {
	findMaterials ();
	applied = true;
	for(var i = 0; i< materialsChanged.length; i++){
		var renderer1 = materialsChanged[i].r;
		var tempArray : Material[] = new Material[renderer1.materials.length];
		for(var q = 0; q < renderer1.materials.length; q++){
			tempArray[q] = renderer1.materials[q];
		}	
		tempArray[materialsChanged[i].index] = targetMat;
		materialsChanged[i].r.materials = tempArray;
	}
	
}


function Remove () {
	applied = false;
	for(var i = 0; i< materialsChanged.length; i++){
		var renderer1 = materialsChanged[i].r;
		var tempArray : Material[] = new Material[renderer1.materials.length];
		for(var q = 0; q < renderer1.materials.length; q++){
			tempArray[q] = renderer1.materials[q];
		}	
		tempArray[materialsChanged[i].index] = startMat;
		materialsChanged[i].r.materials = tempArray;
	}
	
}
function findMaterials () {
	var gscripts : Renderer[] = this.transform.parent.GetComponentsInChildren.<Renderer>() as Renderer[];
	var temp = new Array();
	name1 = startMat.name + " (Instance)";
	
	for(var q = 0; q < gscripts.length; q++){		
		for(var w = 0; w < gscripts[q].materials.length; w++){
			if(gscripts[q].materials[w].name.Equals(name1)){
				var rc = new rendererChanged(gscripts[q], w);
				temp.Add(rc);
			}			
		}
	}
	materialsChanged = temp.ToBuiltin(rendererChanged);
}

function reapply (){
	if(applied){
		Remove();
		Apply();
	}
}