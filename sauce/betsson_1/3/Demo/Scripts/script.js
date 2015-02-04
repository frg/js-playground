
var tags = null;
var xhrStatusELement = $("#xhrStatus");
$("#tags").keyup(function () {
    clearTimeout(tags);
    tags = setTimeout(function () {
        if ($("#tags").val().length < 3) {
            return false;
        }

        var URL = window.location + "/Home/GetImages?tags=" + $("#tags").val();

        $("#link").html(URL).attr("href", URL);

        xhrStatusELement.html('Requesting');
        $.getJSON(URL, function (data) {
            xhrStatusELement.html('Retreiving');

            var container = $("#container").html("");

            $.each(data, function () {
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
        });
    }, 250);
});