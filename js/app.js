var authBtn = $('.btn-auth');
var authEngine = new Auth(authBtn, logged_in_stuff);

window.addEventListener('load', function() {
  authBtn.each(function(i,v){
    $(this).on("click", function(){
      console.log("it works!!!");
      authEngine.handleAuthBtnClick(i);
    })
  });

  authEngine.handle_pageload();
  var btn_active = $("a.nav-link-width.nav-link.active");
  var old_btn_active_settings = $(btn_active).css("border-bottom");
  $(".nav-link-width.nav-link.btn-auth").hover(
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
  $(".workspace-dims").width = $('.workspace').width();
  $(".workspace-dims").height = $('.workspace').height();
  $(".workspace-dims").css("top", $('.workspace').offset().top);
  $(".workspace-dims").css("left", $('.workspace').offset().left + "px");
  $('.overlay').css("display","inline");
}
