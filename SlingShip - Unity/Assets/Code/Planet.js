#pragma strict

var gravity : float = 20.0;
var orbitSpeed : float = 10.0;

var sun : GameObject;

function Start () {
	sun = GameObject.FindGameObjectWithTag("Sun");
}

function Update () {
	
}

function FixedUpdate() {
	transform.RotateAround (sun.transform.position, Vector3.forward, orbitSpeed * Time.deltaTime);
}