window.addEventListener('load', function() {

  var authBtn = document.getElementById('btn-auth'); 
  var authEngine = new Auth(authBtn);
  
  authBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if(authBtn.text == "Login"){
      authEngine.webAuth.authorize();
    }else {
     authEngine.logout(); 
      $("#btn-auth").css("border-bottom", "0em");
    }
  });

  authEngine.handle_pageload();
  var btn_active = $("a.nav-link-width.nav-link.active");
  var old_btn_active_settings = $(btn_active).css("border-bottom");
  $("#btn-auth").hover(
    function(e){ $("a.nav-link-width.nav-link.active").css("border-bottom", "0em");}, 
    function(){$(btn_active).css("border-bottom",old_btn_active_settings);}
  );
  
});
