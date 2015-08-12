using UnityEngine;
using System.Collections;

public class Test_Forward : MonoBehaviour {

	Rigidbody _rigid;
	public Vector3 startVelocity; 

	// Use this for initialization
	void Start () {
		_rigid = GetComponent<Rigidbody> (); 
		_rigid.velocity = startVelocity; 
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
