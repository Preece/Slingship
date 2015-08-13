#pragma strict

var ship : GameObject;

function Start () {
	ship = GameObject.FindGameObjectWithTag("Ship");
	
	GameManager.t.AsteroidMesh(gameObject);
	
	gameObject.GetComponent(Rigidbody).angularVelocity = new Vector3(Random.Range(-1, 1), Random.Range(-1, 1), Random.Range(-1, 1));
	
	var scaleMondo = Random.Range(0.8, 1.6);
	
	transform.localScale = new Vector3(scaleMondo, scaleMondo, scaleMondo);
}

function Update () {

}

function OnCollisionEnter(collision: Collision) {
	
	//ship.GetComponent(Ship).modifyVelocity(collision.relativeVelocity * -100);
	
	for (var contact : ContactPoint in collision.contacts) {
		print(contact.thisCollider.name + " hit " + contact.otherCollider.name);
		Debug.Log(contact.point);
		
		var vecLine = transform.position - contact.point;
		
		vecLine.z = 0;
		
		gameObject.GetComponent(Rigidbody).velocity = vecLine * 3;
		
		if(collision.gameObject.GetInstanceID() == ship.GetInstanceID()) {
		
			ship.GetComponent(Ship).modifyVelocity(vecLine * -200);
			
			if(ship.GetComponent(Ship).invincible == false) {
				
				ship.GetComponent(Ship).currentFuel -= ship.GetComponent(Ship).maxFuel / 4;
				Debug.Log("Current fuel is now: " + ship.GetComponent(Ship).currentFuel);
				
				ship.GetComponent(Ship).invincible = true;
				ship.GetComponent(Ship).invincibilityCounter = 0;
			}
			
			if(ship.GetComponent(Ship).currentFuel <= 0) {
				GameManager.t.ExplodeAndRestart();
			}
			
			
		}
		
		
	};
	
	
	
	//Destroy(gameObject);
}