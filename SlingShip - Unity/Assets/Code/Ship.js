#pragma strict
 
 private var planets : GameObject[];
 
 function Start () {
     planets = GameObject.FindGameObjectsWithTag("Planet");
 }
 
 function FixedUpdate () {
 
     for(var planet : GameObject in planets) {
     
         var dist = Vector3.Distance(planet.transform.position, transform.position);
         var maxDist = planet.GetComponent(Planet).gravity * 4;
         
         if (dist <= maxDist) {
         
             var v = planet.transform.position - transform.position;
             
             var force = 10 * ((v.normalized * planet.GetComponent(Planet).gravity) / (dist * dist));
             
             Debug.Log(force);
             
             force.z = 0;
             
             gameObject.GetComponent(Rigidbody).AddForce(force);
             
             gameObject.GetComponent(Rigidbody).velocity = Vector3.ClampMagnitude(gameObject.GetComponent(Rigidbody).velocity, 20);
             
             transform.rotation = Quaternion.LookRotation(gameObject.GetComponent(Rigidbody).velocity);
         }
     }
 }
 
 function Update() {
 
 }