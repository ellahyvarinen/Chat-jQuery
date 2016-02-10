$(function() {
  'use strict';

  //Global variable
  var uID = 0;

  var showMessages = function() {
    $.getJSON('http://users.metropolia.fi/~ilkkamtk/chatApi/messages', function(json) {
      json.reverse();
      $.each(json, function(key, viesti) {
        console.log('key: ' + key);
        console.log(viesti);
        var p = $('<h4>' + viesti.name + '</h4><p>' + viesti.message + '</p>');
				//var reply = $('<button type="button" class="btn btn-default" data-toggle="modal" data-target="#replyModal" data-mID="">Reply</button>');
				var hr = $('<hr>');
        $('#messages').append(p);
				//$('#messages').append(reply);
				$('#messages').append(hr);
      });
    });
  }

  $('#loginForm').submit(function(evt) {
    var options = {
      type: 'POST',
      dataType: 'json',
      url: 'http://users.metropolia.fi/~ilkkamtk/chatApi/login',
      success: function(resp) {
        console.log(resp);
        $('input[name=uID]').val(resp.uID);
        $('#profile h3 small').text(resp.name);
        $('#profile img').attr('src', resp.profileImage);
        showMessages();
      }
    };
    evt.preventDefault();
    $(this).ajaxSubmit(options);
    $('.login').remove();
  });

  $('#signUpForm').submit(function(evt) {
    var options = {
      type: 'POST',
      dataType: 'json',
      url: 'http://users.metropolia.fi/~ilkkamtk/chatApi/users',
      success: function(resp) {
        console.log(resp);
        $('input[name=uID]').val(resp.uID);
        $('#profile h3 small').text(resp.name);
        $('#profile img').attr('src', resp.profileImage);
        showMessages();
      }
    };
    evt.preventDefault();
    $(this).ajaxSubmit(options);
    $('.login').remove();
  });

  $('#deleteProfileForm').submit(function(evt) {
    var options = {
      method: "DELETE",
      dataType: "json",
      url: 'http://users.metropolia.fi/~ilkkamtk/chatApi/users/' + uID,
      success: function(resp) {
        console.log(resp);
        $('input[name=uID]').val(resp.uID);
        location.reload();
      }
    };
    evt.preventDefault();
    $(this).ajaxSubmit(options);
  });

  $('#imageForm').submit(function(evt) {
    var options = {
      type: 'POST',
      dataType: 'json',
      url: 'http://users.metropolia.fi/~ilkkamtk/chatApi/images',
      success: function(resp) {
        console.log(resp);
        $('#profile img').attr('src', resp.profileImage);
      }
    };
    evt.preventDefault();
    $(this).ajaxSubmit(options);
  });


  $('#messageForm').submit(function(evt) {
    console.log('viesti');
    var options = {
      type: 'POST',
      dataType: 'json',
      url: 'http://users.metropolia.fi/~ilkkamtk/chatApi/messages',
      success: function(resp) {
        console.log(resp);
        showMessages();
      }
    };
    evt.preventDefault();
    $(this).ajaxSubmit(options);
  });

  /*
	<!-- BUTTONS -->
<div class="btn-group">
	<!-- Reply message button -->
	<button type="button" class="btn btn-default" data-toggle="modal" data-target="#replyModal" data-mID="">Reply</button>
	<!-- Modify message button -->
	<button type="button" class="btn btn-default" data-toggle="modal" data-target="#modifyModal">Modify</button>
	<!-- Delete message button -->
	<button type="button" class="btn btn-default">Delete message</button>
</div>
*/
  $('#replyForm').submit(function(evt) {
    console.log('viesti');
    var options = {
      type: 'POST',
      dataType: 'json',
      url: 'http://users.metropolia.fi/~ilkkamtk/chatApi/messages',
      success: function(resp) {
        console.log(resp);
        showMessages();
      }
    };
    evt.preventDefault();
    $(this).ajaxSubmit(options);
  });

  $('#modifyForm').submit(function(evt) {
    console.log('viesti');
    var options = {
      type: 'PUT',
      dataType: 'json',
      url: 'http://users.metropolia.fi/~ilkkamtk/chatApi/messages',
      success: function(resp) {
        console.log(resp);
        showMessages();
      }
    };
    evt.preventDefault();
    $(this).ajaxSubmit(options);
  });



});
