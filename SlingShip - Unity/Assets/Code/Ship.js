#pragma strict
 
 private var planets : GameObject[];
 
 var thrust : float = 0;
 
 function Start () {
     planets = GameObject.FindGameObjectsWithTag("Planet");
 }
 
 function FixedUpdate () {
 
     for(var planet : GameObject in planets) {
     
         var dist = Vector3.Distance(planet.transform.position, transform.position);
         
         if(dist < 1) dist = 1;
         
         var maxDist = planet.GetComponent(Planet).gravity * 4;
         
         if (dist <= maxDist) {
         
             var v = planet.transform.position - transform.position;
             
             var force = 10 * ((v.normalized * planet.GetComponent(Planet).gravity) / (dist * dist));
             
             force.z = 0;
             
             gameObject.GetComponent(Rigidbody).AddForce(force);
             
             
             gameObject.GetComponent(Rigidbody).velocity = Vector3.ClampMagnitude(gameObject.GetComponent(Rigidbody).velocity, 10);
             
             transform.rotation = Quaternion.LookRotation(gameObject.GetComponent(Rigidbody).velocity);
             
             var thrustVec = transform.forward.normalized;
             thrustVec *= thrust * 2;
             
             Debug.Log(thrustVec);
             
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
	
 }