function analyzePlaylistStyle(text) {
    if (!text.trim()) return { incomeOffset:0, crashOffset:0, loveOffset:0, comment:"未提供歌单" };
    const lower = text.toLowerCase();
    const hasRock = /草东|万青|康士坦|梅卡德尔|法兹|deca|椅子|南青|逃跑|摇滚|rock|独立|土摇/i.test(lower);
    const hasElectronic = /电子|edm|dj|电音|techno|house|dubstep|pogo|jamie xx|remi wolf|ratatat/i.test(lower);
    const hasRap = /说唱|rap|hip hop|kanye|jackboy|timeflies|masetti/i.test(lower);
    const hasFolk = /民谣|folk|张悬|许嵩|不可撤销/i.test(lower);
    const hasJazz = /爵士|jazz|blues|布鲁斯/i.test(lower);
    
    let incomeOffset = (hasElectronic ? 1 : 0) + (hasRap ? 0.5 : 0);
    let crashOffset = (hasRock ? 1.8 : 0) + (hasFolk ? 0.5 : 0);
    let loveOffset = (hasRap ? 1 : 0) + (hasJazz ? -0.5 : 0);
    
    let style = "流行杂烩";
    if (hasRock) style = "摇滚/独立";
    else if (hasElectronic) style = "电子/DJ";
    else if (hasRap) style = "说唱/嘻哈";
    
    let comment = `歌单倾向：${style}。`;
    if (hasRock) comment += " 摇滚魂易燃易崩溃。";
    if (hasElectronic) comment += " 电子乐推高搞钱幻觉。";
    if (hasRap) comment += " 说唱让你嘴甜桃花旺。";
    return { incomeOffset, crashOffset, loveOffset, comment };
}