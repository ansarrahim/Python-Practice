/*
 * Umikoe — shared site engine used by all four demos.
 *
 * - EN / 日本語 switching for every [data-i18n] element (remembered per visitor)
 * - Product catalogue: filter chips, search, details dialog, "ask about this"
 * - Sourcing-request form: validation, real sending (set FORM_ENDPOINT), success state
 * - Mobile menu, sticky header, active nav link, scroll reveal
 *
 * Going live: set FORM_ENDPOINT to a Formspree / Web3Forms / own-backend URL.
 * While it is empty the form runs in demo mode and nothing leaves the browser.
 */
(function () {
  'use strict';

  var FORM_ENDPOINT = ''; // e.g. 'https://formspree.io/f/xxxxxxx'
  var CONTACT_EMAIL = 'info@sd-c.net';

  /* ------------------------------------------------------------------ */
  /* Copy: English and Japanese                                          */
  /* ------------------------------------------------------------------ */
  var I18N = {
    en: {
      'meta.title': 'Umikoe — Japan trade desk',
      'demo.banner': 'Design demo for discussion — not a live website yet.',
      'brand.sub': 'Japan trade desk',
      'menu': 'Menu',
      'nav.products': 'Products',
      'nav.deliver': 'What we deliver',
      'nav.how': 'How it works',
      'nav.markets': 'Markets',
      'nav.about': 'About',
      'nav.faq': 'FAQ',
      'nav.contact': 'Contact',
      'nav.cta': 'Send a request',

      'hero.eyebrow': 'Japan trade desk · Ginza, Tokyo',
      'hero.title': 'From Japan’s makers, across the sea to your market.',
      'hero.lead': 'Umikoe connects overseas importers and distributors with trusted Japanese makers, and handles the conversation in English and Japanese from first request to first order.',
      'hero.cta1': 'Send a sourcing request',
      'hero.cta2': 'See what we source',
      'hero.quick': 'Quick start',
      'hero.quick.product': 'I am looking for',
      'hero.quick.market': 'To sell in',
      'hero.quick.go': 'Start my request',

      'fact.1.n': '6', 'fact.1.l': 'product groups ready today',
      'fact.2.n': '2', 'fact.2.l': 'languages: English and Japanese',
      'fact.3.n': '4', 'fact.3.l': 'starting markets',
      'fact.4.n': '1', 'fact.4.l': 'contact, from first message to delivery',

      'does.1.t': 'We source',
      'does.1.p': 'We find Japanese makers that fit what you need, through our own relationships with companies across Japan.',
      'does.2.t': 'We connect',
      'does.2.p': 'We introduce you, share product details and samples, and help both sides agree on price, quantity and terms.',
      'does.3.t': 'We support',
      'does.3.p': 'We speak English and Japanese, so nothing gets lost between you and the maker.',

      'products.title': 'What we can source today',
      'products.sub': 'Six groups of products from makers we know directly. Looking for something else from Japan? Ask us.',
      'filter.all': 'All',
      'filter.easy': 'Easy to ship',
      'filter.gift': 'Gift market',
      'filter.rules': 'Import rules vary',
      'filter.business': 'Business buyers',
      'search.ph': 'Search products…',
      'search.label': 'Search products',
      'search.none': 'Nothing matches yet. Ask us anyway — we may still find it in Japan.',
      'product.more': 'Details',
      'product.ask': 'Ask about this group',
      'modal.close': 'Close',
      'modal.goodfor': 'Good for',
      'modal.ship': 'Shipping notes',

      'p.snacks.n': 'Furikake, snacks & nuts',
      'p.snacks.d': 'Rice seasoning and mixed nuts with a long shelf life. A simple first order for grocery and specialty food buyers.',
      'p.snacks.g': 'Grocery stores, specialty food shops, online food retailers',
      'p.snacks.s': 'A long shelf life makes this one of the simplest groups to ship.',
      'p.sweets.n': 'Japanese sweets & gelato',
      'p.sweets.d': 'Traditional and modern confectionery for gifting and premium retail. Gelato ships frozen.',
      'p.sweets.g': 'Gift shops, department stores, premium retail, cafés',
      'p.sweets.s': 'Most sweets travel easily. Gelato needs frozen shipping, which we plan with the maker and the forwarder.',
      'p.rice.n': 'Rice & premium meat',
      'p.rice.d': 'Japanese rice and meat for restaurants and gourmet retailers. Some markets ask for certificates such as Halal.',
      'p.rice.g': 'Restaurants, hotels, gourmet retailers',
      'p.rice.s': 'Rules differ by country. We check which certificates your market needs before you order.',
      'p.bath.n': 'Bath goods',
      'p.bath.d': 'Products from Japan’s bathing culture, for beauty and lifestyle distributors.',
      'p.bath.g': 'Beauty and lifestyle distributors, spas, gift shops',
      'p.bath.s': 'Easy to ship.',
      'p.leather.n': 'Leather goods',
      'p.leather.d': 'Japanese-made leather products for fashion and gift retailers.',
      'p.leather.g': 'Fashion boutiques, gift retailers, department stores',
      'p.leather.s': 'Easy to ship.',
      'p.auto.n': 'Automotive',
      'p.auto.d': 'Titanium parts and car cleaning products for parts distributors, workshops and car care shops.',
      'p.auto.g': 'Parts distributors, workshops, car care shops',
      'p.auto.s': 'For business buyers. We confirm specifications and quantities with the maker.',

      'deliver.title': 'What we can deliver',
      'deliver.sub': 'We work with companies in Japan that we know directly. That is why we can move fast and give you clear answers.',
      'conn.title': 'Our connections in Japan',
      'conn.1': 'Makers we know directly in food, bath goods, leather and automotive products',
      'conn.2': 'A wide network of small and medium companies across Japan',
      'conn.3': 'A team in Tokyo that can meet makers in person',
      'dl.1.t': 'Direct introduction to the maker',
      'dl.1.s': 'We know the companies ourselves, so you reach the right person quickly.',
      'dl.2.t': 'Product details in English',
      'dl.2.s': 'Specifications, photos, prices and minimum order, translated for you.',
      'dl.3.t': 'Samples before you order',
      'dl.3.s': 'Check the quality yourself before you decide.',
      'dl.4.t': 'A clear quote',
      'dl.4.s': 'Price, quantity and delivery time, agreed in writing.',
      'dl.5.t': 'Shipping support',
      'dl.5.s': 'We coordinate with the maker and the freight forwarder until the goods leave Japan.',
      'dl.6.t': 'One contact in English',
      'dl.6.s': 'The same person from your first message to delivery, and for your next order.',

      'how.title': 'How it works',
      'how.sub': 'Most first orders start small, so both sides can check quality and fit before they grow.',
      'step.1.t': 'Tell us what you need',
      'step.1.p': 'Product, target market, rough quantity and price range.',
      'step.2.t': 'We find the makers',
      'step.2.p': 'We shortlist Japanese companies that match and confirm they can export.',
      'step.3.t': 'Samples and terms',
      'step.3.p': 'You review details and samples. We help agree price, quantity and timing.',
      'step.4.t': 'Order and shipping',
      'step.4.p': 'The maker ships through a freight forwarder. We stay in touch with both sides.',

      'markets.title': 'Where we are starting',
      'markets.sub': 'Our first buyers are in four markets. Buyers anywhere else are welcome to ask.',
      'markets.from': 'From Tokyo',
      'markets.pick': 'Pick a market to see what to expect.',
      'market.uae': 'UAE',
      'market.uae.note': 'Food buyers usually need Halal certificates. We confirm these with the maker first.',
      'market.pk': 'Pakistan',
      'market.pk.note': 'Halal certificates are often needed for food. We confirm the documents before you order.',
      'market.ca': 'Canada',
      'market.ca.note': 'Food imports have their own labelling and safety rules. We check the requirements with the maker.',
      'market.au': 'Australia',
      'market.au.note': 'Strict biosecurity rules apply to food. Non-food goods are a simpler place to start.',
      'market.other': 'Somewhere else',

      'faq.title': 'Questions buyers ask',
      'faq.1.q': 'Is there a minimum order?',
      'faq.1.a': 'It depends on the maker. We put the minimum order in every quote, and most first orders start small.',
      'faq.2.q': 'Can I get samples first?',
      'faq.2.a': 'Yes. You can check samples before you decide to order.',
      'faq.3.q': 'Who handles shipping?',
      'faq.3.a': 'The maker ships through a freight forwarder. We coordinate with both until the goods leave Japan.',
      'faq.4.q': 'My product is not listed. Can you still help?',
      'faq.4.a': 'Yes. Tell us what you are looking for and we will check our network across Japan.',

      'story.title': 'Umikoe means “across the sea.”',
      'story.say': 'Say it like this: oo-mee-ko-eh.',
      'story.p1': 'Many good Japanese makers have never sold outside Japan. Many overseas buyers cannot reach them, because language, business customs and distance get in the way.',
      'story.p2': 'We stand in the middle and carry the conversation across. We are starting with buyers in the UAE, Pakistan, Canada and Australia.',
      'story.p3': 'Umikoe is a service of Social Design Collective LLC, based in Ginza, Tokyo.',

      'contact.title': 'Send a sourcing request',
      'contact.sub': 'Tell us what you are looking for. We reply in English with suitable Japanese makers, or with questions to narrow it down.',
      'contact.org': 'Umikoe, by Social Design Collective LLC',
      'contact.addr': 'N&E BLD. 6F, 1-12-4 Ginza, Chuo-ku, Tokyo',

      'form.name': 'Your name',
      'form.company': 'Company',
      'form.country': 'Country',
      'form.email': 'Email',
      'form.product': 'Product group',
      'form.other': 'Something else',
      'form.message': 'What are you looking for?',
      'form.message.ph': 'Product, quantity, target price, timing',
      'form.optional': 'optional',
      'form.submit': 'Send request',
      'form.sending': 'Sending…',
      'form.note': 'Demo form: nothing is sent until the live inbox is connected.',
      'form.privacy': 'We only use your details to reply to this request.',
      'form.ok.t': 'Request received',
      'form.ok': 'Thank you, {name}. We will reply in English to {email}.',
      'form.again': 'Send another request',
      'form.fail': 'Something went wrong. Please email us at {email}.',
      'err.required': 'Please fill this in.',
      'err.email': 'Please enter a valid email address.',
      'err.message': 'Tell us a little more (at least 10 characters).',
      'wiz.1': 'About you',
      'wiz.2': 'Product',
      'wiz.3': 'Review',
      'wiz.next': 'Next',
      'wiz.back': 'Back',
      'wiz.step': 'Step {n} of 3',
      'wiz.review': 'Check your request',
      'wiz.edit': 'Edit',

      'footer.tag': 'Japanese products, across the sea.',
      'footer.by': 'A service of Social Design Collective LLC, Tokyo',
      'footer.top': 'Back to top'
    },

    ja: {
      'meta.title': 'Umikoe（うみこえ）— ジャパン・トレードデスク',
      'demo.banner': '打ち合わせ用のデザインデモです。まだ公開サイトではありません。',
      'brand.sub': 'ジャパン・トレードデスク',
      'menu': 'メニュー',
      'nav.products': '取扱商品',
      'nav.deliver': '提供内容',
      'nav.how': 'ご利用の流れ',
      'nav.markets': '対象市場',
      'nav.about': '私たちについて',
      'nav.faq': 'よくある質問',
      'nav.contact': 'お問い合わせ',
      'nav.cta': 'リクエストを送る',

      'hero.eyebrow': 'ジャパン・トレードデスク · 東京・銀座',
      'hero.title': '日本のつくり手から、海を越えてあなたの市場へ。',
      'hero.lead': 'Umikoeは、海外の輸入業者・販売代理店と信頼できる日本のメーカーをつなぎ、最初のお問い合わせから初回発注まで、英語と日本語でのやり取りを担います。',
      'hero.cta1': '調達リクエストを送る',
      'hero.cta2': '取扱商品を見る',
      'hero.quick': 'かんたんスタート',
      'hero.quick.product': 'お探しの商品',
      'hero.quick.market': '販売する市場',
      'hero.quick.go': 'リクエストを始める',

      'fact.1.n': '6', 'fact.1.l': 'すぐにご紹介できる商品カテゴリー',
      'fact.2.n': '2', 'fact.2.l': '対応言語（英語・日本語）',
      'fact.3.n': '4', 'fact.3.l': '最初の対象市場',
      'fact.4.n': '1', 'fact.4.l': '最初のご連絡から納品まで同じ担当者',

      'does.1.t': '探す',
      'does.1.p': '日本各地の企業との独自のつながりを通じて、ご要望に合う日本のメーカーを見つけます。',
      'does.2.t': 'つなぐ',
      'does.2.p': 'メーカーをご紹介し、商品情報やサンプルを共有。価格・数量・条件の合意までお手伝いします。',
      'does.3.t': '支える',
      'does.3.p': '英語と日本語の両方に対応。あなたとメーカーの間で、何ひとつ取りこぼしません。',

      'products.title': '現在お取り扱いできる商品',
      'products.sub': '直接つながりのあるメーカーの6つの商品カテゴリー。その他の日本製品をお探しの場合も、お気軽にご相談ください。',
      'filter.all': 'すべて',
      'filter.easy': '輸送しやすい',
      'filter.gift': 'ギフト向け',
      'filter.rules': '輸入規制は国により異なる',
      'filter.business': '法人向け',
      'search.ph': '商品を検索…',
      'search.label': '商品を検索',
      'search.none': '該当する商品がありません。それでもお気軽にご相談ください。日本国内で見つかるかもしれません。',
      'product.more': '詳しく見る',
      'product.ask': 'このカテゴリーについて問い合わせる',
      'modal.close': '閉じる',
      'modal.goodfor': 'おすすめの販売先',
      'modal.ship': '輸送について',

      'p.snacks.n': 'ふりかけ・スナック・ナッツ',
      'p.snacks.d': '賞味期限の長いふりかけやミックスナッツ。食料品店や専門食品のバイヤー様の初回発注に最適です。',
      'p.snacks.g': '食料品店、専門食品店、食品ECサイト',
      'p.snacks.s': '賞味期限が長く、最も輸送しやすいカテゴリーのひとつです。',
      'p.sweets.n': '和菓子・ジェラート',
      'p.sweets.d': 'ギフトや高級小売向けの、伝統的な菓子とモダンな菓子。ジェラートは冷凍で輸送します。',
      'p.sweets.g': 'ギフトショップ、百貨店、高級小売店、カフェ',
      'p.sweets.s': '多くの菓子は輸送しやすい商品です。ジェラートは冷凍輸送が必要なため、メーカーやフォワーダーと事前に調整します。',
      'p.rice.n': '米・高級食肉',
      'p.rice.d': 'レストランや高級食料品店向けの日本米と食肉。市場によってはハラール認証などの証明書が必要です。',
      'p.rice.g': 'レストラン、ホテル、高級食料品店',
      'p.rice.s': '規制は国ごとに異なります。ご発注前に、販売市場で必要な証明書を確認します。',
      'p.bath.n': 'バス用品',
      'p.bath.d': '日本の入浴文化から生まれた商品を、美容・ライフスタイル系の販売代理店へ。',
      'p.bath.g': '美容・ライフスタイル系代理店、スパ、ギフトショップ',
      'p.bath.s': '輸送しやすい商品です。',
      'p.leather.n': '革製品',
      'p.leather.d': 'ファッション・ギフト小売向けの日本製レザー製品。',
      'p.leather.g': 'ファッションブティック、ギフト小売店、百貨店',
      'p.leather.s': '輸送しやすい商品です。',
      'p.auto.n': '自動車関連',
      'p.auto.d': '部品販売代理店、整備工場、カーケアショップ向けのチタン部品や洗車用品。',
      'p.auto.g': '部品代理店、整備工場、カーケアショップ',
      'p.auto.s': '法人のお客様向けです。仕様と数量はメーカーと確認します。',

      'deliver.title': '私たちにできること',
      'deliver.sub': '直接つながりのある日本企業と取引しているから、スピーディーに明確な回答をお届けできます。',
      'conn.title': '日本でのネットワーク',
      'conn.1': '食品、バス用品、革製品、自動車関連の、直接取引のあるメーカー',
      'conn.2': '日本全国の中小企業との幅広いネットワーク',
      'conn.3': 'メーカーと直接会える東京のチーム',
      'dl.1.t': 'メーカーへの直接のご紹介',
      'dl.1.s': '私たち自身が企業を知っているから、適切な担当者にすぐつながります。',
      'dl.2.t': '英語での商品情報',
      'dl.2.s': '仕様、写真、価格、最小発注数量を翻訳してお届けします。',
      'dl.3.t': '発注前のサンプル',
      'dl.3.s': 'ご判断の前に、品質をご自身でご確認いただけます。',
      'dl.4.t': '明確なお見積もり',
      'dl.4.s': '価格・数量・納期を書面で合意します。',
      'dl.5.t': '輸送サポート',
      'dl.5.s': '商品が日本を出るまで、メーカーとフォワーダーとの調整を行います。',
      'dl.6.t': '英語対応の専任窓口',
      'dl.6.s': '最初のご連絡から納品まで、そして次のご注文も、同じ担当者が対応します。',

      'how.title': 'ご利用の流れ',
      'how.sub': '多くの初回発注は小ロットから。双方が品質と相性を確かめてから、取引を広げていきます。',
      'step.1.t': 'ご要望をお聞かせください',
      'step.1.p': '商品、販売市場、おおよその数量と価格帯。',
      'step.2.t': 'メーカーを探します',
      'step.2.p': '条件に合う日本企業を選定し、輸出が可能か確認します。',
      'step.3.t': 'サンプルと条件',
      'step.3.p': '商品情報とサンプルをご確認いただき、価格・数量・時期の合意をお手伝いします。',
      'step.4.t': '発注と輸送',
      'step.4.p': 'メーカーがフォワーダーを通じて出荷。私たちは双方と連絡を取り続けます。',

      'markets.title': '最初の対象市場',
      'markets.sub': 'まずは4つの市場のバイヤー様から始めています。その他の地域からのご相談も歓迎します。',
      'markets.from': '東京から',
      'markets.pick': '市場を選ぶと、注意点をご覧いただけます。',
      'market.uae': 'アラブ首長国連邦',
      'market.uae.note': '食品にはハラール認証が求められることが多いため、まずメーカーに確認します。',
      'market.pk': 'パキスタン',
      'market.pk.note': '食品にはハラール認証が必要な場合が多いため、ご発注前に必要書類を確認します。',
      'market.ca': 'カナダ',
      'market.ca.note': '食品の輸入には独自の表示・安全基準があります。要件をメーカーと確認します。',
      'market.au': 'オーストラリア',
      'market.au.note': '食品には厳しい検疫ルールがあります。食品以外の商品から始めるとスムーズです。',
      'market.other': 'その他の地域',

      'faq.title': 'よくある質問',
      'faq.1.q': '最小発注数量はありますか？',
      'faq.1.a': 'メーカーによって異なります。最小発注数量は必ずお見積もりに記載します。多くの初回発注は小ロットから始まります。',
      'faq.2.q': '先にサンプルをもらえますか？',
      'faq.2.a': 'はい。ご発注を決める前にサンプルをご確認いただけます。',
      'faq.3.q': '輸送は誰が担当しますか？',
      'faq.3.a': 'メーカーがフォワーダーを通じて出荷します。商品が日本を出るまで、私たちが双方と調整します。',
      'faq.4.q': '掲載されていない商品でも相談できますか？',
      'faq.4.a': 'はい。お探しの商品をお知らせいただければ、日本全国のネットワークで確認します。',

      'story.title': '「うみこえ」は「海を越えて」という意味です。',
      'story.say': '読み方：うみこえ（oo-mee-ko-eh）',
      'story.p1': '優れた日本のメーカーの多くは、まだ海外で販売したことがありません。そして多くの海外バイヤーは、言語や商習慣、距離の壁により、そうしたメーカーにたどり着けずにいます。',
      'story.p2': '私たちはその間に立ち、対話を海の向こうへ届けます。まずはUAE、パキスタン、カナダ、オーストラリアのバイヤー様から始めています。',
      'story.p3': 'Umikoeは、東京・銀座に拠点を置く Social Design Collective LLC のサービスです。',

      'contact.title': '調達リクエストを送る',
      'contact.sub': 'お探しの商品をお知らせください。適した日本のメーカー、または条件を絞り込むためのご質問を、英語でお返事します。',
      'contact.org': 'Umikoe（運営：Social Design Collective LLC）',
      'contact.addr': '東京都中央区銀座1-12-4 N&E BLD. 6F',

      'form.name': 'お名前',
      'form.company': '会社名',
      'form.country': '国',
      'form.email': 'メールアドレス',
      'form.product': '商品カテゴリー',
      'form.other': 'その他',
      'form.message': 'お探しの商品',
      'form.message.ph': '商品、数量、希望価格、時期など',
      'form.optional': '任意',
      'form.submit': 'リクエストを送信',
      'form.sending': '送信中…',
      'form.note': 'デモフォームです。受信先の設定が完了するまで送信されません。',
      'form.privacy': 'ご入力いただいた情報は、本リクエストへの返信にのみ使用します。',
      'form.ok.t': 'リクエストを受け付けました',
      'form.ok': '{name}様、ありがとうございます。{email} 宛にご連絡いたします。',
      'form.again': '別のリクエストを送る',
      'form.fail': '送信できませんでした。{email} までメールでご連絡ください。',
      'err.required': '入力してください。',
      'err.email': '正しいメールアドレスを入力してください。',
      'err.message': 'もう少し詳しくお書きください（10文字以上）。',
      'wiz.1': 'お客様情報',
      'wiz.2': '商品',
      'wiz.3': '確認',
      'wiz.next': '次へ',
      'wiz.back': '戻る',
      'wiz.step': 'ステップ {n} / 3',
      'wiz.review': '内容をご確認ください',
      'wiz.edit': '修正',

      'footer.tag': '日本の商品を、海の向こうへ。',
      'footer.by': 'Social Design Collective LLC（東京）のサービス',
      'footer.top': 'ページ上部へ'
    }
  };

  /* ------------------------------------------------------------------ */
  /* Products (illustrations are the "shipping container" tiles)         */
  /* ------------------------------------------------------------------ */
  var PRODUCTS = [
    { id: 'snacks', color: '#E8644A', tags: ['easy'],
      icon: '<svg viewBox="0 0 240 150" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M72 78 Q120 22 168 78"/><path d="M56 78 H184 Q180 116 144 124 H96 Q60 116 56 78 Z" fill="#FFFFFF"/><path d="M100 124 V134 H140 V124"/><path d="M104 60 l6 -5 M124 48 l7 3 M140 62 l5 -6 M118 66 l6 2 M96 72 l5 -3 M150 72 l4 -4" stroke-width="4"/><path d="M160 38 L212 16 M166 48 L216 30" stroke-width="4"/></svg>' },
    { id: 'sweets', color: '#F5B82E', tags: ['gift'],
      icon: '<svg viewBox="0 0 240 150" fill="none" stroke="#0E3A53" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M42 128 L112 34"/><circle cx="60" cy="104" r="17" fill="#FFFFFF"/><circle cx="80" cy="77" r="17" fill="#F8D9CF"/><circle cx="100" cy="50" r="17" fill="#CFE9D9"/><path d="M148 76 L172 134 L196 76 Z" fill="#FFFFFF"/><path d="M158 100 L186 100 M164 116 L180 116" stroke-width="3"/><circle cx="172" cy="56" r="26" fill="#FFFFFF"/></svg>' },
    { id: 'rice', color: '#3FA796', tags: ['rules'],
      icon: '<svg viewBox="0 0 240 150" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M120 22 Q134 22 142 36 L176 96 Q188 122 160 126 H80 Q52 122 64 96 L98 36 Q106 22 120 22 Z" fill="#FFFFFF"/><rect x="98" y="92" width="44" height="34" fill="#0E3A53" stroke="none"/></svg>' },
    { id: 'bath', color: '#1D7A9C', tags: ['easy'],
      icon: '<svg viewBox="0 0 240 150" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M70 72 H170 L160 130 H80 Z" fill="#FFFFFF"/><path d="M74 90 H166 M78 114 H162" stroke="#1D7A9C" stroke-width="4"/><path d="M96 56 q-9 -10 0 -20 q9 -10 0 -20 M120 56 q-9 -10 0 -20 q9 -10 0 -20 M144 56 q-9 -10 0 -20 q9 -10 0 -20" stroke-width="4"/></svg>' },
    { id: 'leather', color: '#0E3A53', tags: ['easy', 'gift'],
      icon: '<svg viewBox="0 0 240 150" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M94 58 Q94 24 120 24 Q146 24 146 58"/><rect x="62" y="58" width="116" height="72" rx="9" fill="#FFFFFF"/><path d="M62 68 Q120 112 178 68" stroke="#0E3A53" stroke-width="4"/><circle cx="120" cy="92" r="6" fill="#F5B82E" stroke="#0E3A53" stroke-width="3"/><path d="M74 120 H166" stroke="#0E3A53" stroke-width="2.5" stroke-dasharray="6 6"/></svg>' },
    { id: 'auto', color: '#9CCBD6', tags: ['business'],
      icon: '<svg viewBox="0 0 240 150" fill="none" stroke="#0E3A53" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="112" cy="78" r="50" fill="#0E3A53"/><circle cx="112" cy="78" r="33" fill="#FFFFFF"/><path d="M112 78 L112 45 M112 78 L143.4 67.8 M112 78 L131.4 104.7 M112 78 L92.6 104.7 M112 78 L80.6 67.8"/><circle cx="112" cy="78" r="8" fill="#F5B82E"/><path d="M196 26 v20 M186 36 h20 M206 70 v12 M200 76 h12" stroke-width="4"/></svg>' }
  ];
  var MARKETS = ['uae', 'pk', 'ca', 'au'];

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
  }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var U = window.Umikoe = {
    lang: 'en',
    products: PRODUCTS,
    markets: MARKETS,
    esc: esc,
    reduceMotion: reduceMotion,
    _langHooks: [],

    t: function (key, vars) {
      var s = (I18N[U.lang] && I18N[U.lang][key]);
      if (s == null) s = I18N.en[key];
      if (s == null) return key;
      if (vars) s = s.replace(/\{(\w+)\}/g, function (_, k) { return vars[k] != null ? vars[k] : ''; });
      return s;
    },

    /* Run fn now and again whenever the language changes. */
    onLang: function (fn) { U._langHooks.push(fn); fn(U.lang); },

    setLang: function (lang) {
      if (!I18N[lang]) return;
      U.lang = lang;
      document.documentElement.lang = lang;
      document.body.setAttribute('data-lang', lang);
      store('umikoe-lang', lang);
      $$('[data-i18n]').forEach(function (el) { el.textContent = U.t(el.getAttribute('data-i18n')); });
      $$('[data-i18n-ph]').forEach(function (el) { el.setAttribute('placeholder', U.t(el.getAttribute('data-i18n-ph'))); });
      $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', U.t(el.getAttribute('data-i18n-aria'))); });
      $$('[data-lang-btn]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-lang-btn') === lang));
      });
      U._langHooks.forEach(function (fn) { fn(lang); });
    },

    product: function (id) {
      for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
      return null;
    },

    /* Tag pills for a product, using each demo's own class names. */
    tagsHTML: function (p, cls) {
      return p.tags.map(function (tg) {
        return '<span class="' + (cls || 'tag') + ' ' + (cls || 'tag') + '--' + tg + '">' + esc(U.t('filter.' + tg)) + '</span>';
      }).join(' ');
    }
  };

  /* ------------------------------------------------------------------ */
  /* Catalogue: render + filter + search                                 */
  /* opts: { grid, card(p), filters (container), search (input), empty } */
  /* ------------------------------------------------------------------ */
  U.catalog = function (opts) {
    var grid = typeof opts.grid === 'string' ? $(opts.grid) : opts.grid;
    if (!grid) return;
    var state = { filter: 'all', q: '' };
    var filters = opts.filters ? $(opts.filters) : null;
    var search = opts.search ? $(opts.search) : null;
    var empty = opts.empty ? $(opts.empty) : null;

    function matches(p) {
      if (state.filter !== 'all' && p.tags.indexOf(state.filter) < 0) return false;
      if (!state.q) return true;
      var hay = [U.t('p.' + p.id + '.n'), U.t('p.' + p.id + '.d'), U.t('p.' + p.id + '.g')]
        .concat(p.tags.map(function (tg) { return U.t('filter.' + tg); }))
        // Search both languages, so "nuts" still works on the Japanese page.
        .concat([I18N.en['p.' + p.id + '.n'], I18N.en['p.' + p.id + '.d']])
        .join(' ').toLowerCase();
      return hay.indexOf(state.q) >= 0;
    }

    function render() {
      var shown = PRODUCTS.filter(matches);
      grid.innerHTML = shown.map(opts.card).join('');
      $$('[data-open-product]', grid).forEach(function (el) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          U.openProduct(el.getAttribute('data-open-product'), el);
        });
      });
      if (empty) empty.hidden = shown.length > 0;
      if (opts.after) opts.after(shown);
    }

    if (filters) {
      var tags = ['all', 'easy', 'gift', 'rules', 'business'];
      function drawFilters() {
        filters.innerHTML = tags.map(function (tg) {
          return '<button type="button" class="chip" data-filter="' + tg + '" aria-pressed="' + (state.filter === tg) + '">' + esc(U.t('filter.' + tg)) + '</button>';
        }).join('');
      }
      filters.addEventListener('click', function (e) {
        var b = e.target.closest('[data-filter]');
        if (!b) return;
        state.filter = b.getAttribute('data-filter');
        $$('[data-filter]', filters).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        render();
      });
      U.onLang(drawFilters);
    }
    if (search) {
      search.addEventListener('input', function () { state.q = search.value.trim().toLowerCase(); render(); });
    }
    U.onLang(render);
  };

  /* ------------------------------------------------------------------ */
  /* Product details dialog                                              */
  /* ------------------------------------------------------------------ */
  var dlg, lastOpener, openId;
  function buildDialog() {
    dlg = document.createElement('dialog');
    dlg.className = 'u-modal';
    dlg.setAttribute('aria-labelledby', 'u-modal-title');
    dlg.innerHTML =
      '<div class="u-modal-art"></div>' +
      '<div class="u-modal-body">' +
      '  <button type="button" class="u-modal-x" data-close></button>' +
      '  <div class="u-modal-tags"></div>' +
      '  <h3 id="u-modal-title"></h3>' +
      '  <p class="u-modal-desc"></p>' +
      '  <dl><dt data-k="goodfor"></dt><dd data-v="goodfor"></dd><dt data-k="ship"></dt><dd data-v="ship"></dd></dl>' +
      '  <div class="u-modal-actions"><a href="#contact" class="u-modal-ask"></a></div>' +
      '</div>';
    document.body.appendChild(dlg);
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('[data-close]')) dlg.close();
    });
    dlg.addEventListener('close', function () {
      openId = null;
      if (lastOpener && lastOpener.focus) lastOpener.focus();
    });
    $('.u-modal-ask', dlg).addEventListener('click', function (e) {
      e.preventDefault();
      var id = openId;
      dlg.close();
      U.askAbout(id);
    });
  }
  function fillDialog() {
    var p = U.product(openId);
    if (!p) return;
    $('.u-modal-art', dlg).style.backgroundColor = p.color;
    $('.u-modal-art', dlg).innerHTML = p.icon;
    $('.u-modal-tags', dlg).innerHTML = U.tagsHTML(p, 'u-tag');
    $('#u-modal-title', dlg).textContent = U.t('p.' + p.id + '.n');
    $('.u-modal-desc', dlg).textContent = U.t('p.' + p.id + '.d');
    $('[data-k="goodfor"]', dlg).textContent = U.t('modal.goodfor');
    $('[data-v="goodfor"]', dlg).textContent = U.t('p.' + p.id + '.g');
    $('[data-k="ship"]', dlg).textContent = U.t('modal.ship');
    $('[data-v="ship"]', dlg).textContent = U.t('p.' + p.id + '.s');
    $('.u-modal-ask', dlg).textContent = U.t('product.ask');
    $('.u-modal-x', dlg).setAttribute('aria-label', U.t('modal.close'));
    $('.u-modal-x', dlg).innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
  }
  U.openProduct = function (id, opener) {
    if (!dlg) buildDialog();
    openId = id;
    lastOpener = opener || document.activeElement;
    fillDialog();
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  };
  U.onLang(function () { if (dlg && openId) fillDialog(); });

  /* Jump to the form with a product group already chosen. */
  U.askAbout = function (id) {
    var form = $('form[data-umikoe-form]');
    if (!form) return;
    var sel = $('select[name="product"]', form);
    if (sel && id) sel.value = id;
    if (form._goToStep) form._goToStep(0);
    var target = $('#contact') || form;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    var first = $('input[name="name"]', form);
    setTimeout(function () { if (first) first.focus({ preventScroll: true }); }, reduceMotion ? 0 : 500);
  };

  /* ------------------------------------------------------------------ */
  /* Form: options, validation, sending                                  */
  /* ------------------------------------------------------------------ */
  function fillProductSelect(sel) {
    var v = sel.value;
    sel.innerHTML = PRODUCTS.map(function (p) {
      return '<option value="' + p.id + '">' + esc(U.t('p.' + p.id + '.n')) + '</option>';
    }).join('') + '<option value="other">' + esc(U.t('form.other')) + '</option>';
    if (v) sel.value = v;
  }
  function fillMarketSelect(sel) {
    var v = sel.value;
    sel.innerHTML = MARKETS.map(function (m) {
      return '<option value="' + m + '">' + esc(U.t('market.' + m)) + '</option>';
    }).join('') + '<option value="other">' + esc(U.t('market.other')) + '</option>';
    if (v) sel.value = v;
  }
  function countryList() {
    var dl = document.getElementById('u-countries');
    if (!dl) {
      dl = document.createElement('datalist');
      dl.id = 'u-countries';
      document.body.appendChild(dl);
    }
    dl.innerHTML = MARKETS.map(function (m) { return '<option value="' + esc(U.t('market.' + m)) + '">'; }).join('');
  }

  var RULES = {
    name: function (v) { return v ? '' : 'err.required'; },
    country: function (v) { return v ? '' : 'err.required'; },
    email: function (v) {
      if (!v) return 'err.required';
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'err.email';
    },
    message: function (v) {
      if (!v) return 'err.required';
      return v.length >= 10 ? '' : 'err.message';
    }
  };

  function fieldError(input, key) {
    var wrap = input.closest('.field') || input.parentNode;
    var err = $('.u-err', wrap);
    if (!err) {
      err = document.createElement('p');
      err.className = 'u-err';
      err.id = 'err-' + input.id;
      wrap.appendChild(err);
    }
    if (key) {
      err.setAttribute('data-key', key);
      err.textContent = U.t(key);
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', err.id);
      wrap.classList.add('has-err');
    } else {
      err.removeAttribute('data-key');
      err.textContent = '';
      input.removeAttribute('aria-invalid');
      wrap.classList.remove('has-err');
    }
  }

  /* Validate the named fields (or all). Returns true when they pass. */
  U.validate = function (form, names) {
    var bad = null;
    (names || Object.keys(RULES)).forEach(function (n) {
      var input = form.elements[n];
      if (!input || !RULES[n]) return;
      var key = RULES[n](input.value.trim());
      fieldError(input, key);
      if (key && !bad) bad = input;
    });
    if (bad) bad.focus();
    return !bad;
  };

  U.formData = function (form) {
    var out = {};
    ['name', 'company', 'country', 'email', 'product', 'message'].forEach(function (n) {
      var el = form.elements[n];
      if (el) out[n] = el.value.trim();
    });
    if (out.product) out.productLabel = out.product === 'other' ? U.t('form.other') : U.t('p.' + out.product + '.n');
    return out;
  };

  function bindForm(form) {
    var status = $('[data-form-status]', form.parentNode) || $('[data-form-status]');
    var btn = $('button[type="submit"]', form);

    $$('select[name="product"]', form).forEach(function (sel) { U.onLang(function () { fillProductSelect(sel); }); });

    // Re-check a field once the visitor has been told it is wrong.
    form.addEventListener('input', function (e) {
      var n = e.target.name;
      if (RULES[n] && e.target.getAttribute('aria-invalid') === 'true') {
        fieldError(e.target, RULES[n](e.target.value.trim()));
      }
    });
    form.addEventListener('focusout', function (e) {
      var n = e.target.name;
      if (RULES[n] && e.target.value.trim()) fieldError(e.target, RULES[n](e.target.value.trim()));
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.elements._hp && form.elements._hp.value) return; // spam honeypot
      if (!U.validate(form)) return;
      var data = U.formData(form);
      data.language = U.lang;
      data.page = location.pathname;
      btn.disabled = true;
      var label = btn.textContent;
      btn.textContent = U.t('form.sending');

      var send = FORM_ENDPOINT
        ? fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
          }).then(function (r) { if (!r.ok) throw new Error(r.status); })
        : new Promise(function (res) { setTimeout(res, 700); });

      send.then(function () {
        showStatus(status, 'ok', data);
        form.reset();
        form.classList.add('is-sent');
        if (form._goToStep) form._goToStep(0);
      }).catch(function () {
        showStatus(status, 'fail');
      }).then(function () {
        btn.disabled = false;
        btn.textContent = label;
      });
    });
  }

  function showStatus(el, kind, data) {
    if (!el) return;
    el.hidden = false;
    el.className = el.className.replace(/\bis-(ok|fail)\b/g, '').trim() + ' is-' + kind;
    el.innerHTML = '';
    if (kind === 'ok') {
      var h = document.createElement('strong');
      h.textContent = U.t('form.ok.t');
      var p = document.createElement('p');
      p.textContent = U.t('form.ok', { name: data.name, email: data.email });
      var again = document.createElement('button');
      again.type = 'button';
      again.className = 'u-again';
      again.textContent = U.t('form.again');
      again.addEventListener('click', function () {
        el.hidden = true;
        var f = $('form[data-umikoe-form]');
        f.classList.remove('is-sent');
        f.elements.name.focus();
      });
      el.appendChild(h); el.appendChild(p); el.appendChild(again);
    } else {
      el.textContent = U.t('form.fail', { email: CONTACT_EMAIL });
    }
    el.focus && el.focus();
  }

  /* ------------------------------------------------------------------ */
  /* Page chrome: menu, header, active link, reveal, misc                */
  /* ------------------------------------------------------------------ */
  function bindChrome() {
    var toggle = $('[data-menu-toggle]');
    function setMenu(open) {
      document.body.classList.toggle('menu-open', open);
      if (toggle) toggle.setAttribute('aria-expanded', String(open));
    }
    if (toggle) {
      toggle.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
      $$('[data-menu] a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
      window.addEventListener('resize', function () { if (window.innerWidth > 960) setMenu(false); });
    }

    var header = $('[data-header]');
    if (header) {
      var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 12); };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    var toTop = $('[data-to-top]');
    if (toTop) {
      window.addEventListener('scroll', function () { toTop.classList.toggle('show', window.scrollY > 900); }, { passive: true });
    }

    $$('[data-lang-btn]').forEach(function (b) {
      b.addEventListener('click', function () { U.setLang(b.getAttribute('data-lang-btn')); });
    });

    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    if ('IntersectionObserver' in window) {
      // Highlight the nav link for the section on screen.
      var links = $$('[data-nav] a[href^="#"]');
      var byId = {};
      links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && byId[en.target.id]) {
            links.forEach(function (a) { a.classList.remove('active'); });
            byId[en.target.id].classList.add('active');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });

      if (!reduceMotion) {
        var rev = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add('in'); rev.unobserve(en.target); }
          });
        }, { rootMargin: '0px 0px -8% 0px' });
        $$('.reveal').forEach(function (el) { rev.observe(el); });
      } else {
        $$('.reveal').forEach(function (el) { el.classList.add('in'); });
      }
    } else {
      $$('.reveal').forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */
  function boot() {
    var urlLang = (location.search.match(/[?&]lang=(en|ja)/) || [])[1];
    var saved = store('umikoe-lang');
    var initial = urlLang || (saved === 'ja' || saved === 'en' ? saved : 'en');
    U.lang = initial;

    bindChrome();
    $$('form[data-umikoe-form]').forEach(bindForm);
    $$('select[data-market-select]').forEach(function (sel) { U.onLang(function () { fillMarketSelect(sel); }); });
    $$('select[data-product-select]').forEach(function (sel) { U.onLang(function () { fillProductSelect(sel); }); });
    U.onLang(countryList);
    U.setLang(initial);
    document.dispatchEvent(new CustomEvent('umikoe:ready'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
