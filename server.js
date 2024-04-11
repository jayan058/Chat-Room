const express=require('express');
const app= express();

const http=require('http');
    const {Server}=require('socket.io');
const { log } = require('console');
    const httpserver=http.createServer(app);
    const io=   new Server(httpserver,
    {
        cors: {
        }
    })
    httpserver.listen('3000','localhost',()=>{
        console.log("Server is up and ready");
    })

    var users=[];

    io.on('connection',(socket)=>{
        console.log("Hello");
        var a=gettime();
      users.push(socket.id)  
      console.log(users);      

        socket.on('senduserlist',(data)=>{ 
            socket.broadcast.emit('updateuserlist',data,users[users.length-1]);
            
        })


        socket.on('useristyping',(yourname)=>{

       socket.broadcast.emit('useristyping',yourname)

        })

        socket.on('userisnottyping',(yourname)=>{

            socket.broadcast.emit('userisnottyping',yourname)
     
             })
       
        
    socket.on('username',(data)=>{ 
        console.log("Hello");
        socket.emit('welcomemessage',data);
       
        socket.emit('updateactiveusers',data);
        socket.broadcast.emit('updateotherusers',data,users[0]);
        socket.broadcast.emit('newuserjoined',data);
        
        
    })

    socket.on('left',(data)=>{ 
        socket.broadcast.emit('left',data);
         })

    socket.on('message',(data,nameofmessanger)=>{

       
        var time=gettime();
        socket.broadcast.emit('totherecievers',data,time,nameofmessanger);
        socket.emit('tothesender',data,time);
    })
    })


    function gettime(){

        var time="";
        const date=new Date();
        var hours= date.getHours();
        var minutes= date.getMinutes();
        var seconds=date.getSeconds();
        if(minutes<10||seconds<10){
            minutes="0"+minutes;
            seconds="0"+seconds
        }
        time=`${hours}:${minutes}:${seconds}`;
        if(hours>12){
            hours=hours%12;
            time=`${hours}:${minutes}:${seconds} PM`
        }
       
        else{
            time="0"+hours+":"+minutes+":"+seconds+" AM";
        }

        return time;
        
    }





