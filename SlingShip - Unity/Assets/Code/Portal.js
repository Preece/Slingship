#pragma strict

var nearSound : AudioSource;
var ship : Ship; 
var warpSound : GameObject;
var explosionSound : GameObject; 

function Start () {
	nearSound = GetComponent(AudioSource); 
	nearSound.volume = 0; 
	ship = Ship.t; 
}

function ModVolume(){
	var dist = Vector3.Distance(transform.position, ship.transform.position);
	dist = Mathf.Max(dist - 5,1); 
	dist = Mathf.Min(30, dist);  
	nearSound.volume = 1 - 1/dist; 
}

function Update () {
	ModVolume(); 
}
function EndTheUniverse(){
	Instantiate(warpSound);
	Invoke("BlowItAll",2); 
}

function BlowItAll(){
	BlowUpAllPlanets();
	BlowUpAllAsteroids(); 
	Instantiate(explosionSound); 
}
function BlowUpAllPlanets(){
	var toBlow = GetComponents(Planet);
	if(toBlow.length > 0){
		var i : int = Mathf.Floor(Random.Range(0, toBlow.length));
		Instantiate(UIManager.t.explosionPrefab, toBlow[i].transform.position, Quaternion.identity); 
		Destroy(toBlow[i].gameObject); 
		var delay = Random.Range(0,.3f);
		Invoke("BlowUpAllPlanets",delay); 
	}
}

function BlowUpAllAsteroids(){
	var toBlow = GetComponents(Asteroid);
	if(toBlow.length > 0){
		var i : int = Mathf.Floor(Random.Range(0, toBlow.length));
		Instantiate(UIManager.t.explosionPrefab, toBlow[i].transform.position, Quaternion.identity); 
		Destroy(toBlow[i].gameObject); 
		var delay = Random.Range(0,.1f);
		Invoke("BlowUpAllAsteroids",delay); 
	}
}

function OnCollisionEnter(coll : Collision){
	if(coll.gameObject.layer == 9){
		EndTheUniverse(); 
	}
}