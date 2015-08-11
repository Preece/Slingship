using UnityEngine;
using System.Collections;

public class AnimateParralax : MonoBehaviour {

	Camera _cam; 
	Vector3 _startPos; 
	Renderer _rend; 

	[SerializeField]
	float _offsetSpeed = 1; 
	float _canStartSize;
	Vector3 _planeStartSize; 

	// Use this for initialization
	void Start () {
		_cam = Camera.main; 
		_startPos = _cam.transform.position; 
		_rend = GetComponent<Renderer> (); 
		_canStartSize = _cam.orthographicSize; 
		_planeStartSize = transform.localScale; 
		Debug.Log (_cam); 
	}
	
	// Update is called once per frame
	void Update () {
		Vector3 offset = _cam.transform.position - _startPos; 
		_rend.material.SetTextureOffset ("_MainTex", new Vector2 (offset.x, offset.y) * _offsetSpeed /100); 
		transform.localScale = _planeStartSize * _cam.orthographicSize /  _canStartSize;
	}
}
