
// Revealing Module pattern

var game = ( function () {

	// STATE VARIABLES

	var that = this;

	// MODEL
	var Canvas = function ( id ) {

		this.name = 'arena';
		this.id = id; // expects an id of an HTML element
		this.dom = document.getElementById( id ); // the <div>
		
		this.position = {
			x: 0,
			y: 0
		};

		// TODO: figure out how to read the CSS stylesheet
		// element.getComputedStyle
		// and use it to set this.dimensions

		this.dimensions = {
			width: 400,
			height: 400
		}

		// TODO: pad the arena by the width/height of the snake so bounces work


		// Set the local style from the CSS stylesheet

		this.dom.style.width = this.dimensions.width + 'px';

		this.dom.style.height = this.dimensions.height + 'px';

		this.coords = [];

		// detect if Snake hits the walls of this arena.

		this.snakeCollided = function ( snake ) {

			//console.log('in .snakeCollided')

			// find the center of the snake

			var snakeX = snake.position.x + (snake.dimensions.width / 2 );

			var snakeY = snake.position.y + (snake.dimensions.height / 2 );

			// Find the width and height of the arena

			var arenaWidth = parseInt( this.dom.style.width );

			var arenaHeight = parseInt( this.dom.style.height );

			var currSnakeDirectionX = snake.direction.dx;

			var currSnakeDirectionY = snake.direction.dy;

			if ( snakeX < 0 ) {

				console.log('outside arena on left');
				snake.updateDirection( 1, currSnakeDirectionY );

			} else if ( snakeX > arenaWidth ) {

				console.log('outside arena on right');
				snake.updateDirection( -1, currSnakeDirectionY );

			} else if ( snakeY < 0 ) {

				console.log('outside arena on top');
				snake.updateDirection( currSnakeDirectionX, 1 );

			} else if ( snakeY > arenaHeight ) {

				console.log('outside arena on bottom');
				snake.updateDirection( currSnakeDirectionX, -1)

			}

		};

	}; // screen coordinates


	// Snake class
	var Snake = function ( id ) {

		this.name = 'snake';
		this.id = id;

		// get a reference the the Snake HTML tag

		this.dom = document.getElementById( id );

		// absolute position of Snake.
		this.position = {
			x: 50,
			y: 50
		};

		// Direction the Snake is moving (left/right, up/down)
		// NOTE: no direction until we hit the arrow keys
		this.direction = {
			dx: 0,
			dy: 0
		};

		this.speed = {
			dx: 10,
			dy: 10
		};

		this.MAX_SPEED = 100;

		this.MIN_SPEED = 1;

		this.dimensions = {
			width: 10,
			height: 10
		};


		// set starting position

		this.dom.style.top = this.position.y + 'px';

		this.dom.style.left = this.position.x + 'px';

		// set starting dimensions

		this.dom.style.width = this.dimensions.width + 'px';

		this.dom.style.height = this.dimensions.height + 'px';

		// set the speed of our movement onscreen.

		this.setSpeed = function ( dx, dy ) {

			if( dx > this.MAX_SPEED || dx < this.MIN_SPEED ) {
				console.error( 'setSpeed(): x speed not allowed:' + dx );
				return;
			}

			if( dy > this.MAX_SPEED || dy < this.MIN_SPEED ) {
				console.error( 'setSpeed(): y speed not allowed:' + dx );
				return;
			}

			this.speed.dx = dx;

			this.speed.dy = dy;

		};

		// detect if we collided with a Frog, and eat it if we did.

		this.collideWithFrog( frog ) {

			// TODO: write collision script similar to the arena.snakeCollided() method.

		}

		// update our position and motion.

		this.update = function () {

			// get old position.

			var x = parseInt( this.dom.style.left );

			var y = parseInt( this.dom.style.top );

			// TODO: store previous positions of the snake, 
			// TODO: update with each change

			x = x + (this.direction.dx * this.speed.dx);

			y = y + (this.direction.dy * this.speed.dy);

			// change by dx and dy

			//console.log( 'new x:' + x + ' y:' + y );

			// call updatePosition

			this.updatePosition( x, y );

		};

		// TODO: handle size changes in Snake.

		this.updateSize = function () {

			// TODO: NOT COMPLETED

		};

		this.updateDirection = function ( dx, dy ) {

			 this.direction.dx = dx;

			 this.direction.dy = dy;

		};

		this.updatePosition = function ( x, y ) {

			//console.log( 'in this.updatePosition() x:' + x + ' y:' + y );

			// change this.dom.style

			this.dom.style.top = y + 'px';

			this.dom.style.left = x + 'px';

			// update our internal value.

			this.position.x = x;

			this.position.y = y;

		};

		this.coords = [];

	};

	// Frog Class
	var Frog = function ( id, arenaWidth, arenaHeight ) {

		console.log( 'arenaWidth in Frog:' + arenaWidth + ' arenaHeight:' + arenaHeight)

		this.name = 'frog';
		this.id = id;
		this.dom = document.getElementById( id );

		this.arenaWidth = arenaWidth;
		this.arenaHeight = arenaHeight;

		this.position = {
			x: 100,
			y: 100
		}; 

		this.direction = {
			dx: 0,
			dy: 0
		};

		this.speed = {
			dx: 0,
			dy: 0
		};

		this.dom.style.top = this.position.y + 'px';
		this.dom.style.left = this.position.x + 'px';

		this.coords = [];

		// TODO: update Frog position randomly when Snake gets too close

		// randomly move the frog in the arena
		this.hop = function () {

			// randomize x and y position
			var randX = this.arenaWidth * Math.random();
			var randY = this.arenaHeight * Math.random();

			// add padding at arena edges

			if ( randX < 10 ) randX = 10;
			if ( randX >= this.arenaWidth ) randX = this.arenaWidth - 10;
			if ( randY < 10 ) randY = 10;
			if ( randY > this.arenaHeight ) randY = this.arenaHeight - 10;

			// update the dom

			this.dom.style.left = randX + 'px';
			this.dom.style.top = randY + 'px';

		};


	};

	// give the objects the id for their HTML element onscreen.

	var arena = new Canvas( 'arenaId' );

	var snake = new Snake( 'snakeId' );

	// Give the Frog the width and height of the arena.

	var frog = new Frog( 'frogId', arena.dimensions.width, arena.dimensions.height );

	//DEBUG
	window.frog = frog; // DEBUG

	// VIEW


	// CONTROLLER

	window.arena = arena;

	var animateId;

	/** 
	 * Make the Snake move, even if we don't try to move it
	 */
	function animate () {

		if( arena.snakeCollided( snake ) ) {

			// find the current position of the Snake

			// manually push it inside the arena again

			// push inside so the bottom right of Snake is inside

			// means subtracting snake width and height, plus number of pixels it is outside arena

			// update the CSS style of the Snake so it actually moves

			//snake.updatePostion(); // In the future, move it to the other side, or end game

		} else {

			snake.update( 1, 1 );

		}

		animateId = requestAnimationFrame( animate );

	};

	function init () {

		console.log( 'starting snake ');

		// set starting speed

		snake.setSpeed( 1, 1 );

		console.log('about to animate');

		requestAnimationFrame( animate );

		var controls = document.getElementById( 'controls' );

		controls.onclick = function ( e ) {

			e.preventDefault();

			var speedField = document.getElementById('snake_speed');

			var speedValue = parseInt( speedField.value );

			console.log( 'i, ' + e.target.id + ', was clicked, speed value:' + speedValue );

			if ( isNaN( speedValue ) ) {

				alert( 'NOT A NUMBER ' );

			} else {

				window.strangeThis = that;
				console.log( "THIS:" + that );

				that.snake.setSpeed( speedValue, speedValue );

			}

		};

		// connect user input (controller)
		document.onkeydown = function ( e ) {

			var code = e.keyCode; // get the key pressed
			window.evt = e;

			console.log( "keycode:" + code )

			switch ( code ) {

				// TODO: find codes for arrows

				case 37:  //left
					// TODO: change the snake.position variable
					snake.updateDirection( -1, 0 );
					break;

				case 38: //up
					snake.updateDirection( 0, -1 );
					break;

				case 39: //right
					snake.updateDirection( 1, 0 );
					break;

				case 40: //down
					snake.updateDirection( 0, 1 );
					break;

			} // end of switch


		} // end of function

		//DEBUG
		window.snake = snake;
		window.frog = frog;

	}

	return {
		init: init
	};

} )();