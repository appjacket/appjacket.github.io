class Auth {
  constructor() {
    this.idToken;
    this.accessToken;
    this.expiresAt;
    this.webAuth;
    this.userProfile;
    
    if (window.location.href.indexOf("dev") != -1){
        this.webAuth = new auth0.WebAuth({
          domain: 'dev-jobs.auth0.com',
          clientID: 'Zx2LiW55N9O1YqIE49Q70LV2eDEXpIl1',
         responseType: 'token id_token',
         scope: 'openid profile',
         redirectUri: window.location.href
       });
    }else{
        this.webAuth = new auth0.WebAuth({
          domain: 'prod-appjacket.auth0.com',
          clientID: 'tsvYvSnQxlcJFHFTo_Ebf1o2ZF-nk67M',
          responseType: 'token id_token',
          scope: 'openid',
          redirectUri: window.location.href
        }); 
    }
  }
  
  getProfile() {
    if (!userProfile) {
      if (!accessToken) {
       console.log('Access Token must exist to fetch profile');
     }
     webAuth.client.userInfo(accessToken, function(err, profile) {
        if (profile) {
          this.userProfile = profile;
          this.displayProfile();
        }
      });
    }
  }
  
  displayProfile(){
    console.log("not needed for now");
  }
  
  logout() {
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    // Remove tokens and expiry time
    this.accessToken = '';
    this.idToken = '';
    this.expiresAt = 0;
    this.displayButtons();
  }
  
  displayButtons(){
    if (isAuthenticated()) {
      console.log("is authenticated");
      this.getProfile();
    }
  }
  
  isAuthenticated(){
    // Check whether the current time is past the
    // Access Token's expiry time
    var expiration = parseInt(expiresAt) || 0;
    return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiration;
  }
  
  localLogin(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    this.expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
  }
  
  handleAuthentication() {
    this.webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
      } else if (err) {
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      }
      this.displayButtons();
    });
  }

  renewTokens() {
    this.webAuth.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(
            'Could not get a new token '  + err.error + ':' + err.error_description + '.'
        );
        this.logout();
      }
      this.displayButtons();
    });
  }
  
  handle_pageload() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
     this.renewTokens();
    } else {
      this.handleAuthentication();
    }
  }

}
