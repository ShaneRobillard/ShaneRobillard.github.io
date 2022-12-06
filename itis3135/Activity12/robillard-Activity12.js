$(document).ready(function() {
    $("#slider").bxSlider({
        auto: true,
        randomStart: true,
        minSlides: 1,
        maxSlides: 1,
        slideWidth: 500,
        slideMargin: 20,
        captions: true,
        pause: 3000,
        moveSlides: 1,
        pager: true,
        pagerSelector: "#id_pager",
        pagerType: "short",
        slideMargin: 30
    });
});