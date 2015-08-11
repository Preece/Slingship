using UnityEngine;
using System.Collections;

public class AnimateBlend : MonoBehaviour {

	[SerializeField]
	Vector2 mainTexture;
	[SerializeField]
	Vector2 secondTexture;
	[SerializeField]
	Vector2 mask;

	Vector2 mtStart;
	Vector2 stStart;
	Vector2 mStart; 

	Renderer rend;

	// Use this for initialization
	void Start () {
		rend = GetComponent<Renderer> (); 
	}
	
	void Update(){
		mtStart += mainTexture * Time.deltaTime; 
		stStart += secondTexture * Time.deltaTime;
		mStart += mask * Time.deltaTime ; 
		rend.material.SetTextureOffset ("_MainTex", mtStart);
		rend.material.SetTextureOffset ("_PathTex", stStart);
		rend.material.SetTextureOffset ("_PathMask", mStart);
	}
}
