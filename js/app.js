window.addEventListener('load', function() {

  var authBtn = document.getElementById('btn-auth'); 
  var authEngine = new Auth(authBtn);
  
  authBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if(authBtn.text == "Login"){
      authEngine.webAuth.authorize();
    }else {
     authEngine.logout(); 
    }
  });

  authEngine.handle_pageload();
});
