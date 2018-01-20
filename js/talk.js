/**
 * 交流
 * @author Philip 
 */
import '../less/talk.less';

const $user_input = $('#user-input');
const $talk_content = $('#talk-content');

/**
 * 添加消息至面板
 * @param {string} 消息类型 me|user
 * @param {string} 消息内容
 * @return none
 */
const addMessageIntoPanel = function (type, content) {
  $talk_content.append($('<div class="msg-row"><div class="msg msg-' + type + ' msg-me">'+ content +'</div></div>'));
  scrollToBottom();
};

/**
 * 滚动聊天内容至底部
 * @return none
 */
const scrollToBottom = function () {
  $('#talk-content').scrollTop($('#talk-content')[0].scrollHeight);
};

/**
 * 交流
 * @return none
 */
const sendRequest = function () {
  $.ajax({
    type: 'get',
    url: '/api/talk',
    data: {
      message: $user_input.val(),
      ip: returnCitySN['cip']
    },
    success (data) {
      addMessageIntoPanel('me', data.feedback)
    },
  });
};

$user_input.keydown(function (e) {
  if(e.keyCode === 13) {
    const content = $user_input.val();

    addMessageIntoPanel('user', content);
    sendRequest();

    $user_input.val('');
  }
});