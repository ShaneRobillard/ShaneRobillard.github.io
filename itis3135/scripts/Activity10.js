$('#both').on({
    'click': function(){
        $("#current, #caption").fadeOut("slow", function() {
            $('#current').attr('src', "../itis3135/images/both.jpg");
            $("#caption").html("Both Cats");
            $("#current, #caption").fadeIn("slow");
        });             
    }
});

$('#cuddles').on({
    'click': function(){
        $("#current, #caption").fadeOut("slow", function() {
            $('#current').attr('src', "../itis3135/images/cuddles.jpg");
            $("#caption").html("Cuddles");
            $("#current, #caption").fadeIn("slow");
        });             
    }
});

$('#hiding').on({
    'click': function(){
        $("#current, #caption").fadeOut("slow", function() {
            $('#current').attr('src', "../itis3135/images/hiding.jpg");
            $("#caption").html("Hiding in the Closet");
            $("#current, #caption").fadeIn("slow");
        });             
    }
});

$('#laundry').on({
    'click': function(){
        $("#current, #caption").fadeOut("slow", function() {
            $('#current').attr('src', "../itis3135/images/laundry.jpg");
            $("#caption").html("Hiding in the Laundry");
            $("#current, #caption").fadeIn("slow");
        });             
    }
});

$('#sleeping1').on({
    'click': function(){
        $("#current, #caption").fadeOut("slow", function() {
            $('#current').attr('src', "../itis3135/images/sleeping1.jpg");
            $("#caption").html("Sleeping on the Bed");
            $("#current, #caption").fadeIn("slow");
        });             
    }
});

$('#sleeping2').on({
    'click': function(){
        $("#current, #caption").fadeOut("slow", function() {
            $('#current').attr('src', "../itis3135/images/sleeping2.jpg");
            $("#caption").html("Sleeping Again");
            $("#current, #caption").fadeIn("slow");
        });             
    }
});

//  window.onload= function(){
//      var mainImg= document.getElementById('current');

//      document.getElementById('both').onclick= function(){
//      $("#current").fadeOut(1000);
//      mainImg.src="../itis3135/images/both.jpg";
//      $("#current").fadeIn(1000);
//      };

//      document.getElementById('cuddles').onclick = function(){
//      $("#current").fadeOut(1000);
//      mainImg.src="../itis3135/images/cuddles.jpg";
//      $("#current").fadeIn(1000);
//      };

//      document.getElementById('hiding').onclick= function(){
//      $("#current").fadeOut(1000);
//      mainImg.src="../itis3135/images/hiding.jpg";
//      $("#current").fadeIn(1000);
//      };

//      document.getElementById('laundry').onclick = function(){
//      $("#current").fadeOut(1000);
//      mainImg.src="../itis3135/images/laundry.jpg";
//      $("#current").fadeIn(1000);
//      };

//      document.getElementById('sleeping1').onclick= function(){
//      $("#current").fadeOut(1000);
//      mainImg.src="../itis3135/images/sleeping1.jpg";
//      $("#current").fadeIn(1000);
//      };

//      document.getElementById('sleeping2').onclick = function(){
//      $("#current").fadeOut(1000);
//      mainImg.src="../itis3135/images/sleeping2.jpg";
//      $("#current").fadeIn(1000);
//      };
//  };