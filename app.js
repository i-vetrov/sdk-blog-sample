airomo.setEnv({clientId:582169394, apiKey:'k60vg92ehyplqi99fhlnz1bpbxgmvudw'});

(function() {
  var appTemplate = '<li>' +
    '<div class="overlay"> <a href="{{app_url}}"><img style="width:70px;height:70px;" src="{{app_icon}}" alt="" />' +
    '<div></div>' +
    '</a> </div>' +
    '<div class="meta">' +
    '<h6><a href="{{app_url}}">{{app_title}}</a></h6>' +
    '<em>{{app_descr}}</em> </div>' +
    '</li>';
  airomo.search({query:'porsche', size: 4}, function(err, data) {
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
  var appTemplate = '<div class="search-item">' +
    '<a href="{{app_url}}">' +
    '<img style="width:100%;height:100%;" src="{{app_icon}}" alt="" />' +
    '</a></div>';
  airomo.search({query:'classic cars', size: 12}, function(err, data) {
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
  var keywords = ' classic cars';
  var url = 'http://www.appcurl.com/?q=' + encodeURIComponent($('#s2').val() + keywords) + platform;
  window.open(url);
  return false;
}