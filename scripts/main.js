



/* The setInterval() method calls a function or evaluates 
 * an expression at specified intervals (in milliseconds). */
frame_rate = 25; //get input
frame_interval = 1000/frame_rate // (1 sec)/frame rate

set_frame_int = setInterval(frame, frame_interval);

let duration = 4; // get input in seconds.
let frame_count = 0;
function frame(){
	
	frame_count++;

	move();

	if(frame_count > (duration*frame_rate)){
		clearInterval(set_frame_int);
		console.log("animation ended.");
	}
}


let image = document.getElementById("image");
let move_i = 0;
function move(){
	
	image.style.left = String(move_i) +"px";
	move_i++;

	console.log(image.style.left);
}
