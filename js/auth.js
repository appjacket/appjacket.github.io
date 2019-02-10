class Auth {
  constructor(login_function) {
    this.idToken;
    this.accessToken;
    this.expiresAt;
    this.webAuth;
    this.userProfile;
    this.login_function = login_function;
    
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
          scope: 'openid profile',
          redirectUri: window.location.href
        }); 
    }
  }
  
  handleAuthentication(__this) {
    console.log("inside handleAuthentication");
    var _this;
    if (typeof __this !== undefined) {
      console.log("__this is NOT undefined");
      _this = __this;
    }else {
      _this = this;
    }

    var running_this;
    if(typeof this.webAuth !== undefined) {
      running_this = this.webAuth;
      console.log("this.webAuth");
    } else {
      running_this = _this.webAuth;
      console.log("_this.webAuth");
    }
    running_this.parseHash(function(err, authResult) {
      console.log(JSON.stringify(authResult));
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        _this.localLogin(authResult);
        if (_this.isAuthenticated()){
         console.log("inside handleAuthentication, we're now authorized"); 
        } else {
         console.log("inside handleAuthentication, we're still NOT authorized..."); 
        }
      } else if (err) {
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      } else {
        alert("Weird...very weird.");
      }
      //_this.displayButtons();
    });
  }
  handleAuthBtnClick() {
    var _this = this;
    $(".btn-auth").each(function(){
      if (_this.isAuthenticated()){
        console.log("Authenticated...");
        $(this).text("Logout");
      } else {
        console.log("...Not authenticated...");
        $(this).text("Login");
        _this.handleAuthentication(_this);
      }
    });
  }
  displayButtons(){
    /*
    if (this.isAuthenticated()) {
      console.log("is authenticated");
      this.getProfile();
      this.login_function(this.userProfile);
    }
    */
    console.log("display buttons is not implemented...");
  }
  
  getProfile() {
    var _this = this;
    if (!this.userProfile) {
      if (!this.accessToken) {
       console.log('Access Token must exist to fetch profile');
     }
     this.webAuth.client.userInfo(_this.accessToken, function(err, profile) {
        if (profile) {
          _this.userProfile = profile;
          _this.displayProfile();
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
  
  isAuthenticated(){
    // Check whether the current time is past the
    // Access Token's expiry time
    var expiration = parseInt(this.expiresAt) || 0;
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
