/* Run this in a browser that supports requestAnimationFrame
 * */


function mo_sorter(){
	/*sort the move objects according to their time parameters,
	 * from the earliest start time to the latest before starting the animation.
	 * this is called inside animation_object.run() function.
	 * */
	console.log("mo_sorted");
}

function mover(){		
	/* move the objects according to the parameters.
	 * design moving objects like a ticking bomb.
	 * after they reached their destinations,
	 * they simply cease to exist and popped out 
	 * from the moving objects array.*/
	console.log("mover");			
				
	//mo_arr[i].obj_m.style.left = String(int) + "px"; 

}


/* animation object that controls frame system and
* executes operations such as move, rotate, etc... 
* on objects.
 */

/* check if there is already an Animation object
 * don't create a duplicate animation obj.*/
let is_alive = false;

function Animation(duration){ 

	//duration: total duration of the animation.

	/* creates a unique screen object if one animation function
	 * was called to animate a DOM object.
	 * 
	 * for every DOM object on the screen, there is only one screen object.
	 * only if its id is entered into one of the animation 
	 * functions (move, rotate,...), the screen object with the given id
	 * is created.*/

	let so_map = new Map();
	function ScreenObj(id){
		
		is_alive = true;
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

		let params = [start_time, end_time, i_val, f_val, path];
	
		/* add every move command to move_params property 
		 * inside the screen object with the given id.*/
		if(typeof so_map.get(id).params === "undefined"){
			so_map.get(id).params = [];
		}

		so_map.get(id).params.push(params);
		params = null;
	}


	//animation frames start.
	this.run = function(){

		if(so_map.size > 0){
			mo_sorter();
		}
		console.log(so_map);

		let run_t = 0;
//requestAnimationFrame returns: let reqID = 0;
		duration *= 1000; //convert to ms;
		function callback(timestamp){
			const run_t = timestamp - start_t;
		
			//do the frame operations here.
			
			if(run_t < duration){
				requestAnimationFrame(callback);//returns a unique ID, reqID.
			}	
			console.log(run_t);
		}
		
		let drift = 2; //in ms. Totally made up value.
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
let i_val = 0; // px
let f_val = 200; //px
let path = "linear";

let a = new Animation(duration);
a.act("image", CSS_property, start_time, end_time, i_val, f_val, path); 
//animation.move("image2", 1, 3, path);
//animation.move("image", 3, 4, path);
a.run();

