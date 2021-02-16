


/* animation object that controls all the frames and
 * executes operations such as move, rotate, etc...
 *
 *TODOs: requestAnimationFrame()
 	 CSS style manipulation
*/


function Animation(frame_rate, duration){ 
	//duration: total duration of the animation.
	
	let frame_interval = 1000/frame_rate; //1 second over f_r
	//time interval between two frames.

	/*how objects move:
	 *animation_object.move(parameters) is called.
	 *parameters: (the object to move(DOM Object),
	 			   start time of movement(sec),
				   end time of movement(sec),
				   path function)
	 *move function creates a move object
	 *the object is pushed to the array of move objects
	 *when animation_object.run() is called, the actual
	 *mover function is called every frame and it moves
	 *the object to move according to the parameters. */
	let mo_arr = [];//array of moving objects.
	this.move = function(obj_to_move, m_start_time, m_end_time, path_func){ //function to create a move object
		let	mo = new Move(obj_to_move, m_start_time, m_end_time, path_func);
		mo_arr.push(mo);
	}

	function Move(obj_to_move, m_start_time, m_end_time, path_func){ //move object constructor.
		this.obj_m = obj_to_move;
		this.m_s = m_start_time;
		this.m_e = m_end_time;
		this.y = path_func;
	}
	
	function mo_sorter(){
		/*sort the objects to move from the earliest start time 
		 * to the latest before starting the animation.*/
	
		console.log("mo_sorted");
	}

	let i = 0;
	let x_initial = 0;
	let move_step = 4;
	function mover(frame_c){
		//move the objects according to the parameters

		for(i; i<mo_arr.length; i++){
			if(mo_arr[i] != null){
				if((frame_c/frame_rate) >= mo_arr[i].m_s){
					mo_arr[i].obj_m.style.left = String(x_initial) + "px"; 
					x_initial += move_step;

					console.log(mo_arr[i].obj_m.style.left);
				}
	
				if((frame_c/frame_rate) >= mo_arr[i].m_e ){
					delete mo_arr[i]; //makes the i null element and doesnt reduce array length.
				}
			}
		}
		i = 0;
	}

	//animation frames start.
	this.run = function(){

		mo_sorter();

		/* The setInterval() method calls a function or evaluates 
		 * an expression at specified intervals (in milliseconds). */
		let set_frame_int = setInterval(frame, frame_interval);
	
		let frame_count = 0;
		function frame(){

			mover(frame_count);
/*			rotater();
 *			shaker();
 */		
			frame_count++;
			if(frame_count >= (duration*frame_rate)){
				// animaiton frames end when the frame count >= total frame number.
				clearInterval(set_frame_int);
				console.log("animation ended.");
			}
		}
	}
}

let image = document.getElementById("image");

let y = "x";
let animation = new Animation(25, 5);
animation.move(image, 1, 2, y); //parameters: (object to move, start-time, end-time, path-function)
animation.move(image, 3, 4, y);
animation.run();

