using UnityEngine;
using System.Collections;

public class Test_Spin : MonoBehaviour {


	public Vector3 _spin; 
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate(_spin * 360 * Time.deltaTime); 
	}
}
