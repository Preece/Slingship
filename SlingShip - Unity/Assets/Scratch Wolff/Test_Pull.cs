using UnityEngine;
using System.Collections;

public class Test_Pull : MonoBehaviour {

	public Rigidbody ship; 
	public float gravity; 

	Vector3 last; 

	void FixedUpdate(){

		ship.transform.position += transform.position - last;
		last = transform.position;
		Vector3 vec = (transform.position - ship.transform.position);
		Vector3 dir = vec.normalized; 
		float mag = vec.sqrMagnitude; 
		ship.AddForce (gravity / mag * dir, ForceMode.Acceleration); 
	}
	void Start(){
		last = transform.position;
	}
}
