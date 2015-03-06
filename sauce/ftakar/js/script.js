(function($) {
    $.fn.ftakar = function(options) {

        // default settings
        var settings = $.extend({
            // saveOnInterval: 200,
            saveOnInterval: false,
            saveOnChange: true,
            clearOnSubmit: true,
            expireAfterSeconds: false,
            beforeSave: function(element){ console.info('FTAKAR: data is being saved', element) },
            onSave: function(element){ console.info('FTAKAR: data saved', element) },
            beforeLoad: function(){ console.info('FTAKAR: data is being loaded') },
            onLoad: function(){ console.info('FTAKAR: data has loaded') },
            beforeClear: function(){ console.info('FTAKAR: data is going to be cleared') },
            onClear: function(){ console.info('FTAKAR: data cleared') }
        }, options);

        $(document).load(function() {
            // load all inputs
                // if expired.. delete
        });

        if (settings.clearOnSubmit) {
            this.closest('form').submit(function() {
                // clear data
            });
        }

        if (settings.saveOnInterval) {
            setInterval(function(){ 
                // save input 
            }, settings.saveOnInterval);
        }
        
        return this.change(function(eventData, handler){
            // get input
            // save input
        });
    }
}(jQuery));