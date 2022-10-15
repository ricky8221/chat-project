var socket = io();
var form = document.getElementById('form');
var input = document.getElementById('input');
var rightCol = document.querySelector('.right-col');
var mainBody = document.querySelector('.mainBody');
var channelWindow = document.getElementById('channel-window')
const URL = document.URL;

const init = () => {
    rightCol.scrollTo(0, rightCol.scrollHeight);
}

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (input.value) {
        const response = await fetch('/api/message', {
            method: 'POST',
            body: JSON.stringify({
                body: input.value,
                channelId: URL.slice(URL.lastIndexOf('/')+1)
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            const data = await response.json();

            console.log(data);
            // localStorage.setItem('sender', data.user.username);

            socket.emit('chat message', input.value, {sender: data.sender, receiver: data.receiver, timestamp: data.newMessage.createdAt});
            // document.location.replace(`/channel/${data.id}`);
            // const splitUrl = response.url.split("/") // [http:, ]
            // const url = splitUrl[splitUrl.length-1];
            // console.log(url);
            // document.location.replace(`/channel/${url}`);
        } else {
            alert(response.statusText);
        }
        
        input.value = '';
    }
});

// socket.on('chat message', async function (msg, info) {
//     const sender = info.sender;
//     const receiver = info.receiver;
//     const utcDate = new Date(`${info.timestamp}`)
//     const timestamp = `${utcDate.toLocaleDateString()} ${utcDate.toLocaleTimeString('en-US')}`;
//     // console.log(timestamp)
    
//     if (
//         (sender == localStorage.getItem('user1') && receiver == localStorage.getItem('user2')) ||
//         (sender == localStorage.getItem('user2') && receiver == localStorage.getItem('user1'))) {

//         var div1 = document.createElement('div');
//         if (sender == localStorage.getItem('username')) {
//             div1.classList.add('card', 'text-bg-primary', 'mb-3', 'right');
//         } else {
//             div1.classList.add('card', 'text-bg-success', 'mb-3', 'left');
//         }
        
//         var div2 = document.createElement('div');
//         div2.classList.add('card-header');
        
//         var p1 = document.createElement('p');
//         p1.classList.add('fw-bolder', 'user-name');
//         p1.textContent = sender;
        
//         var p2 = document.createElement('p');
//         p2.classList.add('time-stamp');
//         p2.textContent = timestamp;

//         var div3 = document.createElement('div');
//         div3.classList.add('card-body');
//         var item = document.createElement('p');
//         item.classList.add('card-title');
//         item.textContent = msg;
    
//         div2.appendChild(p1);
//         div2.appendChild(p2);

//         div3.appendChild(item);

//         div1.appendChild(div2);
//         div1.appendChild(div3);

//         channelWindow.appendChild(div1);
//     } else if (receiver == localStorage.getItem('username')) {
//         chatEl = document.querySelector(`chat-${sender}`);
//         chatEl.setAttribute('style', 'background-color: red');
//     }

//     rightCol.scrollTo(0, rightCol.scrollHeight);
// });

init();