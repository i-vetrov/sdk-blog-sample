airomo.setEnv({clientId:582169394, apiKey:'k60vg92ehyplqi99fhlnz1bpbxgmvudw'});
var totalResults = 0;
var page = 0;
var pageSize = 20;

var currentQuery = {};

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
  '<div class="app-screenshot">'+
  '<img src="{{screenshot}}" />' +
  '</div>' +
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
      .replace(new RegExp('{{applink}}', 'g'), e.trackingUrl)
      .replace('{{title}}', e.title.length > 30 ? e.title.substring(0,30) + '...' : e.title)
      .replace('{{icon}}', e.icon)
      .replace('{{category}}', catList[e.categories.pop() || 0])
      .replace('{{rating}}', e.rating.toString().substring(0, 3))
      .replace('{{storeicon}}', storeIcon)
      .replace('{{price}}', priceAlias)
      .replace('{{free}}', free)
      .replace('{{shares}}', e.totalShares || 0)
      .replace('{{reviews}}', e.totalReviews)
      .replace('{{likes}}', e.likes.totalLikes || 0)
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

function doSearch(query, store) {
  $('.search-text-icon').hide();
  $('.search-button-loader').show();
  if(query === null) {
    query = $('#query-input').val();
  }
  else {
    $('#query-input').val(query);
  }
  $('#left').html('');
  $('#right').html('');
  $('#single').html('');
  
  var queryToServer = {
    size: pageSize
  };
  if(query.substring(0,7) === 'http://' || query.substring(0,8)  === 'https://') {
    queryToServer.url = query;
  }
  else {
    queryToServer.query = query;
  }
  if(store) {
    queryToServer.platforms = [store];
  }
  console.log(queryToServer)
  currentQuery = queryToServer;
  airomo.search(queryToServer, function(err, data) {
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

function doAdvancedSearch(query, type, store) {
  $('.search-text-icon').hide();
  $('.search-button-loader').show();
  
  $('#left').html('');
  $('#right').html('');
  $('#single').html('');
  var forSR = {size: pageSize};
  if(type === 'dynamic') {
    forSR.url = query;
  } else if(type === 'static') {
    forSR.url = query; 
  } else if(type === 'keywords'){
    forSR.metaKeywords = query;
  } else if (type === 'kwlist') {
    forSR.metaKeywords = query;
  }
  if(store) {
    forSR.platforms = [store];
  }
  currentQuery = forSR;
  airomo.search(forSR, function(err, data) {
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

function scrollTopZ() {
  window.scrollTo(0, 0);
}

function nextPage() {
  $('.search-text-icon').hide();
  $('.search-button-loader').show();
  var nextPageQuery = currentQuery;
  nextPageQuery.size = pageSize;
  nextPageQuery.offset = pageSize*page;
  airomo.search(nextPageQuery, function(err, data) {
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
   // doSearch(null);
  }
}

function closePopup() {
  onCloseMessage = {
    message: 'close-popup',
    currentQuery: currentQuery
  }
  window.parent.postMessage(JSON.stringify(onCloseMessage), '*');
}

var $handleResponse = function(event) {
  var recivedData = JSON.parse(event.data);
  if(recivedData.message === 'initiate-search') {
    doSearch(recivedData.query, recivedData.store);
  } else if(recivedData.message === 'advanced-search') {
     doAdvancedSearch(recivedData.query, recivedData.queryType, recivedData.store);
  }
};

if(window.addEventListener) {
  window.addEventListener('message', $handleResponse, false);
}
else if(window.attachEvent) {
  window.attachEvent('message', $handleResponse);
}