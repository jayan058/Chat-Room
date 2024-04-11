const socket=io("http://localhost:3000/");
var joinbutton=document.querySelector('.joinbutton')
var username=document.querySelector('.username')
var chat_messages=document.querySelector('.chat-messages')
var user_messages=document.querySelector('.user-messages')
var send_message=document.querySelector('.send-message')
var active_users=document.querySelector('.active-users')
var leavebutton=document.querySelector('.leavebutton')
var typingalert=document.querySelector('.typingalert')
 var joined=false;
 username.focus();
var nameofmessanger="";

joinbutton.addEventListener('click',(e)=>{
jointhechat(e)

})

function jointhechat(e) {
   
    e.preventDefault();
    if(username.value!=""){
        if(joined==false){
            joined=true;
            nameofmessanger=username.value
     socket.emit('username',username.value);
   
    
    }

else{
  window.alert("You are already logged in if you want to join again reload and join with a different username")
  username.value='';
user_messages.focus();
}
    }
else{
  window.alert("Enter a username to Join the chat")

}

}       
send_message.addEventListener('click',(e)=>{
    sendthemessage(e)
    
    })
    
    function sendthemessage(e) {


        e.preventDefault();
       if(chat_messages.children.length!=0){
        if(!chat_messages.children[0].classList.contains('adminwelcome_messages')){
            window.alert('Enter a username first')
        }
        else{
              socket.emit('message',user_messages.value,nameofmessanger)
              user_messages.value='';
              user_messages.focus();
        }
    }
    
    else 
    
    {
        
        if(chat_messages.children.length==0){
        
        window.alert('Enter a username first')
    }


        
    }
}    





socket.on('newuserjoined',(name)=>{

     if(chat_messages.children.length==0){}
    else{
     if(chat_messages.children[0].classList.contains('adminwelcome_messages')){
    othersname=name;
  chat_messages.insertAdjacentHTML("beforeend",
  `  <div class="adminprompt_messages">
  <span class="adminprompt_message">${othersname} has joined the conversation</span>
   <span>
</div> `
  
  
  
  )  
    }
  }
})

socket.on('welcomemessage',(data)=>{
    console.log("Welcomemessage joined");
yourname=data;
    chat_messages.insertAdjacentHTML("afterbegin",
  `  <div class="adminwelcome_messages">
  <span class="welcome-message">Hello ${yourname} Welcome To Companion Care </span>
  
</div> `)
username.value='';
user_messages.focus();

  
    
})


socket.on('tothesender',(data,time)=>{
    chat_messages.insertAdjacentHTML("beforeend",
  ` <div class="messagesuser1">
  <span class="senderuser1">${yourname}</span>
  <span class="message">${data} </span>
  <span class="time">${time} </span>
</div> `
  
  )

  chat_messages.scrollTop=chat_messages.scrollHeight;
})

socket.on('totherecievers',(data,time,nameofmessanger)=>{
    if(chat_messages.children[0].classList.contains('adminwelcome_messages')){
    chat_messages.insertAdjacentHTML("beforeend",
  ` <div class="messagesuser2">
  <span class="senderuser2">${nameofmessanger}</span>
  <span class="message">${data} </span>
  <span class="time">${time} </span>
</div> `
    
  )

  
    }

    chat_messages.scrollTop=chat_messages.scrollHeight;
})
socket.on('left',(data)=>{


  if (chat_messages.children.length!=0) {
    if(chat_messages.children[0].classList.contains('adminwelcome_messages')){
  chat_messages.insertAdjacentHTML("beforeend",
  `  <div class="adminwelcome_messages">
  <span class= "welcome-message"> ${data} is disconnected </span>
  
</div> `)
  }

  }
  
})

socket.on('useristyping',(data)=>{

  if(chat_messages.children[0].classList.contains('adminwelcome_messages')){
   typingalert.value=`${data} is typing......`;
  }
})


socket.on('userisnottyping',(data)=>{
   
  
 typingalert.value="";
  

})

leavebutton.addEventListener('click',(e)=>{
leavethechat(e);


})
function leavethechat(e){
e.preventDefault();
var a=window.confirm("Are you sure you want to leave?");
if(a==true){
  socket.emit('left',yourname);
  window.close();
}
else{


}




}


user_messages.addEventListener('keypress',()=>{
    socket.emit('useristyping',yourname)
})


user_messages.addEventListener('keyup',()=>{

 
  socket.emit('userisnottyping',yourname)

  
})