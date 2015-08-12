#pragma strict
import UnityEngine.UI; 

var fuelBar : Slider;
var explosionPrefab : Transform;
static var t : UIManager; 

public static function updateFuel(val){
	t.fuelBar.value = val; 
}

function Start(){
	t = this; 
}