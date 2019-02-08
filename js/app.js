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

  var loginBtn;
  var logoutBtn;
  if(document.getElementById('btn-login').text == "Login"){
    loginBtn = document.getElementById('btn-login'); 
  } else {
    logoutBtn = document.getElementById('btn-logout');
  }

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    webAuth.authorize();
  });

  logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    logout();
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
    if (localStorage.getItem('isLoggedIn') === 'true') {
      logoutBtn.text = "Logout";
    } else {
      loginBtn.text = "Login";
    }
  }
  
  function isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    var expiration = parseInt(expiresAt) || 0;
    return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiration;
  }
  
  function handleAuthentication(){ 
    displayButtons();
  }
  
  if (localStorage.getItem('isLoggedIn') === 'true') {
    renewTokens();
  } else {
    handleAuthentication();
  }

});
