import { readFileSync, writeFileSync } from "fs";

const path = "data/restaurants.json";
const data = JSON.parse(readFileSync(path, "utf8"));

const newRestaurants = [
  {
    id: "soranoiro-artisan",
    name: { ja: "ソラノイロ ARTISAN", en: "Soranoiro ARTISAN" },
    tagline: { en: "Japan's vegan ramen pioneer — colourful, plant-powered bowls" },
    description: {
      ja: "日本のヴィーガンラーメンの先駆者。パプリカを練り込んだ麺と、野菜だけのスープで作る「野菜ソバ」が代表作。健康志向の旅行者やベジタリアンに大人気。グルテンフリーオプション有り。",
      en: "A pioneer of vegan ramen in Japan. Their signature 'Vegan Veggie Soba' features noodles kneaded with paprika and a rich soup made entirely from vegetables. Perfect for health-conscious travellers and vegetarians. Gluten-free options available.",
    },
    tags: ["Vegan", "Vegetarian", "Gluten-Free Option", "English Menu"],
    area: "Kojimachi",
    address: "2-1 Kojimachi, Chiyoda, Tokyo 102-0083",
    hours: "11:00 – 22:00",
    closed: "Sundays",
    nearestStation: "Kojimachi Station — 1 min walk (Exit 1, Yurakucho Line)",
    heroImage: "https://picsum.photos/seed/soranoiro-hero/1200/600",
    images: [
      "https://picsum.photos/seed/soranoiro-1/800/600",
      "https://picsum.photos/seed/soranoiro-2/800/600",
      "https://picsum.photos/seed/soranoiro-3/800/600",
    ],
    rating: 4.5,
    reviewCount: 1432,
    priceRange: "¥1,000 – ¥1,500",
    features: {
      ticketMachine: true,
      englishMenu: true,
      vegOptions: true,
      halalFriendly: false,
      wifi: true,
      creditCard: true,
      soloCounter: false,
      noPork: true,
      noAlcohol: false,
    },
    languages: ["English"],
    menu: [
      {
        id: "vegan-veggie-soba",
        name: { ja: "野菜ソバ（ヴィーガン）", en: "Vegan Veggie Soba" },
        price: 1200,
        description:
          "Paprika-kneaded noodles in a rich all-vegetable broth, topped with seasonal vegetables and herbs. Signature dish.",
        image: "https://picsum.photos/seed/veggie-soba/400/300",
        tags: ["Vegan", "Signature"],
      },
      {
        id: "tofu-shio",
        name: { ja: "豆腐塩ラーメン", en: "Tofu Shio Ramen" },
        price: 1100,
        description:
          "Delicate sea salt broth with silken tofu, kombu dashi, and green onions.",
        image: "https://picsum.photos/seed/tofu-shio/400/300",
        tags: ["Vegan", "Shio", "Light"],
      },
    ],
    ticketMachineGuide: {
      steps: [
        {
          step: 1,
          en: "Select the 'Vegan' category from the top menu on the machine screen. The machine has full English support.",
          ja: "機械の画面でヴィーガンカテゴリを選択（英語対応）",
        },
        {
          step: 2,
          en: "Choose your favourite toppings from the add-on screen.",
          ja: "トッピングを選択してください",
        },
        {
          step: 3,
          en: "Insert cash or tap your IC card (Suica / Pasmo).",
          ja: "現金またはICカードで支払い",
        },
        {
          step: 4,
          en: "Hand the printed ticket to the staff when seated.",
          ja: "着席後、食券を店員に渡す",
        },
      ],
    },
  },
  {
    id: "kikanbo",
    name: { ja: "カラシビ味噌らー麺 鬼金棒", en: "Kikanbo" },
    tagline: { en: "Karashibi — fiery chilli meets Sichuan numbing pepper" },
    description: {
      ja: "「辛さ」と「しびれ」の2種類のレベルをカスタマイズできる名物カラシビ味噌らー麺。鬼をテーマにした個性的な内装も人気。辛さとしびれの組み合わせを事前にリサーチして行くのがおすすめ。",
      en: "Famous for 'Karashibi' — a dual-fire combination of chilli heat (Kara) and Szechuan numbing pepper (Shibi). Customise both levels independently. The demon-themed interior makes for a memorable dining experience.",
    },
    tags: ["Spicy", "Ticket Machine", "Miso", "Unique Theme"],
    area: "Kanda",
    address: "1-8 Kanda-Ogawamachi, Chiyoda, Tokyo 101-0052",
    hours: "11:00 – 21:30 (weekdays) / 11:00 – 20:00 (weekends)",
    closed: "Open every day",
    nearestStation: "Ogawamachi Station — 3 min walk (Exit A5)",
    heroImage: "https://picsum.photos/seed/kikanbo-hero/1200/600",
    images: [
      "https://picsum.photos/seed/kikanbo-1/800/600",
      "https://picsum.photos/seed/kikanbo-2/800/600",
      "https://picsum.photos/seed/kikanbo-3/800/600",
    ],
    rating: 4.4,
    reviewCount: 2203,
    priceRange: "¥1,000 – ¥1,400",
    features: {
      ticketMachine: true,
      englishMenu: true,
      vegOptions: false,
      halalFriendly: false,
      wifi: false,
      creditCard: false,
      soloCounter: true,
      noPork: false,
      noAlcohol: false,
    },
    languages: ["English"],
    menu: [
      {
        id: "karashibi-miso",
        name: { ja: "カラシビ味噌らー麺", en: "Karashibi Miso Ramen" },
        price: 1100,
        description:
          "Rich miso broth with dual spice: Kara (chilli heat) and Shibi (Szechuan numbing). Choose your level of each independently.",
        image: "https://picsum.photos/seed/karashibi/400/300",
        tags: ["Spicy", "Miso", "Signature"],
      },
    ],
    ticketMachineGuide: {
      steps: [
        {
          step: 1,
          en: "Buy your ticket at the machine outside the restaurant — there may be a queue before you enter.",
          ja: "まず店外の券売機でチケットを購入（入店前）",
        },
        {
          step: 2,
          en: "Enter the shop and give the ticket to the staff when seated. English labels are on the buttons.",
          ja: "入店後、着席したら店員に食券を渡す",
        },
        {
          step: 3,
          en: "Staff will ask for your 'Kara' (辛さ, chilli) and 'Shibi' (しびれ, numbing) levels: Low (少なめ) / Medium (普通) / High (多め).",
          ja: "辛さとしびれのレベルを伝えてください",
        },
      ],
    },
  },
  {
    id: "rokurinsha",
    name: { ja: "六厘舎", en: "Rokurinsha" },
    tagline: { en: "The tsukemen legend — inside Tokyo Station itself" },
    description: {
      ja: "東京駅一番街地下1階「東京ラーメンストリート」に位置する、濃厚魚介豚骨つけ麺の名店。行列必至だが回転が速い。東京観光とセットで立ち寄れる。",
      en: "Located in 'Tokyo Ramen Street' (Tokyo Station B1F). This shop helped define the thick-soup Tsukemen style beloved across Japan. Expect a queue — it moves fast. A true Tokyo landmark perfectly combined with sightseeing.",
    },
    tags: ["Tsukemen", "Seafood Broth", "Ticket Machine", "Popular"],
    area: "Tokyo Station (Marunouchi)",
    address:
      "Tokyo Station B1F Tokyo Ramen Street, 1-9-1 Marunouchi, Chiyoda, Tokyo 100-0005",
    hours: "07:30 – 10:00 (breakfast) / 11:00 – 23:00",
    closed: "Open every day (follows Tokyo Station hours)",
    nearestStation: "Tokyo Station — directly inside (Yaesu South Exit B1F)",
    heroImage: "https://picsum.photos/seed/rokurinsha-hero/1200/600",
    images: [
      "https://picsum.photos/seed/rokurinsha-1/800/600",
      "https://picsum.photos/seed/rokurinsha-2/800/600",
      "https://picsum.photos/seed/rokurinsha-3/800/600",
    ],
    rating: 4.6,
    reviewCount: 5412,
    priceRange: "¥950 – ¥1,400",
    features: {
      ticketMachine: true,
      englishMenu: true,
      vegOptions: false,
      halalFriendly: false,
      wifi: true,
      creditCard: true,
      soloCounter: true,
      noPork: false,
      noAlcohol: false,
    },
    languages: ["English", "Chinese"],
    menu: [
      {
        id: "tsukemen",
        name: { ja: "つけ麺", en: "Tsukemen (Dipping Ramen)" },
        price: 1000,
        description:
          "Thick wavy noodles + rich fish-pork dipping broth. Regular / Large / Extra Large at the same price.",
        image: "https://picsum.photos/seed/rokurinsha-tsuke/400/300",
        tags: ["Tsukemen", "Signature", "Seafood Broth"],
      },
    ],
    ticketMachineGuide: {
      steps: [
        {
          step: 1,
          en: "Line up in the queue — staff will guide you toward the machine when you are near the front.",
          ja: "行列に並ぶと、スタッフが券売機へ案内してくれます",
        },
        {
          step: 2,
          en: "Use the touch-screen machine — it has an English language option. Select your noodle size and toppings.",
          ja: "タッチパネル式（英語選択可）。麺量とトッピングを選択",
        },
        {
          step: 3,
          en: "Once seated, place your ticket face-up on the counter in front of you.",
          ja: "着席後、食券を目の前のカウンターに表向きに置く",
        },
        {
          step: 4,
          en: "When finished, ask for 'soup-wari' (スープ割り) — staff add hot dashi to your remaining broth for a finishing soup.",
          ja: "食べ終わったら「スープ割りください」と声をかける",
        },
      ],
    },
  },
  {
    id: "kanda-katsumoto",
    name: { ja: "神田 勝本", en: "Kanda Katsumoto" },
    tagline: { en: "Refined Chuka Soba — two noodle types, one elegant bowl" },
    description: {
      ja: "伝統と洗練が融合した中華そばの名店。2種類の麺が一つの丼に盛られる独自のスタイルと、上品な煮干し出汁が特徴。静かで禅を感じる雰囲気。神保町の隠れた名店。",
      en: "Elegant and traditional. Their signature bowl serves two types of noodles side by side in a refined niboshi (dried sardine) broth. Staff wear traditional attire. A calm, Zen-like atmosphere unlike any other ramen shop.",
    },
    tags: ["Traditional", "Shoyu", "Solo Counter", "Sophisticated"],
    area: "Jinbocho",
    address: "3-6 Kanda-Jimbocho, Chiyoda, Tokyo 101-0051",
    hours: "11:00 – 15:00 / 18:00 – 21:00",
    closed: "Sundays",
    nearestStation: "Jimbocho Station — 5 min walk (Exit A2)",
    heroImage: "https://picsum.photos/seed/katsumoto-hero/1200/600",
    images: [
      "https://picsum.photos/seed/katsumoto-1/800/600",
      "https://picsum.photos/seed/katsumoto-2/800/600",
      "https://picsum.photos/seed/katsumoto-3/800/600",
    ],
    rating: 4.6,
    reviewCount: 1873,
    priceRange: "¥1,000 – ¥1,500",
    features: {
      ticketMachine: true,
      englishMenu: false,
      vegOptions: false,
      halalFriendly: false,
      wifi: false,
      creditCard: false,
      soloCounter: true,
      noPork: false,
      noAlcohol: false,
    },
    languages: [],
    menu: [
      {
        id: "chuka-soba",
        name: { ja: "中華そば", en: "Chuka Soba" },
        price: 1050,
        description:
          "Two types of noodles — thick and thin — in one bowl, with a refined niboshi-shoyu broth.",
        image: "https://picsum.photos/seed/chuka-soba/400/300",
        tags: ["Shoyu", "Signature", "Traditional"],
      },
      {
        id: "ajitama-chuka",
        name: { ja: "味玉中華そば", en: "Chuka Soba with Marinated Egg" },
        price: 1150,
        description:
          "The signature bowl topped with a soy-marinated soft-boiled egg.",
        image: "https://picsum.photos/seed/ajitama-chuka/400/300",
        tags: ["Shoyu", "Popular"],
      },
    ],
    ticketMachineGuide: {
      steps: [
        {
          step: 1,
          en: "Purchase your ticket at the machine near the entrance. Basic English labels are available.",
          ja: "入口近くの券売機でチケットを購入（英語ラベルあり）",
        },
        {
          step: 2,
          en: "Staff in traditional uniform will show you to your seat. Enjoy the calm atmosphere.",
          ja: "和装のスタッフが席に案内してくれます",
        },
        {
          step: 3,
          en: "Place your ticket on the small tray in front of you — staff will collect it.",
          ja: "食券を手前のトレーに置いてください",
        },
        {
          step: 4,
          en: "When finishing, say 'Gochisou-sama' (ごちそうさま) to thank the chef — a beloved Japanese custom.",
          ja: "食べ終わったら「ごちそうさまでした」と伝えましょう",
        },
      ],
    },
  },
  {
    id: "menya-musashi",
    name: { ja: "麺屋 武蔵 武骨外伝", en: "Menya Musashi Bukotsu Gaiden" },
    tagline: {
      en: "Samurai-themed ramen — legendary kakuni pork belly in Akihabara",
    },
    description: {
      ja: "サムライをテーマにした個性的な内装で知られる濃厚醤油らーめん店。とろとろに煮込んだ大きな角煮が名物。肉好きには外せない一軒。秋葉原の人気ラーメン店のひとつ。",
      en: "Known for the huge, melt-in-your-mouth Kakuni (braised pork belly) topping. The interior is decorated with Samurai-themed art — dramatic and memorable. A must-visit for meat lovers exploring Akihabara.",
    },
    tags: ["Shoyu", "Solo Counter", "Ticket Machine", "Thick Soup"],
    area: "Akihabara",
    address: "3-9 Soto-Kanda, Chiyoda, Tokyo 101-0021",
    hours: "11:00 – 22:00",
    closed: "Open every day",
    nearestStation: "Akihabara Station — 5 min walk (Electric Town Exit)",
    heroImage: "https://picsum.photos/seed/musashi-hero/1200/600",
    images: [
      "https://picsum.photos/seed/musashi-1/800/600",
      "https://picsum.photos/seed/musashi-2/800/600",
      "https://picsum.photos/seed/musashi-3/800/600",
    ],
    rating: 4.3,
    reviewCount: 1654,
    priceRange: "¥1,000 – ¥1,600",
    features: {
      ticketMachine: true,
      englishMenu: false,
      vegOptions: false,
      halalFriendly: false,
      wifi: false,
      creditCard: false,
      soloCounter: true,
      noPork: false,
      noAlcohol: false,
    },
    languages: [],
    menu: [
      {
        id: "bukotsu-soba",
        name: { ja: "武骨らーめん", en: "Bukotsu Ramen" },
        price: 1100,
        description:
          "Rich shoyu broth with thick wavy noodles and a substantial braised pork-belly kakuni.",
        image: "https://picsum.photos/seed/bukotsu/400/300",
        tags: ["Shoyu", "Signature", "Rich"],
      },
      {
        id: "kakuni-ramen",
        name: { ja: "角煮らーめん", en: "Kakuni Ramen (Triple Pork Belly)" },
        price: 1500,
        description:
          "Three pieces of melt-in-your-mouth braised pork belly on a rich shoyu base. For serious meat lovers.",
        image: "https://picsum.photos/seed/kakuni-ramen/400/300",
        tags: ["Shoyu", "Pork", "Indulgent"],
      },
    ],
    ticketMachineGuide: {
      steps: [
        {
          step: 1,
          en: "Check the photo buttons on the machine screen to identify your bowl.",
          ja: "機械の画面で写真を確認してください",
        },
        {
          step: 2,
          en: "Regular, Large, and Extra Large noodles are often the same price — choose freely.",
          ja: "並・大・特大は同料金のことが多いです",
        },
        {
          step: 3,
          en: "Select your size and any toppings, then pay. The machine accepts coins and ¥1,000 notes.",
          ja: "麺量とトッピングを選んでお支払い（硬貨・千円札対応）",
        },
      ],
    },
  },
];

data.push(...newRestaurants);
writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Total restaurants:", data.length);
newRestaurants.forEach((r) => console.log(" +", r.id));
