﻿#pragma strict
 
 private var planets : GameObject[];
 
 private var thrust : float = 0;
 var thrustPower : float = 1; 
 var maxFuel : float = 100;
 var currentFuel : float = -1; 
 var fuelUsage: float = 2; 
 static var t : Ship;
 var thrustRate: float = 0.3f;
 
 var bigParticle : ParticleSystem ;
 var smallParticle : ParticleSystem ; 
 var anim : Animator; 
 
 private var maxSpeedSM : float;
 private var maxLifeLG : float;
 private var maxSpeedLG : float;
 private var maxLifeSM: float; 
 private var hasFuel: boolean = true; 
 private var rigid : Rigidbody; 
 private var thrustSound : AudioSource;
 private var hMove : float; 
 
 function updateThrust(){
 	anim.speed =  thrust; 
	 if(thrust > 0){
	 thrustSound.volume = thrust; 
	 	smallParticle.startLifetime = thrust * maxLifeSM; 
	 	//smallParticle.startSpeed = maxSpeedSM /3 * thrust +  2 *maxSpeedSM /3; 
	 	bigParticle.startLifetime = thrust * maxLifeLG; 
	 	//bigParticle.startSpeed = maxSpeedLG /3 * thrust + 2 *maxSpeedLG /3; 
 	}
 	else{
 	thrustSound.volume = Mathf.Lerp(thrustSound.volume, 0, Time.deltaTime * 10); 
 		smallParticle.startLifetime = 0; 
	 	//smallParticle.startSpeed =0; 
	 	bigParticle.startLifetime = 0; 
	 	//bigParticle.startSpeed = 0; 
 	}
 	if(hasFuel ){
 		
 	}
 	else{
 		
 	}
 }

 
 function getInput(){
 	rigid.drag = 0;
 	
 	if(Input.GetKey("space") && hasFuel) {
	 	if (Input.GetKey ("up")) {
	 		thrust += thrustRate * Time.deltaTime;
	 	} else if (Input.GetKey ("down")) {
			thrust += thrustRate * Time.deltaTime;
			rigid.drag = 2 * thrust;
		}
	}
	if(Input.GetKey("space") && !hasFuel){
		thrust = 0; 
	}
	if(Input.GetKeyUp("space")) {
		thrust = 0;
	}

	
	if(!Input.GetKey("up") && !Input.GetKey("down") && !Input.GetKey("space")) {
		thrust = 0;
	}
	if(thrust < 0) thrust = 0;
	if(thrust > 1) thrust = 1;
 }
 
  function useFuel(){
 	if(thrust > 0){
 		currentFuel -= fuelUsage * Time.deltaTime; 
 		if(currentFuel <= 0){
 			currentFuel = 0; 
 			hasFuel = false; 
 		}
 		UIManager.updateFuel(currentFuel / maxFuel); 
 	}
 }
 
 function Start () {
 t = this; 
 thrustSound = GetComponent(AudioSource); 
 	rigid = GetComponent(Rigidbody); 
     planets = GameObject.FindGameObjectsWithTag("Planet");
     maxSpeedSM = smallParticle.startSpeed;
     maxLifeSM = smallParticle.startLifetime; 
     maxSpeedLG = bigParticle.startSpeed; 
     maxLifeLG = bigParticle.startLifetime; 
     if(currentFuel == -1){
     	currentFuel = maxFuel;
     }
     UIManager.updateFuel(currentFuel / maxFuel);
 }
 
 function ClosestPlanet(){
 var index : int = 0; 
 var dist : float = 100000; 
 	for(var i : int = 0; i < planets.length; i++){
 	var tempDist : float = Vector3.Distance(transform.position, planets[i].transform.position);  
 		if( tempDist  < dist){
 			dist = tempDist;
 			index = i; 
 		} 
 	}
 	return planets[index]; 
 }
 function AddPlanetSpeed(thePlanet : Planet, dist : float ){
 	if(dist < 100){
 		transform.position += thePlanet.GetChange(); 
 		//rigid.AddForce(thePlanet.GetChange()); 
 	}
 }
 function GetPulled(){
 	var closetPlanet : GameObject = ClosestPlanet(); 
 	var toPlanet : Vector3 = closetPlanet.transform.position - transform.position; 
 	var mag = toPlanet.sqrMagnitude; 
 	var dir = toPlanet.normalized; 
 	rigid.AddForce(5 * dir * closetPlanet.GetComponent(Planet).gravity / mag, ForceMode.Acceleration); 
 	Debug.Log(closetPlanet); 
 	AddPlanetSpeed(closetPlanet.GetComponent(Planet), mag); 
 }
 
 function FixedUpdate () {
 
	 GetPulled(); 
	 transform.rotation = Quaternion.LookRotation(rigid.velocity);
	 var thrustVec = transform.forward;
     thrustVec *= thrust * thrustPower;
	 if(Input.GetKey("space")) {
	 	if(Input.GetKey ("up")) {
	    	rigid.AddForce(thrustVec);
	    } 
	 }
	 rigid.velocity = Vector3.ClampMagnitude(rigid.velocity, 15);
	 transform.position = new Vector3(transform.position.x, transform.position.y,0); 
 /*
 
     for(var planet : GameObject in planets) {
     
         var dist = Vector3.Distance(planet.transform.position, transform.position);
         
         if(dist < 1) dist = 1;
         
         var maxDist = planet.GetComponent(Planet).gravity * 50;
         
         if (dist <= maxDist) {
         
             var v = planet.transform.position - transform.position - ((planet.transform.position - transform.position).normalized * planet.transform.localScale.x);
             
             var force = 10 * ((v.normalized * planet.GetComponent(Planet).adjustedGrav) / (dist * dist));
             
             
             force.z = 0;
             
             rigid.AddForce(force);
             
             rigid.velocity = Vector3.ClampMagnitude(rigid.velocity, 30);

             
             transform.rotation = Quaternion.LookRotation(rigid.velocity);
             //transform.LookAt(transform.position + rigid.velocity); 
             
             
             var thrustVec = transform.forward.normalized;
             thrustVec *= thrust * thrustPower;
             
             if(Input.GetKey("space")) {
             //rigid.AddForce(hMove * thrustPower * transform.up); 
             //Debug.DrawRay(transform.position, transform.up); 
             	if(Input.GetKey ("up")) {
             		rigid.AddForce(thrustVec);
             	} 
             }
             
         }
     }*/
 }
 
 function Update() {
 	getInput(); 
	updateThrust(); 
	useFuel(); 
 }
