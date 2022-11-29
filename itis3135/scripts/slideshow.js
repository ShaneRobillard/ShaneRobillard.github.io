var slideshow = ["#amaryllis","#closeup","#flowers","#herbs","#hibiscus","#hibiscus2"]
var i=0;

$(document).ready(function () {
  $('.pictures').hide();
  $(slideshow[0]).show();
});

function next(){
  i++;
  if(i==6){
    //$('#hibiscus2').hide(slideshow[5]);
    //$('#hibiscus2').show(slideshow[0]);
    i=0;
  }
  if(i==5){
    //$('#hibiscus2').show(slideshow[5]);
  }
  $(slideshow[i-1]).hide();
  $(slideshow[i]).show();
  console.log(i);
}

function prev(){
  $(slideshow[i-1]).show();
  $(slideshow[i]).hide();
  if(i<1){
    i=5;
  }
  i-=1;
  console.log(i);
}