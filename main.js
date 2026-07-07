// 1. 定义所有单元的诗词数据
const unitData = {
    //第一单元 古诗三首
    unit1: [
        {
            title: "寒食",
            author: "韩翃",
            poemId: "han-shi" // 用来对应诗词详情页的id
        },
        {
            title: "迢迢牵牛星",
            author: "佚名",
            poemId: "tiao-tiao-qian-niu-xing"
        },
        {
            title: "十五夜望月",
            author: "王建",
            poemId: "shi-wu-ye-wang-yue"
        }
    ],
    // 第四单元 古诗三首
    unit4: [
        {
            title: "马诗",
            author: "李贺",
            poemId: "ma-shi"
        },
        {
            title: "石灰吟",
            author: "于谦",
            poemId: "shi-hui-yin"
        },
        {
            title: "竹石",
            author: "郑燮",
            poemId: "zhu-shi"
        }
    ],
    // 古诗词诵读 10首
    recite: [
        { title: "采薇（节选）", author: "佚名", poemId: "cai-wei" },
        { title: "送元二使安西", author: "王维", poemId: "song-yuan-er-shi-an-xi" },
        { title: "春夜喜雨", author: "杜甫", poemId: "chun-ye-xi-yu" },
        { title: "早春呈水部张十八员外", author: "韩愈", poemId: "zao-chun-cheng-shui-bu" },
        { title: "江上渔者", author: "范仲淹", poemId: "jiang-shang-yu-zhe" },
        { title: "泊船瓜洲", author: "王安石", poemId: "bo-chuan-gua-zhou" },
        { title: "游园不值", author: "叶绍翁", poemId: "you-yuan-bu-zhi" },
        { title: "卜算子·送鲍浩然之浙东", author: "王观", poemId: "bu-suan-zi-song-bao-hao-ran" },
        { title: "浣溪沙", author: "苏轼", poemId: "huan-xi-sha" },
        { title: "清平乐", author: "黄庭坚", poemId: "qing-ping-le" }
    ]
};

// 2. 渲染诗词卡片的通用函数
function renderPoemList(unitKey) {
    const poems = unitData[unitKey];
    const listEl = document.querySelector(".poem-list");
    const titleEl = document.querySelector(".unit-title");

    // 根据单元key修改标题
    const unitNames = {
        unit1: "第一单元",
        unit4: "第四单元",
        recite: "古诗词诵读"
    };
    titleEl.textContent = `${unitNames[unitKey]} 诗词列表`;

    // 清空并生成卡片
    listEl.innerHTML = "";
    poems.forEach(poem => {
        const card = document.createElement("div");
        card.className = "poem-card";
        card.innerHTML = `
            <div class="poem-cover"></div>
            <h3 class="poem-title">${poem.title}</h3>
            <p class="poem-author">${poem.author}</p>
            <a href="poem-detail.html?id=${poem.poemId}" class="poem-btn">进入学习</a>
        `;
        listEl.appendChild(card);
    });
}

// 3. 页面加载时，根据URL参数渲染对应单元的诗词
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const unit = params.get("unit");
    if (unit && unitData[unit]) {
        renderPoemList(unit);
    }
});

// 4. 保留AI按钮的交互逻辑
const aiBtn = document.querySelector('.ai-float-btn');
const aiDialog = document.getElementById('aiDialog');

if (aiBtn && aiDialog) {
    aiBtn.addEventListener('click', () => {
        aiDialog.style.display = aiDialog.style.display === 'block' ? 'none' : 'block';
    });
}