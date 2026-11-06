// 英语课程内容：A1 → A2 → B1，三个级别，每个级别两个单元
export const enLevels = [
  {
    id: 'en-a1',
    code: 'A1',
    title: '入门启航',
    subtitle: '从零开始，用英语完成第一次真实对话',
    units: [
      {
        id: 'en-a1-u1',
        title: 'Unit 1 · 初次相遇',
        desc: '问候、自我介绍与基础 be 动词',
        lessons: [
          {
            id: 'en-a1-u1-l1',
            title: 'Hello, world',
            subtitle: '初次见面与问候',
            minutes: 12,
            xp: 30,
            goals: ['掌握 5 个高频问候词', '用 am / is / are 介绍自己', '听懂并回应简单寒暄'],
            vocab: [
              { term: 'hello', pos: 'int.', meaning: '你好；喂', example: 'Hello, I am Mia.', exampleCn: '你好，我是米娅。' },
              { term: 'name', pos: 'n.', meaning: '名字', example: 'My name is Daniel.', exampleCn: '我的名字是丹尼尔。' },
              { term: 'meet', pos: 'v.', meaning: '遇见；认识', example: 'Nice to meet you.', exampleCn: '很高兴认识你。' },
              { term: 'from', pos: 'prep.', meaning: '来自', example: 'I am from Shanghai.', exampleCn: '我来自上海。' },
              { term: 'welcome', pos: 'v./adj.', meaning: '欢迎', example: 'Welcome to our class!', exampleCn: '欢迎来到我们的课堂！' }
            ],
            grammar: {
              title: 'be 动词现在时：am / is / are',
              points: ['I 搭配 am，he / she / it 搭配 is，you / we / they 搭配 are', '否定句直接在 be 动词后加 not，如 I am not from Tokyo.'],
              questions: [
                { prompt: '___ you from Canada?', options: ['Are', 'Is', 'Am', 'Be'], answer: 0, explain: '主语 you 搭配 are，疑问句把 are 提前。' },
                { prompt: 'She ___ a doctor.', options: ['am', 'is', 'are', 'be'], answer: 1, explain: '第三人称单数 she 搭配 is。' },
                { prompt: 'I ___ not a teacher.', options: ['am', 'is', 'are', 'do'], answer: 0, explain: 'I 的否定形式是 am not。' }
              ]
            },
            listening: {
              script: "Hi, I'm Daniel. I'm from Toronto, Canada. Nice to meet you!",
              translation: '嗨，我是丹尼尔。我来自加拿大多伦多。很高兴认识你！',
              questions: [
                { prompt: 'Where is Daniel from?', options: ['Toronto', 'Tokyo', 'London', 'Sydney'], answer: 0, explain: '录音中他明确说 I am from Toronto。' }
              ]
            },
            speaking: [
              { text: "Hello, my name is ___.", translation: '你好，我的名字是……', tip: '注意 name is 的连读，语气自然上扬。' },
              { text: "Nice to meet you.", translation: '很高兴认识你。', tip: 'meet you 连读成 /ˈmiːtjuː/。' },
              { text: "I'm from ___.", translation: '我来自……', tip: "I'm 读作 /aɪm/，不要读成两个音节。" }
            ]
          },
          {
            id: 'en-a1-u1-l2',
            title: 'This is me',
            subtitle: '完整地介绍自己',
            minutes: 14,
            xp: 30,
            goals: ['用 5 个身份与爱好词汇描述自己', '掌握一般现在时的第三人称变化', '连续说出 3 句自我介绍'],
            vocab: [
              { term: 'introduce', pos: 'v.', meaning: '介绍', example: 'Let me introduce myself.', exampleCn: '让我介绍一下我自己。' },
              { term: 'student', pos: 'n.', meaning: '学生', example: 'I am a university student.', exampleCn: '我是一名大学生。' },
              { term: 'hobby', pos: 'n.', meaning: '爱好', example: 'My hobby is photography.', exampleCn: '我的爱好是摄影。' },
              { term: 'live', pos: 'v.', meaning: '居住', example: 'I live in Beijing.', exampleCn: '我住在北京。' },
              { term: 'language', pos: 'n.', meaning: '语言', example: 'I am learning three languages.', exampleCn: '我在学三种语言。' }
            ],
            grammar: {
              title: '一般现在时与第三人称单数',
              points: ['主语是 he / she / it 时，动词加 -s 或 -es', '否定句用 don\'t / doesn\'t + 动词原形'],
              questions: [
                { prompt: 'She ___ in Osaka with her family.', options: ['live', 'lives', 'living', 'is live'], answer: 1, explain: '第三人称单数 live 要加 -s。' },
                { prompt: 'He ___ like coffee.', options: ["don't", "doesn't", "isn't", "not"], answer: 1, explain: '第三人称单数的否定用 doesn\'t。' },
                { prompt: 'They ___ English every day.', options: ['studies', 'study', 'studying', 'studys'], answer: 1, explain: '主语 they 是复数，用动词原形 study。' }
              ]
            },
            listening: {
              script: "Let me introduce myself. I'm Yuki, a student from Osaka. I love photography and I'm learning English.",
              translation: '让我自我介绍一下。我是来自大阪的学生 Yuki，我喜欢摄影，正在学英语。',
              questions: [
                { prompt: 'What is Yuki\'s hobby?', options: ['Photography', 'Cooking', 'Running', 'Painting'], answer: 0, explain: '她说 I love photography。' }
              ]
            },
            speaking: [
              { text: "Let me introduce myself. I'm ___.", translation: '让我自我介绍一下，我是……', tip: 'introduce 重音在第二个音节。' },
              { text: 'I live in ___ and I study ___.', translation: '我住在……，学习……', tip: '注意 and 前后语调保持一致。' },
              { text: 'My hobby is ___.', translation: '我的爱好是……', tip: 'hobby 的 b 不发音，读作 /ˈhɒbi/。' }
            ]
          }
        ]
      },
      {
        id: 'en-a1-u2',
        title: 'Unit 2 · 日常生活',
        desc: '数字、时间与咖啡馆点单',
        lessons: [
          {
            id: 'en-a1-u2-l1',
            title: 'Time & numbers',
            subtitle: '数字与时间表达',
            minutes: 12,
            xp: 35,
            goals: ['说出 1–100 的英文数字', '用 at / half past 表达时间', '听懂一个会议时间并记录'],
            vocab: [
              { term: 'hour', pos: 'n.', meaning: '小时', example: 'The class lasts one hour.', exampleCn: '这节课持续一小时。' },
              { term: 'minute', pos: 'n.', meaning: '分钟', example: 'See you in ten minutes.', exampleCn: '十分钟后见。' },
              { term: 'o\'clock', pos: 'adv.', meaning: '……点钟', example: 'It is nine o\'clock.', exampleCn: '现在是九点钟。' },
              { term: 'half past', pos: 'phrase', meaning: '……点半', example: 'The shop opens at half past eight.', exampleCn: '商店八点半开门。' },
              { term: 'quarter', pos: 'n.', meaning: '一刻钟；四分之一', example: 'It is a quarter to six.', exampleCn: '现在是五点四十五分。' }
            ],
            grammar: {
              title: '时间表达与 at 的用法',
              points: ['具体时刻前用介词 at，如 at 9:30、at noon', '半点用 half past + 小时，差一刻用 a quarter to + 小时'],
              questions: [
                { prompt: 'The meeting starts ___ nine thirty.', options: ['in', 'on', 'at', 'by'], answer: 2, explain: '具体时刻前用 at。' },
                { prompt: '8:30 可以表达为 ___.', options: ['half past eight', 'half to eight', 'eight half', 'quarter past eight'], answer: 0, explain: 'half past eight 表示八点半。' },
                { prompt: 'It is ___ to six. (5:45)', options: ['half', 'quarter', 'ten', 'five'], answer: 1, explain: '差一刻六点即 5:45，用 a quarter to six。' }
              ]
            },
            listening: {
              script: 'The meeting starts at nine thirty in Room 204. Please arrive ten minutes early.',
              translation: '会议九点三十分在 204 房间开始。请提前十分钟到达。',
              questions: [
                { prompt: 'When does the meeting start?', options: ['9:00', '9:15', '9:30', '10:00'], answer: 2, explain: '录音中明确说 at nine thirty。' }
              ]
            },
            speaking: [
              { text: 'The meeting starts at ___.', translation: '会议在……开始。', tip: 'at 与后面的数字要连读。' },
              { text: 'See you in ten minutes.', translation: '十分钟后见。', tip: 'minutes 结尾的 ts 轻而短。' },
              { text: 'It is half past ___.', translation: '现在是……点半。', tip: 'half 的 l 不发音。' }
            ]
          },
          {
            id: 'en-a1-u2-l2',
            title: 'At the café',
            subtitle: '咖啡馆点单',
            minutes: 14,
            xp: 35,
            goals: ['掌握点单核心词汇', '使用 I\'d like ... 礼貌点单', '听懂咖啡师的问题并回应'],
            vocab: [
              { term: 'order', pos: 'v./n.', meaning: '点单；订单', example: 'Can I order a coffee, please?', exampleCn: '我可以点一杯咖啡吗？' },
              { term: 'medium', pos: 'adj.', meaning: '中等的；中杯', example: 'A medium latte, please.', exampleCn: '请给我一杯中杯拿铁。' },
              { term: 'receipt', pos: 'n.', meaning: '收据', example: 'Keep your receipt.', exampleCn: '保留你的收据。' },
              { term: 'sugar', pos: 'n.', meaning: '糖', example: 'No sugar, please.', exampleCn: '请不要加糖。' },
              { term: 'milk', pos: 'n.', meaning: '牛奶', example: 'Oat milk or whole milk?', exampleCn: '燕麦奶还是全脂牛奶？' }
            ],
            grammar: {
              title: '礼貌点单：I\'d like ... / Could I ...?',
              points: ['I\'d like = I would like，后面接名词或 to do', 'Could I have ...? 比 Can I have ...? 更礼貌'],
              questions: [
                { prompt: '___ like a large coffee, please.', options: ['I', 'I\'d', 'I\'m', 'I\'ll'], answer: 1, explain: 'I\'d like 是礼貌点单的固定表达。' },
                { prompt: 'Could I ___ a receipt?', options: ['have', 'has', 'having', 'to have'], answer: 0, explain: '情态动词后接动词原形 have。' },
                { prompt: 'A: Can I help you? B: ___', options: ['Yes, I like coffee.', 'I\'d like a latte, please.', 'I am a latte.', 'No, I don\'t.'], answer: 1, explain: '点单场景用 I\'d like ... please 回应最自然。' }
              ]
            },
            listening: {
              script: 'Good morning! What can I get for you? — I\'d like a medium latte with oat milk, please. — Sure. That\'s four fifty.',
              translation: '早上好！您想喝点什么？——请给我一杯中杯燕麦奶拿铁。——好的，四块五。',
              questions: [
                { prompt: 'What does the customer order?', options: ['A large latte', 'A medium latte with oat milk', 'A medium coffee with sugar', 'A small tea'], answer: 1, explain: '顾客说 a medium latte with oat milk。' }
              ]
            },
            speaking: [
              { text: "I'd like a ___, please.", translation: '请给我一杯……', tip: "I'd like 读得轻快柔和，please 语调上扬。" },
              { text: 'Could I have a receipt?', translation: '可以给我一张收据吗？', tip: 'Could I 的 d 与 I 连读。' },
              { text: 'No sugar, please.', translation: '请不要加糖。', tip: 'please 放在句尾，语气更礼貌。' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'en-a2',
    code: 'A2',
    title: '场景进阶',
    subtitle: '在城市中自由出行、购物与用餐',
    units: [
      {
        id: 'en-a2-u1',
        title: 'Unit 3 · 城市探索',
        desc: '问路、交通与购物退换',
        lessons: [
          {
            id: 'en-a2-u1-l1',
            title: 'Finding the way',
            subtitle: '问路与交通',
            minutes: 15,
            xp: 40,
            goals: ['掌握 5 个方位与交通词汇', '用祈使句给对方指路', '听懂一段换乘指引'],
            vocab: [
              { term: 'straight', pos: 'adv.', meaning: '直走；径直', example: 'Go straight for two blocks.', exampleCn: '直走两个街区。' },
              { term: 'corner', pos: 'n.', meaning: '拐角', example: 'Turn left at the corner.', exampleCn: '在拐角处左转。' },
              { term: 'subway', pos: 'n.', meaning: '地铁', example: 'Take the subway to Central Park.', exampleCn: '坐地铁去中央公园。' },
              { term: 'platform', pos: 'n.', meaning: '站台', example: 'The train leaves from platform 3.', exampleCn: '列车从 3 号站台发车。' },
              { term: 'direction', pos: 'n.', meaning: '方向', example: 'Could you tell me the direction?', exampleCn: '你能告诉我方向吗？' }
            ],
            grammar: {
              title: '祈使句与方位介词',
              points: ['祈使句以动词原形开头：Go / Turn / Take', 'across from 表示在……对面，next to 表示紧挨着'],
              questions: [
                { prompt: '___ straight and turn right at the bank.', options: ['Going', 'Go', 'To go', 'Goes'], answer: 1, explain: '指路用祈使句，动词原形开头。' },
                { prompt: 'The subway station is ___ the bank.', options: ['across from', 'across', 'between', 'along'], answer: 0, explain: 'across from 表示在……对面。' },
                { prompt: '___ the number 4 line to Green Street.', options: ['Take', 'Takes', 'Taking', 'Took'], answer: 0, explain: '祈使句使用动词原形 take。' }
              ]
            },
            listening: {
              script: 'Take the number 4 subway line and get off at Green Street. Then walk straight for five minutes. The museum is on your left, across from the park.',
              translation: '乘坐 4 号线地铁，在绿街站下车。然后直走五分钟，博物馆在你的左手边，公园对面。',
              questions: [
                { prompt: 'Which line should you take?', options: ['Line 3', 'Line 4', 'Line 5', 'Line 7'], answer: 1, explain: '录音提到 take the number 4 subway line。' }
              ]
            },
            speaking: [
              { text: 'Could you tell me how to get to ___?', translation: '你能告诉我怎么去……吗？', tip: 'how to get to 语调下倾，显示请求。' },
              { text: 'Go straight and turn left at the corner.', translation: '直走，在拐角处左转。', tip: 'straight 的 tr 音清晰。' },
              { text: 'It is across from ___.', translation: '它在……的对面。', tip: 'across from 连读成 /əˈkrɒs frəm/。' }
            ]
          },
          {
            id: 'en-a2-u1-l2',
            title: 'Returns & exchanges',
            subtitle: '购物与退换',
            minutes: 15,
            xp: 40,
            goals: ['掌握购物退换关键词', '用 could / may 提出请求', '处理一次退货对话'],
            vocab: [
              { term: 'refund', pos: 'n./v.', meaning: '退款', example: 'I\'d like a refund, please.', exampleCn: '我想要退款。' },
              { term: 'exchange', pos: 'v./n.', meaning: '换货；交换', example: 'Can I exchange this shirt?', exampleCn: '我可以换这件衬衫吗？' },
              { term: 'discount', pos: 'n.', meaning: '折扣', example: 'This jacket is on discount.', exampleCn: '这件夹克正在打折。' },
              { term: 'receipt', pos: 'n.', meaning: '收据', example: 'Do you have the receipt?', exampleCn: '你有收据吗？' },
              { term: 'try on', pos: 'phrase', meaning: '试穿', example: 'May I try this on?', exampleCn: '我可以试穿这个吗？' }
            ],
            grammar: {
              title: '情态动词 could / may 的礼貌请求',
              points: ['Could / May I ...? 用于礼貌征得许可', 'would like to + 动词原形 表示想要做某事'],
              questions: [
                { prompt: '___ I try this jacket on?', options: ['May', 'Do', 'Am', 'Will'], answer: 0, explain: 'May I ...? 是请求许可的礼貌句型。' },
                { prompt: 'I would like ___ this shirt.', options: ['exchange', 'to exchange', 'exchanging', 'exchanged'], answer: 1, explain: 'would like 后接 to do。' },
                { prompt: 'We can\'t give a refund ___ a receipt.', options: ['with', 'without', 'under', 'across'], answer: 1, explain: 'without a receipt 表示没有收据。' }
              ]
            },
            listening: {
              script: 'Hello, I bought this shirt yesterday, but it\'s too small. Can I exchange it for a larger size? — Of course. Do you have the receipt? — Yes, here it is.',
              translation: '你好，我昨天买了这件衬衫，但太小了。我能换一件大号吗？——当然可以，你有收据吗？——有，在这里。',
              questions: [
                { prompt: 'Why does the customer want an exchange?', options: ['The color is wrong', 'The shirt is too small', 'It is too expensive', 'It is broken'], answer: 1, explain: '顾客说 it\'s too small。' }
              ]
            },
            speaking: [
              { text: 'I would like to return this ___.', translation: '我想退掉这个……', tip: 'would like to 连读柔和。' },
              { text: 'Could I exchange it for a larger size?', translation: '我能换成大一号吗？', tip: 'exchange 重音在第二个音节。' },
              { text: 'Do you have the receipt?', translation: '你有收据吗？', tip: 'receipt 的 p 不发音。' }
            ]
          }
        ]
      },
      {
        id: 'en-a2-u2',
        title: 'Unit 4 · 社交场景',
        desc: '餐厅点餐与预约安排',
        lessons: [
          {
            id: 'en-a2-u2-l1',
            title: 'At the restaurant',
            subtitle: '餐厅用餐',
            minutes: 15,
            xp: 45,
            goals: ['掌握餐厅场景词汇', '用 would like 表达用餐需求', '听懂点餐与忌口信息'],
            vocab: [
              { term: 'recommend', pos: 'v.', meaning: '推荐', example: 'What do you recommend?', exampleCn: '你推荐什么？' },
              { term: 'starter', pos: 'n.', meaning: '前菜', example: 'I\'ll start with a soup.', exampleCn: '我先来一份汤。' },
              { term: 'dessert', pos: 'n.', meaning: '甜点', example: 'Would you like some dessert?', exampleCn: '您想要甜点吗？' },
              { term: 'allergic', pos: 'adj.', meaning: '过敏的', example: 'I\'m allergic to peanuts.', exampleCn: '我对花生过敏。' },
              { term: 'spicy', pos: 'adj.', meaning: '辛辣的', example: 'Is this dish very spicy?', exampleCn: '这道菜很辣吗？' }
            ],
            grammar: {
              title: '点餐句型：I\'ll have / Would you like ...?',
              points: ['I\'ll have ... 表示当场决定要点什么', 'Would you like ...? 用于礼貌询问对方意愿'],
              questions: [
                { prompt: '___ you like something to drink?', options: ['Would', 'Do', 'Are', 'Will'], answer: 0, explain: 'Would you like ... 是礼貌询问。' },
                { prompt: 'I ___ have the chicken, please.', options: ['will', 'am', 'do', 'would'], answer: 0, explain: 'I\'ll have = I will have，表示点餐决定。' },
                { prompt: 'I\'m allergic ___ seafood.', options: ['with', 'to', 'for', 'at'], answer: 1, explain: 'be allergic to 表示对……过敏。' }
              ]
            },
            listening: {
              script: 'Good evening. Are you ready to order? — Yes, I\'ll have the grilled salmon, and my friend is allergic to nuts. — No problem. I\'ll make sure the dish has no nuts.',
              translation: '晚上好，可以点餐了吗？——可以，我要烤三文鱼，我的朋友对坚果过敏。——没问题，我会确保菜品不含坚果。',
              questions: [
                { prompt: 'What does the customer order?', options: ['Grilled salmon', 'Chicken soup', 'Beef steak', 'Vegetable salad'], answer: 0, explain: '顾客点了 the grilled salmon。' }
              ]
            },
            speaking: [
              { text: 'What would you recommend?', translation: '你推荐什么？', tip: 'recommend 重音在 -mend。' },
              { text: "I'll have the ___, please.", translation: '我要……，谢谢。', tip: "I'll 读作 /aɪl/。" },
              { text: "I'm allergic to ___.", translation: '我对……过敏。', tip: 'allergic 重音在 -ler-。' }
            ]
          },
          {
            id: 'en-a2-u2-l2',
            title: 'Making an appointment',
            subtitle: '预约与安排',
            minutes: 15,
            xp: 45,
            goals: ['掌握预约与变更词汇', '用 be going to 表达计划', '完成一次电话预约'],
            vocab: [
              { term: 'appointment', pos: 'n.', meaning: '预约', example: 'I have an appointment at 4 p.m.', exampleCn: '我下午四点有预约。' },
              { term: 'available', pos: 'adj.', meaning: '有空的；可用的', example: 'Are you available on Friday?', exampleCn: '你周五有空吗？' },
              { term: 'reschedule', pos: 'v.', meaning: '改期', example: 'Can we reschedule to Monday?', exampleCn: '我们能改到周一吗？' },
              { term: 'confirm', pos: 'v.', meaning: '确认', example: 'Please confirm your booking.', exampleCn: '请确认你的预订。' },
              { term: 'cancel', pos: 'v.', meaning: '取消', example: 'I need to cancel my appointment.', exampleCn: '我需要取消我的预约。' }
            ],
            grammar: {
              title: '将来计划：be going to / will',
              points: ['be going to 表示已计划的安排', 'will 表示临时决定或承诺'],
              questions: [
                { prompt: 'I ___ see the dentist tomorrow.', options: ['am going to', 'will be', 'going to', 'am go to'], answer: 0, explain: '已安排的将来计划用 be going to。' },
                { prompt: '___ you available on Tuesday morning?', options: ['Do', 'Are', 'Will', 'Have'], answer: 1, explain: 'available 是形容词，主语 you 用 are。' },
                { prompt: 'Could we ___ the meeting to Friday?', options: ['reschedule', 'rescheduling', 'rescheduled', 'to reschedule'], answer: 0, explain: '情态动词 could 后接动词原形。' }
              ]
            },
            listening: {
              script: 'Good morning, City Dental Clinic. — Hi, I have an appointment on Wednesday at 3 p.m., but I need to reschedule it to Friday morning. — Let me check. Friday at 10 a.m. is available.',
              translation: '早上好，城市牙科诊所。——你好，我周三下午三点有预约，但需要改到周五上午。——我查一下，周五上午十点有空。',
              questions: [
                { prompt: 'When is the new appointment?', options: ['Wednesday 3 p.m.', 'Thursday morning', 'Friday 10 a.m.', 'Monday 9 a.m.'], answer: 2, explain: '前台确认 Friday at 10 a.m. is available。' }
              ]
            },
            speaking: [
              { text: 'I need to reschedule my appointment.', translation: '我需要改期我的预约。', tip: 'reschedule 重音在 -sche-。' },
              { text: 'Are you available on ___?', translation: '你……有空吗？', tip: 'Are you 连读成 /ˈɑːrjuː/。' },
              { text: "I'm going to ___ tomorrow.", translation: '我打算明天……', tip: 'going to 口语中读作 gonna。' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'en-b1',
    code: 'B1',
    title: '流利表达',
    subtitle: '职场沟通与观点表达',
    units: [
      {
        id: 'en-b1-u1',
        title: 'Unit 5 · 职场沟通',
        desc: '面试表达与邮件协作',
        lessons: [
          {
            id: 'en-b1-u1-l1',
            title: 'The interview',
            subtitle: '面试自我介绍',
            minutes: 18,
            xp: 55,
            goals: ['掌握职场面试高频词', '用现在完成时谈经历', '完成 90 秒英文自我介绍'],
            vocab: [
              { term: 'experience', pos: 'n.', meaning: '经验', example: 'I have three years of experience in marketing.', exampleCn: '我有三年市场营销经验。' },
              { term: 'strength', pos: 'n.', meaning: '优势；长处', example: 'My greatest strength is problem-solving.', exampleCn: '我最大的优势是解决问题能力。' },
              { term: 'candidate', pos: 'n.', meaning: '候选人', example: 'We have five candidates for this role.', exampleCn: '这个岗位我们有五位候选人。' },
              { term: 'achieve', pos: 'v.', meaning: '达成；实现', example: 'We achieved 120% of our sales target.', exampleCn: '我们完成了销售目标的 120%。' },
              { term: 'teamwork', pos: 'n.', meaning: '团队合作', example: 'This project required strong teamwork.', exampleCn: '这个项目需要很强的团队合作。' }
            ],
            grammar: {
              title: '现在完成时：have / has + 过去分词',
              points: ['表示过去经历对现在的影响，常与 for / since / already 连用', '注意与一般过去时区分：具体过去时间用过去时'],
              questions: [
                { prompt: 'I ___ in marketing for five years.', options: ['work', 'worked', 'have worked', 'am working'], answer: 2, explain: 'for five years 强调持续到现在，用现在完成时。' },
                { prompt: 'She ___ three successful projects since 2022.', options: ['delivered', 'has delivered', 'delivers', 'is delivering'], answer: 1, explain: 'since 2022 配合现在完成时。' },
                { prompt: 'I ___ that company in 2021.', options: ['have joined', 'joined', 'join', 'have been joining'], answer: 1, explain: 'in 2021 是明确过去时间，用一般过去时。' }
              ]
            },
            listening: {
              script: 'Tell me about yourself. — I have worked as a product designer for four years. My greatest strength is turning user feedback into simple solutions. Last year, my team and I achieved a 30% increase in user retention.',
              translation: '介绍一下你自己。——我做产品设计师四年了。我最大的优势是把用户反馈转化为简洁的解决方案。去年，我和团队实现了用户留存率提升 30%。',
              questions: [
                { prompt: 'How long has the candidate worked as a designer?', options: ['Two years', 'Three years', 'Four years', 'Five years'], answer: 2, explain: '录音中说 for four years。' }
              ]
            },
            speaking: [
              { text: 'I have worked as a ___ for ___ years.', translation: '我担任……已经……年。', tip: 'have worked 弱读，重音落在职业和年限。' },
              { text: 'My greatest strength is ___.', translation: '我最大的优势是……', tip: 'greatest 的 t 与 strength 的 str 要清楚。' },
              { text: 'Last year, we achieved ___.', translation: '去年我们达成了……', tip: 'achieved 尾音 d 轻触即可。' }
            ]
          },
          {
            id: 'en-b1-u1-l2',
            title: 'Email & collaboration',
            subtitle: '邮件与协作',
            minutes: 18,
            xp: 55,
            goals: ['掌握商务邮件高频词', '使用正式邮件句式', '听懂一段工作安排语音'],
            vocab: [
              { term: 'attach', pos: 'v.', meaning: '附上；粘贴', example: 'Please find the report attached.', exampleCn: '请查收附上的报告。' },
              { term: 'deadline', pos: 'n.', meaning: '截止日期', example: 'The deadline is this Friday.', exampleCn: '截止日期是本周五。' },
              { term: 'agenda', pos: 'n.', meaning: '议程', example: 'Here is the agenda for tomorrow.', exampleCn: '这是明天的议程。' },
              { term: 'follow up', pos: 'phrase', meaning: '跟进', example: 'I will follow up with the client.', exampleCn: '我会跟进客户。' },
              { term: 'colleague', pos: 'n.', meaning: '同事', example: 'My colleague will cover the meeting.', exampleCn: '我的同事会代我参会。' }
            ],
            grammar: {
              title: '正式邮件中的礼貌句式',
              points: ['开头 I hope this email finds you well.', '请求用 Could you please ...?，结尾用 Looking forward to your reply.'],
              questions: [
                { prompt: 'Please find the document ___.', options: ['attach', 'attached', 'attaching', 'attachment'], answer: 1, explain: 'find sth attached 是固定表达，用过去分词作补语。' },
                { prompt: 'Could you please ___ the draft by Friday?', options: ['review', 'reviewing', 'reviewed', 'reviews'], answer: 0, explain: 'Could you please 后接动词原形。' },
                { prompt: 'I am writing to ___ about the project timeline.', options: ['following up', 'follow up', 'followed up', 'follows up'], answer: 1, explain: 'be writing to do 后接动词原形。' }
              ]
            },
            listening: {
              script: 'Hi team, this is a quick update. The client report is attached to this email. Please review it before Thursday, and I will follow up with any comments on Friday morning.',
              translation: '大家好，简单同步一下进展。客户报告已附在本邮件中。请在周四前审阅，我会在周五上午跟进所有意见。',
              questions: [
                { prompt: 'When should the team review the report?', options: ['Before Tuesday', 'Before Thursday', 'On Friday afternoon', 'Next week'], answer: 1, explain: '录音说 review it before Thursday。' }
              ]
            },
            speaking: [
              { text: 'Please find the report attached.', translation: '请查收附上的报告。', tip: 'attached 重音在第二个音节。' },
              { text: 'Could you please review it by Thursday?', translation: '你能在周四前审阅吗？', tip: 'Could you please 语气平稳礼貌。' },
              { text: 'Looking forward to your reply.', translation: '期待你的回复。', tip: 'looking forward 连读自然。' }
            ]
          }
        ]
      },
      {
        id: 'en-b1-u2',
        title: 'Unit 6 · 观点与计划',
        desc: '表达观点与旅行计划讨论',
        lessons: [
          {
            id: 'en-b1-u2-l1',
            title: 'Sharing opinions',
            subtitle: '表达观点与建议',
            minutes: 18,
            xp: 60,
            goals: ['掌握观点表达词汇', '用 should / suggest 提出建议', '参与一次小型讨论'],
            vocab: [
              { term: 'opinion', pos: 'n.', meaning: '观点', example: 'In my opinion, remote work is more productive.', exampleCn: '在我看来，远程办公效率更高。' },
              { term: 'suggest', pos: 'v.', meaning: '建议', example: 'I suggest we start with a small test.', exampleCn: '我建议先做一个小范围测试。' },
              { term: 'perspective', pos: 'n.', meaning: '视角', example: 'From a user perspective, the app is too complex.', exampleCn: '从用户视角看，这个应用太复杂了。' },
              { term: 'consider', pos: 'v.', meaning: '考虑', example: 'We should consider the long-term cost.', exampleCn: '我们应该考虑长期成本。' },
              { term: 'however', pos: 'adv.', meaning: '然而', example: 'However, the data tells a different story.', exampleCn: '然而，数据说明了另一种情况。' }
            ],
            grammar: {
              title: '建议与观点句型',
              points: ['I suggest that + 主语 + (should) + 动词原形', 'In my opinion / From my perspective 引出观点'],
              questions: [
                { prompt: 'I suggest that we ___ the launch by one week.', options: ['delay', 'delays', 'delayed', 'delaying'], answer: 0, explain: 'suggest that 从句中用动词原形（虚拟语气）。' },
                { prompt: '___ my opinion, the design is too busy.', options: ['On', 'In', 'At', 'For'], answer: 1, explain: 'In my opinion 是固定搭配。' },
                { prompt: 'You ___ consider the user\'s perspective.', options: ['should', 'are', 'do', 'have'], answer: 0, explain: 'should 表示建议。' }
              ]
            },
            listening: {
              script: 'In my opinion, we should launch the new feature next month. However, from a user perspective, the onboarding is still confusing. So I suggest we run one more usability test first.',
              translation: '在我看来，我们应该下个月上线新功能。然而，从用户视角看，新手引导仍然让人困惑。所以我建议先再做一次可用性测试。',
              questions: [
                { prompt: 'What does the speaker suggest?', options: ['Launch immediately', 'Cancel the feature', 'Run another usability test', 'Change the design team'], answer: 2, explain: '最后一句明确提出 run one more usability test。' }
              ]
            },
            speaking: [
              { text: 'In my opinion, ___.', translation: '在我看来，……', tip: 'opinion 重音在第二个音节。' },
              { text: 'I suggest we ___ first.', translation: '我建议我们先……', tip: 'suggest 后的从句用原形动词。' },
              { text: 'However, we should also consider ___.', translation: '然而，我们也应该考虑……', tip: 'however 后稍作停顿。' }
            ]
          },
          {
            id: 'en-b1-u2-l2',
            title: 'Planning a trip',
            subtitle: '旅行计划讨论',
            minutes: 18,
            xp: 60,
            goals: ['掌握旅行计划词汇', '用第一条件句讨论方案', '用英语完成一次行程协商'],
            vocab: [
              { term: 'itinerary', pos: 'n.', meaning: '行程', example: 'Could you send me the itinerary?', exampleCn: '你能把行程发给我吗？' },
              { term: 'accommodation', pos: 'n.', meaning: '住宿', example: 'We booked accommodation near the station.', exampleCn: '我们订了车站附近的住宿。' },
              { term: 'budget', pos: 'n.', meaning: '预算', example: 'Our budget is about 800 dollars.', exampleCn: '我们的预算大约是 800 美元。' },
              { term: 'destination', pos: 'n.', meaning: '目的地', example: 'Kyoto is our final destination.', exampleCn: '京都我们的最终目的地。' },
              { term: 'flexible', pos: 'adj.', meaning: '灵活的', example: 'Keep the schedule flexible.', exampleCn: '让行程保持灵活。' }
            ],
            grammar: {
              title: '第一条件句：If + 一般现在时，主句用 will',
              points: ['谈论可能发生的未来情况', 'if 从句用一般现在时，不用 will'],
              questions: [
                { prompt: 'If the flight ___ delayed, we will take the train.', options: ['is', 'will be', 'was', 'be'], answer: 0, explain: 'if 从句用一般现在时表将来。' },
                { prompt: 'We ___ stay one more day if the weather is good.', options: ['will', 'would', 'are', 'have'], answer: 0, explain: '主句用 will 表示将来的结果。' },
                { prompt: 'If you ___ early, we can visit the temple first.', options: ['arrive', 'will arrive', 'arrived', 'arriving'], answer: 0, explain: 'if 从句使用一般现在时。' }
              ]
            },
            listening: {
              script: 'So, our destination is Kyoto. If we arrive before noon, we can visit the temple first. The accommodation is near the station, and our budget still allows one free afternoon.',
              translation: '那么，我们的目的地是京都。如果我们中午前到达，就可以先去寺庙。住宿在车站附近，预算还够留出一个自由下午。',
              questions: [
                { prompt: 'What will they do if they arrive before noon?', options: ['Go shopping', 'Visit the temple', 'Check in at the hotel', 'Take a train'], answer: 1, explain: 'if 条件句中提到 visit the temple first。' }
              ]
            },
            speaking: [
              { text: 'Our destination is ___.', translation: '我们的目的地是……', tip: 'destination 重音在 -na-。' },
              { text: 'If we arrive before ___, we can ___.', translation: '如果我们……之前到达，就能……', tip: 'if 从句语调上扬，主句下倾。' },
              { text: 'The accommodation is near ___.', translation: '住宿在……附近。', tip: 'accommodation 有四个音节，注意重音。' }
            ]
          }
        ]
      }
    ]
  }
];
