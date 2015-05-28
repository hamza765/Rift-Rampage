/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/
@CustomEditor (SmartCrosshair)
class SmartCrosshairEditor extends Editor {
	function OnInspectorGUI() {
		
		
		target.useTexture = EditorGUILayout.Toggle("  Use Custom:", target.useTexture);

		if(target.useTexture){
			target.crosshairObj = EditorGUILayout.ObjectField(GUIContent("  Crosshair Object: ", "The object with the crosshair texture"), target.crosshairObj,  GameObject, true);
			target.crosshairSize = EditorGUILayout.FloatField(GUIContent("  Crosshair Size: ", "The base scale of the crosshair object"), target.crosshairSize);
			target.scale = EditorGUILayout.Toggle(GUIContent("  Scale Crosshair:", "Does the crosshair scale based on accuracy?"),target.scale);

			if(target.scale){
				target.minimumSize = EditorGUILayout.FloatField(GUIContent("  Min Size: ", "The minimum scale of custom crosshairs"), target.minimumSize);
				target.maximumSize = EditorGUILayout.FloatField(GUIContent("  Max Size: ", "The maximum scale of custom crosshairs"), target.maximumSize);
			}	
		} else {
		EditorGUILayout.BeginHorizontal();
		var temp1 : Vector2 = EditorGUILayout.Vector2Field("Crosshair Box Size: ", Vector2(target.length1, target.width1));
		EditorGUILayout.EndHorizontal();

		target.length1 = temp1.y;
		target.width1 = temp1.x;
			target.colorFoldout = EditorGUILayout.Foldout(target.colorFoldout, "Crosshair Color:");
			if(target.colorFoldout){
				target.colorDist = EditorGUILayout.FloatField(GUIContent("  Color Distance: ", "How far can an object be to cause color change? Negative value means infinite"), target.colorDist);
				target.crosshairTexture = EditorGUILayout.ObjectField(GUIContent("        Default: ", "This texture determines the color of the Smart Crosshair"), target.crosshairTexture,  Texture, false);
				target.friendTexture = EditorGUILayout.ObjectField(GUIContent("        Friend: ", "This texture determines the color of the Smart Crosshair when looking at friendly targets"), target.friendTexture,  Texture, false);
				target.foeTexture = EditorGUILayout.ObjectField(GUIContent("        Hostile: ", "This texture determines the color of the Smart Crosshair when looking at hostile targets"), target.foeTexture,  Texture, false);
				target.otherTexture = EditorGUILayout.ObjectField(GUIContent("        Other: ", "This texture determines the color of the Smart Crosshair when looking at 'other' targets"), target.otherTexture,  Texture, false);
	
			}
		}
		
		
		target.hitEffectFoldout = EditorGUILayout.Foldout(target.hitEffectFoldout, "Hit Indicator:");
			if(target.hitEffectFoldout){
				EditorGUILayout.BeginHorizontal();
				target.hitEffectTexture = EditorGUILayout.ObjectField(GUIContent("        Texture: ", "The texture to be displayed over the crosshair when an enemy is shot"), target.hitEffectTexture,  Texture, false);
				EditorGUILayout.BeginVertical();
				var temp : Vector2 = EditorGUILayout.Vector2Field("Size: ", Vector2(target.hitLength, target.hitWidth));
				target.hitLength = temp.y;
				target.hitWidth = temp.x;
				target.hitEffectOffset = EditorGUILayout.Vector2Field("Hit Effect Offset: ", target.hitEffectOffset);
				EditorGUILayout.EndVertical();
				EditorGUILayout.EndHorizontal();
				EditorGUILayout.Separator();
				target.hitSound = EditorGUILayout.ObjectField(GUIContent("        Sound: ", "The sound to play with the hit indicator"), target.hitSound,  AudioClip, false);
			}
	target.debug = EditorGUILayout.Toggle(GUIContent("  Debug Mode: ", "When Debug Mode is on the crosshair does not disappear when aiming"), target.debug);
	EditorGUILayout.Separator();
	if (GUI.changed)
			EditorUtility.SetDirty(target);
	}
}