
var tags = null;
var xhrStatusELement = $("#xhrStatus");
$("#tags").keyup(function () {
    clearTimeout(tags);
    tags = setTimeout(function () {
        if ($("#tags").val().length < 3) {
            return false;
        }

        // check if user is requesting cached data
        var getCached = ($('input[name="getCached"]').attr('checked') == 'checked') ? true : false;
        var URL = window.location + "/Home/GetImages?tags=" + $("#tags").val() + "&cached=" + getCached;

        $("#link").html(URL).attr("href", URL);

        xhrStatusELement.html('Requesting');
        $.ajax({
            type: "POST",
            dataType: "json",
            url: URL,
            success: function (data) {
                console.info(data);
                xhrStatusELement.html('Retreiving');

                var container = $("#container").html("");

                // indication if cached or not
                $('#isCached').html((data.cached) ? 'Loaded from cache' : 'Loaded from Flicker');

                $.each(data.data, function () {
                    var thumb = $("<div>").addClass('item');
                    var image = $("<img>")
                        .attr("src", this.ImageUrl);

                    var title = $("<p>")
                        .html(this.Title);

                    thumb.append(title);
                    thumb.append(image);

                    image.fadeIn("slow");

                    container.append(thumb);
                });
            }
        });
    }, 250);
});