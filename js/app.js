window.addEventListener('load', function() {
  
  var authEngine = new Auth();
  var authBtn = document.getElementById('btn-login'); 
  
  authBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if(this.text == "Login"){
      authEngine.webAuth.authorize();
    }else {
     authEngine.logout(); 
    }
  });

});
