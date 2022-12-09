$(function() {
  $( ".maps" ).accordion({
    collapsible: true,
    active: false,
    header: "h3",
    heightStyle: "content",
  });
});

$('#saltwatercatfish').on({
    'click': function(){
        $("#current, #caption").fadeOut("slow", function() {
            $('#current').attr('src', "../project/images/saltwatercatfish.jpg");
            $("#caption").html("This is a saltwater catfish. It is very commonly caught while surf fishing, so much so that most fishermen consider them a nuisance. They can be found all over the place in salt water locations.");
            $("#current, #caption").fadeIn("slow");
        });             
    }
});

$('#whiting').on({
    'click': function(){
        $("#current, #caption").fadeOut("slow", function() {
            $('#current').attr('src', "../project/images/whiting.jpg");
            $("#caption").html("This is a whiting fish. It is a very popular and abundant fish caught while fishing from the beach. They are very easy to catch and can be caught in just about any eastern coast fishing spot.");
            $("#current, #caption").fadeIn("slow");
        });             
    }
});

$('#pompano').on({
    'click': function(){
        $("#current, #caption").fadeOut("slow", function() {
            $('#current').attr('src', "../project/images/pompanofish.jpg");
            $("#caption").html("This is a pompano. It is another very popular fish, that is commonly targeted while surf fishing. It is relatively smaller in size compared to the first two fish.");
            $("#current, #caption").fadeIn("slow");
        });             
    }
});

$('#reddrum').on({
    'click': function(){
        $("#current, #caption").fadeOut("slow", function() {
            $('#current').attr('src', "../project/images/reddrum.jpg");
            $("#caption").html("This is a red drum. This is the largest fish so far. It can be commonly found off the coasts of the southeastern US.");
            $("#current, #caption").fadeIn("slow");
        });             
    }
});

$('#blackdrum').on({
    'click': function(){
        $("#current, #caption").fadeOut("slow", function() {
            $('#current').attr('src', "../project/images/blackdrum.jpg");
            $("#caption").html("This is a black drum. This fish can get huge so be prepared for a long fight if you catch one. These can be found along almost all the coasts of the US.");
            $("#current, #caption").fadeIn("slow");
        });             
    }
});

$('#bluefish').on({
    'click': function(){
        $("#current, #caption").fadeOut("slow", function() {
            $('#current').attr('src', "../project/images/bluefish.jpg");
            $("#caption").html("This is a blue fish. It is not known for the best tasting meat but if cleaned and eaten quickly, it can actually taste quite good. It is found on most Gulf or Atlantic beaches.");
            $("#current, #caption").fadeIn("slow");
        });             
    }
});

$('#snook').on({
  'click': function(){
      $("#current, #caption").fadeOut("slow", function() {
          $('#current').attr('src', "../project/images/snook.jpg");
          $("#caption").html("This is a snook. They are known for really good tasting meat and a powerful fight. These are generally only found in the southernmost waters because of their intolerance to cold.");
          $("#current, #caption").fadeIn("slow");
      });             
  }
});

$('#speckledtrout').on({
  'click': function(){
      $("#current, #caption").fadeOut("slow", function() {
          $('#current').attr('src', "../project/images/speckledtrout.jpg");
          $("#caption").html("This is a speckled trout. Even though it has trout in the name, it is not actually related to trout at all. They can be found all along the eastern seaboard.");
          $("#current, #caption").fadeIn("slow");
      });             
  }
});

$('#spanishmackerel').on({
  'click': function(){
      $("#current, #caption").fadeOut("slow", function() {
          $('#current').attr('src', "../project/images/spanishmackerel.jpg");
          $("#caption").html("This is a spanish mackerel. They are known to be fun to catch and because they school you can end up catching alot of them. They are mostly found in the southeastern US.");
          $("#current, #caption").fadeIn("slow");
      });             
  }
});

$('#smallshark').on({
  'click': function(){
      $("#current, #caption").fadeOut("slow", function() {
          $('#current').attr('src', "../project/images/smallshark.jpg");
          $("#caption").html("This is a small saltwater shark. There are many species of them to be found off the coasts of the US. However most species caught surf fishing are bonnethead and shovelhead sharks.");
          $("#current, #caption").fadeIn("slow");
      });             
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

