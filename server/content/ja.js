// 日语课程内容：A1 → A2 → B1，三个级别，每个级别两个单元
export const jaLevels = [
  {
    id: 'ja-a1',
    code: 'A1',
    title: 'はじめの一歩',
    subtitle: '从五十音到第一次日语寒暄',
    units: [
      {
        id: 'ja-a1-u1',
        title: 'Unit 1 · あいさつ',
        desc: '问候语与自我介绍的基础句型',
        lessons: [
          {
            id: 'ja-a1-u1-l1',
            title: 'はじめまして',
            subtitle: '初次见面的问候',
            minutes: 12,
            xp: 30,
            goals: ['掌握 5 个日常问候表达', '理解「～は～です」名词句', '用日语完成第一次寒暄'],
            vocab: [
              { term: 'こんにちは', reading: 'konnichiwa', pos: '寒暄', meaning: '你好（白天使用）', example: 'こんにちは、田中さん。', exampleCn: '你好，田中先生。' },
              { term: 'おはようございます', reading: 'ohayou gozaimasu', pos: '寒暄', meaning: '早上好（礼貌）', example: 'おはようございます、先生。', exampleCn: '老师，早上好。' },
              { term: 'ありがとうございます', reading: 'arigatou gozaimasu', pos: '寒暄', meaning: '谢谢（礼貌）', example: '手伝ってくれて、ありがとうございます。', exampleCn: '谢谢你帮忙。' },
              { term: 'すみません', reading: 'sumimasen', pos: '寒暄', meaning: '不好意思；对不起', example: 'すみません、少し聞いてもいいですか。', exampleCn: '不好意思，可以问一下吗？' },
              { term: 'はじめまして', reading: 'hajimemashite', pos: '寒暄', meaning: '初次见面', example: 'はじめまして、李と申します。', exampleCn: '初次见面，我姓李。' }
            ],
            grammar: {
              title: '名词句「A は B です」与疑问助词「か」',
              points: ['「は」提示主题，「です」表示判断，语序为 A は B です', '疑问句在句末加「か」，否定用「ではありません」'],
              questions: [
                { prompt: 'わたし ___ 学生です。', options: ['は', 'を', 'に', 'で'], answer: 0, explain: '「は」提示主题，わたしは学生です。' },
                { prompt: '田中さんは会社員です___。', options: ['か', 'は', 'を', 'の'], answer: 0, explain: '句末加「か」构成疑问句。' },
                { prompt: 'わたしは先生___。', options: ['ではありません', 'ではありませんか', 'です', 'にあります'], answer: 0, explain: '名词的礼貌否定是「ではありません」。' }
              ]
            },
            listening: {
              script: 'こんにちは。わたしは田中です。はじめまして。どうぞよろしくお願いします。',
              translation: '你好。我是田中。初次见面，请多多关照。',
              questions: [
                { prompt: '田中さんは何と言いましたか。', options: ['はじめまして', 'さようなら', 'おやすみなさい', 'いただきます'], answer: 0, explain: '录音中田中说了「はじめまして」。' }
              ]
            },
            speaking: [
              { text: 'はじめまして、___です。', translation: '初次见面，我是……', tip: '「はじめまして」整体语调平缓，句尾轻微下降。' },
              { text: 'どうぞよろしくお願いします。', translation: '请多多关照。', tip: '「お願いします」的「い」不要拖长。' },
              { text: 'すみません、ありがとうございます。', translation: '不好意思，谢谢您。', tip: '「ありがとう」的「とう」读长音。' }
            ]
          },
          {
            id: 'ja-a1-u1-l2',
            title: 'わたしの自己紹介',
            subtitle: '姓名、职业与爱好',
            minutes: 14,
            xp: 30,
            goals: ['用 5 个词汇介绍身份与爱好', '掌握「の」与「も」的用法', '连续完成 3 句自我介绍'],
            vocab: [
              { term: '名前', reading: 'なまえ', pos: '名词', meaning: '名字', example: 'お名前は何ですか。', exampleCn: '您叫什么名字？' },
              { term: '学生', reading: 'がくせい', pos: '名词', meaning: '学生', example: 'わたしは大学の学生です。', exampleCn: '我是大学生。' },
              { term: '会社員', reading: 'かいしゃいん', pos: '名词', meaning: '公司职员', example: '父は会社員です。', exampleCn: '我父亲是公司职员。' },
              { term: '趣味', reading: 'しゅみ', pos: '名词', meaning: '爱好', example: '趣味は写真を撮ることです。', exampleCn: '我的爱好是拍照。' },
              { term: '住む', reading: 'すむ', pos: '动词', meaning: '居住', example: '東京に住んでいます。', exampleCn: '我住在东京。' }
            ],
            grammar: {
              title: '助词「の」「も」与「～に住んでいます」',
              points: ['「の」表示所属，如 わたしの名前', '「も」表示“也”，替换「は」而不叠加', '居住地后接「に」：東京に住んでいます'],
              questions: [
                { prompt: 'これはわたし___本です。', options: ['の', 'は', 'を', 'に'], answer: 0, explain: '「の」表示所属关系。' },
                { prompt: '田中さんは学生です。李さん___学生です。', options: ['も', 'は', 'の', 'が'], answer: 0, explain: '「も」表示“也”。' },
                { prompt: 'わたしは大阪___住んでいます。', options: ['に', 'を', 'で', 'へ'], answer: 0, explain: '居住地用助词「に」。' }
              ]
            },
            listening: {
              script: 'はじめまして。わたしはユキです。大阪の学生です。趣味は写真を撮ることです。日本語も勉強しています。',
              translation: '初次见面，我是 Yuki，大阪的学生。我的爱好是拍照，也在学习日语。',
              questions: [
                { prompt: 'ユキさんの趣味は何ですか。', options: ['写真を撮ること', '料理', '音楽', '旅行'], answer: 0, explain: '录音中明确说「趣味は写真を撮ることです」。' }
              ]
            },
            speaking: [
              { text: 'わたしは___です。', translation: '我是……', tip: '「わたしは」中「は」读作 wa。' },
              { text: '趣味は___です。', translation: '我的爱好是……', tip: '句尾「です」语调平稳下降。' },
              { text: '___に住んでいます。', translation: '我住在……', tip: '「住んでいます」的「て」与「い」连读自然。' }
            ]
          }
        ]
      },
      {
        id: 'ja-a1-u2',
        title: 'Unit 2 · 毎日の生活',
        desc: '数字、时间与咖啡店点单',
        lessons: [
          {
            id: 'ja-a1-u2-l1',
            title: 'なんじですか',
            subtitle: '数字与时间',
            minutes: 12,
            xp: 35,
            goals: ['掌握时间相关词汇', '用「に」表示时间点', '听懂并记录日语时间'],
            vocab: [
              { term: '時間', reading: 'じかん', pos: '名词', meaning: '时间；小时', example: '時間がありません。', exampleCn: '没有时间了。' },
              { term: '半', reading: 'はん', pos: '名词', meaning: '半；三十分', example: '八時半に始まります。', exampleCn: '八点半开始。' },
              { term: '午前', reading: 'ごぜん', pos: '名词', meaning: '上午', example: '午前九時に会議があります。', exampleCn: '上午九点有会议。' },
              { term: '午後', reading: 'ごご', pos: '名词', meaning: '下午', example: '午後は予定がありません。', exampleCn: '下午没有安排。' },
              { term: '今', reading: 'いま', pos: '名词', meaning: '现在', example: '今、何時ですか。', exampleCn: '现在几点？' }
            ],
            grammar: {
              title: '时间助词「に」与「から～まで」',
              points: ['具体时间点后加「に」，如 九時に始まります', '「から～まで」表示从……到……'],
              questions: [
                { prompt: '会議は九時___始まります。', options: ['に', 'を', 'で', 'へ'], answer: 0, explain: '具体时间点后用「に」。' },
                { prompt: '銀行は九時___五時までです。', options: ['から', 'まで', 'に', 'を'], answer: 0, explain: '「から～まで」表示时间范围。' },
                { prompt: '今、何時___。', options: ['ですか', 'ましたか', 'でしょう', 'ません'], answer: 0, explain: '询问现在几点用「何時ですか」。' }
              ]
            },
            listening: {
              script: 'すみません、今、何時ですか。— 九時半です。会議は十時から始まりますよ。',
              translation: '不好意思，现在几点？——九点半。会议十点开始哦。',
              questions: [
                { prompt: '今、何時ですか。', options: ['九時', '九時半', '十時', '十時半'], answer: 1, explain: '回答是「九時半です」。' }
              ]
            },
            speaking: [
              { text: '今、何時ですか。', translation: '现在几点？', tip: '「何時」的「じ」轻短清晰。' },
              { text: '会議は___に始まります。', translation: '会议在……开始。', tip: '时间后的「に」轻读。' },
              { text: '___から___までです。', translation: '从……到……。', tip: '「から」语调略上扬。' }
            ]
          },
          {
            id: 'ja-a1-u2-l2',
            title: 'カフェで注文',
            subtitle: '咖啡店点单',
            minutes: 14,
            xp: 35,
            goals: ['掌握咖啡店核心词汇', '用「～をください」点单', '听懂店员的询问'],
            vocab: [
              { term: 'コーヒー', reading: 'koohii', pos: '名词', meaning: '咖啡', example: 'コーヒーを一つください。', exampleCn: '请给我一杯咖啡。' },
              { term: 'メニュー', reading: 'menyuu', pos: '名词', meaning: '菜单', example: 'メニューを見てもいいですか。', exampleCn: '可以看一下菜单吗？' },
              { term: 'サイズ', reading: 'saizu', pos: '名词', meaning: '尺寸；杯型', example: 'サイズはどれにしますか。', exampleCn: '要哪个杯型？' },
              { term: 'ミルク', reading: 'miruku', pos: '名词', meaning: '牛奶', example: 'ミルクを入れますか。', exampleCn: '要加牛奶吗？' },
              { term: '砂糖', reading: 'さとう', pos: '名词', meaning: '糖', example: '砂糖は入れません。', exampleCn: '不加糖。' }
            ],
            grammar: {
              title: '点单句型「～をください」与「～をお願いします」',
              points: ['「名词 + をください」表示请给我……', '「～をお願いします」语气更礼貌，适合服务场景'],
              questions: [
                { prompt: 'コーヒー___ください。', options: ['を', 'が', 'は', 'に'], answer: 0, explain: '「をください」是点单固定句型。' },
                { prompt: 'ミルク___お願いします。', options: ['を', 'が', 'で', 'と'], answer: 0, explain: '「をお願いします」表示请求。' },
                { prompt: 'サイズは___にしますか。', options: ['どれ', 'だれ', 'いつ', 'なぜ'], answer: 0, explain: '在多个杯型中选择用「どれ」。' }
              ]
            },
            listening: {
              script: 'いらっしゃいませ。ご注文は何ですか。— コーヒーを一つお願いします。ミルクは入れないでください。',
              translation: '欢迎光临，请问要点什么？——请给我一杯咖啡，不要加牛奶。',
              questions: [
                { prompt: 'お客さんは何を注文しましたか。', options: ['コーヒー', '紅茶', 'ジュース', '水'], answer: 0, explain: '顾客说「コーヒーを一つお願いします」。' }
              ]
            },
            speaking: [
              { text: 'コーヒーを一つお願いします。', translation: '请给我一杯咖啡。', tip: '「お願いします」礼貌而自然，尾音放轻。' },
              { text: 'ミルクは入れないでください。', translation: '请不要加牛奶。', tip: '「ないでください」的「ない」清晰。' },
              { text: 'メニューを見てもいいですか。', translation: '可以看一下菜单吗？', tip: '「てもいいですか」语调上扬表示请求。' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ja-a2',
    code: 'A2',
    title: '街を歩こう',
    subtitle: '在城市中问路、购物与用餐',
    units: [
      {
        id: 'ja-a2-u1',
        title: 'Unit 3 · 街の案内',
        desc: '问路与购物场景',
        lessons: [
          {
            id: 'ja-a2-u1-l1',
            title: 'みちをたずねる',
            subtitle: '问路与指路',
            minutes: 15,
            xp: 40,
            goals: ['掌握方位与交通词汇', '用「～てください」指路', '听懂一段日语路线说明'],
            vocab: [
              { term: '右', reading: 'みぎ', pos: '名词', meaning: '右边', example: '次の角を右に曲がります。', exampleCn: '在下一个拐角右转。' },
              { term: '左', reading: 'ひだり', pos: '名词', meaning: '左边', example: '銀行は左側です。', exampleCn: '银行在左边。' },
              { term: 'まっすぐ', reading: 'massugu', pos: '副词', meaning: '直走', example: 'まっすぐ行ってください。', exampleCn: '请直走。' },
              { term: '駅', reading: 'えき', pos: '名词', meaning: '车站', example: '駅はこの近くですか。', exampleCn: '车站在附近吗？' },
              { term: '交差点', reading: 'こうさてん', pos: '名词', meaning: '十字路口', example: '交差点を渡ってください。', exampleCn: '请穿过十字路口。' }
            ],
            grammar: {
              title: '指路句型「～てください」与存在句「～があります」',
              points: ['动词て形 + ください 表示请求对方做某事', '「场所に 名词が あります」表示某处有某物'],
              questions: [
                { prompt: '次の角を右に___ください。', options: ['曲がって', '曲がり', '曲がる', '曲がった'], answer: 0, explain: '「曲がる」的て形是「曲がって」。' },
                { prompt: '駅の前に銀行___あります。', options: ['が', 'を', 'に', 'で'], answer: 0, explain: '存在句用「が」提示存在物。' },
                { prompt: 'まっすぐ___ください。', options: ['行って', '行き', '行く', '行った'], answer: 0, explain: '「行く」的て形是「行って」。' }
              ]
            },
            listening: {
              script: '駅までどう行きますか。— ここからまっすぐ行って、二つ目の交差点を左に曲がってください。駅は公園の隣にあります。',
              translation: '到车站怎么走？——从这里直走，在第二个十字路口左转。车站在公园旁边。',
              questions: [
                { prompt: '駅はどこにありますか。', options: ['公園の隣', '銀行の前', '交差点の中', 'デパートの上'], answer: 0, explain: '录音说「駅は公園の隣にあります」。' }
              ]
            },
            speaking: [
              { text: 'すみません、駅はどこですか。', translation: '不好意思，车站在哪里？', tip: '「すみません」降低音量更礼貌。' },
              { text: 'まっすぐ行ってください。', translation: '请直走。', tip: '「まっすぐ」的促音要顿一下。' },
              { text: '二つ目の角を左に曲がってください。', translation: '请在第二个拐角左转。', tip: '「め」与「を」连接自然。' }
            ]
          },
          {
            id: 'ja-a2-u1-l2',
            title: 'かいものを楽しむ',
            subtitle: '购物与试穿',
            minutes: 15,
            xp: 40,
            goals: ['掌握购物与价格词汇', '用「～てみます」表达尝试', '完成一次试穿与询价'],
            vocab: [
              { term: 'いくら', reading: 'ikura', pos: '疑问词', meaning: '多少钱', example: 'このシャツはいくらですか。', exampleCn: '这件衬衫多少钱？' },
              { term: '高い', reading: 'たかい', pos: '形容词', meaning: '贵的；高的', example: '少し高いですね。', exampleCn: '有点贵呢。' },
              { term: '安い', reading: 'やすい', pos: '形容词', meaning: '便宜的', example: 'こちらは安いです。', exampleCn: '这个比较便宜。' },
              { term: '試着', reading: 'しちゃく', pos: '名词', meaning: '试穿', example: '試着してもいいですか。', exampleCn: '可以试穿吗？' },
              { term: 'レシート', reading: 'reshiito', pos: '名词', meaning: '收据', example: 'レシートをください。', exampleCn: '请给我收据。' }
            ],
            grammar: {
              title: '「～てみます」表示尝试做某事',
              points: ['动词て形 + みます，表示试着做某事', '形容词的礼貌否定：高い → 高くないです'],
              questions: [
                { prompt: 'このシャツを着て___。', options: ['みてもいいですか', 'みますか', 'いますか', 'ありますか'], answer: 0, explain: '「着てみてもいいですか」表示可以试穿吗。' },
                { prompt: 'このかばんは___です。', options: ['高くない', '高いない', '高くありません', 'high'], answer: 0, explain: '形容词否定用「高くないです」。' },
                { prompt: 'これは___ですか。', options: ['いくら', 'いつ', 'だれ', 'どこ'], answer: 0, explain: '询问价格用「いくら」。' }
              ]
            },
            listening: {
              script: 'すみません、このTシャツはいくらですか。— 二千円です。試着してもいいですか。— ええ、どうぞ。試着室は右側です。',
              translation: '不好意思，这件 T 恤多少钱？——两千日元。可以试穿吗？——可以，试衣间在右边。',
              questions: [
                { prompt: 'このTシャツはいくらですか。', options: ['千円', '二千円', '三千円', '五千円'], answer: 1, explain: '店员回答「二千円です」。' }
              ]
            },
            speaking: [
              { text: 'この___はいくらですか。', translation: '这个……多少钱？', tip: '「いくら」语调上扬。' },
              { text: '試着してもいいですか。', translation: '可以试穿吗？', tip: '「いいですか」语气柔和上扬。' },
              { text: 'もう少し安いのはありますか。', translation: '有再便宜一点的吗？', tip: '「もう少し」连读流畅。' }
            ]
          }
        ]
      },
      {
        id: 'ja-a2-u2',
        title: 'Unit 4 · 食事と予約',
        desc: '餐厅用餐与预约安排',
        lessons: [
          {
            id: 'ja-a2-u2-l1',
            title: 'レストランで',
            subtitle: '餐厅用餐',
            minutes: 15,
            xp: 45,
            goals: ['掌握餐厅场景词汇', '用「～が好きです」表达偏好', '看懂菜单并完成点餐'],
            vocab: [
              { term: 'おすすめ', reading: 'osusume', pos: '名词', meaning: '推荐', example: '今日のおすすめは何ですか。', exampleCn: '今天的推荐是什么？' },
              { term: '辛い', reading: 'からい', pos: '形容词', meaning: '辣的', example: 'この料理は辛いですか。', exampleCn: '这道菜辣吗？' },
              { term: 'デザート', reading: 'dezaato', pos: '名词', meaning: '甜点', example: 'デザートはいかがですか。', exampleCn: '要来点甜点吗？' },
              { term: 'アレルギー', reading: 'arerugii', pos: '名词', meaning: '过敏', example: 'ナッツのアレルギーがあります。', exampleCn: '我对坚果过敏。' },
              { term: 'いただきます', reading: 'itadakimasu', pos: '寒暄', meaning: '我开动了', example: 'では、いただきます。', exampleCn: '那么，我开动了。' }
            ],
            grammar: {
              title: '「～が好きです」与「～を食べます」',
              points: ['喜好的对象用「が」：刺身が好きです', '动作的对象用「を」：刺身を食べます'],
              questions: [
                { prompt: 'わたしは寿司___好きです。', options: ['が', 'を', 'に', 'で'], answer: 0, explain: '表示喜好用「が」。' },
                { prompt: '毎朝、パン___食べます。', options: ['を', 'が', 'は', 'に'], answer: 0, explain: '动作对象用「を」。' },
                { prompt: 'この料理は___ですか。', options: ['辛い', '辛く', '辛さ', '辛いの'], answer: 0, explain: '询问性质用形容词原形「辛い」。' }
              ]
            },
            listening: {
              script: 'いらっしゃいませ。何名様ですか。— 二人です。今日のおすすめは何ですか。— 焼き魚がおすすめです。— じゃあ、それとデザートをお願いします。',
              translation: '欢迎光临，请问几位？——两位。今天的推荐是什么？——推荐烤鱼。——那就要那个和甜点吧。',
              questions: [
                { prompt: 'おすすめは何ですか。', options: ['焼き魚', '寿司', 'ラーメン', 'カレー'], answer: 0, explain: '店员说「焼き魚がおすすめです」。' }
              ]
            },
            speaking: [
              { text: '今日のおすすめは何ですか。', translation: '今天的推荐是什么？', tip: '「おすすめ」重音平稳，句尾上扬。' },
              { text: 'わたしは___が好きです。', translation: '我喜欢……', tip: '「好き」的「き」要清晰。' },
              { text: 'ナッツのアレルギーがあります。', translation: '我对坚果过敏。', tip: '「アレルギー」长音要读足。' }
            ]
          },
          {
            id: 'ja-a2-u2-l2',
            title: 'よやくする',
            subtitle: '预约与变更',
            minutes: 15,
            xp: 45,
            goals: ['掌握预约与变更词汇', '用「～てもいいですか」请求许可', '完成一次电话预约'],
            vocab: [
              { term: '予約', reading: 'よやく', pos: '名词/动词', meaning: '预约', example: 'レストランを予約したいです。', exampleCn: '我想预约餐厅。' },
              { term: '空いている', reading: 'あいている', pos: '动词', meaning: '有空位；空闲', example: '明日の夜は空いていますか。', exampleCn: '明晚有空位吗？' },
              { term: '変更', reading: 'へんこう', pos: '名词/动词', meaning: '变更', example: '予約を変更したいです。', exampleCn: '我想更改预约。' },
              { term: 'キャンセル', reading: 'kyanseru', pos: '名词/动词', meaning: '取消', example: '予約をキャンセルします。', exampleCn: '我要取消预约。' },
              { term: '確認', reading: 'かくにん', pos: '名词/动词', meaning: '确认', example: 'ご予約を確認いたします。', exampleCn: '我来确认您的预约。' }
            ],
            grammar: {
              title: '「～てもいいですか」与「～たいです」',
              points: ['动词て形 + もいいですか，表示请求许可', '动词ます形去ます + たいです，表示想做什么'],
              questions: [
                { prompt: '予約を変更して___いいですか。', options: ['も', 'が', 'は', 'に'], answer: 0, explain: '「てもいいですか」表示请求许可。' },
                { prompt: 'レストランを予約___です。', options: ['したい', 'して', 'する', 'します'], answer: 0, explain: '「予約したいです」表示想做某事。' },
                { prompt: '明日の夜は___いますか。', options: ['空いて', '空き', '空く', '空いた'], answer: 0, explain: '「空いていますか」表示是否有空位。' }
              ]
            },
            listening: {
              script: 'もしもし、レストランさくらですか。今晩七時に二人で予約したいです。— 申し訳ありません、七時は満席です。七時半はいかがですか。— では、七時半でお願いします。',
              translation: '喂，是樱花餐厅吗？我想预约今晚七点，两位。——抱歉，七点满了，七点半可以吗？——那就七点半吧。',
              questions: [
                { prompt: '予約は何時になりましたか。', options: ['六時半', '七時', '七時半', '八時'], answer: 2, explain: '最终确认「七時半でお願いします」。' }
              ]
            },
            speaking: [
              { text: '予約したいです。', translation: '我想预约。', tip: '「したい」的「い」清晰收尾。' },
              { text: '七時半はいかがですか。', translation: '七点半可以吗？', tip: '「いかが」是礼貌的“怎么样”。' },
              { text: '予約を変更してもいいですか。', translation: '可以更改预约吗？', tip: '长句注意「を」与「して」的衔接。' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ja-b1',
    code: 'B1',
    title: '伝わる日本語',
    subtitle: '职场沟通与观点表达',
    units: [
      {
        id: 'ja-b1-u1',
        title: 'Unit 5 · 仕事の日本語',
        desc: '面试与商务邮件',
        lessons: [
          {
            id: 'ja-b1-u1-l1',
            title: '面接に挑む',
            subtitle: '面试自我介绍',
            minutes: 18,
            xp: 55,
            goals: ['掌握面试高频词', '用「～たことがある」谈经历', '完成一段日语自我介绍'],
            vocab: [
              { term: '経験', reading: 'けいけん', pos: '名词', meaning: '经验', example: 'マーケティングの経験が三年あります。', exampleCn: '我有三年市场营销经验。' },
              { term: '強み', reading: 'つよみ', pos: '名词', meaning: '优势', example: 'わたしの強みは課題解決力です。', exampleCn: '我的优势是解决问题的能力。' },
              { term: '志望動機', reading: 'しぼうどうき', pos: '名词', meaning: '求职动机', example: '志望動機を教えてください。', exampleCn: '请说说你的求职动机。' },
              { term: '挑戦', reading: 'ちょうせん', pos: '名词/动词', meaning: '挑战', example: '新しいことに挑戦したいです。', exampleCn: '我想挑战新事物。' },
              { term: '成長', reading: 'せいちょう', pos: '名词/动词', meaning: '成长', example: 'この会社で成長したいです。', exampleCn: '我想在这家公司成长。' }
            ],
            grammar: {
              title: '「～たことがある」与「～ので」',
              points: ['动词た形 + ことがある，表示曾经有过某种经历', '「～ので」表示原因，语气比「から」更委婉'],
              questions: [
                { prompt: '海外で働いた___があります。', options: ['こと', 'もの', 'の', 'ところ'], answer: 0, explain: '「～たことがある」表示经历。' },
                { prompt: '経験がある___、この仕事に応募しました。', options: ['ので', 'でも', 'しか', 'より'], answer: 0, explain: '「ので」表示原因。' },
                { prompt: 'チームで___を達成しました。', options: ['目標', '目的', '理由', '意見'], answer: 0, explain: '「目標を達成する」是固定搭配。' }
              ]
            },
            listening: {
              script: '自己紹介をお願いします。— はい。わたしは四年間プロダクトデザイナーとして働いたことがあります。強みはユーザーの声を改善につなげることです。御社で成長したいと考えています。',
              translation: '请做一下自我介绍。——好的，我曾作为产品设计师工作过四年，优势是把用户的声音转化为改进。我希望在贵公司成长。',
              questions: [
                { prompt: '何年間デザイナーとして働きましたか。', options: ['二年間', '三年間', '四年間', '五年間'], answer: 2, explain: '录音中说「四年間」。' }
              ]
            },
            speaking: [
              { text: '___の経験が___年あります。', translation: '我有……年的……经验。', tip: '「経験」重音平稳，数字清晰。' },
              { text: 'わたしの強みは___です。', translation: '我的优势是……', tip: '「強み」的「よ」不要发成中文的“you”。' },
              { text: '御社で成長したいです。', translation: '我想在贵公司成长。', tip: '「御社」是面试中的敬称。' }
            ]
          },
          {
            id: 'ja-b1-u1-l2',
            title: 'ビジネスメール',
            subtitle: '商务邮件写作',
            minutes: 18,
            xp: 55,
            goals: ['掌握商务邮件词汇', '使用敬语表达请求', '写出一封 3 句商务邮件'],
            vocab: [
              { term: '添付', reading: 'てんぷ', pos: '名词/动词', meaning: '附件；附上', example: '資料を添付しました。', exampleCn: '资料已附上。' },
              { term: '締め切り', reading: 'しめきり', pos: '名词', meaning: '截止日期', example: '締め切りは金曜日です。', exampleCn: '截止日期是周五。' },
              { term: '会議', reading: 'かいぎ', pos: '名词', meaning: '会议', example: '明日の会議は十時からです。', exampleCn: '明天的会议十点开始。' },
              { term: '連絡', reading: 'れんらく', pos: '名词/动词', meaning: '联系；通知', example: 'ご連絡をお待ちしています。', exampleCn: '期待您的联系。' },
              { term: '確認', reading: 'かくにん', pos: '名词/动词', meaning: '确认', example: 'ご確認をお願いいたします。', exampleCn: '请您确认。' }
            ],
            grammar: {
              title: '商务敬语：お～いたします / ～ていただけますか',
              points: ['「お／ご + 动词词干 + いたします」是自谦表达', '「～ていただけますか」礼貌地请求对方做某事'],
              questions: [
                { prompt: '資料を___しました。', options: ['添付', '添付し', '添付する', '添付の'], answer: 0, explain: '「資料を添付しました」即可，敬语中可加「ご」。' },
                { prompt: 'ご確認を___いたします。', options: ['お願い', 'お願いし', 'お願いする', 'お願いの'], answer: 0, explain: '「ご確認をお願いいたします」是正式邮件表达。' },
                { prompt: 'ご都合を___いただけますか。', options: ['お知らせ', '知らせ', '知る', '知って'], answer: 0, explain: '「お知らせいただけますか」礼貌请求。' }
              ]
            },
            listening: {
              script: 'お世話になっております。明日の会議の資料を添付しました。お手数ですが、金曜日までにご確認をお願いいたします。',
              translation: '感谢您一直以来的关照。已附上明天会议的资料。麻烦您在周五前确认。',
              questions: [
                { prompt: '資料をいつまでに確認しますか。', options: ['水曜日', '木曜日', '金曜日', '来週'], answer: 2, explain: '录音中说「金曜日までにご確認を」。' }
              ]
            },
            speaking: [
              { text: 'お世話になっております。', translation: '感谢您一直以来的关照。', tip: '商务邮件与电话的标准开场。' },
              { text: '資料を添付しました。', translation: '资料已附上。', tip: '「添付」的「ぷ」轻收。' },
              { text: 'ご確認をお願いいたします。', translation: '请您确认。', tip: '「いたします」比「します」更谦敬。' }
            ]
          }
        ]
      },
      {
        id: 'ja-b1-u2',
        title: 'Unit 6 · 考えを伝える',
        desc: '观点表达与旅行计划',
        lessons: [
          {
            id: 'ja-b1-u2-l1',
            title: '意見を伝える',
            subtitle: '表达观点与建议',
            minutes: 18,
            xp: 60,
            goals: ['掌握观点表达词汇', '用「～と思います」表达看法', '参与一次日语讨论'],
            vocab: [
              { term: '意見', reading: 'いけん', pos: '名词', meaning: '意见', example: 'ご意見を聞かせてください。', exampleCn: '请说说您的意见。' },
              { term: '賛成', reading: 'さんせい', pos: '名词/动词', meaning: '赞成', example: 'その案に賛成です。', exampleCn: '我赞成那个方案。' },
              { term: '反対', reading: 'はんたい', pos: '名词/动词', meaning: '反对', example: 'コストの面から反対です。', exampleCn: '从成本角度我反对。' },
              { term: '提案', reading: 'ていあん', pos: '名词/动词', meaning: '提案', example: '新しい提案があります。', exampleCn: '我有一个新提案。' },
              { term: '理由', reading: 'りゆう', pos: '名词', meaning: '理由', example: '理由を教えてください。', exampleCn: '请告诉我理由。' }
            ],
            grammar: {
              title: '「～と思います」与「～かもしれません」',
              points: ['「～と思います」表示说话人的判断或看法', '「～かもしれません」表示不确定的可能性'],
              questions: [
                { prompt: 'このデザインのほうがいい___思います。', options: ['と', 'を', 'が', 'に'], answer: 0, explain: '「と思います」前用助词「と」。' },
                { prompt: '予算が足りない___。', options: ['かもしれません', 'です', 'ました', 'ませんか'], answer: 0, explain: '表示不确定用「かもしれません」。' },
                { prompt: 'その案に___です。', options: ['賛成', '賛成し', '賛成する', '賛成の'], answer: 0, explain: '「賛成です」表示赞成。' }
              ]
            },
            listening: {
              script: 'この新機能についてどう思いますか。— 来月リリースするのはいいと思います。でも、ユーザーの操作が複雑かもしれません。まずテストをしたほうがいいと思います。',
              translation: '你怎么看这个新功能？——我认为下个月发布不错。不过用户操作可能会比较复杂，我觉得最好先做测试。',
              questions: [
                { prompt: 'まず何をしたほうがいいと言いましたか。', options: ['テスト', 'リリース', '会議', '宣伝'], answer: 0, explain: '最后说「まずテストをしたほうがいい」。' }
              ]
            },
            speaking: [
              { text: 'わたしは___と思います。', translation: '我认为……', tip: '「と思います」接在完整句子后。' },
              { text: 'その案に賛成です。', translation: '我赞成那个方案。', tip: '「賛成」重音清晰，句尾平稳。' },
              { text: '理由は___からです。', translation: '理由是……', tip: '「からです」说明原因。' }
            ]
          },
          {
            id: 'ja-b1-u2-l2',
            title: '旅行を計画する',
            subtitle: '旅行计划讨论',
            minutes: 18,
            xp: 60,
            goals: ['掌握旅行计划词汇', '用「～つもりです」表达打算', '用日语协商一次行程'],
            vocab: [
              { term: '予定', reading: 'よてい', pos: '名词', meaning: '计划；日程', example: '週末の予定は何ですか。', exampleCn: '周末有什么安排？' },
              { term: '予算', reading: 'よさん', pos: '名词', meaning: '预算', example: '予算は十万円です。', exampleCn: '预算是十万日元。' },
              { term: '目的地', reading: 'もくてきち', pos: '名词', meaning: '目的地', example: '目的地は京都です。', exampleCn: '目的地是京都。' },
              { term: '宿', reading: 'やど', pos: '名词', meaning: '住宿', example: '駅の近くの宿を予約しました。', exampleCn: '订了车站附近的住宿。' },
              { term: '自由', reading: 'じゆう', pos: '名词/形容词', meaning: '自由', example: '午後は自由時間です。', exampleCn: '下午是自由时间。' }
            ],
            grammar: {
              title: '「～つもりです」与「～ながら」',
              points: ['动词辞书形 + つもりです，表示打算做某事', '动词ます形去ます + ながら，表示一边……一边……'],
              questions: [
                { prompt: '週末に京都へ行く___です。', options: ['つもり', '予定し', 'したい', 'ながら'], answer: 0, explain: '「行くつもりです」表示打算去。' },
                { prompt: '音楽を聞き___歩きます。', options: ['ながら', 'つもり', 'ために', 'ように'], answer: 0, explain: '「聞きながら歩く」表示一边听一边走。' },
                { prompt: '予算は___ですか。', options: ['いくら', 'いつ', 'どこ', 'だれ'], answer: 0, explain: '询问预算金额用「いくら」。' }
              ]
            },
            listening: {
              script: '週末の旅行はどうしますか。— 京都に行くつもりです。予算は十万円で、駅の近くの宿を予約しました。午後は自由時間にしたいです。',
              translation: '周末旅行怎么安排？——打算去京都。预算十万日元，已订好车站附近的住宿。下午想安排自由时间。',
              questions: [
                { prompt: '週末どこに行くつもりですか。', options: ['大阪', '京都', '東京', '奈良'], answer: 1, explain: '录音中说「京都に行くつもりです」。' }
              ]
            },
            speaking: [
              { text: '___に行くつもりです。', translation: '我打算去……', tip: '「つもり」的「り」轻而短。' },
              { text: '予算は___です。', translation: '预算是……', tip: '数字与「円」连读自然。' },
              { text: '午後は自由時間にしたいです。', translation: '下午我想安排自由时间。', tip: '「自由時間」重音在「じ」。' }
            ]
          }
        ]
      }
    ]
  }
];
