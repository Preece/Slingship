#pragma strict

var gravity : float;
var adjustedGrav : float;
var orbitSpeed : float;

var sun : GameObject;
var ship : GameObject;

private var previousPosition : Vector3;

function FixedUpdate() {
	transform.RotateAround (sun.transform.position, Vector3.forward, orbitSpeed * Time.deltaTime);
	
	var prevPosition = sun.transform.position;
	
	transform.RotateAround(sun.transform.position, Vector3.forward, orbitSpeed * Time.deltaTime);
	
	if(Vector3.Distance(transform.position, ship.transform.position) < 8 + transform.localScale.x) {
		adjustedGrav = gravity * 2;
	} else {
		adjustedGrav = gravity;
	}
}

 var theta_scale : float = 0.01f;        //Set lower to add more points
  var size : int; //Total number of points in circle
  var radius : float;
  var lineRenderer : LineRenderer;

 function Awake () {      
  	sun = GameObject.FindGameObjectWithTag("Sun");
	ship = GameObject.FindGameObjectWithTag("Ship"); 
	radius = Vector3.Distance(transform.position, sun.transform.position); 
    var sizeValue : float = (2.0f * Mathf.PI) / theta_scale; 
    size = Mathf.Floor(sizeValue);
    size++;
    lineRenderer = gameObject.AddComponent(LineRenderer); 
    lineRenderer.material = new Material(Shader.Find("Particles/Additive"));
    lineRenderer.SetWidth(0.1f, 0.1f); //thickness of line
    lineRenderer.SetVertexCount(size);      
  }

  function Update () {      
    var pos : Vector3;
    var theta : float = 0f;
    for(var i = 0; i < size; i++){          
      theta += (2.0f * Mathf.PI * theta_scale);         
      var x :float = radius * Mathf.Cos(theta);
      var y : float = radius * Mathf.Sin(theta);          
      x += sun.transform.position.x;
      y += sun.transform.position.y;
      pos = new Vector3(x, y, 0);
      lineRenderer.SetPosition(i, pos);
    }
  }
