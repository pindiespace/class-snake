
// Revealing Module pattern

var game = ( function () {

	// STATE VARIABLES

	// MODEL
	var Canvas = function ( id ) {

		this.name = 'arena';
		this.id = id; // expects an id of an HTML element
		this.dom = document.getElementById( id ); // the <div>
		
		this.position = {
			x: 0,
			y: 0
		};

		this.coords = [];

	}; // screen coordinates

	function updatePosition ( x, y ) {

	}

	// Snake class
	var Snake = function ( id ) {

		this.name = 'snake';
		this.id = id;

		// get a reference the the Snake HTML tag

		this.dom = document.getElementById( id );

		this.position = {
			x: 50,
			y: 50
		};

		this.MAX_SPEED = 100;

		this.MIN_SPEED = 1;

		this.speed = {
			dx: 10,
			dy: 10
		};

		this.dom.style.top = this.position.y + 'px';

		this.dom.style.left = this.position.x + 'px';

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

		this.update = function ( dx, dy ) {

			console.log( 'dx:' + dx + ' dy:' + dy)

			dx *= this.speed.dx;

			dy *= this.speed.dy;

			// get old 

			var x = parseInt( this.dom.style.left );

			var y = parseInt( this.dom.style.top );

			console.log( 'x:' + x + ' y:' + y );

			x = x + dx;

			y = y + dy;

			// change by dx and dy

			console.log( 'new x:' + x + ' y:' + y );

			// call updatePosition

			this.updatePosition( x, y );

		};

		this.updatePosition = function ( x, y ) {

			console.log( 'in this.updatePosition() x:' + x + ' y:' + y );

			// change this.dom.style

			this.dom.style.top = y + 'px';

			this.dom.style.left = x + 'px';

		};

		this.coords = [];

	};

	// Frog Class
	var Frog = function ( id ) {

		this.name = 'frog';
		this.id = id;
		this.dom = document.getElementById( id );

		this.position = {
			x: 100,
			y: 100
		}; 

		this.speed = {
			dx: 0,
			dy: 0
		};

		this.dom.style.top = this.position.y + 'px';
		this.dom.style.left = this.position.x + 'px';

		this.coords = [];

	};

	// give the objects the id for their HTML element onscreen.

	var arena = new Canvas( 'arenaId' );

	var snake = new Snake( 'snakeId' );

	var frog = new Frog( 'frogId' );

	// VIEW


	// CONTROLLER

	var animateId;

	/** 
	 * Make the Snake move, even if we don't try to move it
	 */
	function animate () {

		snake.update( 1, 1 );

		animateId = requestAnimationFrame( animate );


	}

	function init () {

		console.log( 'starting snake ');

		// set starting speed

		snake.setSpeed( 1, 1 );

		console.log('about to animate');

		requestAnimationFrame( animate );


		// connect user input (controller)
		document.onkeydown = function ( e ) {

			var code = e.keyCode;

			console.log( "keycode:" + code )

			switch ( code ) {

				// TODO: find codes for arrows

				case 37:  //left
					// TODO: change the snake.position variable
					snake.update( -1, 0 );
					break;

				case 38: //up
					snake.update( 0, -1 );
					break;

				case 39: //right
					snake.update( 1, 0 );
					break;

				case 40: //down
					snake.update( 0, 1 );
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