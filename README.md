# joySVG
SVG / GSAP / jQuery joystick for mobile web


USAGE:

Include js in page.
If you are using jQuery, include joySVG after jQuery.
Then...

For vanilla JS :

joySVG(element,
customUserOnMoveFunction,
customUserOnMoveEndFunction,
limitX,
limitY);

or as an object:
var myNewJoystick = new joySVG(
document.getElementById("joystickElement"),
customUserOnMoveFunction,
customUserOnMoveEndFunction,
50,
50
);

to use with jQuery :
$("#joystickElement").joySVG({onMove : foo, onMoveEnd : bar, limitX : 50, limitY : 80});

DEMO:
http://codepen.io/bemjax/pen/kXjJkm
