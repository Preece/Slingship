#pragma strict

var targets : Array;
var boundingBoxPadding : float = 2.0;
var minimumOrthographicSize : float = 8.0;
var zoomSpeed : float = 1;

var gameCamera : Camera;

var ship : GameObject;
var planets : GameObject[];

function Awake() {

}

function Start () {
	targets = new Array();
	
	planets = GameObject.FindGameObjectsWithTag("Planet");
	targets.AddRange(planets);
	
	ship = GameObject.FindGameObjectWithTag("Ship");
	targets.Add(ship);
}

function Update () {
	
}

function LateUpdate() {
	var boundingBox = CalculateTargetsBoundingBox();
    gameCamera.transform.position = CalculateCameraPosition(boundingBox);
    gameCamera.orthographicSize = CalculateOrthographicSize(boundingBox);
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
    var boundingBoxCenter = boundingBox.center;

    return new Vector3(boundingBoxCenter.x, boundingBoxCenter.y, gameCamera.transform.position.z);
}

function CalculateOrthographicSize(boundingBox : Rect) {
    var orthographicSize = gameCamera.orthographicSize;
    var topRight = new Vector3(boundingBox.x + boundingBox.width, boundingBox.y, 0f);
    var topRightAsViewport = gameCamera.WorldToViewportPoint(topRight);

    if (topRightAsViewport.x >= topRightAsViewport.y)
        orthographicSize = Mathf.Abs(boundingBox.width) / gameCamera.aspect / 2f;
    else
        orthographicSize = Mathf.Abs(boundingBox.height) / 2f;

    return Mathf.Clamp(Mathf.Lerp(gameCamera.orthographicSize, orthographicSize, Time.deltaTime * zoomSpeed), minimumOrthographicSize, Mathf.Infinity);
}
