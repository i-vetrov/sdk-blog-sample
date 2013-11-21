airomo.setEnv({clientId:582169394, apiKey:'k60vg92ehyplqi99fhlnz1bpbxgmvudw'});
var totalResults = 0;
var page = 0;
var pageSize = 20;
var currentQuery = '';
var appTemplate =  '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 main-app-holder">' +
  '<div class="row app-data-row">' +
  '<div class="app-icon-holder">' +
  '<a href="{{applink}}" target="_blank">' +
  '<img src="{{icon}}" class="app-icon" />' +
  '</a>' +
  '</div>' +
  '<div class="app-data-text" style="">' +
  '<div class="app-title"><a href="{{applink}}" target="_blank">{{title}}</a></div>' +
  '<div class="app-category">{{category}}</div>' +
  '<div class="app-rating">' +
  '<span class="rating-num">{{rating}}</span>' +
  '<div class="stars-holder">' +
  '<span class="glyphicon glyphicon-star rating-star"></span>' +
  '</div>' +
  '</div>' +
  '<div class="app-data">' +
  '<span class="app-store"><i class="fa fa-{{storeicon}} store-icon"></i></span>' +
  '<button onclick="install(\'{{applink}}\')" class="btn btn-default btn-lg app-price {{free}}">{{price}}</button>' +
  '</div> ' +
  '</div>' +
  '<div class="app-data-stats">' +
  '<div class="app-counts">' +
  '<div class="app-count-num">{{shares}}</div>' +
  '<div class="app-count-subtitle">Shares</div>' +
  '</div>' +
  '<div class="app-counts">' +
  '<div class="app-count-num">{{reviews}}</div>' +
  '<div class="app-count-subtitle">Reviews</div>' +
  '</div>' +
  '<div class="app-counts">' +
  '<div class="app-count-num">{{likes}}</div>' +
  '<div class="app-count-subtitle">Likes</div>' +
  '</div>' +
  '</div>' +
  '</div> ' +
  '<div class="row">' +
  '<img src="{{screenshot}}" class="app-screenshot" />' +
  '</div>' +
  '<div class="row">' +
  '<div class="app-description">' +
  '{{description}}' +
  '</div>' +
  '</div>' +
  '</div>';

var catList = ['', 'Books & Reference', 'Business', 'Education', 'Entertainment', 
  'Finance', 'Games', 'Health & Fitness', 'Lifestyle', 'Media & Video', 'Medical', 
  'Music & Audio', 'Navigation', 'News & Magazines', 'Photography', 'Productivity', 
  'Shopping', 'Social', 'Sports', 'Travel & Local', 'Utilities', 'Weather', '', 
  'Personalization'];

function renderResults(results) {
  console.log(results)
  $.each(results, function(i, e) {
    var storeIcon;
    if(e.store == 1) {
      storeIcon = 'apple';
    }
    else {
      storeIcon = 'android';
    }
    e.stars = '';
    var priceAlias = 'Free';
    var free = 'btn-red';
    if(e.price !== '0.00') {
      priceAlias = '$' + e.price;
      free = '';
    }
    var curApp = appTemplate
      .replace(new RegExp('{{applink}}', 'g'), e.nativeUrl)
      .replace('{{title}}', e.title.length > 30 ? e.title.substring(0,30) + '...' : e.title)
      .replace('{{icon}}', e.icon)
      .replace('{{category}}', catList[e.category.pop() || 0])
      .replace('{{rating}}', e.rating.toString().substring(0, 3))
      .replace('{{storeicon}}', storeIcon)
      .replace('{{price}}', priceAlias)
      .replace('{{free}}', free)
      .replace('{{shares}}', e.shares || 0)
      .replace('{{reviews}}', e.totalReview)
      .replace('{{likes}}', e.likes || 0)
      .replace('{{description}}', e.description.substring(0, 200) + '...')
      .replace('{{screenshot}}', e.screenshots[0] || '')
      if(!!(i % 2)) {
        $('#right').append(curApp);
      }
      else {
        $('#left').append(curApp);
      }
      $('#single').append(curApp);
  });   
}

function doSearch() {
  $('.search-text-icon').hide();
  $('.search-button-loader').show();
  var query = $('#query-input').val();
  currentQuery = query;
  $('#left').html('');
  $('#right').html('');
  $('#single').html('');
  airomo.search({query:query, size: pageSize}, function(err, data) {
    if(!err) {
      page = 1;
      totalResults = data.total;
      $('#total-res').html(totalResults);
      $('#total-apps').show();
      if(totalResults>pageSize) {
        $('#more-res').show();
      }
      renderResults(data.results);
      $('.search-text-icon').show();
      $('.search-button-loader').hide();
    }
    else {
      console.log('Something went wrong...', err);
    }
  });
}

function nextPage() {
  $('.search-text-icon').hide();
  $('.search-button-loader').show();
  airomo.search({query:currentQuery, size: pageSize, offset:pageSize*page}, function(err, data) {
    if(!err) {
      page++;
      renderResults(data.results);
      if(totalResults<pageSize*page) {
        $('#more-res').hide();
      }
      $('.search-text-icon').show();
      $('.search-button-loader').hide();
    }
    else {
      console.log('Something went wrong...', err);
    }
  });
}

function install(url) {
  window.open(url);
}

function keyListener(event) {
  if(event.keyCode == 13){
    doSearch();
  }
}