
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


var createTweetElement = function (data) {
  var d = new Date;
  var m = new Date;
  var y = new Date;
  const tweetTemplate = `<article class="tweet">
          <div class="tweet-header clearfix">
            <img src="${data.user.avatars.regular}" class="profilePic" alt="">
            <h3>${data.user.name}</h3>
            <h4 class="at">${data.user.handle}</h4>
          </div>
          <artticle class="tweet-text">
            <p>${escape(data.content.text)}</p>
          </artticle>
          <footer class="clearfix">
            <div class="date">${d.getFullYear()}/${m.getMonth()}/${d.getFullYear()}</div>
            <div class="icons">
              <a href=""><i class="fas fa-flag"></i></a>
              <a href=""><i class="fas fa-retweet"></i></a>
              <a href=""><i class="fas fa-heart"></i></a>
            </div>
          </footer>
        </article>`;
        return tweetTemplate;
}
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

var renderTweets = function(tweets) {
   for (var i = tweets.length -1; i > 0 ; i--) {
      var newTweet = createTweetElement(tweets[i]);
      $('#tweets-container').append(newTweet);
   }
}

var loadTweets = function(){
   $.ajax('/tweets', { method: 'GET' }).then(function (tweets) {
      renderTweets(tweets);
    });
}

$(function() {
  var load = loadTweets();
  // $(".new-tweet").submit(function(e){
  //   e.preventDefault();
  // });
  $('#submitTweet').on('click', function (e) {
    $('.error').slideUp();
     e.preventDefault();
  if($('#tweetBox').val() === '' || $('#tweetBox').val() === null ){
    $('#empty').slideToggle();
  } else if($('#tweetBox').val().length > 140){
    $('#verbose').slideToggle();
  } else {

    var postedTweet = $('#new-tweet-submit').serialize();
    $.ajax({
      type : 'POST',
      url:'/tweets/' ,
      data : postedTweet,
      success: function(){
       $('#new-tweet-submit').trigger('reset');
       $('#tweets-container').empty();
       loadTweets();
      }
    });
  }
})
loadTweets();

$("#compButton").on('click', function(){
  console.log('success');
  $(".new-tweet").toggle()
  });
});






