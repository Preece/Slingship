#pragma strict

var ship : GameObject;

function Start () {
	ship = GameObject.FindGameObjectWithTag("Ship");
	
	GameManager.t.AsteroidMesh(gameObject);
}

function Update () {

}

function OnCollisionEnter(collision: Collision) {
	
	//ship.GetComponent(Ship).modifyVelocity(collision.relativeVelocity * -100);
	
	for (var contact : ContactPoint in collision.contacts) {
		print(contact.thisCollider.name + " hit " + contact.otherCollider.name);
		
		var vecLine = transform.position - contact.point;
		
		vecLine.z = 0;
		
		
		
		gameObject.GetComponent(Rigidbody).velocity = vecLine * 3;
		
		if(collision.gameObject.GetInstanceID() == ship.GetInstanceID()) {
		
			ship.GetComponent(Ship).modifyVelocity(vecLine * -200);
			ship.GetComponent(Ship).currentFuel -= ship.GetComponent(Ship).maxFuel / 4;
		
			Debug.Log(ship.GetComponent(Ship).currentFuel);
			
			if(ship.GetComponent(Ship).currentFuel <= 0) {
				GameManager.t.ExplodeAndRestart();
			}
		}
		
		
	};
	
	
	
	//Destroy(gameObject);
}