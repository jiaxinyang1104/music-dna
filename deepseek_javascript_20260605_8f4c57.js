function getResultTexts(incomeScore, crashScore, loveScore) {
    // 收入
    let incomeText = "";
    if (incomeScore <= -2) incomeText = "6-9万（蹲坑太久，老板怀疑你离职）";
    else if (incomeScore <= 1) incomeText = "10-14万（普通打工人，耳机续命）";
    else if (incomeScore <= 4) incomeText = "15-20万（勤奋型，升职有望）";
    else incomeText = "21-30万（卷王，但注意耳朵）";
    
    // 崩溃
    let crashText = "";
    if (crashScore <= -5) crashText = "永不（你是机器人）";
    else if (crashScore <= 0) crashText = "半年后（情绪稳定）";
    else if (crashScore <= 3) crashText = "下个月（压力积累型）";
    else if (crashScore <= 6) crashText = "2周内（考试/项目截止就崩）";
    else if (crashScore <= 9) crashText = "3天内（歌词即预言）";
    else crashText = "明天早上（宿醉+播放记录双重崩溃）";
    
    // 恋爱
    let loveText = "";
    if (loveScore >= 8) loveText = "马上（一周内）";
    else if (loveScore >= 5) loveText = "两周内";
    else if (loveScore >= 3) loveText = "下个月";
    else if (loveScore >= 1) loveText = "半年内";
    else if (loveScore >= -1) loveText = "一年以上";
    else if (loveScore >= -9) loveText = "至少三个月";
    else if (loveScore > -100) loveText = "无限期";
    else loveText = "永远单身（但你很快乐）";
    
    return { incomeText, crashText, loveText };
}