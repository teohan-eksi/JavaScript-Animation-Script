/* Run this in a browser that supports requestAnimationFrame
 * */

function framePayload(map, runTime){
	let i = 0;
	let propertyValue;
	map.forEach(function(value, key){
		for(i; i < 6; i++){//because there are always 6 variables in 'params'
			//console.log(value.params[0][i]);
			//TODO calculate the increment based on path, initial and final value of time and value.		
			if(runTime >= value.params[0][1]*1000 && runTime <= value.params[0][2]*1000){
				value.dom_obj.style[value.params[0][0]] = value.params[0][4];
			}
		}

	});
}
			
	//mo_arr[i].obj_m.style.left = String(int) + "px"; 


/* animation object that controls frame system and
* executes operations such as move, rotate, etc... 
* on objects.
 */

/* variable to check if there is alrady an Animation object.
 * So that no duplication will be created.*/
let is_alive = false;
function Animation(duration){ 
	//duration: total duration of the animation.
	
	if(is_alive){
		//delete the original one and continue execution
		//with the new one.
	}else{
		is_alive = true;
	}

	/* creates a unique screen object if one animation function
	 * was called to animate a DOM object.
	 * 
	 * for every DOM object on the screen, there is only one screen object.
	 * the screen object with the given id is created, only if
	 * its id was entered into the 'act' function */

	let so_map = new Map();
	/* the map->id : the id of the DOM object in the screen.
	 * the map->value: screen object that contains the actual DOM object itself 
	 * 				   and parameters according to which it should be animated.*/

	function ScreenObj(id){
		this.id = id;
		this.dom_obj = document.getElementById(id);

		so_map.set(id, this);
	}

	function check_id(id){
		/* check if a screen object with the given id exists.
		 * if it doesnt exist, create one and add it to the map */
		if(!so_map.has(id)){
			let so = new ScreenObj(id);
			so = null;
		}
	}

	this.act = function(id, CSS_property, start_time, end_time, i_val, f_val, path){ 
		check_id(id);

		let params = [CSS_property, start_time, end_time, i_val, f_val, path];
	
		/* add every command to params property 
		 * inside the screen object with the given id in the map.
		 * If params property was not created yet, crate one.*/
		if(typeof so_map.get(id).params === "undefined"){
			so_map.get(id).params = [];
		}
		
		//push parameters of the act function into the screen object.
		so_map.get(id).params.push(params);
		params = null;
	}

	//animation frames start.
	this.run = function(){
		if(so_map.size > 0){
			//setting initial value to their style elements.
			so_map.forEach(function(value, key){
				value.dom_obj.style[value.params[0][0]] = value.params[0][3];
				console.log(value.dom_obj.style[value.params[0][0]]);
			});
		}

		let run_t = 0;//run time
		//let reqID = 0; requestAnimationFrame returns a unique ID after each call.
		duration *= 1000; //converted to ms;
		/* This function that calls requestAnimationFrame in a proper way 
		 * was taken from Mozilla Developer Network. */
		function callback(timestamp){
			const run_t = timestamp - start_t;
		
			//do the frame operations here.
			framePayload(so_map, run_t);
			
			if(run_t < duration){
				requestAnimationFrame(callback);//returns a unique ID, reqID.
			}	
			//console.log(run_t);
		}
		
		let drift = 2; //in ms. Totally experimental value.
		let start_t = performance.now() + drift;
		requestAnimationFrame(callback);

		/* cancels an animation frame request 
		 * previously scheduled through a call to requestAnimationFrame().*/
		//cancelAnimationFrame(reqID);	
	}
}

let duration = 3;

let CSS_property = "left";
let start_time = 1; // in sec
let end_time = 2.5;
let i_val = "0px";
let f_val = "200px";
let path = "linear";

let a = new Animation(duration);
a.act("image", CSS_property, start_time, end_time, i_val, f_val, path); 
a.run();

