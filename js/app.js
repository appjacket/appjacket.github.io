window.addEventListener('load', function() {

  var authBtn = document.getElementById('btn-auth');
  var authEngine = new Auth(authBtn, logged_in_stuff);
  
  authBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if(authBtn.text == "Login"){
      authEngine.webAuth.authorize();
    }else {
     authEngine.logout(); 
      $("#btn-auth").css("border-bottom", "0em");
      $(".overlay").remove();
    }
  });

  authEngine.handle_pageload();
  var btn_active = $("a.nav-link-width.nav-link.active");
  var old_btn_active_settings = $(btn_active).css("border-bottom");
  $("#btn-auth").hover(
    function(e){ $("a.nav-link-width.nav-link.active").css("border-bottom", "0em");}, 
    function(){$(btn_active).css("border-bottom",old_btn_active_settings);}
  );
  
  /*
  * https://stackoverflow.com/a/40447414
  */
  var resizeTimer;
  $(window).resize(function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        display_workspace();
      }, 200);
    });
  
});
function logged_in_stuff(profile){
  console.log(JSON.stringify(profile));
  display_workspace();
}
function display_workspace(){
  var container_width = $('.workspace').width(); 
  var container_height = $('.workspace').height();
  $(".workspace-dims").width = container_width;
  $(".workspace-dims").height = container_height;
  $('.overlay').css("display","inline");
/*
  $("#overlay").css('background-color',"#fff").css({
    position: "absolute",
    width: $(".workspace").width(),
    height: $(".workspace").height(),
    left: 0,
    top: 10,
    zIndex: 1000000  // to be on the safe side
  }).appendTo($(".workspace").css("position", "relative"));
  
$("<div/>").css("width","15%")
  .css("height","100%")
  .css("border-right","#000")
  .css("border-right-style","solid")
  .css("border-right-width","thin")
  .appendTo($("#overlay"));
*/  
}
