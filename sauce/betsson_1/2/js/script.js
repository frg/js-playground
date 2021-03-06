(function($) {
    $.fn.betssonCarousel = function(options) {

        // default settings
        var settings = $.extend({
            autoSlide: true,
            autoSlideMs: 3000,
            hoverPause: true
        }, options);

        var container = this.find('.container');
        var rotate = function(direction) {
            // keeps track of current rotation calue
            var rotation = parseInt(container.attr('data-rotation'));
            if (direction == 1) {
                rotation -= 120;
                container.attr('data-rotation', rotation)
                            .css('-webkit-transform', 'rotateX(' + rotation + 'deg)');
            } else if (direction == -1) {
                rotation += 120;
                container.attr('data-rotation', rotation)
                            .css('-webkit-transform', 'rotateX(' + rotation + 'deg)');
            }
        }
        
        var timer;
        // init of auto rotation / auto play
        var autoRotate = function(enabled) {
            if (enabled && settings.autoSlide) {
                // if is enabled in settings
                timer = setInterval(function(){
                    rotate(1);
                }, settings.autoSlideMs);
            } else {
                clearInterval(timer)
            }
        }

        // enable auto rotation if enabled
        autoRotate(1);

        //check if hover pause is enabled
        if (settings.hoverPause) {
            this.hover(function() {
                //stop the interval
                autoRotate(0);
            }, function() {
                // continue on hover out
                autoRotate(1);
            });
        }

        // next and previous controls
        this.on('click', '.control.left', function(){
            rotate(-1);
        });
        this.on('click', '.control.right', function(){
            rotate(1);
        });

        //return instance for chaining if needed
        return this;
    }
}(jQuery));