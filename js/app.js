//var authEngine = new Auth(logged_in_stuff, "init-dt");

window.addEventListener('load', function() {
  start_countdown_timer();
  
  $(".canada-flag").each(function(i,v){
   $(v).width($(window).width() * .45);
   $(v).on("click", function(){
     window.location.href = "https://appjacket.ca"
   });
  });
  
});
if (window.requestIdleCallback) {
    requestIdleCallback(function () {
        Fingerprint2.get(function (components) {
          console.log(components) // an array of components: {key: ..., value: ...}
        });
        Fingerprint2.getV18((result) => {
          console.log(result);
        });
    })
} else {
    setTimeout(function () {
        Fingerprint2.get(function (components) {
          console.log(components) // an array of components: {key: ..., value: ...}
        });
        Fingerprint2.getV18((result) => {
          console.log(result);
        });
    }, 500)
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
    var row_1 = $("<div/>");
    var row_2 = $("<div/>");
  
    $(wrapper_div).addClass("d-flex p-4 m-2 flex-column justify-content-between countdown-container");
    $(row_1).addClass("d-flex p-4 m-2 flex-row justify-content-between countdown-container");
    $(row_2).addClass("d-flex p-4 m-2 flex-row justify-content-between countdown-container");

    $(row_1).width("100%");
    $(row_2).width("100%");
  
    $(wrapper_div).append($(row_1));
    $(wrapper_div).append($(row_2));
    $example.append($(wrapper_div));
  
    labels.forEach(function(label, i) {
      if(label == "weeks" || label == "days"){
        $(row_1).append(template({
              curr: initData[label],
              next: initData[label],
              label: label
          }));
      } else{
        $(row_2).append(template({
          curr: initData[label],
          next: initData[label],
          label: label
        }));
      }
    });
  
    $(".weeks").css("margin-left", "1em");
    $(".days").css("margin-right", "1em");
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
