var SVGJoystick = function(el, userOnMove, userOnMoveEnd) {
  var thisJoy = this;
  thisJoy.parentElement = el;
  thisJoy.stick = document.getElementById("stick");
  thisJoy.xValue = 0;
  thisJoy.yValue = 0;
  thisJoy.getCoordinates = function() {
    return {
      x: thisJoy.xValue,
      y: thisJoy.yValue
    };
  }
  thisJoy.onMoveEnd = function() {
    userOnMoveEnd(thisJoy);
  }

  thisJoy.onMove = function() {
    userOnMove(thisJoy);
  }

  var dragStick = new Draggable.create(thisJoy.stick, {
    type: "x,y",
    bounds: {
      maxY: 100,
      minY: -100,
      minX: -100,
      maxX: 100
    },
    onDragStart: function() {

    },
    onDrag: function() {
      thisJoy.xValue = this.x;
      thisJoy.yValue = this.y;
      //fire onMOve
      thisJoy.onMove();

    },
    onDragEnd: function() {
      thisJoy.onMoveEnd();
    },
    onRelease: function() {

      TweenMax.to(thisJoy.stick, 0.4, {
        x: 0,
        y: 0,
        ease: Elastic.easeOut
      });
      
      thisJoy.xValue = 0;
      thisJoy.yValue = 0;
    }

  });

  console.log('joystick instantiated on ' + el);
};
