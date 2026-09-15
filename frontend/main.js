const AI_API = "https://1488686992-4r22xo8gxl.ap-guangzhou.tencentscf.com";

document.addEventListener('DOMContentLoaded', async () => {
    const aiModal = document.getElementById('aiModal');
    const aiFloatBtn = document.getElementById('aiFloatBtn');
    const aiChatArea = document.getElementById('aiChatArea');
    const aiInput = document.getElementById('aiInput');
    const sendBtn = document.getElementById('sendBtn');
    const clearChatBtn = document.getElementById('clearChatBtn');

    // 打开/关闭弹窗
    aiFloatBtn.addEventListener('click', () => {
        aiModal.style.display = aiModal.style.display === 'flex' ? 'none' : 'flex';
    });

    // 清空对话
    clearChatBtn.addEventListener('click', () => {
        aiChatArea.innerHTML = `<div class="welcome-message">你好！我是诗韵学堂的AI助教，有什么诗词问题都可以问我~</div>`;
    });

    // 快捷提问点击
    document.querySelectorAll('.quick-btn').forEach(btn=>{
    btn.onclick = function(){
        const prompt = this.dataset.prompt;
        aiInput.value = prompt;
        sendMessage();
    }
    })

    // 打字机输出函数
        function typeWrite(element, text, speed = 30) {
        let i = 0;
        element.textContent = "";
        const timer = setInterval(() => {
            if (i >= text.length) {
            clearInterval(timer);
            return;
            }
            element.textContent += text.charAt(i);
            i++;
            aiChatArea.scrollTop = aiChatArea.scrollHeight;
        }, speed);
        }

    // 发送消息
    async function sendMessage() {
        const question = aiInput.value.trim();
        if (!question) return;
        aiInput.value = "";
        // 用户气泡
        const userBubble = document.createElement('div');
        userBubble.className = 'user-bubble';
        userBubble.textContent = question;
        aiChatArea.appendChild(userBubble);
        // 加载提示
        const aiLoading = document.createElement('div');
        aiLoading.className = 'ai-bubble';
        aiLoading.textContent = "AI正在思考中...";
        aiChatArea.appendChild(aiLoading);
        aiChatArea.scrollTop = aiChatArea.scrollHeight;
        try {
            const res = await fetch(AI_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: question,
                    poem: null
                })
            });
            const data = await res.json();
            // ========== 校验返回数据 ==========
            if (data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
                const answer = data.choices[0].message.content;
                aiLoading.remove();
                const aiBubble = document.createElement('div');
                aiBubble.className = 'ai-bubble';
                aiChatArea.appendChild(aiBubble);
                typeWrite(aiBubble, answer);
            } else if(data.msg) {
                aiLoading.textContent = data.msg;
            } else {
                aiLoading.textContent = "AI返回数据异常";
                console.log("后端返回数据：", data);
            }
        } catch (err) {
            aiLoading.textContent = "请求失败，请稍后重试";
            console.error(err);
        }
        aiChatArea.scrollTop = aiChatArea.scrollHeight;
    }

    sendBtn.addEventListener('click', sendMessage);
    aiInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') sendMessage();
    });

    function recordLearn(unitName){
    const data = JSON.parse(sessionStorage.getItem("poemRecord") || JSON.stringify({
        units: [
        { name: "第一单元", learned: 0, total: 3 },
        { name: "第三单元", learned: 0, total: 3 },
        { name: "古诗词诵读", learned: 0, total: 10 }
        ],
        errorList: []
    }));
    const target = data.units.find(u=>u.name === unitName);
    if(target && target.learned < target.total){
        target.learned += 1;
        sessionStorage.setItem("poemRecord", JSON.stringify(data));
    }
    }

    function addErrorItem(questionInfo){
    const data = JSON.parse(sessionStorage.getItem("poemRecord") || JSON.stringify({
        units: [
        { name: "第一单元", learned: 0, total: 3 },
        { name: "第三单元", learned: 0, total: 3 },
        { name: "古诗词诵读", learned: 0, total: 10 }
        ],
        errorList: []
    }));
    data.errorList.push(questionInfo);
    sessionStorage.setItem("poemRecord", JSON.stringify(data));
    }

});