export function analyzePlaylistStyle(text) {
  if (!text || !text.trim()) {
    return { incomeOffset: 0, crashOffset: 0, loveOffset: 0, comment: '未提供歌单' };
  }
  const lower = text.toLowerCase();
  const hasRock = /草东|万青|康士坦|梅卡德尔|法兹|deca|椅子|南青|逃跑|摇滚|rock|独立|土摇/i.test(lower);
  const hasElectronic = /电子|edm|dj|电音|techno|house|dubstep|pogo|jamie xx|remi wolf|ratatat/i.test(lower);
  const hasRap = /说唱|rap|hip hop|kanye|jackboy|timeflies|masetti/i.test(lower);
  const hasFolk = /民谣|folk|张悬|许嵩|不可撤销/i.test(lower);
  const hasJazz = /爵士|jazz|blues|布鲁斯/i.test(lower);

  const incomeOffset = (hasElectronic ? 1 : 0) + (hasRap ? 0.5 : 0);
  const crashOffset = (hasRock ? 1.8 : 0) + (hasFolk ? 0.5 : 0);
  const loveOffset = (hasRap ? 1 : 0) + (hasJazz ? -0.5 : 0);

  let style = '流行杂烩';
  if (hasRock) style = '摇滚/独立';
  else if (hasElectronic) style = '电子/DJ';
  else if (hasRap) style = '说唱/嘻哈';

  let comment = `歌单倾向：${style}。`;
  if (hasRock) comment += ' 摇滚魂易燃易崩溃。';
  if (hasElectronic) comment += ' 电子乐推高搞钱幻觉。';
  if (hasRap) comment += ' 说唱让你嘴甜桃花旺。';

  return { incomeOffset, crashOffset, loveOffset, comment };
}

export function computeScores(q2Selections, q5Selections, q4Selection, offsets) {
  let income = 0;
  for (const v of q2Selections) {
    if (v === 'A') income += 2;
    if (v === 'B') income += 5;
    if (v === 'C') income -= 1;
    if (v === 'D') income += 1;
    if (v === 'E') income += 3;
    if (v === 'F') income += 0;
    if (v === 'G') income -= 3;
  }
  income += offsets.incomeOffset;

  let crash = 0;
  for (const v of q5Selections) {
    if (v === 'A') crash += 5;
    if (v === 'B') crash += 3;
    if (v === 'C') crash += 2;
    if (v === 'D') crash += 1;
    if (v === 'E') crash -= 10;
    if (v === 'F') crash += 4;
    if (v === 'G') crash += 8;
  }
  crash += offsets.crashOffset;

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

export function getResultTexts(incomeScore, crashScore, loveScore) {
  let incomeText = '';
  let incomeDesc = '';

  if (incomeScore <= -2) {
    incomeText = '6-9万';
    incomeDesc = '💰 你的年收入大概能买 300 杯蜜雪冰城，还是只敢点 4 块钱的柠檬水。老板画饼你啃边角料，年底绩效 C，但你觉得"够了，反正耳机里的歌不要钱"。';
  } else if (incomeScore <= 1) {
    incomeText = '10-14万';
    incomeDesc = '💰 年收入约等于 1500 包螺蛳粉（加辣加腐竹版）。你是个稳定的打工人，工资准时到账，但房租和花呗精准截胡。你的存款像一首后摇——前奏很长，高潮永远不来。';
  } else if (incomeScore <= 4) {
    incomeText = '15-20万';
    incomeDesc = '💰 年入 15-20 个 W，相当于每天能喝两杯星巴克，但你会偷偷换成瑞幸然后把差价存起来。老板觉得你努力，同事觉得你卷，只有你自己知道——你只是上班听歌太大声，怕被骂才卖力干活。';
  } else {
    incomeText = '21-30万';
    incomeDesc = '💰 恭喜！你的收入已经超过了你的发际线——都很突出。年入 21 万以上，相当于你可以每周吃一次海底捞并且不用等周二会员日。但你深夜仍然会为网易云黑胶会员涨价而犹豫三分钟。';
  }

  let crashText = '';
  let crashDesc = '';

  if (crashScore <= -5) {
    crashText = '永不';
    crashDesc = '💔 你已经不会崩溃了。你的心比老板的冷笑话还硬，比前女友的已读不回更冷。就算世界末日，你也会先淡定地听完《纠结之旅》再说。';
  } else if (crashScore <= 0) {
    crashText = '半年后';
    crashDesc = '💔 半年后你会崩溃一次。原因很具体：你发现当年和你一起听草东的朋友，现在在朋友圈晒娃，而你还在《山海》里找答案。那天你会喝半斤白酒，然后第二天假装什么都没发生。';
  } else if (crashScore <= 3) {
    crashText = '下个月';
    crashDesc = '💔 下个月，你会因为网易云日推连续三首都不喜欢而情绪断崖。你会怀疑算法不再懂你，就像你妈不懂你为什么听《揪心的玩笑》。然后你默默切回自己的红心歌单，循环到凌晨两点。';
  } else if (crashScore <= 6) {
    crashText = '2周内';
    crashDesc = '💔 两周内，你在写周报时找不到合适的 BGM。试了后摇太丧，试了电子太吵，试了民谣又想辞职。最后你选了《大石碎胸口》，然后周报写成了诗，老板批了个"重写"。你会崩溃 10 分钟。';
  } else if (crashScore <= 9) {
    crashText = '3天内';
    crashDesc = '💔 三天之内。你会听到一首歌的评论区有个故事和你一模一样，你会哭，哭完截图发朋友圈，然后三分钟后删掉。第二天同事问你昨晚怎么了，你说"感冒了"。';
  } else {
    crashText = '明天早上';
    crashDesc = '💔 明天早上，你醒来看到昨晚循环了 200 遍的《她说她要杀了我》，你会想起自己昨天发酒疯唱歌的录音，你会想死 30 秒，然后继续听那首歌。';
  }

  let loveText = '';
  let loveDesc = '';

  if (loveScore >= 8) {
    loveText = '马上';
    loveDesc = '💘 一周内，你会因为主动问店员"刚才那首歌叫什么"而加到微信。对方和你音乐重叠度 70%，但你会发现他听歌排行里有一首《学猫叫》。你会纠结三秒，然后决定"算了，至少有共同话题"。';
  } else if (loveScore >= 5) {
    loveText = '两周内';
    loveDesc = '💘 两周内，前任会突然给你分享一首《Better Without You》，并发来一句"这歌很像我现在的状态"。你会回复"哦"，然后拉黑。接着你会在歌单里把这首歌删掉，换成《Nobody Has to Know》。';
  } else if (loveScore >= 3) {
    loveText = '下个月';
    loveDesc = '💘 下个月，你会在 Livehouse 的 pogo 里被人踩掉鞋。他会捡起来还给你，然后你们一起骂前排的胖子。演出结束后他问你要不要一起去吃烧烤，你说"我明天还要上班"，然后回家独自听《迷恋》。';
  } else if (loveScore >= 1) {
    loveText = '半年内';
    loveDesc = '💘 半年内，你会和一个"歌友"从互相分享网易云链接发展到分享外卖红包。你们会在深夜聊歌词，但从不聊"要不要见面"。最后你们的关系就像一首后摇——气氛到位了，但什么都没发生。';
  } else if (loveScore >= -1) {
    loveText = '一年以上';
    loveDesc = '💘 一年以上。你的恋爱在等母带混音。别急，你先把自己的生活专辑录完。目前进度：刚写完词，曲还在哼。';
  } else if (loveScore >= -9) {
    loveText = '至少三个月';
    loveDesc = '💘 至少三个月别想了。你上一段感情的尾奏还没放完呢，每次听到《Lost Stars》还会愣一下。建议你把红心里所有情歌都换成电子，用 4/4 拍震碎过去。';
  } else if (loveScore > -100) {
    loveText = '无限期';
    loveDesc = '💘 无限期单身。但你可以和你的耳机结婚，它永远不会劈腿，也不会问你"刚才那首歌是谁唱的"。你听《艳火》，它就给你放《艳火》，忠诚度拉满。';
  } else {
    loveText = '永远单身';
    loveDesc = '💘 永远单身，但你很快乐。因为没人会偷用你的网易云会员，没人会嫌弃你洗澡时唱歌跑调，也没人会在你听《半途而废》时说"你能不能阳光一点"。恭喜你，你是自己的 soulmate。';
  }

  return { incomeText, crashText, loveText, incomeDesc, crashDesc, loveDesc };
}

const quotes = [
  '你歌单里的「红心」比你过去三年的恋爱次数还多。不信你数数？',
  '听摇滚的人假装愤怒，听民谣的人假装沧桑，而你——假装自己很有品味，实则日推第一首就是《学猫叫》。',
  '音量调最大？你老了之后助听器厂商会感谢你的，还会给你发 VIP 卡。',
  '通勤路上听歌的人，80% 都在心里骂过前面的乘客，剩下 20% 在骂司机。',
  '你洗澡时唱的歌，邻居已经拿去当闹钟了，并且成功治好了他的失眠。',
  '循环 50 遍同一首歌，你的耳朵没聋，但你的室友已经疯了，并且写了 800 字小作文控诉你。',
  '选「随机大杂烩」的人，朋友都说你「很难懂」，其实就是歌品太乱，连算法都对你投降了。',
  '深夜听歌不睡觉的人，第二天工位上会多一个活体僵尸，而且咖啡都救不回来。',
  '你的网易云年度报告，会比你的年终总结更走心，并且点赞数是后者的 100 倍。',
  '建议把测试结果发朋友圈，配文："不准，但我就爱听"——然后你妈会在下面评论：少听点伤感的。',
  '喜欢 DJ/电音？你的灵魂在夜店，肉体在工位，精神在网易云评论区。',
  '选爵士/布鲁斯的人，外表冷静内心抽雪茄，实际上兜里只有 20 块，抽的是红塔山。',
  '你的红心歌单里，至少有三首歌是你已经听腻了但舍不得删的——就像你舍不得扔的旧衣服。',
  '你听到一首好歌的第一反应是看评论，而不是分享给朋友——因为你没朋友分享。',
  '每次网易云崩了，你比老板催你交周报还急，你甚至会在朋友圈骂程序员。',
  '你的听歌排行前十里，有一首是助眠白噪音——别装了，你根本睡不着。',
  '你曾经为了听一首冷门歌开了四个音乐 App 的会员，然后发现它只在网易云有。',
  '你的歌单暴露了你是一个白天正能量、晚上网抑云的双面人。',
  '你收藏的「红心」歌曲数量，已经超过了你微信好友的数量。',
  '如果听歌能赚钱，你早就是首富了。可惜不能，所以你只能继续听歌假装很快乐。',
];

export function getRandomQuote(comment) {
  return comment + ' ' + quotes[Math.floor(Math.random() * quotes.length)];
}