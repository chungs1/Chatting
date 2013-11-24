var socket = io.connect();
var name;
$(document).ready(function() {
	$(".chat").hide();
});

socket.on("chat_callback", function(data) {
	$("#chatbox").append(data);
	$("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
});

$("#join").click(function() {
	$("#join").attr('disabled', 'disabled');
	$("#set_username").fadeOut();
	$("#join").fadeOut();
	$('.chat').fadeIn(2700);
	$("#user").fadeIn();
	$("#user").innerHTML = "PSYCH IT'S TOTALLY ANONYMOUS"
});


$("#chatbox").keypress(function(e) {
	return false;
});

$("#chatbox_content").keypress(function(e) {
	if(e.which == 13) {
		var content = $("#chatbox_content").val();
		if(content != '') {
			var message = "<p>" + content + "</p>";
			$('#chatbox').append(message);
			$("#chatter").scrollTop($("#chatbox")[0].scrollHeight);
			socket.emit('chat_message', message);
			$("#chatbox_content").val("");
		}
	}
});

$("#blue").on("click", function(e) {
	$("input:focus").css({'backgroundColor':'#59B4FF'});
	$("input").css({'backgroundColor': '#59B4FF'});
	$("body").css({'backgroundColor': "#59B4FF"});
});

$("#violet").on("click", function(e) {
	$("input:focus").css({'backgroundColor':'#F759FF'});
	$("input").css({'backgroundColor': '#F759FF'});
	$("body").css({'backgroundColor': "#F759FF"});
});

$("#orange").on("click", function(e) {
	$("input:focus").css({'backgroundColor':'#FFB029'});
	$("input").css({'backgroundColor': '#FFB029'});
	$("body").css({'backgroundColor': "#FFB029"});
});

$("#green").on("click", function(e) {
	$("input:focus").css({'backgroundColor':'#49C445'});
	$("input").css({'backgroundColor': '#49C445'});
	$("body").css({'backgroundColor': "#49C445"});
});
/*var markers = {};
var connect = new WebSocket("ws://10.142.36.1:8000");
var secondPerson;

var message = {
	type: '',
	roomId: '',
	isHost: true,
	who: '',
	value: "",
};

connect.onmessage = function(message) {
	var strMsg = message.data;
	message = JSON.parse(message.data);
	if(message.type == "join") {
		var value = $("#set_username").val();
		if(value == '') {
			alert("Please enter a name");
		} else {
			name = value;
			$('#join').attr('disabled', "disabled");
			$(".set_username").fadeOut();
			$(".chat").fadeIn(2700);
			connect.send({"join": name});
		}
	} else if (message.type == "sendChat") {
		$("#chatbox").append(message.value);
		$("#chatbox").scrollTop($('#chatter')[0].scrollHeight);
		//connect.send(message)
	} 
};

$("#chatbox_content").keypress(function(e) {
	if(e.which == 13) {
		var content = $("#chatbox_content").val();
		if(content != '') {
			var messageS = "<li>" + content + "<hr></li>";
			$("#chatbox").append(messageS);
			$("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);

			message.type = "sendChat";
			message.isHost = "false";
			message.value = messageS;
			connect.send(message);

			$("#chatbox_content").val("");
		}
	}
});*/