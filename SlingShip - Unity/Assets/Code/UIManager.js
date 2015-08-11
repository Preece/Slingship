#pragma strict
import UnityEngine.UI; 

var fuelBar : Slider;
static var t : UIManager; 

public static function updateFuel(val){
	t.fuelBar.value = val; 
}

function Start(){
	t = this; 
}