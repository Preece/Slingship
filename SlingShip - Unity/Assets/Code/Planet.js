#pragma strict

var gravity : float;
var adjustedGrav : float;
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

	var prevPosition = sun.transform.position;
	
	transform.RotateAround(sun.transform.position, Vector3.forward, orbitSpeed * Time.deltaTime);
	
	if(Vector3.Distance(transform.position, ship.transform.position) < 8 + transform.localScale.x) {
		adjustedGrav = gravity * 2;
	} else {
		adjustedGrav = gravity;
	}
	
}