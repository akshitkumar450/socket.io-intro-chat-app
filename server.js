const express = require('express');
const app = express()
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)

app.use('/', express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    console.log('connected from ', socket.id);

    // socket.on('boom', () => {
    //     console.log('boom receied from ', socket.id);
    // })

    // setInterval(()=>{
    //     socket.emit('whizz')
    // },2000)

    // socket.on('send',(data)=>{
    //   socket.emit('recv',data)
    // })
    let users = {
        'arnav': 'agag123'
    }
    let socketMap={};

    socket.on('login', (data) => {
        if (users[data.username]) {
            if(users[data.username]==data.password){
                socket.join(data.username)
                socket.emit('logged_in')
                socketMap[socket.id]=data.username;
                console.log(socketMap);

            }
            else {
                socket.emit('logged_in_failed')
            }
        }
        else {
            users[data.username] = data.password
            socket.join(data.username)
            socket.emit('logged_in')
            socketMap[socket.id]=data.username;
            console.log(socketMap);
        }
    console.log(users);

    })

    socket.on('msg_send', (data) => {
        data.from=socketMap[socket.id]
        if (data.to) {
            io.to(data.to).emit('msg_rcvd', data)
        } else {
            socket.broadcast.emit('msg_rcvd', data)
        }
    })
})

server.listen(3344, () => {
    console.log('server stated');
})