var joySVG = function(el, userOnMove, userOnMoveEnd, limitX, limitY) {
  var thisJoy = this;

  thisJoy.stickElement = el;
  thisJoy.xValue = 0;
  thisJoy.yValue = 0;

  thisJoy.getOffset = function() {
    //returns offset from center in pixel
    return {
      x: thisJoy.xValue,
      y: thisJoy.yValue
    };
  }

  thisJoy.getPosition = function() {
    //returns coordinates in percentage of limit
    //we are inverting coordinates for y by subtracting from 0
    return {
      x: Math.round(percOf(thisJoy.xValue, limitX)),
      y: 0 - Math.round(percOf(thisJoy.yValue, limitY))
    };
  }

  thisJoy.onMoveEnd = function() {
    userOnMoveEnd(thisJoy);
  }

  thisJoy.onMove = function() {
    userOnMove(thisJoy);
  }

  var dragStick = new Draggable.create(thisJoy.stickElement, {
    type: "x,y",
    bounds: {
      maxY: limitY,
      minY: -limitY,
      minX: -limitX,
      maxX: limitX
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

      TweenMax.to(thisJoy.stickElement, 0.4, {
        x: 0,
        y: 0,
        ease: Elastic.easeOut
      });

      thisJoy.xValue = 0;
      thisJoy.yValue = 0;
    }

  });

  function percOf(a, b) {
    c = a / b;
    return c * 100;
  }

  console.log('joystick instantiated on ' + thisJoy.stickElement);
};


$.fn.joySVG = function(options) {

  var settings = $.extend({
    onMove: null,
    onMoveEnd: null,
    limitX: 50,
    limitY: 50
  }, options);

  return this.each(function() {
    joySVG(this, settings.onMove, settings.onMoveEnd, settings.limitX, settings.limitY);

  })
}