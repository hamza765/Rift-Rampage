/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/

@CustomEditor (UseEffects)
class UseEffectsEditor extends Editor {
	
	var manager : EffectsManager;
	var prevIndex : int;
	
	function OnInspectorGUI() {
		manager = FindObjectOfType(EffectsManager);
		if(manager != null){
			if(manager.setNameArray != null){
				if(manager.setArray[0] != null){
					prevIndex = target.setIndex;
					target.setIndex = EditorGUILayout.Popup(target.setIndex, manager.setNameArray);
					if(prevIndex != target.setIndex) {
						// set all colliders of the same name to use the same set.
						var colliders : Collider[] = FindObjectsOfType(Collider);
						for(var c:Collider in colliders) {
							if(c.name == target.transform.name) {
								if(c.GetComponent(UseEffects)) {
									c.GetComponent(UseEffects).setIndex = target.setIndex;
								}
							}
						}
						prevIndex = target.setIndex;
					}
				}else{
					EditorGUILayout.LabelField("No sets exist", "");
				}
			}
		}
		if (GUI.changed)
			EditorUtility.SetDirty(target);
	}
}