


jQuery(document).ready(function(){
var postop = $('.parallax .parallax__layer__6 img').position().top;
var cover = $('.parallax__cover').position().top - 10;

var currentX = '', currentY= '';
var movementConstant = 0.011;

 $('.parallax').mousemove(function(e){
   if (currentX == '') currentX = e.pageX;
   var xdiff = e.pageX - currentX;
   currentX = e.pageX;
   //console.log('X:'+ xdiff);
   if (currentY == '') currentY = e.pageY;
   var ydiff = e.pageY - currentY;
   currentY = e.pageY;

   $('.parallax img').each(function(i, el){

     var movement = (i + 1) * (xdiff * movementConstant);
     var movementy = (i + 1) * (ydiff * movementConstant);


     var newX = $(el).position().left + movement;
     var newY = $(el).position().top + movementy;


     var nextop = postop - $('.parallax .parallax__layer__6 img').position().top;
     $('.parallax__cover').css('top', cover - nextop + 'px')

     $(el).css('left', newX + 'px');
     $(el).css('top', newY + 'px');



   });


 });

 $("#link").on("mousedown", function(event) {
     if (event.which == 2) {
        event.preventDefault();
     }
 });
 });








/*
$(window).scroll(function(){

  var st = $(this).scrollTop();

  for (var i = 0; i < 6; i++) {
    var arr = [1.8, 2, 2.6, 3.5, 4, 5];
console.log(i);
    $(" div .parallax__layer__"+i).css({
      "transform" : "translate(0%, " + st/(arr[i]*6.5) + "%"
    });
  }



});
*/
