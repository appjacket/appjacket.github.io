class Auth {
  constructor() {
    this.idToken;
    this.accessToken;
    this.expiresAt;
    this.webAuth;
    this.userProfile;
    
    if (window.location.href.indexOf("dev") != -1){
        webAuth = new auth0.WebAuth({
          domain: 'dev-jobs.auth0.com',
          clientID: 'Zx2LiW55N9O1YqIE49Q70LV2eDEXpIl1',
         responseType: 'token id_token',
         scope: 'openid profile',
         redirectUri: window.location.href
       });
    }else{
        webAuth = new auth0.WebAuth({
          domain: 'prod-appjacket.auth0.com',
          clientID: 'tsvYvSnQxlcJFHFTo_Ebf1o2ZF-nk67M',
          responseType: 'token id_token',
          scope: 'openid',
          redirectUri: window.location.href
        }); 
    }
  }
  
  function getProfile() {
    if (!userProfile) {
      if (!accessToken) {
       console.log('Access Token must exist to fetch profile');
     }
     webAuth.client.userInfo(accessToken, function(err, profile) {
        if (profile) {
          this.userProfile = profile;
          displayProfile();
        }
      });
    }
  }
  
  function displayProfile(){
    console.log("not needed for now");
  }
  
  function logout() {
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    // Remove tokens and expiry time
    this.accessToken = '';
    this.idToken = '';
    this.expiresAt = 0;
    displayButtons();
  }
  
  function displayButtons(){
    if (isAuthenticated()) {
      console.log("is authenticated");
      getProfile();
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
    this.expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
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

}
