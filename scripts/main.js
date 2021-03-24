/* Run this in a browser that supports requestAnimationFrame
 * */

function framePayload(map, runTime){
	/* HOW THIS WORKS:
	 * map.forEach loops through every key, value pair
	 * key -> id of the DOM object
	 * value -> screen object
	 * 	screen object = {
	 *		DOM object,
	 *		params array = [[params_set1, set2, ...]]
	 *	}		
	 *
	 *
	 *
	 *	TODO explian and stuff
	 *	make it work for all CSS properties.
	 */
	let propertyValue;
	let increment;
	map.forEach(function(value, key){
	//in order to apply each param, check if its time came in a for loop.
	//params = [[params_set1, set2, ...]];
		for(let i = 0; i < value.params.length; i++){
				if(runTime >= value.params[i][1]*1000 && 
			   runTime <= value.params[i][2]*1000)
			{
				increment = (value.params[i][4] - value.params[i][3])/
							(60*(value.params[i][2] - value.params[i][1]));
				
				value.dom_obj.style[value.params[i][0]] = 
				(parseFloat(value.dom_obj.
				style[value.params[i][0]].split("px")[0])
				+ increment).toString() + "px";
			}
		}
		i=0;
	});
}
			
/* animation object that controls frame system and
* executes operations such as move, rotate, etc... 
* on objects. */

/* variable to check if there is alrady an Animation object.
 * So that no duplication will be created. */
let is_alive = false;
let animationObject = null;//make this global.
function Animation(duration){ 
	//duration: total duration of the animation.
	
	/* HOW THIS WORKS: 
	 * 1) checks to see if there is already an active
	 * animation object and doesn't allow to create more
	 * than one animation object, because it's not necessary for now.
	 *
	 * 2) after act function was called on a set of parameters,
	 * the id parameter is checked to see whether there is a
	 * screen object with that id already. If there isn't,
	 * a screen obj is created with the given id. 
	 * a screen object is unique to the running instance of the application.
	 * Meaning, for every DOM object on the screen, there is only one screen object,
	 * if its id was entered to the 'act' function, of course.
	 * 'act' must be called after entering every set of parameters that
	 * are desired to be animated. Think of act like setting animation steps. 
	 *
	 * 3) After checking the id and settling that issue, 
	 * if a screen object was created, it is put inside a map
	 * with the key as its id and value as the screen object itself
	 * like this: map.set(id, this screen object);
	 * 
	 * 4) The parameters entered by the user into the act function is
	 * added to the screen object that was put into a map in the earlier
	 * step.
	 *
	 * current state of the map after these four steps above:
	 *
	 * map = {id1 : screenObject1, id2: screenObject2, ...}
	 * screenObject = {
	 *     DOM_obj = document.getElementById(id),
	 *     params = [[params_array1], [param2_array2], ...]
	 * }
	 */

	if(animationObject != null){
		//return 0 to indicate that an object wasn't created.
		return 0;
	}else{
		animationObject = this;
	}
	
	
	let so_map = new Map();
	/* the map->id : the id of the DOM object in the screen.
	 * the map->value: screen object that contains the actual DOM object itself 
	 * 				   and parameters according to which it should be animated.*/

	function ScreenObj(id){
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
		// params = [[params_set1, params_set2, ...]].
		so_map.get(id).params.push(params);
		params = null;
	}

	//animation frames start.
	this.run = function(){
		if(so_map.size > 0){
			//setting initial value to their style elements.
			so_map.forEach(function(value, key){
				//assign initial CSS values.
				value.dom_obj.style[value.params[0][0]] = value.params[0][3].toString() + "px";
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
let start_time = 1.5; // in sec
let end_time = 2.5;
let i_val = 0;
let f_val = 200;
let unit = "px";
let path = "linear";

let a = new Animation(duration);
a.act("image", CSS_property, start_time, end_time, i_val, f_val, path); 
a.act("image2", CSS_property, 2, 3, 20, 400, path);
a.run();

let a2 = new Animation(10);
