#pragma strict



var muzzleFlash : GameObject;
 var spawnPoint : Transform;
 var fullClip : int = 30;
 var bulletsLeft : int = 30;
 var waitTime = 1.5;
 var refireRate : float = 0.1;
 
 function ShotPoller () {
 
 while(true)
 {
     if(Input.GetButton("Fire1"))
     {
         Shoot();
         
         yield WaitForSeconds(refireRate);
     }
     if(Input.GetKeyDown("Fire2")){
         Reload();
     }
 
     yield;
 }
 }
 
 function Start(){
 
 StartCoroutine(ShotPoller());
 }
 
 
 
 if(Input.GetButtonDown("Fire2")){
     Reload();
 }
 
 
 function Shoot () {
 
 if(Input.GetButtonDown("Fire1")){
      if(bulletsLeft > 0 ){
             bulletsLeft -- ;
 
             Instantiate(muzzleFlash, spawnPoint.position, spawnPoint.rotation);
         }
 
 }
 }
 
 function Reload () {
 
 if(Input.GetButtonDown("Fire2")){
 yield WaitForSeconds(waitTime);
 bulletsLeft = fullClip;
 
 }
 };