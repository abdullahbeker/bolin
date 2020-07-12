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
  console.log('hi')
  let input = $('#content__send__input')
  socket.emit('newMessage', { who: nickname, what: input.val() })
  input.val('')
}
const addMessage = data => {
  $('#content__screen__messages').append(`
    <li class="content__screen__message"> ${data.who} says ${data.what}</li>
  `)
}
socket.on('newMessage', data => {
  addMessage(data)
})
$('#overlay__form').on('submit', handleNickSubmit)
$('#content__send__form').on('submit', handleMessageSend)
