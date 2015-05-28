//FPS Constructor - Weapons
//Copyright© Dastardly Banana Productions 2010
//This script, and all others contained within the Dastardly Banana Weapons Package, may not be shared or redistributed. They can be used in games, either commerical or non-commercial, as long as Dastardly Banana Productions is attributed in the credits.
//Permissions beyond the scope of this license may be available at mailto://info@dastardlybanana.com.

@CustomEditor (SlotInfo)

class SlotInfoEditor extends Editor {
	var player : PlayerWeapons;
	var foldoutState : boolean[];
	var tmpAllowed : int[];

	function Awake() {
		player = FindObjectOfType(PlayerWeapons) as PlayerWeapons;
		foldoutState = new boolean[player.weapons.length];

	}
	function OnEnable() {
	}
	function OnInspectorGUI () {	
		
		//If our allowed array is the wrong length, we must correct it
		if(player.weapons.length != target.allowed.length) {
			//Create an array of the proper length
			tmpAllowed = new int[player.weapons.length];
			//Now iterate through and copy values
			var upperBound : int = Mathf.Min(target.allowed.length, player.weapons.length);
			for (var j = 0; j < upperBound; j++) {
				tmpAllowed[j] = target.allowed[j];
			}
			target.allowed = tmpAllowed;
		}
		
		//If our slotName array is the wrong length, we must correct it
		if(player.weapons.length != target.slotName.length) {
			//Create an array of the proper length
			var tmpAllowedS = new String[player.weapons.length];
			//Now iterate through and copy values
			upperBound = Mathf.Min(target.slotName.length, player.weapons.length);
			for (j = 0; j < upperBound; j++) {
				tmpAllowedS[j] = target.slotName[j];
			}
			target.slotName = tmpAllowedS;
		}
		
		player = FindObjectOfType(PlayerWeapons) as PlayerWeapons;
		EditorGUIUtility.LookLikeInspector();
		for (var i: int ; i < player.weapons.length; i ++) {
			if(!target.slotName[i]){
				target.slotName[i] = "Slot " +(i+1);
			}
			target.slotName[i] = EditorGUILayout.TextField("Slot Name:", target.slotName[i]);
			foldoutState[i] = EditorGUILayout.Foldout(foldoutState[i], "Allowed Weapon Classes");
			if(foldoutState[i]) {
				for (var w : weaponClasses in weaponClasses.GetValues(weaponClasses) ) {
					if(w == weaponClasses.Null) break;
					var className = w.ToString().Replace("_", " " );
					var allowed : boolean = target.isWCAllowed(i,w);
					var toggleState : boolean;
					toggleState = GUILayout.Toggle(allowed, className);
					if( toggleState != allowed) {
						target.setAllowed(i,w, toggleState);
						toggleState = allowed;
					}
				}
			}
		}
		if (GUI.changed)
			EditorUtility.SetDirty(target);
	}
}
