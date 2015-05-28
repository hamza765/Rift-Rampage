@CustomEditor(WeaponClassIcons)

class WeaponClassIconsEditor extends Editor {

	function OnInspectorGUI() {
		EditorGUIUtility.LookLikeInspector();
		EditorGUILayout.BeginVertical();
			for(var w : weaponClasses in weaponClasses.GetValues(weaponClasses)){
				if(w == weaponClasses.Null) break; // hide the Null Weapon				
				target.weaponClassTextures [w] = EditorGUILayout.ObjectField(w.ToString().Replace("_", " " ) , target.weaponClassTextures[w],Texture, false);
			}
		EditorGUILayout.EndVertical();
	}
};;