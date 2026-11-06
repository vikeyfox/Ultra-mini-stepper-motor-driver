// 韩语课程内容：A1 → A2 → B1，三个级别，每个级别两个单元
export const koLevels = [
  {
    id: 'ko-a1',
    code: 'A1',
    title: '첫걸음',
    subtitle: '从问候语开始你的韩语之旅',
    units: [
      {
        id: 'ko-a1-u1',
        title: 'Unit 1 · 인사',
        desc: '问候与自我介绍的核心句型',
        lessons: [
          {
            id: 'ko-a1-u1-l1',
            title: '안녕하세요',
            subtitle: '初次见面的问候',
            minutes: 12,
            xp: 30,
            goals: ['掌握 5 个高频问候语', '理解 은/는 与 입니다 句型', '用韩语完成第一次问候'],
            vocab: [
              { term: '안녕하세요', reading: 'annyeonghaseyo', pos: '问候', meaning: '你好', example: '안녕하세요, 김민수입니다.', exampleCn: '你好，我是金敏秀。' },
              { term: '감사합니다', reading: 'gamsahamnida', pos: '问候', meaning: '谢谢（正式）', example: '도와주셔서 감사합니다.', exampleCn: '谢谢您的帮助。' },
              { term: '죄송합니다', reading: 'joesonghamnida', pos: '问候', meaning: '对不起（正式）', example: '늦어서 죄송합니다.', exampleCn: '抱歉我来晚了。' },
              { term: '만나서 반갑습니다', reading: 'mannaseo bangapseumnida', pos: '问候', meaning: '很高兴见到你', example: '만나서 반갑습니다, 이지은입니다.', exampleCn: '很高兴见到你，我是李智恩。' },
              { term: '안녕히 가세요', reading: 'annyeonghi gaseyo', pos: '问候', meaning: '再见（送别离开的人）', example: '내일 봐요. 안녕히 가세요.', exampleCn: '明天见，慢走。' }
            ],
            grammar: {
              title: '主题助词 은/는 与判断句 입니다/이에요',
              points: ['有收音用 은，无收音用 는，用于提示主题', '正式判断用 입니다，口语用 이에요/예요'],
              questions: [
                { prompt: '저 ___ 학생입니다.', options: ['는', '를', '에', '와'], answer: 0, explain: '「저」无收音，用主题助词 는。' },
                { prompt: '김민수___ 회사원입니다.', options: ['는', '를', '가', '에'], answer: 0, explain: '人名作主题，无收音用 는。' },
                { prompt: '책___ 책상 위에 있어요.', options: ['이', '는', '를', '에'], answer: 1, explain: '询问主题时可用 는，但此处表示对比主题。' }
              ]
            },
            listening: {
              script: '안녕하세요. 저는 김민수입니다. 만나서 반갑습니다. 잘 부탁드립니다.',
              translation: '你好。我是金敏秀。很高兴见到你，请多关照。',
              questions: [
                { prompt: '남자는 누구입니까?', options: ['김민수', '이지은', '박준호', '최수진'], answer: 0, explain: '录音中说「저는 김민수입니다」。' }
              ]
            },
            speaking: [
              { text: '안녕하세요, ___입니다.', translation: '你好，我是……', tip: '「안녕하세요」语调平稳，하 不重读。' },
              { text: '만나서 반갑습니다.', translation: '很高兴见到你。', tip: '「반갑습니다」的 ㅂ 收音轻收。' },
              { text: '잘 부탁드립니다.', translation: '请多关照。', tip: '「부탁」的 ㅂ 与 드 连读自然。' }
            ]
          },
          {
            id: 'ko-a1-u1-l2',
            title: '제 소개',
            subtitle: '姓名、职业与爱好',
            minutes: 14,
            xp: 30,
            goals: ['用 5 个词汇介绍自己', '掌握 의 / 도 与 에 살다', '连续完成 3 句韩语自我介绍'],
            vocab: [
              { term: '이름', reading: 'ireum', pos: '名词', meaning: '名字', example: '이름이 무엇이에요?', exampleCn: '你叫什么名字？' },
              { term: '학생', reading: 'haksaeng', pos: '名词', meaning: '学生', example: '저는 대학생이에요.', exampleCn: '我是大学生。' },
              { term: '회사원', reading: 'hoesawon', pos: '名词', meaning: '公司职员', example: '아버지는 회사원이세요.', exampleCn: '我父亲是公司职员。' },
              { term: '취미', reading: 'chwimi', pos: '名词', meaning: '爱好', example: '제 취미는 사진 찍기예요.', exampleCn: '我的爱好是拍照。' },
              { term: '살다', reading: 'salda', pos: '动词', meaning: '居住', example: '서울에 살아요.', exampleCn: '我住在首尔。' }
            ],
            grammar: {
              title: '所属 의、也 도 与「에 살아요」',
              points: ['「의」表示所属，如 제 이름 / 민수의 책', '「도」表示“也”，替换 은/는', '居住地用 에 + 살아요'],
              questions: [
                { prompt: '이것은 제 ___ 책이에요.', options: ['의', '은', '를', '에'], answer: 0, explain: '「의」表示所属关系。' },
                { prompt: '저는 학생이에요. 친구___ 학생이에요.', options: ['도', '는', '를', '에'], answer: 0, explain: '「도」表示“也”。' },
                { prompt: '저는 부산___ 살아요.', options: ['에', '를', '가', '와'], answer: 0, explain: '居住地用助词 에。' }
              ]
            },
            listening: {
              script: '안녕하세요. 저는 유키예요. 유키는 일본 사람이에요. 지금 서울에 살아요. 취미는 사진 찍기예요.',
              translation: '你好，我是 Yuki，日本人。现在住在首尔，爱好是拍照。',
              questions: [
                { prompt: '유키의 취미는 무엇입니까?', options: ['사진 찍기', '요리', '음악', '여행'], answer: 0, explain: '录音中说「취미는 사진 찍기예요」。' }
              ]
            },
            speaking: [
              { text: '저는 ___이에요.', translation: '我是……', tip: '有收音用 이에요，无收音用 예요。' },
              { text: '제 취미는 ___이에요.', translation: '我的爱好是……', tip: '「취미」的 ㅊ 发音清晰。' },
              { text: '저는 ___에 살아요.', translation: '我住在……', tip: '「살아요」的 ㄹ 收音轻弹。' }
            ]
          }
        ]
      },
      {
        id: 'ko-a1-u2',
        title: 'Unit 2 · 매일의 생활',
        desc: '数字、时间与咖啡店点单',
        lessons: [
          {
            id: 'ko-a1-u2-l1',
            title: '몇 시예요?',
            subtitle: '数字与时间',
            minutes: 12,
            xp: 35,
            goals: ['掌握时间相关词汇', '用 에 表示时间点', '听懂一段韩语时间信息'],
            vocab: [
              { term: '시간', reading: 'sigan', pos: '名词', meaning: '时间；小时', example: '시간이 없어요.', exampleCn: '没有时间。' },
              { term: '분', reading: 'bun', pos: '量词', meaning: '分钟（敬语量词）', example: '지금 세 시 십 분이에요.', exampleCn: '现在三点十分。' },
              { term: '오전', reading: 'ojeon', pos: '名词', meaning: '上午', example: '오전 아홉 시에 회의가 있어요.', exampleCn: '上午九点有会议。' },
              { term: '오후', reading: 'ohu', pos: '名词', meaning: '下午', example: '오후에는 약속이 없어요.', exampleCn: '下午没有约。' },
              { term: '지금', reading: 'jigeum', pos: '副词', meaning: '现在', example: '지금 몇 시예요?', exampleCn: '现在几点？' }
            ],
            grammar: {
              title: '时间助词 에 与 부터～까지',
              points: ['具体时间后加 에，如 아홉 시에 시작해요', '부터～까지 表示从……到……'],
              questions: [
                { prompt: '회의는 아홉 시___ 시작해요.', options: ['에', '를', '에서', '와'], answer: 0, explain: '具体时间后用 에。' },
                { prompt: '은행은 아홉 시___다섯 시까지예요.', options: ['부터', '까지', '에', '를'], answer: 0, explain: '부터～까지 表示时间范围。' },
                { prompt: '지금 몇 시___?', options: ['예요', '이에요', '해요', '있어요'], answer: 1, explain: '「몇 시」有收音，用 이에요。' }
              ]
            },
            listening: {
              script: '실례합니다, 지금 몇 시예요? — 세 시 삼십 분이에요. 회의는 네 시에 시작해요.',
              translation: '打扰一下，现在几点？——三点三十分。会议四点开始。',
              questions: [
                { prompt: '회의는 몇 시에 시작합니까?', options: ['세 시', '세 시 삼십 분', '네 시', '다섯 시'], answer: 2, explain: '录音中说「회의는 네 시에 시작해요」。' }
              ]
            },
            speaking: [
              { text: '지금 몇 시예요?', translation: '现在几点？', tip: '「몇 시」连读，시 发音轻。' },
              { text: '회의는 ___에 시작해요.', translation: '会议在……开始。', tip: '时间后的 에 轻读。' },
              { text: '___부터 ___까지예요.', translation: '从……到……。', tip: '부터 与까지 语速放慢更清楚。' }
            ]
          },
          {
            id: 'ko-a1-u2-l2',
            title: '카페에서 주문하기',
            subtitle: '咖啡店点单',
            minutes: 14,
            xp: 35,
            goals: ['掌握咖啡店高频词', '用 주세요 点单', '听懂店员的提问'],
            vocab: [
              { term: '커피', reading: 'keopi', pos: '名词', meaning: '咖啡', example: '커피 한 잔 주세요.', exampleCn: '请给我一杯咖啡。' },
              { term: '주문', reading: 'jumun', pos: '名词/动词', meaning: '点单', example: '주문하시겠어요?', exampleCn: '您要点单吗？' },
              { term: '사이즈', reading: 'saijeu', pos: '名词', meaning: '杯型；尺寸', example: '사이즈는 어떻게 해 드릴까요?', exampleCn: '要什么杯型？' },
              { term: '우유', reading: 'uyu', pos: '名词', meaning: '牛奶', example: '우유를 넣지 마세요.', exampleCn: '请不要加牛奶。' },
              { term: '영수증', reading: 'yeongsujeung', pos: '名词', meaning: '收据', example: '영수증 좀 주세요.', exampleCn: '请给我收据。' }
            ],
            grammar: {
              title: '点单句型 주세요 与 ~고 싶어요',
              points: ['名词 + 주세요，表示请给我……', '动词词干 + 고 싶어요，表示想要做某事'],
              questions: [
                { prompt: '빵 ___ 주세요.', options: ['을', '를', '에', '도'], answer: 0, explain: '「빵」有收音，宾格助词用 을。' },
                { prompt: '아메리카노를 마시고 ___요.', options: ['싶어', '주세요', '있어', '해'], answer: 0, explain: '「마시고 싶어요」表示想喝。' },
                { prompt: '사이즈는 어떻게 ___까요?', options: ['해 드릴', '주', '있', '하'], answer: 0, explain: '「해 드릴까요」是礼貌询问。' }
              ]
            },
            listening: {
              script: '어서 오세요. 주문하시겠어요? — 네, 따뜻한 라테 한 잔 주세요. 우유는 넣지 말아 주세요. — 알겠습니다.',
              translation: '欢迎光临，您要点单吗？——是的，请给我一杯热拿铁，不要加牛奶。——好的。',
              questions: [
                { prompt: '손님은 무엇을 주문했습니까?', options: ['아메리카노', '라테', '주스', '차'], answer: 1, explain: '顾客说「라테 한 잔 주세요」。' }
              ]
            },
            speaking: [
              { text: '___ 한 잔 주세요.', translation: '请给我一杯……', tip: '「한 잔」连读，잔 收音清晰。' },
              { text: '우유는 넣지 말아 주세요.', translation: '请不要加牛奶。', tip: '「말아」的 ㄹ 轻弹。' },
              { text: '영수증 좀 주세요.', translation: '请给我收据。', tip: '「영수증」的 ㅈ 轻送气。' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ko-a2',
    code: 'A2',
    title: '거리에서',
    subtitle: '在城市中问路、购物与用餐',
    units: [
      {
        id: 'ko-a2-u1',
        title: 'Unit 3 · 길과 쇼핑',
        desc: '问路与购物场景',
        lessons: [
          {
            id: 'ko-a2-u1-l1',
            title: '길을 묻다',
            subtitle: '问路与指路',
            minutes: 15,
            xp: 40,
            goals: ['掌握方位与交通词汇', '用 -(으)세요 指路', '听懂一段韩语路线说明'],
            vocab: [
              { term: '오른쪽', reading: 'oreunjjok', pos: '名词', meaning: '右边', example: '다음 사거리에서 오른쪽으로 가세요.', exampleCn: '请在下一个十字路口往右走。' },
              { term: '왼쪽', reading: 'oenjjok', pos: '名词', meaning: '左边', example: '은행은 왼쪽에 있어요.', exampleCn: '银行在左边。' },
              { term: '직진', reading: 'jikjin', pos: '名词', meaning: '直行', example: '여기서 직진하세요.', exampleCn: '请从这里直行。' },
              { term: '역', reading: 'yeok', pos: '名词', meaning: '车站', example: '역은 어디예요?', exampleCn: '车站在哪里？' },
              { term: '근처', reading: 'geuncheo', pos: '名词', meaning: '附近', example: '근처에 편의점이 있어요.', exampleCn: '附近有便利店。' }
            ],
            grammar: {
              title: '指路句型 -(으)세요 与 ~에 있어요',
              points: ['动词词干 + (으)세요，表示请对方做某事', '「场所에 있어요」表示在某处'],
              questions: [
                { prompt: '다음 사거리에서 왼쪽으로 ___세요.', options: ['가', '가지', '갔', '가는'], answer: 0, explain: '「가세요」是 가다 的尊敬命令形。' },
                { prompt: '역은 공원 ___ 있어요.', options: ['에', '를', '가', '와'], answer: 0, explain: '存在位置用 에。' },
                { prompt: '여기서 직진___세요.', options: ['하', '해', '했', '하는'], answer: 0, explain: '직진하다 的命令形是 직진하세요。' }
              ]
            },
            listening: {
              script: '실례합니다, 역은 어떻게 가요? — 여기서 직진하다가 두 번째 사거리에서 왼쪽으로 가세요. 역은 공원 옆에 있어요.',
              translation: '打扰一下，车站怎么走？——从这里直行，在第二个十字路口往左走。车站在公园旁边。',
              questions: [
                { prompt: '역은 어디에 있어요?', options: ['공원 옆', '은행 앞', '사거리 안', '백화점 위'], answer: 0, explain: '录音中说「역은 공원 옆에 있어요」。' }
              ]
            },
            speaking: [
              { text: '실례합니다, 역은 어디예요?', translation: '打扰一下，车站在哪里？', tip: '「실례합니다」用于礼貌地引起注意。' },
              { text: '직진하세요.', translation: '请直行。', tip: '「직진」的 ㅈ 与 ㅉ 区分清楚。' },
              { text: '왼쪽으로 가세요.', translation: '请往左走。', tip: '「왼쪽」的 ㅚ 发音接近 we。' }
            ]
          },
          {
            id: 'ko-a2-u1-l2',
            title: '쇼핑을 즐기다',
            subtitle: '购物与试穿',
            minutes: 15,
            xp: 40,
            goals: ['掌握购物与价格词汇', '用 -(아/어) 보다 表达尝试', '完成一次试穿与询价'],
            vocab: [
              { term: '얼마', reading: 'eolma', pos: '疑问词', meaning: '多少钱', example: '이 옷은 얼마예요?', exampleCn: '这件衣服多少钱？' },
              { term: '비싸다', reading: 'bissada', pos: '形容词', meaning: '贵', example: '조금 비싸요.', exampleCn: '有点贵。' },
              { term: '싸다', reading: 'ssada', pos: '形容词', meaning: '便宜', example: '이건 더 싸요.', exampleCn: '这个更便宜。' },
              { term: '입어 보다', reading: 'ibeo boda', pos: '动词短语', meaning: '试穿', example: '입어 봐도 돼요?', exampleCn: '可以试穿吗？' },
              { term: '영수증', reading: 'yeongsujeung', pos: '名词', meaning: '收据', example: '영수증을 주세요.', exampleCn: '请给我收据。' }
            ],
            grammar: {
              title: '尝试句型 -(아/어) 보다 与允许 -(아/어)도 되다',
              points: ['动词词干 + 아/어 보다，表示试着做', '动词词干 + 아/어도 되다，表示可以做'],
              questions: [
                { prompt: '이 옷을 ___ 봐도 돼요?', options: ['입어', '입고', '입어서', '입는'], answer: 0, explain: '입다 的尝试形是 입어 보다。' },
                { prompt: '이건 조금 ___ 비싸요.', options: ['많이', '조금', '아주', '전혀'], answer: 1, explain: '「조금 비싸요」表示有点贵。' },
                { prompt: '이 옷은 ___ 예요?', options: ['얼마', '몇', '언제', '누구'], answer: 0, explain: '询问价格用 얼마。' }
              ]
            },
            listening: {
              script: '어서 오세요. 뭐 찾으세요? — 이 티셔츠 얼마예요? — 이천 원이에요. — 입어 봐도 돼요? — 네, 탈의실은 오른쪽에 있어요.',
              translation: '欢迎光临，您找什么？——这件 T 恤多少钱？——两千韩元。——可以试穿吗？——可以，试衣间在右边。',
              questions: [
                { prompt: '티셔츠는 얼마예요?', options: ['천 원', '이천 원', '삼천 원', '오천 원'], answer: 1, explain: '店员回答「이천 원이에요」。' }
              ]
            },
            speaking: [
              { text: '이 ___는 얼마예요?', translation: '这个……多少钱？', tip: '「얼마예요」语调略微上扬。' },
              { text: '입어 봐도 돼요?', translation: '可以试穿吗？', tip: '「봐도 돼요」语气轻松礼貌。' },
              { text: '더 싼 거 있어요?', translation: '有更便宜的吗？', tip: '「싼 거」口语中连读自然。' }
            ]
          }
        ]
      },
      {
        id: 'ko-a2-u2',
        title: 'Unit 4 · 식사와 예약',
        desc: '餐厅用餐与预约安排',
        lessons: [
          {
            id: 'ko-a2-u2-l1',
            title: '식당에서',
            subtitle: '餐厅用餐',
            minutes: 15,
            xp: 45,
            goals: ['掌握餐厅场景词汇', '用 좋아해요 表达喜好', '完成一次韩语点餐'],
            vocab: [
              { term: '추천', reading: 'chucheon', pos: '名词/动词', meaning: '推荐', example: '오늘의 추천 메뉴는 뭐예요?', exampleCn: '今天的推荐菜是什么？' },
              { term: '맵다', reading: 'maepda', pos: '形容词', meaning: '辣', example: '이 음식은 많이 매워요.', exampleCn: '这道菜很辣。' },
              { term: '디저트', reading: 'dijeoteu', pos: '名词', meaning: '甜点', example: '디저트도 주문하시겠어요?', exampleCn: '要甜点吗？' },
              { term: '알레르기', reading: 'allereugi', pos: '名词', meaning: '过敏', example: '견과류 알레르기가 있어요.', exampleCn: '我对坚果过敏。' },
              { term: '잘 먹겠습니다', reading: 'jal meokgetseumnida', pos: '寒暄', meaning: '我开动了', example: '그럼, 잘 먹겠습니다.', exampleCn: '那么，我开动了。' }
            ],
            grammar: {
              title: '喜好 -을/를 좋아해요 与将来 -(으)ㄹ 거예요',
              points: ['喜好对象用 을/를 + 좋아해요', '动词词干 + (으)ㄹ 거예요，表示打算或推测'],
              questions: [
                { prompt: '저는 매운 음식___ 좋아해요.', options: ['을', '이', '에', '와'], answer: 0, explain: '「매운 음식」有收音，宾格助词用 을。' },
                { prompt: '이 음식은 ___ 매워요.', options: ['아주', '조금', '전혀', '별로'], answer: 1, explain: '「조금 매워요」表示有点辣。' },
                { prompt: '디저트를 ___ 거예요.', options: ['먹을', '먹는', '먹고', '먹어'], answer: 0, explain: '「먹을 거예요」表示打算吃。' }
              ]
            },
            listening: {
              script: '어서 오세요, 몇 분이세요? — 두 명이에요. 오늘의 추천은 뭐예요? — 불고기가 추천이에요. — 그럼 불고기 두 인분 주세요. 견과류 알레르기가 있어요.',
              translation: '欢迎光临，几位？——两位。今天的推荐是什么？——推荐烤肉。——那请来两份烤肉，我对坚果过敏。',
              questions: [
                { prompt: '추천 메뉴는 무엇입니까?', options: ['불고기', '김치찌개', '비빔밥', '냉면'], answer: 0, explain: '店员说「불고기가 추천이에요」。' }
              ]
            },
            speaking: [
              { text: '오늘의 추천은 뭐예요?', translation: '今天的推荐是什么？', tip: '「추천」的 ㅊ 送气发音。' },
              { text: '그럼 ___ 주세요.', translation: '那就请给我……', tip: '「그럼」自然过渡，语调下倾。' },
              { text: '견과류 알레르기가 있어요.', translation: '我对坚果过敏。', tip: '「알레르기」连读流畅。' }
            ]
          },
          {
            id: 'ko-a2-u2-l2',
            title: '예약하기',
            subtitle: '预约与变更',
            minutes: 15,
            xp: 45,
            goals: ['掌握预约与变更词汇', '用 -아/어도 되다 请求许可', '完成一次电话预约'],
            vocab: [
              { term: '예약', reading: 'yeyak', pos: '名词/动词', meaning: '预约', example: '저녁 일곱 시로 예약하고 싶어요.', exampleCn: '我想预约晚上七点。' },
              { term: '가능하다', reading: 'ganeunghada', pos: '形容词', meaning: '可以；可能', example: '내일 예약이 가능해요?', exampleCn: '明天可以预约吗？' },
              { term: '변경', reading: 'byeongyeong', pos: '名词/动词', meaning: '变更', example: '예약을 변경하고 싶어요.', exampleCn: '我想更改预约。' },
              { term: '취소', reading: 'chwiso', pos: '名词/动词', meaning: '取消', example: '예약을 취소해 주세요.', exampleCn: '请取消预约。' },
              { term: '확인', reading: 'hwagin', pos: '名词/动词', meaning: '确认', example: '예약을 확인해 드리겠습니다.', exampleCn: '我帮您确认预约。' }
            ],
            grammar: {
              title: '请求许可 -아/어도 되다 与愿望 -고 싶어요',
              points: ['动词词干 + 아/어도 되다，表示可以做某事', '动词词干 + 고 싶어요，表示想做某事'],
              questions: [
                { prompt: '예약을 변경해___ 돼요?', options: ['도', '서', '고', '야'], answer: 0, explain: '「변경해도 돼요」表示可以更改吗。' },
                { prompt: '일곱 시로 예약하고 ___요.', options: ['싶어', '주세요', '있어', '해'], answer: 0, explain: '「하고 싶어요」表示想做。' },
                { prompt: '내일 예약이 ___?', options: ['가능해요', '가능해요까', '가능이에요', '가능해'], answer: 0, explain: '「가능해요」询问是否可以。' }
              ]
            },
            listening: {
              script: '안녕하세요, 서울 식당입니다. — 예약을 변경하고 싶어요. 오늘 저녁 일곱 시인데 여덟 시로 바꿔 주세요. — 네, 확인했습니다. 여덟 시로 변경해 드리겠습니다.',
              translation: '您好，这里是首尔餐厅。——我想改预约，本来是今晚七点，请改到八点。——好的，已确认，我帮您改到八点。',
              questions: [
                { prompt: '예약 시간은 몇 시로 변경되었습니까?', options: ['일곱 시', '일곱 시 반', '여덟 시', '여덟 시 반'], answer: 2, explain: '最终改为「여덟 시」。' }
              ]
            },
            speaking: [
              { text: '예약하고 싶어요.', translation: '我想预约。', tip: '「싶어요」的 ㅂ 收音轻收。' },
              { text: '여덟 시로 바꿔 주세요.', translation: '请改到八点。', tip: '「바꿔」的 ㅘ 发音饱满。' },
              { text: '예약을 확인해 주세요.', translation: '请确认一下预约。', tip: '「확인」的 ㅎ 与 ㅗ 清楚。' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ko-b1',
    code: 'B1',
    title: '유창한 표현',
    subtitle: '职场沟通与观点表达',
    units: [
      {
        id: 'ko-b1-u1',
        title: 'Unit 5 · 직장의 한국어',
        desc: '面试表达与商务邮件',
        lessons: [
          {
            id: 'ko-b1-u1-l1',
            title: '면접에 도전하다',
            subtitle: '面试自我介绍',
            minutes: 18,
            xp: 55,
            goals: ['掌握面试高频词', '用 -아/어 본 적이 있다 谈经历', '完成一段韩语自我介绍'],
            vocab: [
              { term: '경험', reading: 'gyeongheom', pos: '名词', meaning: '经验', example: '마케팅 경험이 삼 년 있어요.', exampleCn: '我有三年市场营销经验。' },
              { term: '강점', reading: 'gangjeom', pos: '名词', meaning: '优势', example: '제 강점은 문제 해결 능력이에요.', exampleCn: '我的优势是解决问题的能力。' },
              { term: '지원 동기', reading: 'jiwon donggi', pos: '名词', meaning: '求职动机', example: '지원 동기를 말씀해 주세요.', exampleCn: '请说说您的求职动机。' },
              { term: '도전', reading: 'dojeon', pos: '名词/动词', meaning: '挑战', example: '새로운 일에 도전하고 싶어요.', exampleCn: '我想挑战新事物。' },
              { term: '성장', reading: 'seongjang', pos: '名词/动词', meaning: '成长', example: '이 회사에서 성장하고 싶어요.', exampleCn: '我想在这家公司成长。' }
            ],
            grammar: {
              title: '经历 -아/어 본 적이 있다 与原因 -기 때문에',
              points: ['动词词干 + 아/어 본 적이 있다，表示曾经做过', '「-기 때문에」表示原因，语气正式'],
              questions: [
                { prompt: '해외에서 일해 본 ___ 있어요.', options: ['적이', '것이', '곳이', '때가'], answer: 0, explain: '「해 본 적이 있어요」表示有过经历。' },
                { prompt: '경험이 있___ 이 회사에 지원했어요.', options: ['기 때문에', '지만', '고', '면서'], answer: 0, explain: '「있기 때문에」表示原因。' },
                { prompt: '팀으로 목표를 ___했어요.', options: ['달성', '도전', '성장', '기여'], answer: 0, explain: '「목표를 달성하다」是固定搭配。' }
              ]
            },
            listening: {
              script: '자기소개를 해 주세요. — 네, 저는 사 년 동안 프로덕트 디자이너로 일해 본 적이 있어요. 제 강점은 사용자의 의견을 개선으로 연결하는 거예요. 이 회사에서 성장하고 싶어요.',
              translation: '请做一下自我介绍。——好的，我曾作为产品设计师工作过四年。我的优势是把用户的意见转化为改进。我希望在这家公司成长。',
              questions: [
                { prompt: '몇 년 동안 디자이너로 일했습니까?', options: ['이 년', '삼 년', '사 년', '오 년'], answer: 2, explain: '录音中说「사 년 동안」。' }
              ]
            },
            speaking: [
              { text: '___ 경험이 ___ 년 있어요.', translation: '我有……年的……经验。', tip: '「경험」的 ㄱ 与 ㅕ 清晰。' },
              { text: '제 강점은 ___이에요.', translation: '我的优势是……', tip: '「강점」的 ㅈ 轻送气。' },
              { text: '이 회사에서 성장하고 싶어요.', translation: '我想在这家公司成长。', tip: '「성장」的 ㅈ 与 하고 分开读。' }
            ]
          },
          {
            id: 'ko-b1-u1-l2',
            title: '비즈니스 이메일',
            subtitle: '商务邮件写作',
            minutes: 18,
            xp: 55,
            goals: ['掌握商务邮件词汇', '使用正式终结语尾', '写出一封 3 句商务邮件'],
            vocab: [
              { term: '첨부', reading: 'cheombu', pos: '名词/动词', meaning: '附件；附上', example: '회의 자료를 첨부했습니다.', exampleCn: '已附上会议资料。' },
              { term: '마감', reading: 'magam', pos: '名词', meaning: '截止', example: '마감은 금요일입니다.', exampleCn: '截止日期是周五。' },
              { term: '회의', reading: 'hoeui', pos: '名词', meaning: '会议', example: '내일 회의는 열 시에 시작합니다.', exampleCn: '明天的会议十点开始。' },
              { term: '연락', reading: 'yeollak', pos: '名词/动词', meaning: '联系', example: '연락 기다리겠습니다.', exampleCn: '期待您的联系。' },
              { term: '확인', reading: 'hwagin', pos: '名词/动词', meaning: '确认', example: '확인 부탁드립니다.', exampleCn: '请确认。' }
            ],
            grammar: {
              title: '正式语体 -(으)ㅂ니다 与谦敬 -아/어 드리겠습니다',
              points: ['正式陈述用 -(으)ㅂ니다／습니다', '「-아/어 드리겠습니다」表示将为对方做某事'],
              questions: [
                { prompt: '자료를 첨부___습니다.', options: ['했', '하', '해', '한'], answer: 0, explain: '「첨부했습니다」是正式过去式。' },
                { prompt: '확인해 ___겠습니다.', options: ['드리', '주', '하', '있'], answer: 0, explain: '「확인해 드리겠습니다」是谦敬表达。' },
                { prompt: '금요일까지 확인 부탁___니다.', options: ['드립', '합', '하', '있'], answer: 0, explain: '「부탁드립니다」是礼貌请求。' }
              ]
            },
            listening: {
              script: '안녕하세요. 내일 회의 자료를 첨부했습니다. 금요일까지 확인 부탁드립니다. 궁금한 점이 있으면 연락 주세요.',
              translation: '您好。已附上明天会议的资料，请在周五前确认。如有疑问请与我联系。',
              questions: [
                { prompt: '자료를 언제까지 확인해야 합니까?', options: ['수요일', '목요일', '금요일', '다음 주'], answer: 2, explain: '录音中说「금요일까지 확인」。' }
              ]
            },
            speaking: [
              { text: '자료를 첨부했습니다.', translation: '资料已附上。', tip: '「첨부」的 ㅊ 送气清晰。' },
              { text: '확인 부탁드립니다.', translation: '请您确认。', tip: '「부탁드립니다」语调平稳正式。' },
              { text: '연락 주세요.', translation: '请联系我。', tip: '「연락」的 ㄴ 与 ㅏ 连读自然。' }
            ]
          }
        ]
      },
      {
        id: 'ko-b1-u2',
        title: 'Unit 6 · 생각을 나누다',
        desc: '观点表达与旅行计划',
        lessons: [
          {
            id: 'ko-b1-u2-l1',
            title: '의견을 말하다',
            subtitle: '表达观点与建议',
            minutes: 18,
            xp: 60,
            goals: ['掌握观点表达词汇', '用 -다고 생각해요 表达看法', '参与一次韩语讨论'],
            vocab: [
              { term: '의견', reading: 'uigyeon', pos: '名词', meaning: '意见', example: '의견을 말씀해 주세요.', exampleCn: '请说说您的意见。' },
              { term: '찬성', reading: 'chanseong', pos: '名词/动词', meaning: '赞成', example: '그 제안에 찬성해요.', exampleCn: '我赞成那个提案。' },
              { term: '반대', reading: 'bandae', pos: '名词/动词', meaning: '反对', example: '비용 때문에 반대해요.', exampleCn: '因为成本我反对。' },
              { term: '제안', reading: 'jean', pos: '名词/动词', meaning: '提案', example: '새로운 제안이 있어요.', exampleCn: '我有一个新提案。' },
              { term: '이유', reading: 'iyu', pos: '名词', meaning: '理由', example: '이유를 알려 주세요.', exampleCn: '请告诉我理由。' }
            ],
            grammar: {
              title: '间接引用 -(ㄴ/는)다고 생각하다 与可能性 -(으)ㄹ 수 있다',
              points: ['「-다고 생각해요」表示“我认为……”', '「-(으)ㄹ 수 있다」表示能力或可能性'],
              questions: [
                { prompt: '이 디자인이 더 좋___ 생각해요.', options: ['다고', '라고', '어서', '지만'], answer: 0, explain: '「좋다고 생각해요」表示我认为更好。' },
                { prompt: '예산이 부족할 ___ 있어요.', options: ['수', '것', '때', '줄'], answer: 0, explain: '「-(으)ㄹ 수 있다」表示可能性。' },
                { prompt: '그 제안에 ___해요.', options: ['찬성', '찬성하', '찬성의', '찬성는'], answer: 0, explain: '「찬성해요」表示赞成。' }
              ]
            },
            listening: {
              script: '새 기능을 다음 달에 출시하는 것에 대해 어떻게 생각하세요? — 좋다고 생각해요. 그런데 사용자 조작이 복잡할 수 있어요. 먼저 테스트를 하는 게 좋을 것 같아요.',
              translation: '关于下个月上线新功能，你怎么看？——我认为不错。不过用户操作可能会复杂，我觉得最好先做测试。',
              questions: [
                { prompt: '먼저 무엇을 하자고 했습니까?', options: ['테스트', '출시', '회의', '홍보'], answer: 0, explain: '最后说「먼저 테스트를 하는 게 좋을 것 같아요」。' }
              ]
            },
            speaking: [
              { text: '저는 ___다고 생각해요.', translation: '我认为……', tip: '「생각해요」前的 다고 连读自然。' },
              { text: '그 제안에 찬성해요.', translation: '我赞成那个提案。', tip: '「찬성」的 ㅊ 送气。' },
              { text: '이유는 ___ 때문이에요.', translation: '理由是……', tip: '「때문」的 ㄸ 发音紧实。' }
            ]
          },
          {
            id: 'ko-b1-u2-l2',
            title: '여행을 계획하다',
            subtitle: '旅行计划讨论',
            minutes: 18,
            xp: 60,
            goals: ['掌握旅行计划词汇', '用 -(으)ㄹ 계획이다 表达计划', '用韩语协商一次行程'],
            vocab: [
              { term: '일정', reading: 'iljeong', pos: '名词', meaning: '行程；日程', example: '주말 일정이 어떻게 돼요?', exampleCn: '周末行程怎么安排？' },
              { term: '예산', reading: 'yesan', pos: '名词', meaning: '预算', example: '예산은 십만 원이에요.', exampleCn: '预算是十万韩元。' },
              { term: '숙소', reading: 'sukso', pos: '名词', meaning: '住宿', example: '역 근처 숙소를 예약했어요.', exampleCn: '订了车站附近的住宿。' },
              { term: '목적지', reading: 'mokjeokji', pos: '名词', meaning: '目的地', example: '목적지는 경주예요.', exampleCn: '目的地是庆州。' },
              { term: '자유 시간', reading: 'jayu sigan', pos: '名词', meaning: '自由时间', example: '오후는 자유 시간이에요.', exampleCn: '下午是自由时间。' }
            ],
            grammar: {
              title: '计划 -(으)ㄹ 계획이다 与同时 -면서',
              points: ['动词词干 + (으)ㄹ 계획이다，表示打算做某事', '动词词干 + 면서，表示同时进行两个动作'],
              questions: [
                { prompt: '주말에 경주로 갈 ___이에요.', options: ['계획', '예정', '생각', '준비'], answer: 0, explain: '「갈 계획이에요」表示计划去。' },
                { prompt: '음악을 들___ 걷습니다.', options: ['으면서', '어서', '고', '지만'], answer: 0, explain: '「들으면서 걷다」表示一边听一边走。' },
                { prompt: '예산은 ___이에요?', options: ['얼마', '몇', '언제', '어디'], answer: 0, explain: '询问预算金额用 얼마。' }
              ]
            },
            listening: {
              script: '주말 여행은 어떻게 할 거예요? — 경주로 갈 계획이에요. 예산은 십만 원이고, 역 근처 숙소를 예약했어요. 오후에는 자유 시간을 가지려고 해요.',
              translation: '周末旅行打算怎么安排？——计划去庆州。预算十万韩元，订了车站附近的住宿。下午打算留自由时间。',
              questions: [
                { prompt: '주말에 어디로 갈 계획입니까?', options: ['부산', '경주', '서울', '제주'], answer: 1, explain: '录音中说「경주로 갈 계획이에요」。' }
              ]
            },
            speaking: [
              { text: '___로 갈 계획이에요.', translation: '我计划去……', tip: '「계획」的 ㅎ 与 ㄱ 连读。' },
              { text: '예산은 ___이에요.', translation: '预算是……', tip: '数字与 원 连读自然。' },
              { text: '오후에는 자유 시간이에요.', translation: '下午是自由时间。', tip: '「자유 시간」分开读更清楚。' }
            ]
          }
        ]
      }
    ]
  }
];
