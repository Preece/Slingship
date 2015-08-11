#pragma strict
 
 private var planets : GameObject[];
 
 var thrust : float = 0;
 
 var bigParticle : ParticleSystem ;
 var smallParticle : ParticleSystem ; 
 var anim : Animator; 
 
 private var maxSpeedSM : float;
 private var maxLifeLG : float;
 private var maxSpeedLG : float;
 private var maxLifeSM: float; 
 
 function updateThrust(){
 Debug.Log(thrust); 
 anim.speed =  thrust; 
	 if(thrust > 0){
	 	smallParticle.startLifetime = thrust * maxLifeSM ; 
	 	//smallParticle.startSpeed = maxSpeedSM /3 * thrust +  2 *maxSpeedSM /3; 
	 	bigParticle.startLifetime = thrust * maxLifeLG  ; 
	 	//bigParticle.startSpeed = maxSpeedLG /3 * thrust + 2 *maxSpeedLG /3; 
 	}
 	else{
 		smallParticle.startLifetime = 0; 
	 	//smallParticle.startSpeed =0; 
	 	bigParticle.startLifetime = 0; 
	 	//bigParticle.startSpeed = 0; 
 	}
 }
 
 function Start () {
     planets = GameObject.FindGameObjectsWithTag("Planet");
     maxSpeedSM = smallParticle.startSpeed;
     maxLifeSM = smallParticle.startLifetime; 
     maxSpeedLG = bigParticle.startSpeed; 
     maxLifeLG = bigParticle.startLifetime; 
 }
 
 function FixedUpdate () {
 
     for(var planet : GameObject in planets) {
     
         var dist = Vector3.Distance(planet.transform.position, transform.position);
         
         if(dist < 1) dist = 1;
         
         var maxDist = planet.GetComponent(Planet).gravity * 50;
         
         if (dist <= maxDist) {
         
             var v = planet.transform.position - transform.position;
             
             var force = 10 * ((v.normalized * planet.GetComponent(Planet).gravity) / (dist * dist));
             
             force.z = 0;
             
             gameObject.GetComponent(Rigidbody).AddForce(force);
             
             
             gameObject.GetComponent(Rigidbody).velocity = Vector3.ClampMagnitude(gameObject.GetComponent(Rigidbody).velocity, 10);
             
             transform.rotation = Quaternion.LookRotation(gameObject.GetComponent(Rigidbody).velocity);
             
             var thrustVec = transform.forward.normalized;
             thrustVec *= thrust * 2;
             
             if(Input.GetKey("space")) {
             	if(Input.GetKey ("up")) {
             		gameObject.GetComponent(Rigidbody).AddForce(thrustVec);
             	} 
             }
             
         }
     }
 }
 
 function Update() {
 
 	gameObject.GetComponent(Rigidbody).drag = 0;
 	
 	if(Input.GetKey("space")) {
	 	if (Input.GetKey ("up")) {
	 		thrust += 0.8 * Time.deltaTime;
	 	} else if (Input.GetKey ("down")) {
			thrust += 0.8 * Time.deltaTime;
			gameObject.GetComponent(Rigidbody).drag = 2 * thrust;
		}
	}
	
	if(Input.GetKeyUp("space")) {
		thrust = 0;
	}
	
	if(!Input.GetKey("up") && !Input.GetKey("down") && !Input.GetKey("space")) {
		thrust = 0;
	}
	
	if(thrust < 0) thrust = 0;
	if(thrust > 1) thrust = 1;
	updateThrust(); 
 }