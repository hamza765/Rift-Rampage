#pragma strict
//This script handles touches. When the user touches the screen, the script determines what game object the player was trying to touch,
//and passes it the information about that touch

var mask : LayerMask;
var interactRange : float = 9;


function Update ()
{
	CheckForTouch();
}


function CheckForTouch()
{
	//Iterate through all touches
	for(var i=0; i<Input.touches.length; i++)
	{
		//If a touch just began
		if(Input.touches[i].phase == TouchPhase.Began)
		{
			var ray : Ray;
			var target : GameObject;
			
			ray = Camera.main.ScreenPointToRay(Input.touches[i].position);
		
			target = ReturnRaycastHit(ray);
		
			if(target != null)
			{
				target.SendMessage("Interact", SendMessageOptions.DontRequireReceiver);
			}
		
		}
	}
}

function ReturnRaycastHit(ray : Ray) : GameObject
{
	var hit : RaycastHit;
	//NOTE: May want to change to raycast all + use layer info
	if(Physics.Raycast(ray, hit, interactRange, mask))
	{
		return hit.transform.gameObject;
	}
	
	else 
	{
		return null;
	}
}