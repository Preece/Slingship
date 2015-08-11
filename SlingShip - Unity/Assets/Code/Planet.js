#pragma strict

var gravity : float = 20.0;
var rotationSpeed : float = 10.0;

var sun : GameObject;

function Start () {
	sun = GameObject.FindGameObjectWithTag("Sun");
}

function Update () {
	
}

function FixedUpdate() {
	transform.RotateAround (sun.transform.position, Vector3.forward, rotationSpeed * Time.deltaTime);
}