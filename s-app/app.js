airomo.setEnv({clientId:582169394, apiKey:'k60vg92ehyplqi99fhlnz1bpbxgmvudw'});
var totalResults = 0;
var page = 0;
var pageSize = 20;
var currentQuery = '';
var appTemplate =  '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 main-app-holder">' +
  '<div class="row app-data-row">' +
  '<div class="app-icon-holder">' +
  '<img src="{{icon}}" class="app-icon" />' +
  '</div>' +
  '<div class="app-data-text" style="">' +
  '<div class="app-title">{{title}}</div>' +
  '<div class="app-category">{{category}}</div>' +
  '<div class="app-rating">' +
  '<span class="rating-num">{{rating}}</span>' +
  '<div class="stars-holder">' +
  '{{stars}}'+
  '</div>' +
  '</div>' +
  '<div class="app-data">' +
  '<span class="app-store"></span>' +
  '<button class="btn btn-default btn-lg app-price">{{price}}</button>' +
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
var starTemplate = '<span class="glyphicon glyphicon-star rating-star"></span>';
var catList = ['', 'Books & Reference', 'Business', 'Education', 'Entertainment', 
  'Finance', 'Games', 'Health & Fitness', 'Lifestyle', 'Media & Video', 'Medical', 
  'Music & Audio', 'Navigation', 'News & Magazines', 'Photography', 'Productivity', 
  'Shopping', 'Social', 'Sports', 'Travel & Local', 'Utilities', 'Weather', '', 
  'Personalization'];

function renderResults(results) {
  $.each(results, function(i, e) {
    e.stars = '';
    var priceAlias = 'Free'
    for(var z = 0; z < Math.floor(e.rating); z++) {
      e.stars += starTemplate;
    }
    if(e.price !== '0.00') {
      priceAlias = '$' + e.price;
      
    }
    var curApp = appTemplate
      .replace('{{title}}', e.title)
      .replace('{{icon}}', e.icon)
      .replace('{{category}}', catList[e.category.pop() || 0])
      .replace('{{rating}}', e.rating.toString().substring(0, 3))
      .replace('{{stars}}', e.stars)
      .replace('{{price}}', priceAlias)
      .replace('{{shares}}', e.shares || 0)
      .replace('{{reviews}}', e.totalReview)
      .replace('{{likes}}', e.likes || 0)
      .replace('{{description}}', e.description.substring(0, 200) + '...')
      .replace('{{screenshot}}', e.screenshots[0] || '')
      if(!!(i % 2)) {
        $('#left').append(curApp);
      }
      else {
        $('#right').append(curApp);
      }
      $('#single').append(curApp);
  });   
}

function doSearch() {
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
    }
    else {
      console.log('Something went wrong...', err);
    }
  });
}

function nextPage() {
  airomo.search({query:currentQuery, size: pageSize, offset:pageSize*page}, function(err, data) {
    if(!err) {
      page++;
      renderResults(data.results);
      if(totalResults<pageSize*page) {
        $('#more-res').hide();
      }
    }
    else {
      console.log('Something went wrong...', err);
    }
  });
}