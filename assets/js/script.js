(function($) {
$(document).ready(function(){

  

  var headings = [];

  var collectHeaders = function() {
    var headingText = $(this).text();
    var headingType = $(this).prop("tagName").toLowerCase();
    headings.push({"top": $(this).offset().top - 15, "text": headingText, "type": headingType});
  }

  $(".markdown-body h1, .markdown-body h2").each(collectHeaders);

  $(window).scroll(function() {
    if (headings.length == 0) return true;
    var scrolltop = $(window).scrollTop() || 0;
    if (headings[0] && scrolltop < headings[0].top) {
      $(".current-section").css({"opacity": 0, "visibility": "hidden"});
      return false;
    }
    $(".current-section").css({"opacity": 1, "visibility": "visible"});
    var currentHeading = null;
    for (var i = headings.length - 1; i >= 0; i--) {
      if (scrolltop >= headings[i].top) {
        if (headings[i].type === "h1") {
          $(".current-section .name").text(headings[i].text);
          $(".current-section .subheading").text(""); // Clear subheading
          currentHeading = headings[i].text;
        } else if (headings[i].type === "h2") {
          $(".current-section .subheading").text(headings[i].text);
        }
        break;
      }
    }
    // If no subheading is found for the current h1 heading, clear it
    if (currentHeading) {
      var subheadingExists = headings.some(function(heading) {
        return heading.type === "h2" && heading.text && heading.text !== "" && heading.text !== currentHeading;
      });
      if (!subheadingExists) {
        $(".current-section .subheading").text("");
      }
    }
  });

  $(".current-section a").click(function() {
    $(window).scrollTop(0);
    return false;
})
});
})(jQuery)