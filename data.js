/* ===========================================================================
   IELTS Speaking Coach — Content Bank
   Authentic-style practice material. Not official IELTS questions.
   Edit / extend this file freely — the app reads everything from here.
   =========================================================================== */

const BAND_DESCRIPTORS = {
  criteria: [
    {
      key: "FC",
      name: "Fluency & Coherence",
      desc: "Speaking at length without effort, with logical flow and natural linking.",
    },
    {
      key: "LR",
      name: "Lexical Resource",
      desc: "Range and precision of vocabulary, collocations, idioms and paraphrasing.",
    },
    {
      key: "GRA",
      name: "Grammatical Range & Accuracy",
      desc: "Variety of structures (tenses, conditionals, relative & passive clauses) used accurately.",
    },
    {
      key: "P",
      name: "Pronunciation",
      desc: "Clear sounds, word & sentence stress, intonation and natural rhythm.",
    },
  ],
  bands: [
    {
      band: 7,
      summary: "Speaks at length with some hesitation. Uses some less-common vocabulary and idioms with occasional inaccuracy. Uses a range of complex structures with some errors that don't reduce communication. Generally clear pronunciation.",
    },
    {
      band: 8,
      summary: "Speaks fluently with only occasional repetition or self-correction. Wide vocabulary used skilfully with good collocation. Wide range of structures, majority error-free. Well-controlled pronunciation, easy to understand throughout.",
    },
    {
      band: 9,
      summary: "Fully fluent and effortless, coherent, precise and idiomatic. Fully flexible and accurate grammar. Natural, effortless pronunciation. Sounds like a highly educated near-native speaker — but still spoken, not a written essay read aloud.",
    },
  ],
  // Vietnamese-speaker pronunciation focus areas
  pronTips: [
    { en: "Final consonants", vi: "phụ âm cuối", note: "Don't drop them: cat / cap / cab sound different." },
    { en: "/θ/ and /ð/ (th)", vi: "âm 'th'", note: "think vs this — tongue lightly between teeth, not 't' or 'd'." },
    { en: "Ending -s and -ed", vi: "đuôi -s và -ed", note: "books, watched — pronounce the grammar endings clearly." },
    { en: "Word stress", vi: "trọng âm từ", note: "PHO-to-graph vs pho-TO-gra-pher — wrong stress hurts clarity." },
    { en: "Sentence rhythm", vi: "ngữ điệu câu", note: "Stress key words, weaken small words (the, of, a)." },
  ],
};

/* Helper to build a vocab item */
function v(word, vi, collocation) {
  return { word, vi, collocation };
}

/* ===========================================================================
   PART 1 — short familiar questions (answer in 2–4 sentences)
   =========================================================================== */
const PART1 = [
  {
    topic: "Hometown",
    questions: [
      "Where is your hometown?",
      "Do you like your hometown? Why?",
      "Has your hometown changed much in recent years?",
      "Would you like to live there in the future?",
      "What do you like most about it?",
    ],
    models: {
      7: "I'm from Da Nang, a coastal city in central Vietnam. I like it because it's quite relaxed but still developing fast. It has changed a lot recently — there are more buildings and tourists than before.",
      8: "I'm from Da Nang, a coastal city in central Vietnam. I'm really fond of it because it strikes the perfect balance between a relaxed beach lifestyle and a growing, modern city. It's changed enormously over the past decade — there are far more high-rise buildings and the tourism scene has really taken off.",
      9: "I'm originally from Da Nang, a coastal city right in the heart of central Vietnam. I'm genuinely attached to it because it manages to strike this lovely balance between a laid-back, beachy feel and the buzz of a city that's clearly on the up. That said, it's transformed almost beyond recognition over the last decade — the skyline is crowded with high-rises now and tourism has absolutely boomed, which, to be honest, is a bit of a mixed blessing.",
    },
    vocab: [
      v("fond of", "yêu thích", "I'm really fond of my hometown"),
      v("strike a balance", "cân bằng", "strike the perfect balance between A and B"),
      v("take off", "phát triển mạnh", "tourism has taken off"),
      v("a mixed blessing", "vừa lợi vừa hại", "it's a bit of a mixed blessing"),
      v("on the up", "đang đi lên", "a city that's on the up"),
    ],
    grammar: ["Present perfect (has changed / has taken off)", "Comparatives (far more, more than before)", "Relative clause (a city that's on the up)"],
  },
  {
    topic: "Work / Studies",
    questions: [
      "Do you work or are you a student?",
      "What do you do? / What are you studying?",
      "Why did you choose that job / subject?",
      "What do you enjoy most about it?",
      "Would you like to change your job / field in the future?",
    ],
    models: {
      7: "I work as a marketing assistant for a small travel company. I chose it because I like meeting people and being creative. The part I enjoy most is planning campaigns, although it can be stressful sometimes.",
      8: "I currently work as a marketing assistant for a boutique travel company. I went into it because I've always been drawn to creative work that also involves dealing with people. What I enjoy most is the variety — no two days are really the same, and I get to brainstorm campaigns from scratch.",
      9: "At the moment I'm working as a marketing assistant for a small boutique travel firm. I sort of fell into it, to be honest, but it turned out to suit me perfectly because I've always gravitated towards work that's creative but also fairly people-facing. The thing I find most rewarding is the sheer variety — no two days are alike, and I'm constantly dreaming up campaigns from the ground up.",
    },
    vocab: [
      v("be drawn to", "bị thu hút bởi", "I've always been drawn to creative work"),
      v("gravitate towards", "có xu hướng thiên về", "I gravitate towards creative roles"),
      v("from scratch / from the ground up", "từ đầu", "build a campaign from scratch"),
      v("people-facing", "tiếp xúc nhiều với người", "a people-facing role"),
      v("fall into (a job)", "tình cờ làm", "I sort of fell into it"),
    ],
    grammar: ["Present continuous for current situation (I'm working)", "Present perfect with 'always' (I've always been drawn)", "Phrasal verbs"],
  },
  {
    topic: "Free time / Hobbies",
    questions: [
      "What do you usually do in your free time?",
      "Do you prefer relaxing alone or with friends?",
      "Have your hobbies changed since you were a child?",
      "Is there a new hobby you'd like to try?",
      "How much free time do you have during the week?",
    ],
    models: {
      7: "In my free time I usually read or go cycling near the river. I prefer relaxing with friends, but sometimes I like being alone too. My hobbies have changed a bit — I used to play video games more when I was younger.",
      8: "In my downtime I tend to read or head out for a cycle along the river. I'm quite a sociable person, so I usually unwind with friends, though I do value a bit of quiet time on my own as well. My interests have definitely shifted over the years — as a kid I was glued to video games.",
      9: "Whenever I get a spare moment, I'll either curl up with a book or head out for a leisurely cycle along the riverside. I'd say I'm fairly sociable by nature, so more often than not I unwind with friends — but I've come to really treasure the odd bit of solitude too. My interests have shifted quite dramatically over the years; as a kid I was absolutely glued to video games.",
    },
    vocab: [
      v("downtime / spare moment", "thời gian rảnh", "in my downtime"),
      v("unwind", "thư giãn", "I unwind with friends"),
      v("be glued to", "dán mắt vào", "glued to video games"),
      v("treasure / value", "trân trọng", "I treasure quiet time"),
      v("more often than not", "phần lớn thời gian", "more often than not I read"),
    ],
    grammar: ["Habitual 'tend to' / 'will' for habits", "Used to + base verb (past habit)", "Present perfect for change (have shifted)"],
  },
  {
    topic: "Food & Cooking",
    questions: [
      "What kind of food do you like?",
      "Do you prefer eating at home or eating out?",
      "Can you cook? Who taught you?",
      "Has your diet changed in recent years?",
      "Is there a dish from your country you'd recommend?",
    ],
    models: {
      7: "I love Vietnamese food, especially pho and fresh spring rolls. I usually eat at home because it's cheaper and healthier. My mum taught me to cook a few simple dishes when I was a teenager.",
      8: "I'm a big fan of Vietnamese cuisine — pho and fresh spring rolls are my absolute go-to comfort foods. I tend to eat in rather than eat out, mainly because home cooking is lighter on the wallet and a lot healthier. My mum taught me the basics when I was a teenager.",
      9: "I'm a huge fan of Vietnamese cuisine — a steaming bowl of pho or some fresh spring rolls are my ultimate comfort food. I lean towards eating in over eating out, partly because home cooking is far easier on the wallet, but mostly because you know exactly what's going into your food. My mum drummed the basics into me as a teenager, and I've been tinkering in the kitchen ever since.",
    },
    vocab: [
      v("go-to / comfort food", "món ưa thích", "my go-to comfort food"),
      v("eat in / eat out", "ăn ở nhà / ăn ngoài", "I prefer to eat in"),
      v("easy on the wallet", "tiết kiệm tiền", "home cooking is easy on the wallet"),
      v("drum (something) into someone", "dạy kỹ", "she drummed the basics into me"),
      v("tinker in the kitchen", "mày mò nấu nướng", "I tinker in the kitchen"),
    ],
    grammar: ["Comparatives (lighter, healthier)", "Reason linking (mainly because / partly because)", "Present perfect continuous (I've been tinkering)"],
  },
  {
    topic: "Technology & Phones",
    questions: [
      "How often do you use your phone?",
      "What do you mainly use it for?",
      "Could you live without your smartphone for a day?",
      "Has technology changed the way you communicate?",
      "Do you think people rely on technology too much?",
    ],
    models: {
      7: "I use my phone all the time, mostly for messaging, maps and watching videos. I think I could live without it for a day, but it would be difficult. Technology has changed how I talk to my family because we video-call a lot now.",
      8: "Honestly, my phone is glued to my hand — I use it constantly for messaging, navigation and the odd video. I'd struggle to go a whole day without it, though I like to think I could. Technology has completely reshaped how I keep in touch with family, since we video-call almost daily now.",
      9: "If I'm honest, my phone is practically an extension of my arm — I'm forever on it for messaging, navigation and the occasional video binge. I'd like to think I could survive a day without it, but realistically I'd be a bit lost. Technology has fundamentally reshaped how I stay in touch with my family; we video-call almost every day, which simply wasn't an option a generation ago.",
    },
    vocab: [
      v("glued to my hand / an extension of my arm", "không rời tay", "my phone is an extension of my arm"),
      v("keep / stay in touch", "giữ liên lạc", "stay in touch with family"),
      v("reshape", "định hình lại", "technology has reshaped communication"),
      v("video binge", "xem video liên tục", "the occasional video binge"),
      v("a generation ago", "một thế hệ trước", "wasn't possible a generation ago"),
    ],
    grammar: ["Second conditional (I'd struggle / I'd be lost)", "Present perfect for change (has reshaped)", "Adverbs of frequency (almost daily)"],
  },
  {
    topic: "Weather & Seasons",
    questions: [
      "What's the weather usually like where you live?",
      "What's your favourite season? Why?",
      "Does the weather affect your mood?",
      "Do you prefer hot or cold weather?",
      "Has the weather in your country changed over the years?",
    ],
    models: {
      7: "Where I live it's hot and humid for most of the year. My favourite season is autumn because it's cooler and more comfortable. The weather definitely affects my mood — I feel more energetic when it's sunny.",
      8: "Where I'm from, it's hot and pretty humid for most of the year, which can be draining. My favourite season is autumn, hands down, because the air turns crisp and it's far more comfortable to be outdoors. Weather has a big impact on my mood — a grey, rainy day can really sap my energy.",
      9: "Where I'm from, it's hot and rather humid for the better part of the year, which can get quite draining after a while. Autumn is my favourite, hands down, because the air turns lovely and crisp and it's just far more pleasant to be out and about. Weather has a surprisingly strong hold on my mood, too — a grey, drizzly day can really sap my energy, whereas a bit of sunshine works wonders.",
    },
    vocab: [
      v("humid / draining", "ẩm / mệt mỏi", "hot and humid weather is draining"),
      v("hands down", "chắc chắn nhất", "autumn is my favourite, hands down"),
      v("crisp air", "không khí mát mẻ", "the air turns crisp"),
      v("sap your energy", "rút cạn năng lượng", "rainy days sap my energy"),
      v("work wonders", "có tác dụng tuyệt vời", "sunshine works wonders"),
    ],
    grammar: ["Present simple for facts (it's hot)", "Contrast with 'whereas'", "Relative clause (which can get draining)"],
  },
  {
    topic: "Daily Routine",
    questions: [
      "What does a typical day look like for you?",
      "Are you a morning person or a night person?",
      "Do you have the same routine on weekends?",
      "Is there anything you'd like to change about your routine?",
      "What's the first thing you do when you wake up?",
    ],
    models: {
      7: "On a normal day I wake up at six, have breakfast and go to work. I'm definitely a morning person, so I feel most productive early. On weekends my routine is more relaxed and I wake up later.",
      8: "A typical weekday starts early for me — I'm up by six, grab a quick breakfast and head to work. I'm a morning person through and through, so I get most of my best work done before lunch. Weekends are a different story; I let myself have a lie-in.",
      9: "A typical weekday kicks off pretty early — I'm usually up by six, wolf down some breakfast and head straight to work. I'm a morning person through and through, so I tend to knock out most of my important tasks before lunch, while my brain's still firing. Weekends, though, are a completely different story — I treat myself to a proper lie-in.",
    },
    vocab: [
      v("a morning person / night owl", "người dậy sớm / cú đêm", "I'm a morning person through and through"),
      v("through and through", "hoàn toàn", "a morning person through and through"),
      v("have a lie-in", "ngủ nướng", "I treat myself to a lie-in"),
      v("knock out / get done", "hoàn thành", "knock out my tasks"),
      v("kick off", "bắt đầu", "my day kicks off early"),
    ],
    grammar: ["Present simple for routine", "Phrasal verbs (kick off, wolf down)", "Contrast linking (though)"],
  },
];

/* ===========================================================================
   PART 2 — Cue cards (1 min prep, speak 1–2 min)
   =========================================================================== */
const PART2 = [
  {
    title: "Describe a person who has influenced you",
    bullets: [
      "who this person is",
      "how you know them",
      "what they have done",
      "and explain why they have influenced you",
    ],
    category: "Person",
    model8:
      "I'd like to talk about my high-school English teacher, Mr Hung, who's probably had the single biggest influence on my life. I met him when I was about fifteen and, to be honest, I was a pretty average student who didn't take English seriously at all. What set him apart was that he never just taught from the textbook — he'd bring in songs, films and real conversations, and he genuinely made the language feel alive. I remember one time he stayed back after class for nearly an hour just to help me with my pronunciation, which meant the world to me. Over time, he completely changed the way I saw learning; I went from dreading English to absolutely loving it. He's the reason I ended up working in a field where I use English every single day. So all in all, that's why I'd say he influenced me more than almost anyone else — not just because of what he taught, but because of how much he clearly cared.",
    vocab: [
      v("set someone apart", "làm nổi bật", "what set him apart was..."),
      v("make something feel alive", "làm cho sinh động", "he made the language feel alive"),
      v("mean the world to someone", "có ý nghĩa rất lớn", "it meant the world to me"),
      v("dread", "sợ hãi", "I went from dreading English"),
      v("all in all", "tóm lại", "so all in all, that's why..."),
    ],
    grammar: ["Relative clauses (who's had the biggest influence)", "Past simple narration (he stayed back / he brought in)", "Present perfect (has influenced)"],
  },
  {
    title: "Describe a memorable journey you have taken",
    bullets: [
      "where you went",
      "who you went with",
      "what happened during the journey",
      "and explain why it was so memorable",
    ],
    category: "Experience",
    model8:
      "I'd love to tell you about a road trip I took along the Hai Van Pass in central Vietnam a couple of years ago. I went with two of my closest friends, and we rented motorbikes on a complete whim. The journey itself was breathtaking — the road winds along the coast, with the mountains on one side and the sea on the other, and at one point we stopped just to take it all in. What made it unforgettable, though, wasn't just the scenery; halfway through it started pouring with rain, so we had to shelter in a tiny roadside café, where the owner ended up cooking us the best noodle soup I've ever had. We were soaked through and laughing the whole time. Looking back, it's memorable precisely because nothing went to plan — the unexpected bits turned out to be the highlight. So that trip really taught me that the best experiences are often the ones you can't predict.",
    vocab: [
      v("on a whim", "tùy hứng", "we rented bikes on a whim"),
      v("breathtaking", "ngoạn mục", "the journey was breathtaking"),
      v("take it all in", "thưởng thức trọn vẹn", "we stopped to take it all in"),
      v("soaked through", "ướt sũng", "we were soaked through"),
      v("go to plan", "diễn ra như dự định", "nothing went to plan"),
    ],
    grammar: ["Past continuous (it started pouring / we were laughing)", "Relative clauses (where the owner...)", "Superlatives (the best soup I've ever had)"],
  },
  {
    title: "Describe a place you would like to visit",
    bullets: [
      "where it is",
      "how you know about it",
      "what you would do there",
      "and explain why you want to visit it",
    ],
    category: "Place",
    model8:
      "The place I'd most love to visit is Kyoto, in Japan. I first came across it through a documentary about traditional Japanese culture, and it's been on my bucket list ever since. From what I understand, it's a city where ancient temples and bamboo forests sit right alongside a modern, bustling lifestyle, which I find fascinating. If I went, I'd spend my mornings wandering around the old shrines, then try as much street food as I possibly could, and ideally I'd time my trip for the cherry-blossom season. The main reason I'm drawn to it is that I'm a bit obsessed with how Japan manages to preserve its heritage while still being incredibly forward-looking. So for me, Kyoto sort of represents the perfect blend of the old and the new, and that's exactly why it's right at the top of my list.",
    vocab: [
      v("come across", "tình cờ biết đến", "I came across it through a documentary"),
      v("bucket list", "danh sách điều muốn làm", "it's on my bucket list"),
      v("sit alongside", "tồn tại song song", "temples sit alongside modern life"),
      v("forward-looking", "hướng tới tương lai", "incredibly forward-looking"),
      v("a blend of", "sự pha trộn của", "a blend of the old and the new"),
    ],
    grammar: ["Second conditional (if I went, I'd spend...)", "Relative clause (a city where...)", "Present perfect (it's been on my list ever since)"],
  },
  {
    title: "Describe a skill you would like to learn",
    bullets: [
      "what the skill is",
      "how you would learn it",
      "how long it might take",
      "and explain why you want to learn it",
    ],
    category: "Activity",
    model8:
      "A skill I've always wanted to pick up is playing the piano. I've been fascinated by it since I was a child, but I never had the chance to learn properly. If I committed to it, I'd probably start with online lessons and then find a local teacher once I'd got the basics down. Realistically, I think it would take a good couple of years of consistent practice before I could play anything decent — these things don't happen overnight. The reason I'm so keen is partly that I find music incredibly relaxing, almost like a form of therapy, and partly that I'd love to be able to play for friends and family at gatherings. So although it's a long-term goal, it's definitely something I'm determined to tackle once life slows down a little.",
    vocab: [
      v("pick up (a skill)", "học được", "a skill I'd love to pick up"),
      v("get the basics down", "nắm cơ bản", "once I'd got the basics down"),
      v("happen overnight", "xảy ra nhanh chóng", "it won't happen overnight"),
      v("a form of therapy", "một liệu pháp", "music is like therapy"),
      v("tackle", "bắt tay vào", "something I'm determined to tackle"),
    ],
    grammar: ["Second conditional (if I committed... I'd start)", "Past perfect (once I'd got the basics)", "Reason linking (partly that... partly that...)"],
  },
  {
    title: "Describe an object that is important to you",
    bullets: [
      "what it is",
      "how you got it",
      "how often you use it",
      "and explain why it is important to you",
    ],
    category: "Object",
    model8:
      "The object I'd choose is an old film camera that my grandfather passed down to me. He gave it to me just before he passed away, so it carries a huge amount of sentimental value. It's nothing fancy — it's actually quite battered and tricky to use — but I treasure it precisely because it was his. I don't use it all that often, maybe a handful of times a year on special occasions, mainly because film is expensive and I want to make every shot count. What makes it so important isn't really the camera itself but everything it represents: my grandfather was the one who got me into photography in the first place. So whenever I hold it, it brings back a flood of memories, and that's something money simply can't buy.",
    vocab: [
      v("pass down", "truyền lại", "he passed it down to me"),
      v("sentimental value", "giá trị tình cảm", "it carries sentimental value"),
      v("battered", "cũ kỹ, sờn", "it's quite battered"),
      v("make every shot count", "tận dụng từng cơ hội", "I make every shot count"),
      v("bring back memories", "gợi lại kỷ niệm", "it brings back a flood of memories"),
    ],
    grammar: ["Relative clause (the one who got me into...)", "Contrast (it's nothing fancy, but...)", "Frequency (a handful of times a year)"],
  },
  {
    title: "Describe a piece of good news you received",
    bullets: [
      "what the news was",
      "how you received it",
      "how you felt",
      "and explain why it was important to you",
    ],
    category: "Event",
    model8:
      "I'd like to talk about the day I found out I'd landed my first proper job. I'd applied to dozens of places and had pretty much given up hope, so when the email came through, I almost didn't open it. The moment I read that they'd offered me the position, I was over the moon — I actually jumped up and called my mum straight away. What made it so significant was that it was the first time I felt my hard work had genuinely paid off; up until then, I'd had nothing but rejections. It also meant I could finally be financially independent, which was a huge weight off my shoulders. Looking back, that one piece of news marked a real turning point in my life, and that's why it'll always stick with me.",
    vocab: [
      v("land a job", "có được công việc", "I landed my first job"),
      v("over the moon", "vô cùng vui sướng", "I was over the moon"),
      v("pay off", "có kết quả", "my hard work paid off"),
      v("a weight off your shoulders", "trút được gánh nặng", "a huge weight off my shoulders"),
      v("a turning point", "bước ngoặt", "it marked a turning point"),
    ],
    grammar: ["Past perfect (I'd applied / I'd given up)", "Reported speech (they'd offered me)", "Narrative past tenses"],
  },
];

/* ===========================================================================
   PART 3 — discussion questions (answer in 3–6 developed sentences)
   =========================================================================== */
const PART3 = [
  {
    theme: "Technology & Society",
    questions: [
      "Do you think technology has made people less social?",
      "How has technology changed the way we work?",
      "Are there any downsides to relying on technology?",
      "Do you think children spend too much time on screens?",
      "Will technology bring people closer or push them apart in the future?",
    ],
    sample: {
      q: "Do you think technology has made people less social?",
      8: "It's a double-edged sword, really. On one hand, things like social media can isolate people because they'd rather scroll on their phones than talk face to face. On the other hand, I'd argue technology actually connects us with people we'd otherwise lose touch with — I video-call relatives abroad every week, which simply wasn't possible a generation ago. So I wouldn't say it's made us less social, just social in a different way.",
    },
    vocab: [
      v("a double-edged sword", "con dao hai lưỡi", "it's a double-edged sword"),
      v("isolate", "cô lập", "social media can isolate people"),
      v("lose touch with", "mất liên lạc", "people we'd otherwise lose touch with"),
      v("face to face", "trực tiếp", "talk face to face"),
    ],
    grammar: ["Contrast structures (on one hand... on the other)", "Opinion framing (I'd argue / I wouldn't say)", "Second-conditional flavour (we'd otherwise lose touch)"],
  },
  {
    theme: "Education & Learning",
    questions: [
      "Should learning be fun, or is hard work more important?",
      "Do you think online learning is as effective as classroom learning?",
      "How important is it to learn a foreign language nowadays?",
      "Should governments invest more in education or in healthcare?",
      "Will traditional schools still exist in the future?",
    ],
    sample: {
      q: "Do you think online learning is as effective as classroom learning?",
      8: "I think it really depends on the learner and the subject. For self-motivated people, online learning can be just as effective, if not more so, because of the sheer flexibility — you can study at your own pace and revisit material whenever you like. That said, it does lack the face-to-face interaction and the accountability of a physical classroom, which some students really need. So personally, I'd say a blended approach, combining the best of both, tends to work best.",
    },
    vocab: [
      v("self-motivated", "tự giác", "self-motivated learners"),
      v("at your own pace", "theo nhịp độ riêng", "study at your own pace"),
      v("accountability", "trách nhiệm giải trình", "the accountability of a classroom"),
      v("a blended approach", "phương pháp kết hợp", "a blended approach works best"),
    ],
    grammar: ["Conditional concession (if not more so)", "Concession with 'that said'", "Comparative as...as"],
  },
  {
    theme: "Environment & Sustainability",
    questions: [
      "Whose responsibility is it to protect the environment — individuals or governments?",
      "What everyday changes can people make to be more eco-friendly?",
      "Do you think electric cars are the solution to pollution?",
      "Are people today more environmentally aware than in the past?",
      "Should companies be forced to be more sustainable?",
    ],
    sample: {
      q: "Whose responsibility is it to protect the environment — individuals or governments?",
      8: "Honestly, I think it has to be a shared responsibility; pointing the finger at one side alone is a bit of a cop-out. Governments have the power to bring in large-scale policies and regulations that individuals simply can't, like investing in renewable energy. But at the same time, real change starts with everyday habits — cutting down on plastic, using public transport and so on. So while governments should lead the way, ordinary people absolutely have a part to play.",
    },
    vocab: [
      v("a shared responsibility", "trách nhiệm chung", "it's a shared responsibility"),
      v("point the finger at", "đổ lỗi cho", "pointing the finger at one side"),
      v("bring in (policies)", "ban hành", "bring in regulations"),
      v("cut down on", "giảm bớt", "cut down on plastic"),
      v("lead the way", "dẫn đầu", "governments should lead the way"),
    ],
    grammar: ["Modal verbs for obligation (should / have to)", "Contrast (but at the same time)", "Concession (while governments...)"],
  },
  {
    theme: "Family & Generations",
    questions: [
      "Are family relationships as important today as they were in the past?",
      "Do you think older and younger generations can learn from each other?",
      "Has the role of grandparents changed in modern families?",
      "Why do some young people prefer to live independently?",
      "Should children look after their parents when they get old?",
    ],
    sample: {
      q: "Do you think older and younger generations can learn from each other?",
      8: "Absolutely, and I think that exchange goes both ways. Older generations have a wealth of life experience and wisdom that you simply can't get from a textbook, especially when it comes to relationships and resilience. Meanwhile, younger people are often more clued up on technology and tend to be more open-minded about social issues. So rather than there being a generation gap, I'd argue there's huge potential for a two-way street, as long as both sides are willing to listen.",
    },
    vocab: [
      v("a wealth of experience", "kho tàng kinh nghiệm", "a wealth of life experience"),
      v("clued up on", "am hiểu về", "clued up on technology"),
      v("open-minded", "cởi mở", "more open-minded about social issues"),
      v("a two-way street", "mối quan hệ hai chiều", "it's a two-way street"),
      v("the generation gap", "khoảng cách thế hệ", "rather than a generation gap"),
    ],
    grammar: ["Comparatives (more clued up / more open-minded)", "Conditional (as long as both sides...)", "Contrast (meanwhile / rather than)"],
  },
  {
    theme: "Work & Careers",
    questions: [
      "Is it better to have one career for life or to change jobs often?",
      "Do you think people will still work in offices in the future?",
      "How important is work-life balance?",
      "Should salary be the most important factor when choosing a job?",
      "Are remote jobs better than office jobs?",
    ],
    sample: {
      q: "How important is work-life balance?",
      8: "I'd say it's absolutely crucial, and it's something people are taking far more seriously than they used to. When you're constantly burning the candle at both ends, your productivity actually drops and burnout becomes almost inevitable. A healthy balance lets people recharge, spend time with loved ones and come back to work sharper. So in my view, the old idea of grinding away around the clock is pretty outdated — working smart matters far more than simply working long hours.",
    },
    vocab: [
      v("burn the candle at both ends", "làm việc quá sức", "burning the candle at both ends"),
      v("burnout", "kiệt sức", "burnout becomes inevitable"),
      v("recharge", "nạp lại năng lượng", "balance lets people recharge"),
      v("around the clock", "suốt ngày đêm", "grinding away around the clock"),
      v("outdated", "lỗi thời", "that idea is outdated"),
    ],
    grammar: ["Cause and effect (when... your productivity drops)", "Comparative (far more seriously)", "Opinion framing (in my view)"],
  },
];

/* expose to app.js */
const DATA = { BAND_DESCRIPTORS, PART1, PART2, PART3 };
