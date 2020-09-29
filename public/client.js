let socket = io()

$('#loginBox').show()
$('#chatBox').hide()

$('#btnStart').click(() => {
    socket.emit('login', {
        username: $('#inpUsername').val(),
        password: $('#inpPassword').val()
    })
})

socket.on('logged_in', () => {
    $('#loginBox').hide()
    $('#chatBox').show()
})

socket.on('logged_in_failed', () => {
    alert('usrname or password is wrogn')
})

$('#btnSendMsg').click(() => {
    socket.emit('msg_send', {
        to: $('#inpToUser').val(),
        msg: $('#inpNewMsg').val()
    })
})

socket.on('msg_rcvd', (data) => {
    $('#ulMsgs').append($('<li>').text(
        `[${data.from}] : ${data.msg}`
    ))
})







































// let btn = document.getElementById('boom')

// btn.onclick = function () {
//     socket.emit('boom')
// }

// socket.on('whizz', () => {
//     let div = document.createElement('div')
//     div.innerHTML = 'whizz';
//     document.body.appendChild(div)
// })

// let input = document.getElementById('inputText')
// let btn = document.getElementById('btnSend')
// let ul = document.getElementById('ulMsg')

// btn.onclick = function () {
//     socket.emit('send', {
//         msg: input.value
//     })
//     input.value = ''
// }

// socket.on('recv', (data) => {
//     let li = document.createElement('li');
//     li.innerText = data.msg
//     ul.appendChild(li)
// })