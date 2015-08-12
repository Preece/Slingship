﻿#pragma strict

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
		
		ship.GetComponent(Ship).modifyVelocity(vecLine * -200);
		
		gameObject.GetComponent(Rigidbody).velocity = vecLine * 1;
	};
	
	
	
	//Destroy(gameObject);
}