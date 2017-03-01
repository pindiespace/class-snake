
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

	// Snake class
	var Snake = function ( id ) {

		this.name = 'snake';
		this.id = id;
		this.dom = document.getElementById( id );

		this.position = {
			x: 50,
			y: 50
		};

		this.speed = {
			dx: 0,
			dy: 0
		};

		this.dom.style.top = this.position.y + 'px';
		this.dom.style.left = this.position.x + 'px';

		this.updatePosition ( x, y ) {

			// change this.dom.style

		}

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




	function init () {

		console.log( 'starting snake ');

		// connect user input (controller)
		document.onkeydown = function ( e ) {

			var code = e.keyCode;

			console.log( "keycode:" + code )

			switch ( code ) {

				// TODO: find codes for arrows

				case 37:  //left
					// TODO: change the snake.position variable
					// snake.updatePosition( -1, 0 );
					break;

				case 38: //up

					break;

				case 39: //right

					break;

				case 40: //down

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