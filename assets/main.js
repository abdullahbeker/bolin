import './sass/main.scss'

const socket = io()
var nickname = ''
const handleNickSubmit = e => {
  e.preventDefault()
  nickname = $('#overlay__input').val()
  $('#overlay').fadeOut(400)
  $('#content__send__input').focus()
}
$('#overlay__form').on('submit', handleNickSubmit)
