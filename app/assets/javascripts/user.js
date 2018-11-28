$(function() {

  // 非同期通信を起こす場所の指定
  $(".chat-group-form__input").on("keyup", function() {
    var input = $(".chat-group-form__input").val();
    console.log(input)
    // Ajaxで非同期通信に必要なオプションの指定
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
  });
});
