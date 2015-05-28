/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
 For additional information contact us info@dastardlybanana.com.
*/


@CustomEditor(EffectsAndPenetrationWizard)
class WizardEditor extends Editor{
	
	var cArray = new Array();
	var NameArrays : Array[];
	var Names = new Array();
	var boolArray : boolean[];
	var setArray : int[];
	var setArrayDummy : int[];
	var setNameArrayDummy : String[];
	var penetrationArray : int[];
	var script;
	var sScript = wizardScripts.UseEffects;
	var prevScript; //Used to see if the user changed which script they were viewing
	var penStyle : GUIStyle;
	var effectTypeLabel : String = "";
	var effectTypeName : String = "";

	function OnEnable() {
		target.effectsManager = GameObject.FindWithTag("Manager").GetComponent(EffectsManager);
		if(target.effectsManager == null) {
			Debug.Log("Effects Manager Script must be attached to the Manager Object");
		}
		setArrayDummy = new int[1];
		setNameArrayDummy = new String[1];
		setNameArrayDummy[0] = "None";
		penStyle = new GUIStyle();
		penStyle.alignment = 1;
	//	penStyle.normal.textColor = Color(.7, .7, .7, 1);
	}
	

	function SortAndScanColliders(){
		cArray.Clear();
		Names.Clear();
		var n : String;
		var nameIsInArray : boolean = false;
		cArray = FindObjectsOfType(Collider);
		for(var i=0; i< cArray.length; i++){
		nameIsInArray = false;
		n = cArray[i].name;
			for(var j=0; j < Names.length; j++){
				if(Names[j] == n){
					nameIsInArray = true;
					j = Names.length;
				}
			}
			if(!nameIsInArray){
				Names.Add(n);
			}
		}
		Names.Sort();		
		NameArrays = new Array(Names.length);
		boolArray = new boolean[Names.length];
		setArray = new int[Names.length];
		penetrationArray = new int[Names.length];
		for(i=0; i< cArray.length; i++){
			n = cArray[i].name;
			for(j=0; j < Names.length; j++){
				if(Names[j] == n){
					if(NameArrays[j] == null){
						NameArrays[j] = new Array();
					}
					NameArrays[j].Add(cArray[i]);
					if(cArray[i].GetComponent(script) != null){
						boolArray[j] = true;
					}
				}
			}
		}	
	}
	
	function OnInspectorGUI () {
		//EditorGUIUtility.LookLikeInspector();
		target.selectedScript = EditorGUILayout.EnumPopup("   Effect: ", target.selectedScript);
		sScript = target.selectedScript;	

		if(sScript == wizardScripts.UseEffects){
			if(target.effectsManager == null ) {
				EditorGUILayout.LabelField("   Effects Manager Script must be attached to Manager Object","");
				if(GUILayout.Button("Add Script Now")) {
					target.effectsManager = GameObject.FindWithTag("Manager").AddComponent(EffectsManager);
				}
				return;
			}
			effectTypeLabel = "Enable?";
			effectTypeName = "Effect Set";
			script = UseEffects;
		} else if(sScript == wizardScripts.BulletPenetration){
			script = BulletPenetration;
			effectTypeLabel = "Enable?";
			effectTypeName = "Resistance";
		}
		
		if(prevScript != script) {
			SortAndScanColliders();

			
		}

		if(Names.length > 0){
			EditorGUILayout.Separator();
			EditorGUILayout.BeginHorizontal();
			EditorGUILayout.LabelField("   Collider","" );
			EditorGUILayout.LabelField("",effectTypeLabel);
			EditorGUILayout.LabelField("",effectTypeName);
			EditorGUILayout.EndHorizontal();
			EditorGUILayout.Separator();
		}
		var changed : boolean = false;
		
		EditorGUILayout.BeginVertical("textField");

		for(var k=0; k < Names.length; k++){
			if(!NameArrays[k][0]) {
				Debug.Log("null, k = " + k);
				SortAndScanColliders();
				break;
			}		
			EditorGUILayout.BeginHorizontal();
			EditorGUILayout.LabelField("     " + Names[k],"");
			var prevBool : boolean = boolArray[k];
			boolArray[k] = EditorGUILayout.Toggle("", boolArray[k]);
			if(boolArray[k] != prevBool) changed = true;
			
			//Use Effects options
			if(script == UseEffects) {
				if(boolArray[k]) {
					if(!NameArrays[k][0].GetComponent(UseEffects)){
						// Selected but script not found on object
						changed=true;
//						ApplyChanges();
					}else{
						if(!setArray[k]){
							if(NameArrays[k][0].GetComponent(UseEffects)){
								setArray[k] = NameArrays[k][0].GetComponent(UseEffects).setIndex;
							}else{
								setArray[k] = 0;
							}
						}
						var prev : int = setArray[k];
						setArray[k] = EditorGUILayout.Popup("", setArray[k], target.effectsManager.setNameArray);
						if(setArray[k] != prev) changed = true;
					}			
				}else {
					// Effect not selected
					if(NameArrays[k][0].GetComponent(UseEffects)) {
						changed = true;
					}
					EditorGUILayout.Popup("", setArrayDummy[0], setNameArrayDummy);
				}
			}else if (script == BulletPenetration){
			    if(!penetrationArray[k]){	
        			if(NameArrays[k][0].GetComponent(BulletPenetration)){
         			 	penetrationArray[k] = NameArrays[k][0].GetComponent(BulletPenetration).penetrateValue;
         			}else{
          				penetrationArray[k] = 0;
         			}
       			 }
				prev = penetrationArray[k];
				if(boolArray[k]) {
					penetrationArray[k] = EditorGUILayout.IntField("", penetrationArray[k], penStyle);
					if(penetrationArray[k] != prev) changed = true;
				} else {
					var tmp : int = EditorGUILayout.IntField("",0, penStyle );
				}
			}
			EditorGUILayout.EndHorizontal();
			if (GUI.changed)
				EditorUtility.SetDirty(target);
		}
		
		if(changed) {
			ApplyChanges();
			changed=false;
		}
		
		EditorGUILayout.EndVertical();
		EditorGUILayout.BeginVertical();
		
//		if (GUILayout.Button(new GUIContent("Apply Changes", "Adds the selected script script to all Coliders selected, removes it from those that are unselected. Changes decal sets if applicable"), "miniButton")){
//			ApplyChanges();
//		}
		EditorGUILayout.EndVertical();
		prevScript = script;
	}
	
	function ApplyChanges() {
		for(i=0; i < Names.length; i++){
			if(boolArray[i]){
				for(j=0; j < NameArrays[i].length; j++){
					if(NameArrays[i][j].GetComponent(script) == null){
						NameArrays[i][j].gameObject.AddComponent(script);
					}
					//Script specific
					if(script == UseEffects){
						NameArrays[i][j].GetComponent(UseEffects).setIndex = setArray[i];
					}else if(script == BulletPenetration){ //Don't just use 'else' in case additional scripts are added to the wizard
						NameArrays[i][j].GetComponent(BulletPenetration).penetrateValue = penetrationArray[i];
					}
				}
			} else {
				for(j=0; j < NameArrays[i].length; j++){
					if(NameArrays[i][j].GetComponent(script) != null)
						DestroyImmediate(NameArrays[i][j].gameObject.GetComponent(script));
				}
			}
		}	
	}
}