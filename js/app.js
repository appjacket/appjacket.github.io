window.addEventListener('load', function() {
  var idToken;
  var accessToken;
  var expiresAt;

  var webAuth = new auth0.WebAuth({
    domain: 'dev-jobs.auth0.com',
    clientID: 'Zx2LiW55N9O1YqIE49Q70LV2eDEXpIl1',
    responseType: 'token id_token',
    scope: 'openid',
    redirectUri: window.location.href
  });

  var authBtn;
  
  if(!isAuthenticated()){
    authBtn = document.getElementById('btn-login'); 
  }

  authBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if(this.text == "Logout"){
      webAuth.authorize();
    }else {
     logout(); 
    }
  });
  
  function logout() {
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    // Remove tokens and expiry time
    accessToken = '';
    idToken = '';
    expiresAt = 0;
    displayButtons();
  }
  
  function displayButtons(){
    if (isAuthenticated()) {
      authBtn.text = "Logout";
    } else {
      authBtn.text = "Login";
    }
  }
  
  function isAuthenticated(){
    // Check whether the current time is past the
    // Access Token's expiry time
    var expiration = parseInt(expiresAt) || 0;
    return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiration;
  }

  function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        localLogin(authResult);
      } else if (err) {
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      }
      displayButtons();
    });
  }

  function localLogin(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    accessToken = authResult.accessToken;
    idToken = authResult.idToken;
  }

  function renewTokens() {
    webAuth.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        localLogin(authResult);
      } else if (err) {
        alert(
            'Could not get a new token '  + err.error + ':' + err.error_description + '.'
        );
        logout();
      }
      displayButtons();
    });
  }
  
  if (localStorage.getItem('isLoggedIn') === 'true') {
    renewTokens();
  } else {
    handleAuthentication();
  }

});
