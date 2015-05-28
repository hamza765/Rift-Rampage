/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/
@CustomEditor (MovementValues)
class MovementValuesEditor extends Editor {
	function OnInspectorGUI() {
		if(target.CM == null){
			target.CM = target.gameObject.GetComponent("CharacterMotorDB");
		}
	
		target.defaultFoldout = EditorGUILayout.Foldout(target.defaultFoldout, "Standard Movement");
		if(target.defaultFoldout){
			EditorGUILayout.BeginVertical("textField");
			target.defaultForwardSpeed = EditorGUILayout.FloatField(GUIContent("  Forward Speed: ", "Speed in forward direction for normal movement"), target.defaultForwardSpeed);
			target.defaultSidewaysSpeed = EditorGUILayout.FloatField(GUIContent("  Sideways Speed: ", "Speed moving left or right for normal movement"), target.defaultSidewaysSpeed);
			target.defaultBackwardsSpeed = EditorGUILayout.FloatField(GUIContent("  Backwards Speed: ", "Speed moving left or right for normal movement"), target.defaultBackwardsSpeed);
			EditorGUILayout.EndVertical();
			EditorGUILayout.Separator();
		}

		target.crouchFoldout = EditorGUILayout.Foldout(target.crouchFoldout, "Crouched Movement");
		if(target.crouchFoldout){
			EditorGUILayout.BeginVertical("textField");
			target.maxCrouchSpeed = EditorGUILayout.FloatField(GUIContent("  Forward Speed: ", "Speed in forward direction while crouching"), target.maxCrouchSpeed);
			target.crouchSidewaysSpeed = EditorGUILayout.FloatField(GUIContent("  Sideways Speed: ", "Speed moving left or right while crouching"), target.crouchSidewaysSpeed);
			target.crouchBackwardsSpeed = EditorGUILayout.FloatField(GUIContent("  Backwards Speed: ", "Speed moving backwards while crouching"), target.crouchBackwardsSpeed);
			EditorGUILayout.EndVertical();
			EditorGUILayout.Separator();
		}
		
		target.proneFoldout = EditorGUILayout.Foldout(target.proneFoldout, "Prone Movement");
		if(target.proneFoldout){
			EditorGUILayout.BeginVertical("textField");
			target.maxProneSpeed = EditorGUILayout.FloatField(GUIContent("  Forward Speed: ", "Speed in forward direction while prone"), target.maxProneSpeed);
			target.proneSidewaysSpeed = EditorGUILayout.FloatField(GUIContent("  Sideways Speed: ", "Speed moving left or right while prone"), target.proneSidewaysSpeed);
			target.proneBackwardsSpeed = EditorGUILayout.FloatField(GUIContent("  Backwards Speed: ", "Speed moving backwards while prone"), target.proneBackwardsSpeed);
			EditorGUILayout.EndVertical();
			EditorGUILayout.Separator();
		}
		
		target.aimFoldout = EditorGUILayout.Foldout(target.aimFoldout, "Aiming Movement");
		if(target.aimFoldout){
			EditorGUILayout.BeginVertical("textField");
			target.maxAimSpeed = EditorGUILayout.FloatField(GUIContent("  Forward Speed: ", "Speed in forward direction while aiming"), target.maxAimSpeed);
			target.aimSidewaysSpeed = EditorGUILayout.FloatField(GUIContent("  Sideways Speed: ", "Speed moving left or right while aiming"), target.aimSidewaysSpeed);
			target.aimBackwardsSpeed = EditorGUILayout.FloatField(GUIContent("  Backwards Speed: ", "Speed moving backwards while aiming"), target.aimBackwardsSpeed);
			EditorGUILayout.EndVertical();
			EditorGUILayout.Separator();
		}
		
		target.sprintFoldout = EditorGUILayout.Foldout(target.sprintFoldout, "Sprint Movement");
		if(target.sprintFoldout){
			EditorGUILayout.BeginVertical("textField");
			target.maxSprintSpeed = EditorGUILayout.FloatField(GUIContent("  Forward Speed: ", "Speed in forward direction while sprinting"), target.maxSprintSpeed);
			target.minSprintSpeed = EditorGUILayout.FloatField(GUIContent("  Minimum Speed: ", "Minimum speed to remain sprinting"), target.minSprintSpeed);
			target.sprintSidewaysSpeed = EditorGUILayout.FloatField(GUIContent("  Sideways Speed: ", "Speed moving left or right while sprinting"), target.sprintSidewaysSpeed);
			EditorGUILayout.Separator();
			target.sprintDuration = EditorGUILayout.FloatField(GUIContent("  Sprint Duration: ", "How long can the player sprint (in seconds)?"), target.sprintDuration);
			target.sprintAddStand = EditorGUILayout.FloatField(GUIContent("  Standing Sprint Return: ", "How quickly does sprint return when standing?"), target.sprintAddStand);
			target.sprintAddWalk = EditorGUILayout.FloatField(GUIContent("  Walking Sprint Return: ", "How quickly does sprint return when walking?"), target.sprintAddWalk);
			target.sprintMin = EditorGUILayout.FloatField(GUIContent("  Minimum Sprint: ", "Minimum sprint value to sprint"), target.sprintMin);
			target.recoverDelay = EditorGUILayout.FloatField(GUIContent("  Recover Delay: ", "Time in seconds after sprinting until sprint begins returning"), target.recoverDelay);
			target.exhaustedDelay = EditorGUILayout.FloatField(GUIContent("  Recover Delay: ", "Time in seconds after sprinting to exhaustion until sprint begins returning"), target.exhaustedDelay);
			EditorGUILayout.EndVertical();
			EditorGUILayout.Separator();
		}
		
		target.jumpFoldout = EditorGUILayout.Foldout(target.jumpFoldout, "Jumping Movement");
		if(target.jumpFoldout){
			EditorGUILayout.BeginVertical("textField");
			target.CM.movement.gravity = EditorGUILayout.FloatField(GUIContent("  Gravity: ", "Gravity Factor"), target.CM.movement.gravity);
			target.CM.movement.maxFallSpeed = EditorGUILayout.FloatField(GUIContent("  Max Fall Speed: ", "Maximum fall speed of player"), target.CM.movement.maxFallSpeed);
			target.CM.movement.fallDamageStart = EditorGUILayout.FloatField(GUIContent("  Fall Damage Start: ", "Fall speed at which damage begins to be applied"), target.CM.movement.fallDamageStart);
			target.CM.movement.fallDamageEnd = EditorGUILayout.FloatField(GUIContent("  Fall Damage End: ", "Fall speed at which maximum damage is applied"), target.CM.movement.fallDamageEnd);
			target.CM.movement.fallDamageMax = EditorGUILayout.FloatField(GUIContent("  Max Fall Damage: ", "Fall Damage applied at end speed. Fall damage scales linearly toward this from start"), target.CM.movement.fallDamageMax);
			EditorGUILayout.EndVertical();
			EditorGUILayout.Separator();
		}
		if (GUI.changed)
			EditorUtility.SetDirty(target);
	}
}