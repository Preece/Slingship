#pragma strict

var targets : Array;
var boundingBoxPadding : float = 2.0;
var minimumOrthographicSize : float = 8.0;
var zoomSpeed : float = 20.0;

var gameCamera : Camera;

function Awake() {
	//gameCamera = GetComponent(Camera);
}

function Start () {
	targets = new Array();
	targets.AddRange(GameObject.FindGameObjectsWithTag("Planet"));
	targets.Add(GameObject.FindGameObjectWithTag("Ship"));
	Debug.Log(targets.length);
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

/*

[SerializeField] 
    Transform[] targets;

    [SerializeField] 
    float boundingBoxPadding = 2f;

    [SerializeField]
    float minimumOrthographicSize = 8f;

    [SerializeField]
    float zoomSpeed = 20f;

    Camera camera;

    void Awake () 
    {
        camera = GetComponent<Camera>();
        camera.orthographic = true;
    }

    void LateUpdate()
    {
        Rect boundingBox = CalculateTargetsBoundingBox();
        transform.position = CalculateCameraPosition(boundingBox);
        camera.orthographicSize = CalculateOrthographicSize(boundingBox);
    }

    /// <summary>
    /// Calculates a bounding box that contains all the targets.
    /// </summary>
    /// <returns>A Rect containing all the targets.</returns>
    Rect CalculateTargetsBoundingBox()
    {
        float minX = Mathf.Infinity;
        float maxX = Mathf.NegativeInfinity;
        float minY = Mathf.Infinity;
        float maxY = Mathf.NegativeInfinity;

        foreach (Transform target in targets) {
            Vector3 position = target.position;

            minX = Mathf.Min(minX, position.x);
            minY = Mathf.Min(minY, position.y);
            maxX = Mathf.Max(maxX, position.x);
            maxY = Mathf.Max(maxY, position.y);
        }

        return Rect.MinMaxRect(minX - boundingBoxPadding, maxY + boundingBoxPadding, maxX + boundingBoxPadding, minY - boundingBoxPadding);
    }

    /// <summary>
    /// Calculates a camera position given the a bounding box containing all the targets.
    /// </summary>
    /// <param name="boundingBox">A Rect bounding box containg all targets.</param>
    /// <returns>A Vector3 in the center of the bounding box.</returns>
    Vector3 CalculateCameraPosition(Rect boundingBox)
    {
        Vector2 boundingBoxCenter = boundingBox.center;

        return new Vector3(boundingBoxCenter.x, boundingBoxCenter.y, camera.transform.position.z);
    }

    /// <summary>
    /// Calculates a new orthographic size for the camera based on the target bounding box.
    /// </summary>
    /// <param name="boundingBox">A Rect bounding box containg all targets.</param>
    /// <returns>A float for the orthographic size.</returns>
    float CalculateOrthographicSize(Rect boundingBox)
    {
        float orthographicSize = camera.orthographicSize;
        Vector3 topRight = new Vector3(boundingBox.x + boundingBox.width, boundingBox.y, 0f);
        Vector3 topRightAsViewport = camera.WorldToViewportPoint(topRight);

        if (topRightAsViewport.x >= topRightAsViewport.y)
            orthographicSize = Mathf.Abs(boundingBox.width) / camera.aspect / 2f;
        else
            orthographicSize = Mathf.Abs(boundingBox.height) / 2f;

        return Mathf.Clamp(Mathf.Lerp(camera.orthographicSize, orthographicSize, Time.deltaTime * zoomSpeed), minimumOrthographicSize, Mathf.Infinity);
    }
}

*/