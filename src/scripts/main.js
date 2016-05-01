/**
 * Created by tomi on 30/04/16.
 */
var backToTopButton = document.getElementById("backToTop");
backToTopButton.addEventListener("click", function(){
    tomiScroll("page", 800);
});

function tomiScroll(targetID, scrollDuration) {
    var page = $('html,body');
    var element_to_scroll_to = $("#"+targetID);
    page.animate({
        scrollTop: element_to_scroll_to.offset().top
    }, scrollDuration);
}