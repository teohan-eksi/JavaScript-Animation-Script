


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
function Animation(frame_rate, duration){ 
	//duration: total duration of the animation.
	
	let frame_interval = 1000/frame_rate; //1 second over f_r
	//time interval between two frames.

	/* creates a unique screen object if one animation function
	 * was called to animate a DOM object.
	 * 
	 * for every DOM object on the screen, there is only one screen object,
	 * only if its id is entered into one of the animation 
	 * functions (move, rotate,...) */
	let so_map = new Map();
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
/*
		if(so_arr.length == 0){
			let so = new ScreenObj(id);
			so = null;
			contains = true;
		}else{
			for(let i in so_arr){
				if(so_arr[i].id == id){
					contains = true;
					break;
				}
			}
		}
		
		if(!contains){
			let so = new ScreenObj(id);
			so = null;
		}*/
	}

	this.move = function(id, m_start_time, m_end_time, path){ 
		check_id(id);

		let move_params = [m_start_time, m_end_time, path];
	
		/* add every move command to move_params property 
		 * inside the screen object with the given id.*/
		if(typeof so_map.get(id).move_params === "undefined"){
			so_map.get(id).move_params = [];
		}

		so_map.get(id).move_params.push(move_params);
		move_params = null;
	}

	//animation frames start.
	this.run = function(){

		if(so_map.size > 0){
			mo_sorter();
		}
		console.log(so_map);

		/* The setInterval() method calls a function or evaluates 
		 * an expression at specified intervals (in milliseconds). */
		let set_frame_int = setInterval(frame, frame_interval);
	
		let frame_count = 0;
		let total_frame_count = duration*frame_rate;
		function frame(){
			
			mover();
		

			frame_count++;
			if(frame_count >= total_frame_count){
				// animaiton frames end when the frame count >= total frame number.
				clearInterval(set_frame_int);
				console.log("animation ended.");
			}
		}
	}
}

//path functioning
function path_demo(y, i_p, f_p){ 
	// y = f(x), initial point, final point 
	let path_arr = [];
	path_arr[0] = y;
	path_arr[1] = i_p;
	path_arr[2] = f_p;
	
	return path_arr;
}


let y = 40;
let animation = new Animation(80, 5);
animation.move("image", 1, 2, path_demo(y, 0, 200)); //parameters: (object to move, start-time, end-time, path-function)
animation.move("image2", 1, 3, path_demo(y, 0, 100));
animation.move("image", 3, 4, path_demo(y, 200, 300));
animation.run();

