(function($) {
    $.fn.betssonMenu = function(options) {
        // default menu
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

        // init main structure
        var initStructure = function () {
            var init = '<nav>';
            var divider = '<li class="divider"></li>';

            init += createMenuItems(settings.menuItems, divider);

            init += '</nav>';
            return init;
        };

        // creates parent menu item list
        var createMenuItems = function(items, divider){
            var a = '<ul>';

            $.each(items, function( index, value ) {
                a += createMenuItem(value);
                
                // if desired a devider is supplied
                // this is done for the reason of inseting a divider
                // in the main menu.
                if (typeof divider !== "undefined") {
                   a += divider; 
                }
            });

            a += '</ul>';
            return a;
        };

        // creates a single menu item
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
        
        // return "this" for chaining
        return this.html(function(){
            var elements = $(initStructure());
            var subMenus = elements.find("li.has-sub");

            // handles hover on and hover off
            subMenus.hover(function(){
                // hover on
                var self = $(this);
                console.info('Hovered over: ', self);

                // remove off timeout from same element
                var timeout = self.data('hoveroff');
                if(timeout) clearTimeout(timeout);

                // settimeout is store conveniently in a dataattribute for later use
                // consider this tactic as a sort of "key => value" scenario
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

                // as explained above, this is to store the function instance for later use
                self.data( 'hoveroff', setTimeout(function(){ 
                                                        self.removeClass('active')
                                                            .removeClass(settings.mouseEnterClass);; 
                                                    }, settings.mouseLeaveDelay));
            });

            return elements;
        });
    }
}(jQuery));