#pragma strict

	var _planet : Transform ;
	var _ship :Transform ;
	var _rend :Renderer ; 
	var _offset: float  = 0; 
	var _radius: float ; 
	var _speed :float ;

	public function Startup(thePlanet: Transform , theShip : Transform ,theRadius:  float ,modSpeed:  float ){
		_planet = thePlanet;
		_ship = theShip; 
		_radius = theRadius; 
		_speed = modSpeed; 
	}

	function Start(){
		_rend = GetComponentInChildren(Renderer); 
	}

	// Update is called once per frame
	function FixedUpdate () {
		transform.localScale = new Vector3( _radius, _radius, Vector3.Distance(_ship.position,_planet.position) /2); 
		transform.position = _planet.position; 
		transform.LookAt (_ship); 
		_offset -=  Time.fixedDeltaTime; 
		_rend.material.SetTextureOffset("_MainTex", new Vector2(0, _offset)); 
	}
