$(document).ready(function(){
  var top_1 = $(window).scrollTop();
  var top_c = 0;
  $(window).on("scroll", function(){
      var top = $(window).scrollTop();
      if (top > top_1 && top > 300){
        if (top > (top_c + 100)) {
          $(".menu_1").addClass("menu_1-dop1");
          console.log(top+ ' '+ top_1);
          top_c = top;
        }
      } else {
        if (top < (top_c - 100)) {
          $(".menu_1").removeClass("menu_1-dop1");
          console.log(top+ ' '+ top_1);
          top_c = top;
        }
      }
      top_1 = top;
    });
});
