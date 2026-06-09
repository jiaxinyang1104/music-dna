function computeScores(q2Selections, q5Selections, q4Selection, offsets) {
    // 收入分（Q2多选累加）
    let income = 0;
    for (let v of q2Selections) {
        if (v === 'A') income += 2;
        if (v === 'B') income += 5;
        if (v === 'C') income -= 1;
        if (v === 'D') income += 1;
        if (v === 'E') income += 3;
        if (v === 'F') income += 0;
        if (v === 'G') income -= 3;
    }
    income += offsets.incomeOffset;
    
    // 崩溃分（Q5多选累加）
    let crash = 0;
    for (let v of q5Selections) {
        if (v === 'A') crash += 5;
        if (v === 'B') crash += 3;
        if (v === 'C') crash += 2;
        if (v === 'D') crash += 1;
        if (v === 'E') crash -= 10;
        if (v === 'F') crash += 4;
        if (v === 'G') crash += 8;
    }
    crash += offsets.crashOffset;
    
    // 恋爱分（Q4单选）
    let love = 0;
    switch (q4Selection) {
        case 'A': love = 3; break;
        case 'B': love = 5; break;
        case 'C': love = 1; break;
        case 'D': love = -2; break;
        case 'E': love = 8; break;
        case 'F': love = -5; break;
        case 'G': love = 0; break;
        case 'H': love = -10; break;
        case 'I': love = -999; break;
        default: love = 0;
    }
    love += offsets.loveOffset;
    if (love > 12) love = 12;
    if (love < -999) love = -999;
    
    return { income, crash, love };
}