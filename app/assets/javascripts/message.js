$(function(){
  function buildHTML(message){
    var input_image = (message.image) ? `<img class="lower-message__image" src="${ message.image }">` : ``

    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">${ message.user_name }</div>
                    <div class="upper-message__date">${ message.created_at }</div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">${ message.content }</p>
                    ${ input_image }
                  </div>
                </div>`
    return html;
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $('.form__submit').removeAttr('data-disable-with')
    // 非同期通信に必要なオプションの設定
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message').val('')
      $('.form__mask').val('')
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
  })
})




