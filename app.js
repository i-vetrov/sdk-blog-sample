function mobileDetect() {
  var mobileOS;
  var agent = navigator.userAgent.toLowerCase();
  if (agent.match(/ipad/i) || agent.match(/iphone/i)) {
    mobileOS = 'ios';
  }
  else if (agent.match(/android/i)) {
    mobileOS = 'android';
  }
  else {
    mobileOS = 'unknown';
  }
  return mobileOS;
}

airomo.setEnv({clientId:582169394, apiKey:'k60vg92ehyplqi99fhlnz1bpbxgmvudw'});

(function() {
  var mob = mobileDetect();
  var appTemplate = '<li>' +
    '<div class="overlay"> <a href="{{app_url}}"><img style="width:70px;height:70px;" src="{{app_icon}}" alt="" />' +
    '<div></div>' +
    '</a> </div>' +
    '<div class="meta">' +
    '<h6><a href="{{app_url}}">{{app_title}}</a></h6>' +
    '<em>{{app_descr}}</em> </div>' +
    '</li>';
  var query = {query:'porsche', size: 4};
  if(mob === 'ios') {
    query.store = 1;
  }
  else if(mob === 'android') {
    query.store = 2;
  }
  airomo.search(query, function(err, data) {
    if(!err) {
      $('#porsche-apps').html('');
      $.each(data.results, function(i, e) {
        var tpl = appTemplate;
        $('#porsche-apps').append(
          tpl.replace('{{app_icon}}', e.icon)
             .replace('{{app_title}}', e.title)
             .replace('{{app_descr}}', e.description.substring(0, 30) + '...')
             .replace(new RegExp('{{app_url}}', 'g'), 'http://www.airomo.net/apps/' + e.id)
        );
      });
    }
    else {
      console.log(err);
    }
  });
})();


(function() {
  var mob = mobileDetect();
  var appTemplate = '<div class="search-item">' +
    '<a href="{{app_url}}">' +
    '<img style="width:100%;height:100%;" src="{{app_icon}}" alt="" />' +
    '</a></div>';
  
  var query = {query:'classic cars', size: 12};
  if(mob === 'ios') {
    query.store = 1;
  }
  else if(mob === 'android') {
    query.store = 2;
  }
  airomo.search(query, function(err, data) {
    if(!err) {
      $('#classic-cars').html('');
      $.each(data.results, function(i, e) {
        var tpl = appTemplate;
        $('#classic-cars').append(
          tpl.replace('{{app_icon}}', e.icon)
             .replace('{{app_title}}', e.title)
             .replace('{{app_descr}}', e.description.substring(0, 30) + '...')
             .replace(new RegExp('{{app_url}}', 'g'), 'http://www.airomo.net/apps/' + e.id)
        );
      });
    }
    else {
      console.log(err);
    }
  });
})();

function doSearch() {
  var platform = '';
  var mob = mobileDetect();
  if(mob === 'ios') {
    platform = '&stores=1';
  }
  else if(mob === 'android') {
    platform = '&stores=1';
  }
  var keywords = ' classic cars';
  var url = 'http://www.appcurl.com/?q=' + encodeURIComponent($('#s2').val() + keywords) + platform;
  window.open(url);
  return false;
}