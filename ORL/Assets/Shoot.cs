using UnityEngine;
using System.Collections;
using Leap;



public class Shoot : MonoBehaviour 
{
	public Rigidbody projectile;

	public GameObject muzzleFlash;
	public bool auto = false;
	public bool ammo = true;
	public int ammoClip = 30;
	public int ammoNow = 30;

	//Frame frameOfGesture = gesture.Frame;
	Frame c = new Frame();
	RigidFinger a = new RigidFinger();
	FingerList b = new FingerList();
	//Frame frame = controller.frame();

	//Vector3 c = new GetBoneCenter(1);
	//Quaternion rot = new GetBoneRotation(1);

	void Start() 
	{
		Controller controller = new Controller ();
		//Gesture a = new Gesture (); 

	}

	void Update() 
	{

		if (Input.GetButtonDown ("Jump")) 
		{
			auto = !auto;
		}

		if (!ammo) 
		{
			if (auto && ammo) 
			{
				if (Input.GetButton ("Fire1")) 
				{
					Rigidbody clone;
					GameObject muzz;
					if (ammoNow > 0) 
					{
						clone = Instantiate (projectile, transform.position, transform.rotation) as Rigidbody;
						muzz = Instantiate (muzzleFlash, transform.position, transform.rotation) as GameObject;
						clone.velocity = transform.TransformDirection (Vector3.forward * 100);
						ammoNow--;
						if (ammoNow == 0)
							ammo = false;
					}
				}
			} 
			else if (!auto && ammo) 
			{
				if (Input.GetButtonDown ("Fire1")) 
				{
					Rigidbody clone;
					GameObject muzz;

					if (ammoNow > 0) {
						clone = Instantiate (projectile, transform.position, transform.rotation) as Rigidbody;
						muzz = Instantiate (muzzleFlash, transform.position, transform.rotation) as GameObject;
						clone.velocity = transform.TransformDirection (Vector3.forward * 100);
						ammoNow--;
						if (ammoNow == 0)
							ammo = false;
					}
				}
			}
		}
		if (Input.GetButtonDown ("Submit")) 
		{
			ammoNow = ammoClip;
			ammo = true;
		}

	}



}
