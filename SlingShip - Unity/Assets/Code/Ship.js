#pragma strict
 
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
	 	smallParticle.startLifetime = thrust * maxLifeSM ; 
	 	//smallParticle.startSpeed = maxSpeedSM /3 * thrust +  2 *maxSpeedSM /3; 
	 	bigParticle.startLifetime = thrust * maxLifeLG  ; 
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
	
	
	
	if(thrust < 0) thrust = 0;
	if(thrust > 1) thrust = 1;
	
	hMove = Input.GetAxisRaw("Horizontal"); 
	if(hMove != 0 && Input.GetKey("space")){
		thrust += thrustRate * Time.deltaTime; 
	}
	if(!Input.GetKey("up") && !Input.GetKey("down") && !Input.GetKey("space") && hMove == 0) {
		thrust = 0;
	}
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
 
 function FixedUpdate () {
 
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
             
             var thrustVec = transform.forward.normalized;
             thrustVec *= thrust * thrustPower;
             
             if(Input.GetKey("space")) {
             rigid.AddForce(hMove * thrustPower * transform.up); 
             	if(Input.GetKey ("up")) {
             		rigid.AddForce(thrustVec);
             	} 
             }
             
         }
     }
 }
 
 function Update() {
 	getInput(); 
	updateThrust(); 
	useFuel(); 
 }
