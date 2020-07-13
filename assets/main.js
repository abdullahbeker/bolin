import './sass/main.scss'

const socket = io()
var nickname = ''
const handleNickSubmit = e => {
  e.preventDefault()
  nickname = $('#overlay__input').val()
  $('#overlay').fadeOut(400)
  $('#content__send__input').focus()
}
const handleMessageSend = e => {
  e.preventDefault()
  let input = $('#content__send__input')
  socket.emit('newMessage', { who: nickname, what: input.val() })
  input.val('')
}
const addMessage = data => {
  $('#content__screen__messages').append(`
    <li class="content__screen__message"> 
      <div class="message">
        <div class="message__head">${data.who}</div>
        <div class="message__body">${data.what}</div>
        <div class="message__foot">${data.at}</div>
      </div>
    </li>
  `)
}
socket.on('newMessage', data => {
  addMessage(data)
  let el = document.getElementById('content__screen')
  el.scrollTo(0, el.scrollHeight)
})
$('#overlay__form').on('submit', handleNickSubmit)
$('#content__send__form').on('submit', handleMessageSend)
