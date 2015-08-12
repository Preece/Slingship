﻿#pragma strict


var targets : Array;
var boundingBoxPadding : float = 2.0;
var minimumOrthographicSize : float = 8.0;
var zoomSpeed : float = 0.1;
var panSpeed : float = 1;

static var t : GameManager; 
var gameCamera : Camera;

var ship : GameObject;
var planets : GameObject[];

function Awake() {
	zoomSpeed = 1;
	panSpeed = 1;
}

function Start () {
	targets = new Array();
	t = this; 
	planets = GameObject.FindGameObjectsWithTag("Planet");
	targets.AddRange(planets);
	
	ship = GameObject.FindGameObjectWithTag("Ship");
	targets.Add(ship);
}

function Update () {

	targets.Clear();
	
	var lowestDist = Mathf.Infinity;
	var closestPlanet : GameObject;
	var dist = 0;
	
	for(var plane : GameObject in planets) {
		dist = Vector3.Distance(plane.transform.position, ship.transform.position);
		
		if(dist < lowestDist) {
			closestPlanet = plane;
			lowestDist = dist;
		}
	}
	
	targets.Add(closestPlanet);
	
	targets.Add(ship);
	
	if(Input.GetKeyDown(KeyCode.P)){
		ExplodeAndRestart(); 
	}

}

function LateUpdate() {
	var boundingBox = CalculateTargetsBoundingBox();
    gameCamera.transform.position = CalculateCameraPosition(boundingBox);
    gameCamera.orthographicSize = CalculateOrthographicSize(boundingBox);
}
function ExplodeAndRestart(){
	Instantiate(UIManager.t.explosionPrefab, Ship.t.transform.position, Quaternion.identity);
	Destroy(Ship.t.gameObject);
	Invoke("Restart",2); 
}
function Restart(){
	Application.LoadLevel(Application.loadedLevel); 
}


function CalculateTargetsBoundingBox() {
    var minX = Mathf.Infinity;
    var maxX = Mathf.NegativeInfinity;
    var minY = Mathf.Infinity;
    var maxY = Mathf.NegativeInfinity;

    for(var target : GameObject in targets) {
        var position = target.transform.position;

        minX = Mathf.Min(minX, position.x);
        minY = Mathf.Min(minY, position.y);
        maxX = Mathf.Max(maxX, position.x);
        maxY = Mathf.Max(maxY, position.y);
    }

    return Rect.MinMaxRect(minX - boundingBoxPadding, maxY + boundingBoxPadding, maxX + boundingBoxPadding, minY - boundingBoxPadding);
}

function CalculateCameraPosition(boundingBox : Rect) {
    var boundingBoxCenter = Vector2.Lerp(new Vector2(gameCamera.transform.position.x, gameCamera.transform.position.y), new Vector2(ship.transform.position.x, ship.transform.position.y), panSpeed * Time.deltaTime);

    return new Vector3(boundingBoxCenter.x, boundingBoxCenter.y, gameCamera.transform.position.z);
}

function CalculateOrthographicSize(boundingBox : Rect) {
return gameCamera.orthographicSize * (1+ Input.GetAxis("Mouse ScrollWheel") * -1); 
/*
    var orthographicSize = gameCamera.orthographicSize;
    var topRight = new Vector3(boundingBox.x + boundingBox.width, boundingBox.y, 0f);
    var topRightAsViewport = gameCamera.WorldToViewportPoint(topRight);

    if (topRightAsViewport.x >= topRightAsViewport.y)
        orthographicSize = Mathf.Abs(boundingBox.width) / gameCamera.aspect / 2f;
    else
        orthographicSize = Mathf.Abs(boundingBox.height) / 2f;

    return Mathf.Clamp(Mathf.Lerp(gameCamera.orthographicSize, orthographicSize, Time.deltaTime * zoomSpeed), minimumOrthographicSize, Mathf.Infinity);
    */
}
