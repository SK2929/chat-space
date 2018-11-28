$(function() {
var search_list = $("#user-search-result");

function appendProduct(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ user.name }</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="${ user.name }">追加</a>
              </div>`
    search_list.append(html);
  }

  function appendNoProduct(user) {
    var html = `<div class='listview__element--right-icon'>${ user }</div>`
    search_list.append(html);
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
      alert('映画検索に失敗しました');
    });
  });
});
