#pragma strict

var gravity : float;
var orbitSpeed : float;

var sun : GameObject;

function Start () {
	sun = GameObject.FindGameObjectWithTag("Sun");
}

function Update () {
	
}

function FixedUpdate() {
	transform.RotateAround (sun.transform.position, Vector3.forward, orbitSpeed * Time.deltaTime);
}