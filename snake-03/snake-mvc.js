
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

		// Set the local style from the CSS stylesheet

		this.dom.style.width = this.dimensions.width + 'px';

		this.dom.style.height = this.dimensions.height + 'px';

		this.coords = [];

		// detect if Snake hits the walls.

		this.snakeCollided = function ( snake ) {

			var x = snake.position.x;

			var y = snake.position.y;

			//console.log( 'snake is at: ' + x + ',' + y );

			//var top = parseInt( this.dom.style.top );
			//var left = parseInt( this.dom.style.left );
			//var bottom = parseInt( this.dom.style.bottom );
			//var right = parseInt( this.dom.style.right );

			var width = parseInt( this.dom.style.width );

			var height = parseInt( this.dom.style.height );

			if ( x > width ) return true;
			if ( y > height ) return true;


			//console.log( top + ',' + left + ',' + bottom + ',' + right + ',' + width + ',' + height );

			//console.log( 'snake collided with wall' );

		};

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

			//console.log( 'dx:' + dx + ' dy:' + dy)

			dx *= this.speed.dx;

			dy *= this.speed.dy;

			// get old 

			var x = parseInt( this.dom.style.left );

			var y = parseInt( this.dom.style.top );

			//console.log( 'x:' + x + ' y:' + y );

			x = x + dx;

			y = y + dy;

			// change by dx and dy

			//console.log( 'new x:' + x + ' y:' + y );

			// call updatePosition

			this.updatePosition( x, y );

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

	window.arena = arena;

	var animateId;

	/** 
	 * Make the Snake move, even if we don't try to move it
	 */
	function animate () {

		if( arena.snakeCollided( snake ) ) {

			snake.update( -1, -1 ); // In the future, move it to the other side, or end game

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