#pragma strict

var gravity : float;
var orbitSpeed : float;

var sun : GameObject;
var ship : GameObject;

private var previousPosition : Vector3;

function Start () {
	sun = GameObject.FindGameObjectWithTag("Sun");
	ship = GameObject.FindGameObjectWithTag("Ship");
}

function Update () {

	
	
}

function FixedUpdate() {
	transform.RotateAround (sun.transform.position, Vector3.forward, orbitSpeed * Time.deltaTime);
	
}