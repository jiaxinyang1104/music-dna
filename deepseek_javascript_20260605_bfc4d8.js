const quotes = [
    "你离助听器又近了一步。", "通勤听歌的人，觉得同事是哑巴。",
    "选爵士/布鲁斯？外表冷静内心抽雪茄。", "灵魂在夜店，肉体在工位。",
    "洗澡唱歌，邻里关系紧张。", "听50遍同一首歌，需要心理疏导。",
    "喝多了循环200遍？需要醒酒药。", "多选太多？人生也太丰富了吧。"
];
function getRandomQuote(comment) {
    return comment + " " + quotes[Math.floor(Math.random() * quotes.length)];
}