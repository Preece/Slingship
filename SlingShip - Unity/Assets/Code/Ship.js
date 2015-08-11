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
             
             Debug.Log(gameObject.GetComponent(Rigidbody).velocity.magnitude);
             
             gameObject.GetComponent(Rigidbody).velocity = Vector3.ClampMagnitude(gameObject.GetComponent(Rigidbody).velocity, 10);
             
             transform.rotation = Quaternion.LookRotation(gameObject.GetComponent(Rigidbody).velocity);
             
             
         }
     }
 }
 
 function Update() {
 
 	if (Input.GetKey ("up")) {
 		thrust += 1 * Time.deltaTime;
 	}
			
	if (Input.GetKey ("down")) {
		thrust -= 1 * Time.deltaTime;
	}
	
	if(thrust < -1) thrust = -1;
	if(thrust > 1) thrust = 1;
	
 }