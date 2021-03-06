   var socket= io();

// a function to scroll down when there is a new message
   function scrollToBottom(){
    // Selectors
    var messages = $("#messages");
    var newMessage = messages.children("li:last-child")
    // Heights
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight+ lastMessageHeight>= scrollHeight){
        messages.scrollTop(scrollHeight)
    }
  
   }
    socket.on("connect", function(){
        console.log("connected")
       
    });
       socket.on("disconnect", function(){
        console.log("disconnected from browser")
    });
    

    // listens for a new message and renders it to index.html
    socket.on("newMessage", function(message) {

        var template = $("#message-template").html();
        var formattedTime = moment(message.createdAt).format("h:mm a");
        var html = Mustache.render(template, {
            text: message.text,
            from :message.from,
            createdAt: formattedTime
        });
        $("#messages").append(html);
        scrollToBottom();


      // var formattedTime = moment(message.createdAt).format("h:mm a");
         //  console.log("New Message", message)
         //  var li = $("<li> </li>");
         //  li.text(`${message.from} ${formattedTime}: ${message.text} `);
        //   $("#messages").append(li)
    });
    
     // listens for a new location-message and renders it to index.html
    socket.on("newLocationMessage", function(message){
        var template = $("#location-message-template").html();
        var formattedTime = moment(message.createdAt).format("h:mm a");
        var html = Mustache.render(template, {
            from: message.from,
            createdAt: formattedTime,
            url: message.url
        })
        $("#messages").append(html);
        scrollToBottom();

      //    var li = $("<li> </li>");
       //   var a = $("<a target='_blank'>My current location</a>");
       //   li.text(`${message.from} ${formattedTime}: `);
       //   a.attr("href", message.url);
       //   li.append(a);
        //   $("#messages").append(li)
    })

    var messageTextBox = $("[name=message]");

    socket.emit("createMessage", {
        from: "Frank",
        text: "Hiii"
    }, function(data){
        console.log("Got it ", data)
    })

    $("#message-form").on("submit", function(e){
        e.preventDefault();
        socket.emit("createMessage", {
            from: "User",
            text: messageTextBox.val()

        }, function(){
              messageTextBox.val("") 
        })
    })

    var locationButton = $("#send-location");


    locationButton.on("click", function(){
        if(!navigator.geolocation){
            return alert("Geolocation not supported by your browser")

        }

            locationButton.attr("disabled", "disabled").text("Sending location...");

            navigator.geolocation.getCurrentPosition(function(position){
                locationButton.removeAttr("disabled").text("Send location");
                socket.emit("createLocationMessage", {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            }, function(){
                console.log("oooo")
                locationButton.removeAttr("disabled").text("Send location");

                alert("Unable to fetch location!")

            })
        }
    )