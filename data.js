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
  {
    topic: "Music",
    questions: [
      "What kind of music do you like?",
      "Has your taste in music changed over time?",
      "Do you prefer listening to music live or recorded?",
      "Is music important in your country's culture?",
      "Do you ever listen to music while working or studying?",
    ],
    models: {
      7: "I listen to a lot of different music, but mostly pop and some lo-fi when I study. My taste has changed since I was younger — I used to only like loud music. I think music is very important in Vietnamese culture, especially at festivals.",
      8: "I'm pretty open-minded when it comes to music, but I gravitate towards pop and lo-fi beats, especially when I'm working. My taste has definitely matured over the years — as a teenager I was all about loud rock, whereas now I prefer something more mellow. Music plays a huge role in our culture, particularly during festivals.",
      9: "I'd say I'm fairly eclectic when it comes to music, though I tend to gravitate towards pop and those mellow lo-fi beats, especially when I need to knuckle down and study. My taste has matured quite a bit over the years — as a teenager I was all about loud, angsty rock, whereas these days I lean towards something far more laid-back. Music is woven into the fabric of our culture too, particularly at festivals, where it really brings everyone together.",
    },
    vocab: [
      v("eclectic / open-minded", "đa dạng / cởi mở", "my taste is fairly eclectic"),
      v("gravitate towards", "thiên về", "I gravitate towards pop"),
      v("mellow / laid-back", "nhẹ nhàng", "something more mellow"),
      v("knuckle down", "tập trung làm việc", "when I need to knuckle down"),
      v("woven into the fabric of", "ăn sâu vào", "music is woven into the fabric of our culture"),
    ],
    grammar: ["Used to + base verb (past habit)", "Present perfect for change (has matured)", "Contrast with 'whereas'"],
  },
  {
    topic: "Social Media",
    questions: [
      "Which social media platforms do you use?",
      "How much time do you spend on social media each day?",
      "What are the good and bad sides of social media?",
      "Has social media changed the way you keep in touch with people?",
      "Do you think people share too much online?",
    ],
    models: {
      7: "I mainly use Facebook and Instagram, maybe an hour or two a day. The good side is that I can keep in touch with friends easily, but the bad side is that it can waste a lot of time. I think some people do share too much online.",
      8: "I'm mostly on Instagram and a bit of TikTok — probably a couple of hours a day, which is more than I'd like to admit. On the plus side, it's brilliant for staying in the loop with friends, but the downside is how easily you can fall down a rabbit hole and lose track of time. And yes, I do think some people overshare.",
      9: "I'm predominantly on Instagram, with the odd bit of TikTok thrown in — honestly, probably a couple of hours a day, which is more than I'd care to admit. On the plus side, it's fantastic for staying in the loop and keeping tabs on friends I'd otherwise drift away from. The flip side, though, is how effortlessly you can fall down a rabbit hole and watch an entire evening evaporate. And I'd definitely say there's a tendency for people to overshare these days.",
    },
    vocab: [
      v("stay in the loop", "cập nhật tin tức", "great for staying in the loop"),
      v("fall down a rabbit hole", "sa đà vào", "you fall down a rabbit hole"),
      v("lose track of time", "quên thời gian", "I lose track of time"),
      v("overshare", "chia sẻ quá nhiều", "people tend to overshare"),
      v("keep tabs on", "theo dõi", "keeping tabs on friends"),
    ],
    grammar: ["Contrast (on the plus side... the downside)", "Relative clause (friends I'd otherwise drift away from)", "Frequency adverbs"],
  },
  {
    topic: "Sleep",
    questions: [
      "How many hours do you usually sleep?",
      "Do you think you get enough sleep?",
      "Do you ever take naps during the day?",
      "What do you do if you can't fall asleep?",
      "Has your sleep pattern changed compared to the past?",
    ],
    models: {
      7: "I usually sleep about six or seven hours, which isn't really enough. I sometimes take a short nap after lunch. If I can't sleep, I read a book or listen to music. My sleep has got worse since I started working.",
      8: "I tend to get around six or seven hours, though honestly that's not quite enough for me to feel my best. I'm a big fan of a quick power nap after lunch to recharge. When I'm struggling to drop off, I'll usually read or put on some calming music rather than scroll on my phone.",
      9: "I usually manage around six or seven hours, although if I'm honest that falls a little short of what I need to feel properly refreshed. I'm a firm believer in a quick power nap after lunch — it works wonders for my focus in the afternoon. On the nights when I just can't seem to drop off, I'll reach for a book or some calming music rather than scroll endlessly, since screens only make it worse.",
    },
    vocab: [
      v("power nap", "ngủ ngắn", "a quick power nap"),
      v("drop off / nod off", "chợp mắt, ngủ", "when I can't drop off"),
      v("recharge", "nạp năng lượng", "a nap to recharge"),
      v("fall short of", "thiếu hụt", "that falls short of what I need"),
      v("work wonders", "rất hiệu quả", "it works wonders for my focus"),
    ],
    grammar: ["Present simple for habit", "Relative/reason clauses (since screens make it worse)", "Quantifiers (around / a little)"],
  },
  {
    topic: "Travel & Holidays",
    questions: [
      "Do you like travelling? Why?",
      "What's your favourite kind of holiday?",
      "Do you prefer travelling alone or with others?",
      "Where would you like to go on your next holiday?",
      "Has the way people travel changed in recent years?",
    ],
    models: {
      7: "I love travelling because I get to see new places and try different food. My favourite kind of holiday is a beach trip where I can relax. I usually travel with friends, but sometimes alone is nice too.",
      8: "I'm a real travel enthusiast — there's nothing quite like immersing yourself in a new culture and sampling the local cuisine. My ideal holiday is a laid-back beach getaway where I can properly switch off. I tend to travel with friends, although I've come to appreciate the freedom of going solo.",
      9: "I'm an absolute travel enthusiast — for me, there's nothing quite like immersing myself in an unfamiliar culture and getting stuck into the local cuisine. My ideal break is a laid-back beach getaway where I can genuinely switch off and recharge my batteries. I usually travel with friends, though over time I've grown to relish the sheer freedom of going solo, where you can do exactly as you please.",
    },
    vocab: [
      v("immerse yourself in", "đắm mình vào", "immerse yourself in a culture"),
      v("getaway", "kỳ nghỉ ngắn", "a beach getaway"),
      v("switch off", "thư giãn hoàn toàn", "somewhere I can switch off"),
      v("recharge your batteries", "lấy lại năng lượng", "recharge my batteries"),
      v("go solo", "đi một mình", "the freedom of going solo"),
    ],
    grammar: ["There's nothing quite like + -ing", "Present perfect (I've come/grown to appreciate)", "Contrast (although)"],
  },
  {
    topic: "Shopping",
    questions: [
      "Do you enjoy shopping?",
      "Do you prefer shopping online or in physical stores?",
      "How often do you go shopping?",
      "Do you usually plan your purchases or buy on impulse?",
      "Has the way people shop changed in your country?",
    ],
    models: {
      7: "I quite like shopping, especially for clothes. I prefer shopping online because it's more convenient and often cheaper. I usually go shopping once or twice a month, and I try to plan what I buy.",
      8: "I do enjoy shopping, particularly for clothes, though I'm trying to be more of a conscious consumer these days. I lean towards shopping online — it's just so much more convenient, and you can compare prices in seconds. I make a point of planning my purchases so I don't end up buying things on a whim.",
      9: "I do enjoy a spot of shopping, especially for clothes, although I'm consciously trying to rein in my impulse buys these days. I tend to favour online shopping — it's just infinitely more convenient, and you can compare prices at the click of a button. I make a real point of planning my purchases in advance so I don't fall into the trap of buying things on a whim and regretting it later.",
    },
    vocab: [
      v("conscious consumer", "người tiêu dùng có ý thức", "be a conscious consumer"),
      v("buy on a whim / impulse buy", "mua bốc đồng", "buying on a whim"),
      v("rein in", "kiềm chế", "rein in my impulse buys"),
      v("make a point of", "cố ý làm", "I make a point of planning"),
      v("at the click of a button", "chỉ một cú nhấp", "compare prices at the click of a button"),
    ],
    grammar: ["Comparatives (much more convenient)", "Purpose clause (so I don't...)", "Gerunds after prepositions"],
  },
  {
    topic: "Reading",
    questions: [
      "Do you like reading? What do you read?",
      "Do you prefer paper books or e-books?",
      "Did you read a lot as a child?",
      "Do you think reading is still important nowadays?",
      "What kind of books would you like to read in the future?",
    ],
    models: {
      7: "I enjoy reading, mostly novels and some self-help books. I prefer paper books because I like the feeling of turning pages. I read quite a lot when I was a child, and I think reading is still very important.",
      8: "I'm an avid reader, mainly fiction but also the odd self-help book to broaden my mind. I'm a bit old-fashioned in that I prefer physical books — there's something about the feel of paper that an e-reader just can't replicate. I was a bookworm as a kid, and I genuinely believe reading is as relevant as ever.",
      9: "I'm an avid reader — predominantly fiction, but I'll dip into the odd self-help book to broaden my horizons. I'm a touch old-fashioned in that I still favour physical books; there's something about the feel and smell of paper that an e-reader simply can't replicate. I was a complete bookworm as a child, and I'd argue reading is as relevant as ever, even in this age of endless scrolling.",
    },
    vocab: [
      v("avid reader / bookworm", "người mê đọc sách", "I'm an avid reader"),
      v("broaden your horizons", "mở mang tầm nhìn", "to broaden my horizons"),
      v("dip into", "đọc lướt qua", "I dip into self-help books"),
      v("can't replicate", "không thể tái tạo", "an e-reader can't replicate it"),
      v("as relevant as ever", "vẫn quan trọng", "reading is as relevant as ever"),
    ],
    grammar: ["There's something about... that...", "Comparative (as relevant as ever)", "Past simple for childhood (I was a bookworm)"],
  },
  {
    topic: "Public Transport",
    questions: [
      "Do you often use public transport?",
      "What's the public transport like in your city?",
      "Do you prefer public transport or driving?",
      "How could public transport be improved where you live?",
      "Do you think more people will use public transport in the future?",
    ],
    models: {
      7: "I use the bus quite often because it's cheap, but it can be crowded. Public transport in my city is okay but not very modern. I prefer public transport to driving because traffic is bad and parking is difficult.",
      8: "I rely on the bus fairly regularly since it's easy on the wallet, though it does get packed during rush hour. Public transport here is decent but a bit behind the times compared to bigger cities. I'd take it over driving any day — the traffic is a nightmare and finding a parking spot is a real headache.",
      9: "I lean on the bus fairly regularly, mainly because it's so easy on the wallet, although it can get absolutely packed during rush hour. The system here is reasonably reliable but, I'll admit, a little behind the times compared to somewhere like Singapore. Honestly, I'd take it over driving any day of the week — the traffic is a nightmare and hunting for a parking spot is a real headache, so it just isn't worth the hassle.",
    },
    vocab: [
      v("easy on the wallet", "tiết kiệm", "the bus is easy on the wallet"),
      v("packed", "đông nghẹt", "it gets packed at rush hour"),
      v("behind the times", "lạc hậu", "a bit behind the times"),
      v("a real headache", "rất phiền phức", "parking is a real headache"),
      v("not worth the hassle", "không đáng công sức", "it isn't worth the hassle"),
    ],
    grammar: ["Comparison (I'd take it over driving)", "Reason linking (since / mainly because)", "Concession (although / I'll admit)"],
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
  {
    title: "Describe a goal or ambition you have for the future",
    bullets: [
      "what the goal is",
      "how you plan to achieve it",
      "how long it will take",
      "and explain why this goal matters to you",
    ],
    category: "Event",
    model8:
      "One goal I'm really set on is starting my own small travel business within the next five years. Right now I'm laying the groundwork by gaining as much hands-on experience as I can in the industry and quietly building up my savings. The way I see it, it'll take a good few years to get all my ducks in a row — I need capital, the right contacts and a solid understanding of the market before I take the plunge. The reason it means so much to me is that I've always dreamed of being my own boss and creating something from scratch that genuinely helps people experience my country in a meaningful way. It's daunting, of course, and there's no guarantee it'll work out, but I'd much rather give it a shot and fail than spend my life wondering 'what if'. So all in all, it's the kind of long-term ambition that keeps me motivated every single day.",
    vocab: [
      v("set on (doing something)", "quyết tâm", "I'm set on starting a business"),
      v("lay the groundwork", "đặt nền móng", "I'm laying the groundwork"),
      v("get your ducks in a row", "chuẩn bị mọi thứ chu đáo", "get all my ducks in a row"),
      v("take the plunge", "liều một phen", "before I take the plunge"),
      v("give it a shot", "thử sức", "I'd rather give it a shot"),
    ],
    grammar: ["Future plans (I'm laying / it'll take)", "Conditional preference (I'd rather... than)", "Relative clause (something that helps people)"],
  },
  {
    title: "Describe an older person you admire",
    bullets: [
      "who the person is",
      "how you know them",
      "what they are like",
      "and explain why you admire them",
    ],
    category: "Person",
    model8:
      "I'd like to talk about my grandmother, who's well into her eighties now and is honestly one of the most remarkable people I know. I've obviously known her my whole life, but it's only as I've grown older that I've really come to appreciate just how extraordinary she is. She lived through some incredibly tough times — war, poverty, you name it — yet she's never lost her sense of humour or her warmth. What strikes me most is her resilience; no matter what life throws at her, she just takes it in her stride and gets on with things. She's also endlessly generous, always putting everyone else before herself. I admire her because she's living proof that you can go through real hardship and still come out the other side kind and optimistic. So all in all, she's the person I look up to the most, and I only hope I can age half as gracefully as she has.",
    vocab: [
      v("come to appreciate", "dần trân trọng", "I've come to appreciate her"),
      v("take it in your stride", "ứng phó bình tĩnh", "she takes it in her stride"),
      v("resilience", "sự kiên cường", "what strikes me is her resilience"),
      v("living proof", "minh chứng sống", "she's living proof that..."),
      v("look up to", "ngưỡng mộ", "the person I look up to most"),
    ],
    grammar: ["Relative clauses (who's in her eighties)", "Present perfect (I've come to appreciate)", "Concession (yet she's never lost...)"],
  },
  {
    title: "Describe a piece of technology you find useful",
    bullets: [
      "what it is",
      "how you use it",
      "how often you use it",
      "and explain why you find it so useful",
    ],
    category: "Object",
    model8:
      "The piece of technology I genuinely couldn't live without is my smartphone — I know that's a fairly obvious choice, but hear me out. I use it for absolutely everything: navigation, banking, staying in touch, even running parts of my work on the go. It's basically glued to my hand from the moment I wake up. What makes it so indispensable is the sheer convenience of having a tiny computer in your pocket that puts the whole world at your fingertips. A few years ago, I'd have needed a map, a camera, a calculator and a separate phone — now it's all rolled into one device. The flip side is that it can be a bit of a distraction, so I do try to set boundaries. But on balance, the productivity it gives me far outweighs the downsides. So that's why, if I had to pick just one gadget, it would win hands down.",
    vocab: [
      v("hear me out", "nghe tôi nói đã", "it's obvious, but hear me out"),
      v("on the go", "khi di chuyển", "I work on the go"),
      v("indispensable", "không thể thiếu", "what makes it indispensable"),
      v("at your fingertips", "trong tầm tay", "the world at your fingertips"),
      v("outweigh", "vượt trội hơn", "the benefits outweigh the downsides"),
    ],
    grammar: ["Third conditional (I'd have needed a map)", "Relative clause (a computer that puts...)", "Contrast (the flip side / on balance)"],
  },
  {
    title: "Describe a book you have recently read",
    bullets: [
      "what the book is",
      "what it is about",
      "why you decided to read it",
      "and explain how you felt about it",
    ],
    category: "Media",
    model8:
      "I'd like to talk about a book I finished recently called 'Atomic Habits' by James Clear. In a nutshell, it's all about how tiny, everyday changes can snowball into remarkable results over time. I picked it up because a friend wouldn't stop raving about it, and I'd been looking to become a bit more disciplined. What really resonated with me was the idea that you don't need a complete life overhaul — you just need to get one percent better each day. I found it incredibly eye-opening, partly because it's so practical; every chapter gives you something you can actually put into practice straight away. To be honest, it's one of the few self-help books that genuinely changed the way I approach my daily routine. So all in all, I'd wholeheartedly recommend it to anyone who feels stuck in a rut and wants to make lasting changes.",
    vocab: [
      v("in a nutshell", "tóm lại", "in a nutshell, it's about..."),
      v("snowball into", "tích tụ thành", "small changes snowball into results"),
      v("rave about", "khen hết lời", "my friend kept raving about it"),
      v("resonate with", "đồng cảm", "what resonated with me"),
      v("stuck in a rut", "mắc kẹt, nhàm chán", "anyone stuck in a rut"),
    ],
    grammar: ["Relative clause (a book that changed...)", "Past simple narration (I picked it up)", "Reported emphasis (what really resonated)"],
  },
  {
    title: "Describe a time you helped someone",
    bullets: [
      "who you helped",
      "what the situation was",
      "what you did",
      "and explain how you felt afterwards",
    ],
    category: "Experience",
    model8:
      "I'd like to describe a time I helped a complete stranger, which happened about a year ago. I was on my way home when I noticed an elderly tourist looking utterly lost and flustered near the station — it turned out she'd missed her bus and didn't speak a word of Vietnamese. I could have just walked past, but something told me to stop and lend a hand. I ended up not only giving her directions but actually walking her to the right platform and waiting until her bus arrived, which took the best part of half an hour. She was so grateful she was almost in tears. Honestly, it was such a small thing on my part, but the look of relief on her face stayed with me for days. It really drove home the idea that a tiny act of kindness can mean the world to someone. So that experience taught me to always go out of my way for others when I can.",
    vocab: [
      v("flustered", "bối rối", "she looked flustered"),
      v("lend a hand", "giúp đỡ", "I stopped to lend a hand"),
      v("the best part of", "gần như cả", "the best part of half an hour"),
      v("drive home (an idea)", "khắc sâu", "it drove home the idea"),
      v("go out of your way", "cố gắng hết sức", "I go out of my way for others"),
    ],
    grammar: ["Past continuous (I was on my way)", "Modal of past possibility (I could have walked past)", "Result clause (so grateful she was almost in tears)"],
  },
  {
    title: "Describe an app or website you use often",
    bullets: [
      "what it is",
      "what you use it for",
      "how often you use it",
      "and explain why you find it so useful",
    ],
    category: "Media",
    model8:
      "The app I rely on most is Google Maps, which has honestly become my go-to for getting around. I use it for pretty much everything navigation-related — finding the quickest route, checking traffic, and even discovering little cafés and restaurants I'd never have stumbled across otherwise. I'm on it daily, sometimes several times a day, especially since my work involves a fair bit of moving around the city. What makes it so invaluable is how seamlessly it just works — the real-time traffic updates alone have saved me from countless jams. I also love the reviews feature, because it takes the guesswork out of choosing where to eat. A generation ago I'd have been hopelessly lost without a paper map, so having all of this in my pocket feels almost like magic. So all in all, it's the one app I genuinely couldn't function without.",
    vocab: [
      v("go-to", "lựa chọn hàng đầu", "my go-to for getting around"),
      v("stumble across", "tình cờ tìm thấy", "cafés I'd never have stumbled across"),
      v("invaluable", "vô giá", "what makes it invaluable"),
      v("take the guesswork out of", "loại bỏ sự phỏng đoán", "it takes the guesswork out of choosing"),
      v("couldn't function without", "không thể thiếu", "the app I couldn't function without"),
    ],
    grammar: ["Relative clause (which has become my go-to)", "Third conditional (I'd have been lost)", "Present perfect (have saved me)"],
  },
  {
    title: "Describe a quiet place you like to go",
    bullets: [
      "where it is",
      "how often you go there",
      "what you do there",
      "and explain why you like this place",
    ],
    category: "Place",
    model8:
      "The quiet place I love retreating to is a small rooftop garden at a café near my home. It's tucked away above a busy street, so most people walk straight past without even realising it's there. I try to escape up there at least once a week, usually with a book or my journal. I'll order a coffee, find a corner away from everyone, and just let my thoughts settle — sometimes I read, sometimes I simply watch the world go by below. What I love about it is the contrast: you're right in the middle of the city, yet up there it feels like a little bubble of calm, completely cut off from the chaos. In our hectic, always-on world, having a spot where you can switch off and recharge is worth its weight in gold. So that rooftop has basically become my sanctuary whenever life gets a bit overwhelming.",
    vocab: [
      v("tucked away", "ẩn mình", "it's tucked away above a street"),
      v("let your thoughts settle", "để tâm trí lắng lại", "I let my thoughts settle"),
      v("a bubble of calm", "không gian yên bình", "a little bubble of calm"),
      v("cut off from", "tách biệt khỏi", "cut off from the chaos"),
      v("worth its weight in gold", "vô cùng quý giá", "it's worth its weight in gold"),
    ],
    grammar: ["Relative clause (a café where...)", "Contrast (you're in the city, yet...)", "Frequency (at least once a week)"],
  },
  {
    title: "Describe an achievement you are proud of",
    bullets: [
      "what the achievement was",
      "when it happened",
      "how you achieved it",
      "and explain why you are proud of it",
    ],
    category: "Event",
    model8:
      "The achievement I'm proudest of is finishing my first half-marathon a couple of years ago. I'd never been particularly sporty, so for me even the idea of running twenty-one kilometres felt completely out of reach. I started almost from zero, training three or four times a week, gradually pushing myself a little further each time. There were plenty of moments when I wanted to throw in the towel — the early mornings, the sore muscles, the rainy days — but I kept telling myself to just keep putting one foot in front of the other. Crossing that finish line was an absolutely euphoric moment; I actually got a little emotional. The reason I'm so proud isn't really the run itself, but what it represents: proof that I can set my mind to something difficult and see it through. So that experience genuinely changed how I view my own limits.",
    vocab: [
      v("out of reach", "ngoài tầm với", "it felt out of reach"),
      v("throw in the towel", "bỏ cuộc", "I wanted to throw in the towel"),
      v("see something through", "theo đến cùng", "I can see it through"),
      v("euphoric", "vô cùng phấn khích", "a euphoric moment"),
      v("set your mind to something", "quyết tâm làm", "I set my mind to it"),
    ],
    grammar: ["Past perfect (I'd never been sporty)", "Narrative past (I started / I kept telling myself)", "Cleft emphasis (what it represents)"],
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
  {
    theme: "Money & Consumerism",
    questions: [
      "Do you think people today are too focused on money?",
      "Is it better to save money or to spend it on experiences?",
      "Why do some people buy things they don't really need?",
      "Should schools teach children how to manage money?",
      "Do you think money can buy happiness?",
    ],
    sample: {
      q: "Is it better to save money or to spend it on experiences?",
      8: "Personally, I lean towards spending on experiences, though I think a healthy balance is key. The thing about material possessions is that the novelty tends to wear off pretty quickly, whereas memories from a trip or a concert can last a lifetime. That said, I'd never advocate spending recklessly — having a financial safety net is crucial, especially with how unpredictable life can be. So I suppose my view is: budget sensibly, but don't be afraid to invest in experiences that genuinely enrich your life.",
    },
    vocab: [
      v("the novelty wears off", "sự mới mẻ phai nhạt", "the novelty wears off quickly"),
      v("last a lifetime", "kéo dài cả đời", "memories can last a lifetime"),
      v("a financial safety net", "quỹ dự phòng", "having a safety net is crucial"),
      v("spend recklessly", "tiêu xài hoang phí", "I'd never advocate spending recklessly"),
      v("enrich your life", "làm phong phú cuộc sống", "experiences that enrich your life"),
    ],
    grammar: ["Contrast (whereas / that said)", "Opinion framing (I lean towards / my view is)", "Relative clause (experiences that enrich...)"],
  },
  {
    theme: "Health & Lifestyle",
    questions: [
      "Why do you think obesity is becoming more common?",
      "Whose responsibility is it to keep people healthy?",
      "Do you think people exercise enough these days?",
      "How has modern life affected people's health?",
      "Should unhealthy food be more expensive?",
    ],
    sample: {
      q: "How has modern life affected people's health?",
      8: "I'd say it's a real mixed bag. On the positive side, advances in medicine and access to information mean we're living longer and we're far more aware of what's good for us. On the flip side, though, our increasingly sedentary, desk-bound lifestyles have taken a toll — people sit for hours on end, eat more processed food and are constantly stressed. So while modern life has brought undeniable benefits, it's also created a whole new set of health challenges that previous generations simply didn't face.",
    },
    vocab: [
      v("a mixed bag", "vừa tốt vừa xấu", "it's a real mixed bag"),
      v("sedentary / desk-bound", "ít vận động", "sedentary lifestyles"),
      v("take a toll", "gây tổn hại", "it's taken a toll on health"),
      v("for hours on end", "hàng giờ liền", "people sit for hours on end"),
      v("processed food", "thực phẩm chế biến sẵn", "more processed food"),
    ],
    grammar: ["Present perfect (has taken a toll)", "Contrast (on the positive side / on the flip side)", "Concession (while modern life...)"],
  },
  {
    theme: "Travel & Tourism",
    questions: [
      "Why do people enjoy travelling to other countries?",
      "Does tourism benefit local communities or harm them?",
      "Has travel become too easy and cheap nowadays?",
      "How might tourism change in the future?",
      "Do you think people learn anything from travelling?",
    ],
    sample: {
      q: "Does tourism benefit local communities or harm them?",
      8: "It's genuinely a double-edged sword. On one hand, tourism can be a real lifeline for local economies — it creates jobs, boosts small businesses and helps preserve cultural heritage that might otherwise fade away. On the other hand, when it's not managed properly, you get overtourism, which drives up the cost of living for locals and can erode the very culture people came to see. So I'd argue the key is sustainable tourism: spreading visitors out, capping numbers where necessary, and making sure the profits actually trickle down to the local community rather than lining the pockets of big corporations.",
    },
    vocab: [
      v("a lifeline", "phao cứu sinh", "tourism is a lifeline for the economy"),
      v("overtourism", "du lịch quá tải", "you get overtourism"),
      v("drive up", "đẩy lên cao", "it drives up the cost of living"),
      v("erode", "làm xói mòn", "it can erode the culture"),
      v("trickle down", "lan tỏa xuống", "profits should trickle down to locals"),
    ],
    grammar: ["Contrast (on one hand... on the other)", "Relative clause (heritage that might fade)", "Gerund lists (spreading / capping / making sure)"],
  },
  {
    theme: "Media & Advertising",
    questions: [
      "Do you think advertising influences what people buy?",
      "Is there too much advertising in modern life?",
      "Should advertising aimed at children be banned?",
      "How has online advertising changed marketing?",
      "Can we always trust what we see in the news?",
    ],
    sample: {
      q: "Do you think advertising influences what people buy?",
      8: "Absolutely — I'd say its influence is far more powerful than most of us care to admit. Advertisers are incredibly savvy; they don't just sell a product, they sell a lifestyle or an emotion, tapping into our insecurities and desires. Take social media influencers, for instance — they've completely blurred the line between genuine recommendation and paid promotion, which makes it even harder to resist. That said, I do think people are gradually becoming more discerning and a bit more sceptical of the hard sell. So while advertising undeniably shapes our choices, I'd like to think we're not entirely at its mercy.",
    },
    vocab: [
      v("savvy", "tinh ranh, hiểu biết", "advertisers are savvy"),
      v("tap into", "khai thác", "they tap into our desires"),
      v("blur the line", "làm mờ ranh giới", "influencers blur the line"),
      v("discerning", "biết phân biệt", "people are more discerning"),
      v("the hard sell", "chiêu bán hàng dồn dập", "sceptical of the hard sell"),
    ],
    grammar: ["Comparative (more powerful than)", "Present perfect (have blurred)", "Concession (that said / while advertising...)"],
  },
  {
    theme: "Cities vs Countryside",
    questions: [
      "Why do so many people move to big cities?",
      "What are the advantages of living in the countryside?",
      "Do you think city life is more stressful than rural life?",
      "How can governments make cities better places to live?",
      "Will more people live in the countryside in the future?",
    ],
    sample: {
      q: "Why do so many people move to big cities?",
      8: "The main pull is opportunity, plain and simple. Cities are where the jobs are, where the best universities and hospitals tend to be, and where you'll find a real buzz of culture and entertainment. For young people especially, the bright lights of the city are hard to resist. That said, this mass migration comes at a cost — it puts enormous strain on housing and infrastructure, and it can leave rural areas feeling hollowed out as the young drain away. So while the appeal is completely understandable, I do think governments need to work harder to make smaller towns viable alternatives.",
    },
    vocab: [
      v("the pull / appeal", "sức hút", "the main pull is opportunity"),
      v("a buzz of culture", "không khí văn hóa sôi động", "a real buzz of culture"),
      v("put strain on", "gây áp lực lên", "it puts strain on housing"),
      v("hollowed out", "bị rút ruột, trống rỗng", "rural areas feel hollowed out"),
      v("viable alternative", "lựa chọn khả thi", "make towns viable alternatives"),
    ],
    grammar: ["Cause/effect (it puts strain on... / it can leave...)", "Concession (that said / while the appeal...)", "Superlative (the best universities)"],
  },
  {
    theme: "Tradition vs Modernity",
    questions: [
      "Is it important to preserve old traditions?",
      "Do you think globalisation is a threat to local cultures?",
      "Should young people be encouraged to follow traditions?",
      "How have festivals and celebrations changed over time?",
      "Can tradition and modern life exist together?",
    ],
    sample: {
      q: "Do you think globalisation is a threat to local cultures?",
      8: "It's a bit of a paradox, to be honest. On one hand, globalisation can absolutely dilute local cultures — you walk into any major city now and you're greeted by the same chains and the same trends, so there's a real risk of everything becoming homogenised. On the other hand, I'd argue it can also breathe new life into traditions by giving them a global audience; think of how Vietnamese cuisine or K-pop have taken the world by storm. So rather than seeing it purely as a threat, I'd say the challenge is to embrace the best of the modern world while fiercely protecting what makes each culture unique.",
    },
    vocab: [
      v("dilute", "làm phai nhạt", "globalisation can dilute cultures"),
      v("homogenised", "đồng nhất hóa", "everything becoming homogenised"),
      v("breathe new life into", "thổi sức sống mới", "breathe new life into traditions"),
      v("take the world by storm", "gây bão toàn cầu", "K-pop took the world by storm"),
      v("fiercely protect", "bảo vệ quyết liệt", "fiercely protecting our culture"),
    ],
    grammar: ["Contrast (on one hand... on the other)", "Present perfect (have taken the world by storm)", "Concession (rather than... I'd say)"],
  },
];

/* expose to app.js */
const DATA = { BAND_DESCRIPTORS, PART1, PART2, PART3 };
