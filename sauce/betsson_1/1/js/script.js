(function($) {
    $.fn.betssonMenu = function(options) {
        var menu = [{
            title: "Default",
            href: "/"
        }, {
            title: "Default",
            href: "/Default",
            items: [{
                title: "Live Default",
                href: "/Default"
            }, {
                title: "Default",
                href: "/Default",
                items: [{
                    title: "Table Default",
                    href: "/table-Default"
                }, {
                    title: "Default",
                    href: "/Default"
                }, {
                    title: "Default games",
                    href: "/Default-games"
                }, {
                    title: "Video Default",
                    href: "/video-Default"
                }]
            }, {
                title: "Default",
                href: "/Default"
            }]
        }];

        // default settings
        var settings = $.extend({
            menuItems: menu,
            mouseEnterDelay: 100,
            mouseLeaveDelay: 500,
            mouseEnterClass: ''
        }, options);

        var initStructure = function () {
            var init = '<nav>';
            var divider = '<li class="divider"></li>';

            init += createMenuItems(settings.menuItems, divider);

            init += '</nav>';
            return init;
        };

        var createMenuItems = function(items, divider){
            var a = '<ul>';

            $.each(items, function( index, value ) {
                a += createMenuItem(value);
                
                if (typeof divider !== "undefined") {
                   a += divider; 
                }
            });

            a += '</ul>';
            return a;
        };

        var createMenuItem = function (value) {
            var element ='<li';

            if (value.hasOwnProperty('items') && value.items.length > 0) {
                // add class if has submenu
                element += ' class="has-sub"><a href="' + value.href + '">' + value.title + '</a>';
                element += createMenuItems(value.items);
            } else {
                element += '><a href="' + value.href + '">' + value.title + '</a>';
            }

            element += '</li>';

            return element;
        };
        
        return this.html(function(){
            var elements = $(initStructure());
            var subMenus = $(elements).find("li.has-sub");

            subMenus.hover(function(){
                // hover on
                var self = $(this);
                console.info('Hovered over: ', self);

                // remove off timeout from same element
                var timeout = self.data('hoveroff');
                if(timeout) clearTimeout(timeout);

                self.data('hoveron', setTimeout(function(){ 
                                                    self.addClass('active')
                                                        .addClass(settings.mouseEnterClass);
                                                }, settings.mouseEnterDelay));
            }, function(){
                // hover off
                var self = $(this);
                console.info('Hovered off: ', self);

                // remove on timeout from same element
                var timeout = $(this).data('hoveron');
                if(timeout) clearTimeout(timeout);

                self.data( 'hoveroff', setTimeout(function(){ 
                                                        self.removeClass('active')
                                                            .removeClass(settings.mouseEnterClass);; 
                                                    }, settings.mouseLeaveDelay));
            });

            return elements;
        });
    }
}(jQuery));