
var tags = null;
$("#tags").keyup(function () {
    

    clearTimeout(tags);
    tags = setTimeout(function () {
        if ($("#tags").val().length < 3) {
            return false;
        }

        var URL = window.location + "/Home/GetImages?tags=" + $("#tags").val();

        $("#link").html(URL).attr("href", URL);

        $.getJSON(URL, function (data) {
            var container = $("#container");
            container.html("");

            $.each(data, function () {
                var thumb = $("<div>");
                var image = $("<img>")
                    .attr("src", this.ImageUrl);

                var title = $("<span>")
                    .html(this.Title);

                thumb.append(title);
                thumb.append(image);


                container.append(thumb);
            });
        });
    }, 250);
})