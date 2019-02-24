//var authEngine = new Auth(logged_in_stuff, "init-dt");

window.addEventListener('load', function() {
  start_countdown_timer();
  
  $(".canada-flag").each(function(i,v){
   $(v).on("click", function(){
     window.location.href = "https://appjacket.ca"
   });
  });
  
  $('.btn-auth').each(function(i,v){
    console.log("got a button");
    $(v).on("click", function(){
      console.log("it works!!!");
      authEngine.handleAuthBtnClick(i);
      if(authEngine.isAuthenticated()){
        $(v).text("12345");
        console.log("authEngine.isAuthenticated()");
      } else {
        $(v).text("Login");
        console.log("NOT! authEngine.isAuthenticated()");
      }
    })
  });
  
 //authEngine.handle_pageload();
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
  display_workspace();
  console.log(JSON.stringify(profile));
}
function display_workspace(){
  $(".workspace-dims").width = $('.workspace').width();
  $(".workspace-dims").height = $('.workspace').height();
  $(".workspace-dims").css("top", $('.workspace').offset().top);
  $(".workspace-dims").css("left", $('.workspace').offset().left + "px");
  $('.overlay').css("display","inline");
}

function start_countdown_timer(){
  //most of this function taken from here:
  // http://hilios.github.io/jQuery.countdown/
 var labels = ['weeks', 'days', 'hours', 'minutes', 'seconds'],
      golive_date = new Date('2022/07/11'),
      template = _.template($('#main-example-template').html()),
      currDate = '00:00:00:00:00',
      nextDate = '00:00:00:00:00',
      parser = /([0-9]{2,})/gi,
      $example = $('.main-example');
    // Parse countdown string to an object
    function strfobj(str) {
      var parsed = str.match(parser),
        obj = {};
      labels.forEach(function(label, i) {
        obj[label] = parsed[i]
      });
      return obj;
    }
    // Return the time components that diffs
    function diff(obj1, obj2) {
      var diff = [];
      labels.forEach(function(key) {
        if (obj1[key] !== obj2[key]) {
          diff.push(key);
        }
      });
      return diff;
    }
    // Build the layout
    var initData = strfobj(currDate);
  
    // this is to ensure weeks and months are on the same row in small display port devices
    var wrapper_div = $("<div/>");
    $(example).append($(wrapper_div));
  
    labels.forEach(function(label, i) {
      if(label == "weeks" || label == "days"){
          $(wrapper_div).append(template({
              curr: initData[label],
              next: initData[label],
              label: label
          }));
      } else{
        $example.append(template({
          curr: initData[label],
          next: initData[label],
          label: label
        }));
      }
    });
    // Starts the countdown
    $example.countdown(golive_date, function(event) {
      var newDate = event.strftime('%w:%d:%H:%M:%S'),
        data;
      if (newDate !== nextDate) {
        currDate = nextDate;
        nextDate = newDate;
        // Setup the data
        data = {
          'curr': strfobj(currDate),
          'next': strfobj(nextDate)
        };
        // Apply the new values to each node that changed
        diff(data.curr, data.next).forEach(function(label) {
          var selector = '.%s'.replace(/%s/, label),
              $node = $example.find(selector);
          // Update the node
          $node.removeClass('flip');
          $node.find('.curr').text(data.curr[label]);
          $node.find('.next').text(data.next[label]);
          // Wait for a repaint to then flip
          _.delay(function($node) {
            $node.addClass('flip');
          }, 50, $node);
        });
      }
    }); 
}
