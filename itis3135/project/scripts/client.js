  $(document).ready(function(){
    $("ul.youtube-videogallery").youtubeVideoGallery({
       innerHeight: 700,
       innerWidth: 1200 
    });
});



$(function() {
  $( ".maps" ).accordion({
    collapsible: true,
    active: false,
    header: "h3",
    heightStyle: "content",
  });
});

$( function() {
  $( "#tabs" ).tabs({
    collapsible: true,
  });
});

$('[data-fancybox="images"]').fancybox({
    baseClass: "fancybox-custom-layout",
    infobar: false,
    touch: {
      vertical: false
    },
    buttons: ["close", "thumbs", "share"],
    animationEffect: "fade",
    transitionEffect: "fade",
    preventCaptionOverlap: false,
    idleTime: false,
    gutter: 0,
    // Customize caption area
    caption: function(instance) {
      return '<h3>home</h3><p>interiors, exteriors, and the humans that inhabit them.</p><p><a href="https://unsplash.com/collections/curated/162" target="_blank">unsplash.com</a></p>';
    }
  });

function openBook(tab,pageName){
    let i;
    let tabs;
    let bookTab;

    tabs=document.getElementsByClassName("tabs");
    for(i=0;i<tabs.length;i++){
      tabs[i].style.display="none";
    }
    bookTab=document.getElementsByClassName("bookTab");
    for(i=0;i<bookTab.length;i++){
      bookTab[i].className=bookTab[i].className.replace("active","");
    }
    document.getElementById(pageName).style.display="block";
    tab.currentTarget.className += "active";
    document.getElementById("Home").click();
  }

