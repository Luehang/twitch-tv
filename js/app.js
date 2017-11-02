$(document).ready(function(){
var twitchAPI = "";
var channelsArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
// fetch info. through ajax
function getInfo() {
  channelsArr.forEach(function(channel) {
    twitchAPI = `https://wind-bow.gomix.me/twitch-api/streams/${channel}`;
    $.ajax({
      type: "GET",
      url: twitchAPI,
      dataType: "jsonp",
      jsonpCallback: "callback",
      success: function (data) {
        var status;
        var onOff;
        if (data.stream === null) {
          onOff = "offline";
          status = "Offline";
        } else if (data.stream == undefined) {
          onOff = "closed";
          status = "Closed";
        } else {
          onOff = "online";
          status = data.stream.channel.status;
        }
          $.ajax({
            type: "GET",
            url: `https://wind-bow.gomix.me/twitch-api/channels/${channel}`,
            dataType: "jsonp",
            jsonpCallback: "callback",
            success: function (data) {
              var logo = data.logo != null ? data.logo : "https://elearnshop.vgn.nl/Pages/Market/Content/Images/default-user.png";
              var name = data.display_name != null ? data.display_name : channel;
              var html = ``;
              html += `<li class="${data.name} ${onOff}`;
              html += `"><img href="${data.url}" `;
              html += `src="${logo}"><a href="`;
              html += `${data.url}">${name}</a>`;
              if ( status === "Online") {
                html += `<p>${data.game}: ${status}</p>`;
              } else {
                html += `<p>${status}</p>`;
              }
              html += `</li>`;
              status === "Online" ? $('#users').prepend(html) : $('#users').append(html);
            } // end success
          }); // end ajax request
      } // end success
    }); // end ajax request
  }); // end channelsArr.forEach
} // end function getUser
getInfo();
// search field
$('form').submit(function(event) {
  event.preventDefault();
  var $searchField = $('#search');
  $searchField.prop('disabled', true);
  var search = $searchField.val();
  var found = false;
  $('.online, .offline').removeClass('hidden');
  $('.online, .offline').addClass('hidden');
  for (var y = 0; y < channelsArr.length; y++) {
    if (search.toString().toUpperCase() === channelsArr[y].toUpperCase()) {
      found = true;
      $(`.${channelsArr[y]}`).removeClass('hidden');
    }
  }
  if (found === false) {
    $('.online, .offline').removeClass('hidden');
  }
  $searchField.prop('disabled', false);
})
// all, online and offline buttons tabs
$('.button').click(function() {
  $('.button').removeClass('activate');
  $(this).addClass('activate');
  var status = $(this).attr('id');
  if (status === "all") {
    $('.online, .offline').removeClass('hidden');
  } else if (status === "online") {
    $('.online').removeClass('hidden');
    $('.offline').addClass('hidden');
  } else {
    $('.offline').removeClass('hidden');
    $('.online').addClass('hidden');
  }
})
}); // end document ready
