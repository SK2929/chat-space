$(document).on('turbolinks:load', function() {
  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendProduct(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
              </div>`
    search_list.append(html);
  }

  function appendNoProduct(user) {
    var html = `<div class='listview__element--right-icon'>${ user }</div>`
    search_list.append(html);
  }

  function removeProduct(information) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ information.id }'>
                  <input name='group[user_ids][]' type='hidden' value='${ information.userId }'>
                  <p class='chat-group-user__name'>${ information.userName }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    member_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      console.log(users)
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendProduct(user);
        });
      }
      else {
        appendNoProduct("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });
// 検索後、ユーザー横にある追加ボタンを押したときの挙動
  $('#user-search-result').on('click', '.user-search-add.chat-group-user__btn.chat-group-user__btn--add', function(){
    var information = $(this).data();
    $(this).parent().remove();
    removeProduct(information);
  });
// 検索後、ユーザー横にある削除ボタンを押したときの挙動
  $('#chat-group-users').on('click', '.user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn', function(){
    $(this).parent().remove();
  });

  $(".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn").on('click', function(){
    $(this).parent().remove();
  });
});

