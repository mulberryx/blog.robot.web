/**
 * 交谈
 * @author Philip
 */

import '../less/talk.less'

const $userInput = $('#user-input')
const $talkContent = $('#talk-content')

/**
 * 添加消息至面板
 * @param {string} 消息类型 me|user
 * @param {string} 消息内容
 * @return none
 */
const addMessageIntoPanel = function (type, content) {
    $talkContent.append($('<div class="msg-row"><div class="msg msg-' + type + ' msg-me">' + content + '</div></div>'))
    scrollToBottom()
}

/**
 * 滚动聊天内容至底部
 * @return none
 */
const scrollToBottom = function () {
    $('#talk-content').scrollTop($('#talk-content')[0].scrollHeight)
}

/**
 * 交流
 * @return none
 */
const sendRequest = function () {
    $.ajax({
        type: 'get',
        url: '/api/talk',
        data: {
            message: $userInput.val(),
            ip: window.returnCitySN['cip']
        },
        success (data) {
            addMessageIntoPanel('me', data.feedback)
        }
    })
}

$userInput.keydown(function (e) {
    if (e.keyCode === 13) {
        const content = $userInput.val()

        addMessageIntoPanel('user', content)
        sendRequest()

        $userInput.val('')
    }
})
