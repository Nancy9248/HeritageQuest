// HeritageQuest - True Multilingual In-Character Greetings
// Ensures every historical ruler speaks natively in the user's chosen language with correct accent
// Covers all 8 official heritage monuments across 20 languages

export const HISTORICAL_GREETINGS = {
  // 1. TAJ MAHAL - Emperor Shah Jahan
  'taj-mahal': {
    en: 'Welcome, traveler of future centuries! I am Emperor Shah Jahan. You stand before the Rauza-i-Munawwara, built as an earthly mirror of Paradise for my beloved Mumtaz Mahal.',
    hi: 'स्वागत है, भविष्य के यात्री! मैं सम्राट शाहजहाँ हूँ। आप मेरी बेगम मुमताज़ महल की पावन स्मृति में निर्मित इस ताजमहल के समक्ष खड़े हैं, जिसे हमने स्वर्ग का सांसारिक प्रतिबिम्ब बनाया है।',
    ta: 'எதிர்காலப் பயணியே, நல்வரவு! நான் பேரரசர் ஷாஜஹான். எனது அன்பிற்குரிய மும்தாஜ் மஹாலுக்காக சொர்க்கத்தின் நிழலாக எழுப்பப்பட்ட தாஜ்மஹாலை நீங்கள் காண்கிறீர்கள்.',
    te: 'భవిష్యత్ యాత్రికుడా, స్వాగతం! నేను మొఘల్ చక్రవర్తి షాజహాన్. నా ప్రియమైన ముంతాజ్ మహల్ కోసం భూలోక స్వర్గంగా నిర్మించిన తాజ్ మహల్ ఎదుట మీరు నిలబడ్డారు.',
    bn: 'ভবিষ্যতের পরিব্রাজক, স্বাগত! আমি সম্রাট শাহজাহান। আমার প্রিয়তম মুমতাজ মহলের স্মৃতিতে নির্মিত এই তাজমহলের সামনে আপনি দাঁড়িয়ে আছেন।',
    mr: 'स्वागत आहे, भविष्यातील प्रवासी! मी बादशहा शाहजहान. माझ्या प्रिय बेगम मुमताज महलच्या पावन स्मृतीमध्ये पृथ्वीवरील स्वर्गासारख्या उभारलेल्या या भव्य ताजमहालात तुमचे स्वागत असो.',
    gu: 'સ્વાગત છે, ભવિષ્યના યાત્રી! હું સમ્રાટ શાહજહાં છું. મારી પ્રિય પત્ની મુમતાઝ મહલની યાદમાં સ્વર્ગના પ્રતિબિંબ સમાન બનાવેલા આ તાજમહલમાં તમારું સ્વાગત છે.',
    kn: 'ಭವಿಷ್ಯದ ಯಾತ್ರಿಕರೇ, ಸ್ವಾಗತ! ನಾನು ಮೊಘಲ್ ಚಕ್ರವರ್ತಿ ಷಾಜಹಾನ್. ನನ್ನ ಪ್ರಿಯ ಮುಮ್ತಾಜ್ ಮಹಲ್ ನೆನಪಿನಲ್ಲಿ ಸ್ವರ್ಗದಂತೆ ನಿರ್ಮಿಸಿದ ತಾಜ್ ಮಹಲ್‌ಗೆ ನಿಮಗೆ ಸುಸ್ವಾಗತ.',
    ml: 'സ്വാഗതം! ഞാൻ മുഗൾ ചക്രവർത്തി ഷാജഹാൻ. എന്റെ പ്രിയപ്പെട്ട മുംതാസ് മഹലിന്റെ സ്മരണയ്ക്കായി ഭൂമിയിലെ സ്വർഗ്ഗമായി നിർമ്മിച്ച താജ്മഹലിലേക്ക് സ്വാഗതം.',
    pa: 'ਜੀ ਆਇਆਂ ਨੂੰ! ਮੈਂ ਮੁਗ਼ਲ ਬਾਦਸ਼ਾਹ ਸ਼ਾਹਜਹਾਨ ਹਾਂ। ਮੇਰੀ ਬੇਗ਼ਮ ਮੁਮਤਾਜ਼ ਮਹਿਲ ਦੀ ਪਵਿੱਤਰ ਯਾਦ ਵਿੱਚ ਧਰਤੀ ਦੇ ਸਵਰਗ ਵਜੋਂ ਉਸਾਰੇ ਗਏ ਇਸ ਤਾਜ ਮਹਿਲ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।',
    or: 'ଭବିଷ୍ୟତର ଯାତ୍ରୀ, ସ୍ୱାଗତ! ମୁଁ ମୋଗଲ ସମ୍ରାଟ ଶାହଜାହାନ। ମୋ ପ୍ରିୟତମା ମୁମତାଜ ମହଲଙ୍କ ସ୍ମୃତିରେ ନିର୍ମିତ ପୃଥିବୀର ସ୍ୱର୍ଗ ତୁଲ୍ୟ ତାଜମହଲରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ।',
    fr: "Bienvenue, voyageur des siècles futurs ! Je suis l'empereur Shah Jahan. Vous vous tenez devant le Taj Mahal, conçu comme un miroir terrestre du Paradis pour ma bien-aimée Mumtaz Mahal.",
    de: 'Willkommen, Reisender künftiger Jahrhunderte! Ich bin Kaiser Shah Jahan. Sie stehen vor dem Taj Mahal, errichtet als irdisches Abbild des Paradieses für meine geliebte Mumtaz Mahal.',
    es: '¡Bienvenido, viajero de los siglos venideros! Soy el emperador Shah Jahan. Te encuentras ante el Taj Mahal, construido como un espejo terrenal del Paraíso para mi amada Mumtaz Mahal.',
    ja: '未来の旅人よ、ようこそ！私は第5代ムガル皇帝シャー・ジャハーンである。最愛の王妃ムムターズ・マハルのため、地上の楽園として築いたタージ・マハルの前に汝は立っている。',
    it: 'Benvenuto, viaggiatore del futuro! Sono l\'imperatore Shah Jahan. Vi trovate davanti al maestoso Taj Mahal, eretto come riflesso terreno del Paradiso per la mia amata Mumtaz Mahal.',
    ru: 'Добро пожаловать, путник грядущих веков! Я император Шах-Джахан. Перед вами Тадж-Махал, созданный как земное отражение Рая для моей возлюбленной Мумтаз-Махал.',
    ar: 'أهلاً بك يا مسافر العصور القادمة! أنا الإمبراطور شاه جهان. تقف أمام تاج محل، صرح الخلود الذي شيدته كمرآة أرضية للجنة من أجل محبوبتي ممتاز محل.',
    zh: '欢迎光临，未来的探险者！我是莫卧儿帝国皇帝沙贾汗。在您面前的是泰姬陵，这是我为挚爱的慕塔芝·玛哈在人间修建的无双天堂镜像。',
    ko: '미래에서 온 여행자여, 환영하오! 나는 무굴 제국의 황제 샤 자한이오. 사랑하는 뭄타즈 마할을 위해 지상에 재현한 낙원의 거울, 타지마할에 오신 것을 환영하오.'
  },

  // 2. MYSORE PALACE - Maharaja Nalwadi Krishnaraja Wadiyar IV
  'mysore-palace': {
    en: 'Namaskara! I am Nalwadi Krishnaraja Wadiyar, Maharaja of Mysore. Welcome to the Amba Vilas Palace, a symphony of Indo-Saracenic grandeur, stained glass, and the jewel of Karnataka.',
    hi: 'नमस्कार! मैं मैसूर का महाराजा नलवाड़ी कृष्णराज वाडियार हूँ। अंबा विलास पैलेस में आपका स्वागत है, जो भारत की शाही स्थापत्य कला, नक्काशी और कर्नाटक की सांस्कृतिक धरोहर का मुकुट है।',
    ta: 'வணக்கம்! நான் மைசூர் மகாராஜா நால்வடி கிருஷ்ணராஜ உடையார். இந்தோ-சாராசெனிக் கலை நயத்துடன் விளங்கும் புகழ்பெற்ற அம்பா விலாஸ் அரண்மனைக்கு உங்களை அன்போடு வரவேற்கிறேன்.',
    te: 'నమస్కారం! నేను మైసూరు మహారాజు నాల్వడి కృష్ణరాజ వొడెయార్. ఇండో-సారాసెనిక్ వాస్తు శోభతో విరాజిల్లే అంబా విలాస్ ప్యాలెస్‌కు హృదయపూర్వక స్వాగతం.',
    bn: 'নমস্কার! আমি মহীশূরের মহারাজা চতুর্থ কৃষ্ণরাজ ওদেয়ার। আম্বা বিলাস প্রাসাদে আপনাকে স্বাগত জানাই, যা কর্ণাটকের রাজকীয় স্থাপত্যের অনন্য নিদর্শন।',
    mr: 'सस्नेह नमस्कार! मी म्हैसूरचा महाराजा नलवाडी कृष्णराज वाडियार. भव्य अंबा विलास राजवाड्यात आपले सहर्ष स्वागत आहे.',
    gu: 'નમસ્કાર! હું મૈસૂરનો મહારાજા નલવાડી કૃષ્ણરાજ વાડિયાર છું. ઈન્ડો-સારાસેનિક સ્થાપત્યકળાના અદભુત રત્ન અંબા વિલાસ પેલેસમાં તમારું હાર્દિક સ્વાગત છે.',
    kn: 'ನಮಸ್ಕಾರ! ನಾನು ಮೈಸೂರಿನ ಮಹಾರಾಜ ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್. ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ಕಿರೀಟವಾದ ಭವ್ಯ ಅಂಬಾವಿಲಾಸ ಅರಮನೆಗೆ ನಿಮಗೆ ಹೃತ್ಪೂರ್ವಕ ಸುಸ್ವಾಗತ.',
    ml: 'നമസ്കാരം! ഞാൻ മൈസൂർ മഹാരാജാവ് നാല്വടി കൃഷ്ണരാജ വൊഡയാർ. ഇൻഡോ-സാരസെനിക് വാസ്തുവിദ്യയുടെ വിസ്മയമായ അംബാ വിലാസ് കൊട്ടാരത്തിലേക്ക് സ്വാഗതം.',
    pa: 'ਨਮਸਕਾਰ! ਮੈਂ ਮੈਸੂਰ ਦਾ ਮਹਾਰਾਜਾ ਕ੍ਰਿਸ਼ਨਰਾਜਾ ਵਾਡਿਆਰ ਹਾਂ। ਅੰਬਾ ਵਿਲਾਸ ਪੈਲੇਸ ਵਿੱਚ ਆਪ ਸਭ ਦਾ ਨਿੱਘਾ ਸਵਾਗਤ ਹੈ।',
    or: 'ନମସ୍କାର! ମୁଁ ମହୀଶୂରର ମହାରାଜା ନଲୱାଡି କୃଷ୍ଣରାଜ ୱାଡିୟାର। ଅମ୍ବା ବିଳାସ ପ୍ରାସାଦରେ ଆପଣଙ୍କୁ ହାର୍ଦ୍ଦିକ ସ୍ୱାଗତ।',
    fr: 'Namaskara ! Je suis Krishnaraja Wadiyar IV, Maharaja de Mysore. Bienvenue au somptueux palais Amba Vilas, chef-d’œuvre de l’architecture indo-sarrasine.',
    de: 'Namaskara! Ich bin Nalwadi Krishnaraja Wadiyar, Maharadscha von Mysore. Willkommen im Amba-Vilas-Palast, der Perle von Karnataka.',
    es: '¡Namaskara! Soy Nalwadi Krishnaraja Wadiyar, Maharajá de Mysore. Bienvenido al Palacio de Amba Vilas, joya del arte indo-sarraceno.',
    ja: 'ナマスカラ！私はマイソール藩王国のクリシュナ・ラージャ・ウォデヤ4世である。インド・サラセン様式の至宝、アンバ・ヴィラス宮殿へようこそ。',
    it: 'Namaskara! Sono Nalwadi Krishnaraja Wadiyar, Maharaja di Mysore. Benvenuti al sontuoso Palazzo Amba Vilas.',
    ru: 'Намаскара! Я Налвади Кришнараджа Водеяр, махараджа Майсура. Добро пожаловать во дворец Амба Вилас, жемчужину Карнатаки.',
    ar: 'نمستكار! أنا نالوادي كريشناراجا واديار، مهراجا ميسور. أهلاً بكم في قصر أمبا فيلاس المهيب، تحفة الطراز الهندي الساراسيني.',
    zh: '问候您！我是迈索尔土邦的大君克里希纳拉贾·沃德亚四世。欢迎来到迈索尔王宫（安巴维拉斯宫），这里是卡纳塔克邦的璀璨皇冠。',
    ko: '나마스카라! 나는 마이소르의 마하라자 날와디 크리슈나라자 와디야르 4세이오. 인도-사라센 건축의 절정, 암바 빌라스 궁전에 오신 것을 환영하오.'
  },

  // 3. KONARK SUN TEMPLE - King Narasimhadeva I
  'konark-sun-temple': {
    en: 'Jaya Jagannatha! I am Langula Narasimhadeva of Kalinga. Over 1,200 master craftsmen labored for twelve years to fashion this cosmic sun chariot, turning hard stone into breathing poetry!',
    hi: 'जय जगन्नाथ! मैं कलिंग का नरेश नरसिंहदेव प्रथम हूँ। बारह सौ कुशल शिल्पकारों ने बारह वर्षों तक अथक परिश्रम कर सूर्य देव के इस अलौकिक रथ को तराशा है!',
    ta: 'ஜெய ஜகந்நாதா! நான் கலிங்க மன்னன் முதலாம் நரசிம்மதேவன். 1200 கலைஞர்கள் 12 ஆண்டுகள் செதுக்கிய பிரம்மாண்ட சூரியக் கோவில் தேருக்கு உங்களை வரவேற்கிறேன்!',
    te: 'జయ జగన్నాథ! నేను కళింగ పాలకుడు మొదటి నరసింహదేవుడను. సూర్యభగవానుని ఈ దివ్య రథ ఆలయంలో ప్రతి శిల్పం శ్వాసించే కవిత్వంగా రూపుదిద్దుకుంది.',
    bn: 'জয় জগন্নাথ! আমি কলিঙ্গের অধিপতি প্রথম নরসিংহদেব। সূর্য দেবের এই মহাজাগতিক রথ রূপী মন্দিরে আপনাকে স্বাগত জানাই!',
    mr: 'जय जगन्नाथ! मी कलिंगचा राजा नरसिंहदेव प्रथम. १२०० शिल्पकारांनी १२ वर्षे परिश्रम करून घडवलेल्या या भव्य सूर्य रथ मंदिरात आपले स्वागत आहे.',
    gu: 'જય જગન્નાથ! હું કલિંગનો રાજા નરસિંહદેવ પ્રથમ છું. ૧૨૦૦ કારીગરોએ ૧૨ વર્ષની મહેનતથી બનાવેલા સૂર્ય ભગવાનના આ ભવ્ય રથમાં તમારું સ્વાગત છે.',
    kn: 'ಜಯ ಜಗನ್ನಾಥ! ನಾನು ಕಳಿಂಗದ ಮಹಾರಾಜ ಒಂದನೇ ನರಸಿಂಹದೇವ. 1200 ಶಿಲ್ಪಿಗಳು 12 ವರ್ಷಗಳ ಕಾಲ ಕೆತ್ತಿದ ಸೂರ್ಯ ದೇವನ ದಿವ್ಯ ರಥ ದೇವಾಲಯಕ್ಕೆ ಸುಸ್ವಾಗತ.',
    ml: 'ജയ ജഗന്നാഥാ! ഞാൻ കലിംഗ രാജാവ് നരസിംഹദേവൻ ഒന്നാമൻ. പന്ത്രണ്ട് വർഷം കൊണ്ട് നിർമ്മിച്ച കൊണാർക്ക് സൂര്യ ക്ഷേത്രത്തിലേക്ക് സ്വാഗതം.',
    pa: 'ਜੈ ਜਗਨਨਾਥ! ਮੈਂ ਕਲਿੰਗ ਦਾ ਰਾਜਾ ਨਰਸਿੰਘਦੇਵ ਹਾਂ। ਕੋਣਾਰਕ ਦੇ ਸੂਰਜ ਰੱਥ ਮੰਦਰ ਵਿੱਚ ਆਪ ਸਭ ਦਾ ਨਿੱਘਾ ਸਵਾਗਤ ਹੈ।',
    or: 'ଜୟ ଜଗନ୍ନାଥ! ମୁଁ କଳିଙ୍ଗର ଗଜପତି ଲାଙ୍ଗୁଳା ନରସିଂହଦେବ। ବାରଶହ ବଢ଼େଇଙ୍କ ବାର ବର୍ଷର ତପସ୍ୟାରେ ଗଢ଼ା ଏହି ଅର୍କକ୍ଷେତ୍ର ସୂର୍ଯ୍ୟ ରଥକୁ ଆପଣଙ୍କୁ ସ୍ୱାଗତ!',
    fr: 'Jaya Jagannatha ! Je suis le roi Narasimhadeva Ier de Kalinga. Bienvenue au temple du Soleil de Konark, colossal char de pierre de Surya.',
    de: 'Jaya Jagannatha! Ich bin König Narasimhadeva I. von Kalinga. Willkommen am Sonnentempel von Konark, dem kosmischen Sonnenwagen!',
    es: '¡Jaya Jagannatha! Soy el rey Narasimhadeva I de Kalinga. Bienvenido al Templo del Sol de Konark, el carro cósmico de Surya esculpido en piedra.',
    ja: 'ジャヤ・ジャガンナート！我はカリンガの王ナラシンハデーヴァ1世である。太陽神スーリヤの巨石の宇宙戦車、コナーラク太陽神寺院へようこそ！',
    it: 'Jaya Jagannatha! Sono re Narasimhadeva I di Kalinga. Benvenuti al Tempio del Sole di Konark, colossale carro cosmico di Surya.',
    ru: 'Джая Джаганнатха! Я царь Нарасимхадева I из Калинги. Добро пожаловать в храм Солнца в Конараке, космическую колесницу бога Сурьи!',
    ar: 'جايا جاغاناثا! أنا الملك ناراسيم هاديفا الأول حاكم كالينغا. أهلاً بكم في معبد الشمس في كونارك، مركبة الإله الشمسية المنحوتة في الصخر الخالد.',
    zh: '吉祥礼赞！我是卡灵伽国王纳拉辛哈德瓦一世。欢迎来到科纳克太阳神庙，这是一座由24只巨轮与7匹神马拉动的宏伟石雕太阳战车！',
    ko: '자야 자간나타! 나는 칼링가의 왕 나라심하데바 1세이오. 1,200명의 장인이 12년간 피땀 흘려 완공한 수리야 태양신의 거대한 돌 전차, 코나르크에 오신 것을 환영하오.'
  },

  // 4. GATEWAY OF INDIA - Sir George Wittet
  'gateway-of-india': {
    en: 'Greetings! I am George Wittet, architect of Bombay. Look upon this yellow basalt arch blending 16th-century Gujarati temple motifs with Roman triumphal grandeur on the Arabian Sea.',
    hi: 'नमस्ते! मैं जॉर्ज विटेट, बॉम्बे का मुख्य वास्तुकार। गेटवे ऑफ़ इंडिया पर आपका स्वागत है, जो गुजराती जाली कला और रोमन विजय तोरण का अनूठा संगम है।',
    ta: 'வணக்கம்! நான் ஜார்ஜ் விட்लेट. கேட்வே ஆஃப் இந்தியா மும்பை துறைமுகத்தில் உங்களை வரவேற்கிறது.',
    te: 'నమస్కారం! నేను బాంబే వాస్తుశిల్పి జార్జ్ విట్టెట్. గేట్‌వే ఆఫ్ ఇండియాకు స్వాగతం.',
    bn: 'নমস্কার! আমি বম্বের স্থপতি জর্জ উইটেট। গেটওয়ে অফ ইন্ডিয়ায় আপনাকে স্বাগত জানাই।',
    mr: 'सस्नेह नमस्कार! मी जॉर्ज विटेट, मुंबईचा वास्तुविशारद. अरबी समुद्राच्या किनाऱ्यावरील या भव्य गेटवे ऑफ इंडिया तोरणावर आपले सहर्ष स्वागत आहे.',
    gu: 'નમસ્તે! હું જ્યોર્જ વિટેટ, બોમ્બેનો આર્કિટેક્ટ. ગેટવે ઓફ ઈન્ડિયા પર તમારું સ્વાગત છે, જ્યાં ૧૬મી સદીની ગુજરાતી વાસ્તુશૈલી અને રોમન તોરણનું અનોખું મિલન છે.',
    kn: 'ನಮಸ್ಕಾರ! ನಾನು ಮುಂಬೈನ ವಾಸ್ತುಶಿಲ್ಪಿ ಜಾರ್ಜ್ ವಿಟೆಟ್. ಗುಜರಾತಿ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ರೋಮನ್ ವಿಜಯ ತೋರಣದ ಸಂಗಮವಾದ ಗೇಟ್‌ವೇ ಆಫ್ ಇಂಡಿಯಾಗೆ ಸುಸ್ವಾಗತ.',
    ml: 'മുംബൈ തുറമുഖത്തെ വിഖ്യാതമായ ഗേറ്റ്‌വേ ഓഫ് ഇന്ത്യയിലേക്ക് ഏവർക്കും ഹൃദ്യമായ സ്വാഗതം.',
    pa: 'ਨਮਸਤੇ! ਮੁੰਬਈ ਦੇ ਮਹਾਨ ਗੇਟਵੇਅ ਆਫ਼ ਇੰਡੀਆ ਵਿੱਚ ਆਪ ਸਭ ਦਾ ਨਿੱਘਾ ਸਵਾਗਤ ਹੈ।',
    or: 'ନମସ୍କାର! ମୁମ୍ବାଇର ପ୍ରସିଦ୍ଧ ଗେଟୱେ ଅଫ୍ ଇଣ୍ଡିଆରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ।',
    fr: "Bienvenue à la Porte de l'Inde à Bombay ! Une synthèse magistrale entre l'architecture traditionnelle du Gujarat et les arcs triomphaux.",
    de: 'Guten Tag! Ich bin George Wittet. Willkommen am Gateway of India in Mumbai, einem Meisterwerk des Indo-sarazenischen Stils.',
    es: '¡Buen día! Soy George Wittet. Bienvenido a la Puerta de la India en el puerto de Bombay.',
    ja: 'ごきげんよう！建築家ジョージ・ウィッテットである。グジャラートの伝統建築とローマの凱旋門が美しく融合したムンバイの玄関口へようこそ。',
    it: 'Buona giornata a voi! Sono George Wittet, architetto di Bombay. Benvenuti alla Porta dell\'India sul Mar Arabico.',
    ru: 'Доброго дня вам! Я Джордж Виттет, архитектор Бомбея. Добро пожаловать к Воротам Индии в гавани Мумбаи.',
    ar: 'يوماً طيباً لكم! أنا جورج ويتيت مهندس بومباي المعماري. أهلاً بكم في بوابة الهند الشامخة على مياه بحر العرب.',
    zh: '日安！我是孟买的总建筑师乔治·维泰特。呈现在您眼前的印度门将古吉拉特石雕窗花与古罗马凯旋门融为一体。',
    ko: '안녕하십니까! 나는 뭄바이의 건축가 조지 위텟이오. 구자라트 전통 양식과 로마 개선문의 웅장함이 결합된 인도문에 오신 것을 환영하오.'
  },

  // 5. BRIHADISVARA TEMPLE - Emperor Rajaraja Chola I
  'brihadisvara-temple': {
    en: 'Vanakkam! I am Arulmozhi Varman, crowned Rajaraja Chola. In 1010 CE, we consecrated this immortal granite abode of Lord Shiva — with its 216-foot soaring Vimana and 80-ton single stone Kumbam!',
    hi: 'वणक्कम! मैं अरुल्मोझी वर्मन, चोल सम्राट राजराज प्रथम हूँ। 1010 ईस्वी में हमने तंजावुर में भगवान शिव के इस अमर मंदिर को प्रतिष्ठित किया, जिसका 216 फीट ऊंचा विमान अखंड ग्रेनाइट से बना है!',
    ta: 'வணக்கம்! நான் அருள்மொழி வர்மன், சோழப் பேரரசர் ராஜராஜ சோழன். எங்கள் தமிழ் மன்னர்களின் இறையாண்மையையும் ஈசனின் பெருமையையும் பறைசாற்றும் மாபெரும் தஞ்சைப் பெரிய கோவிலுக்கு உங்களை வரவேற்கிறேன்!',
    te: 'వణక్కం! నేను చోళ చక్రవర్తి రాజరాజ చోళుడను. 216 అడుగుల ఎత్తైన విమాన గోపురంతో నిర్మించిన తంజావూరు బృహదీశ్వరాలయానికి స్వాగతం!',
    bn: 'বণক্কম! আমি চোল সম্রাট প্রথম রাজরাজ চোল। তাঞ্জাভুরের বৃহদীশ্বর মন্দিরে আপনাকে স্বাগত জানাই!',
    mr: 'वणक्कम! मी चोल सम्राट राजराजा प्रथम. तंजावूरच्या भव्य बृहदीश्वर मंदिरात आपले सहर्ष स्वागत आहे.',
    gu: 'વણક્કમ! હું ચોલ સમ્રાટ રાજરાજ પ્રથમ છું. તંજાવુરના ભવ્ય બૃહદીશ્વર મંદિરમાં તમારું હાર્દિક સ્વાગત છે.',
    kn: 'ವಣಕ್ಕಂ! ನಾನು ಚೋಳ ಚಕ್ರವರ್ತಿ ರಾಜರಾಜ ಚೋಳ. 80 ಟನ್ ಏಕಶಿಲೆಯ ಕುಂಭ ಹೊತ್ತ ತಂಜಾವೂರಿನ ಭವ್ಯ ಬೃಹದೀಶ್ವರ ದೇವಾಲಯಕ್ಕೆ ನಿಮಗೆ ಸ್ವಾಗತ.',
    ml: 'വണക്കം! ഞാൻ ചോള ചക്രവർത്തി രാജരാജ ചോളൻ ഒന്നാമൻ. തഞ്ചാവൂർ ബൃഹദീശ്വര ക്ഷേത്രത്തിലേക്ക് നിങ്ങളെ സാദരം സ്വാഗതം ചെയ്യുന്നു.',
    pa: 'ਵਣੱਕਮ! ਮੈਂ ਚੋਲ ਸਮਰਾਟ ਰਾਜਰਾਜਾ ਹਾਂ। ਤੰਜਾਵੁਰ ਦੇ ਮਹਾਨ ਬ੍ਰਿਹਦੀਸ਼ਵਰ ਮੰਦਰ ਵਿੱਚ ਆਪ ਸਭ ਦਾ ਸਵਾਗਤ ਹੈ।',
    or: 'ବଣକ୍କମ! ମୁଁ ଚୋଳ ସମ୍ରାଟ ରାଜରାଜ ଚୋଳ ପ୍ରଥମ। ତଞ୍ଜାଭୁରର ବିଶ୍ୱବିଖ୍ୟାତ ବୃହଦୀଶ୍ୱର ମନ୍ଦିରକୁ ଆପଣଙ୍କୁ ସ୍ୱାଗତ!',
    fr: 'Vanakkam ! Je suis Rajaraja Chola Ier. Bienvenue au temple de Brihadisvara à Thanjavur, merveille granitique érigée en 1010.',
    de: 'Vanakkam! Ich bin Rajaraja Chola I. Willkommen im Brihadisvara-Tempel von Thanjavur, einem Meisterwerk dravidischer Granit-Baukunst!',
    es: '¡Vanakkam! Soy Rajaraja Chola I. Bienvenido al Templo Brihadisvara de Thanjavur, maravilla monumental de granito consagrada en 1010.',
    ja: 'ヴァナッカム！私はチョーラ朝の偉大なる皇帝ラージャラージャ1世である。1010年に建立したタンジャーヴールの壮大な花崗岩寺院、ブリハディーシュワラへようこそ！',
    it: 'Vanakkam! Sono l\'imperatore Rajaraja Chola I. Benvenuti al Tempio di Brihadisvara a Thanjavur, colosso granitico dell\'India meridionale.',
    ru: 'Ванаккам! Я Раджараджа Чола I, великий император Юга. Добро пожаловать в храм Брахадисвара в Тханджавуре, гранитное чудо 1010 года!',
    ar: 'فاناكام! أنا الإمبراطور راجاراجا تشولا الأول. أهلاً بكم في معبد بريهاديسفارا الشامخ في ثانجافور، الصرح الجرانيتي العظيم المشيد عام 1010.',
    zh: '吉祥问候！我是朱罗王朝的伟大皇帝罗阇罗阇一世。欢迎来到坦贾武尔的布里哈迪斯瓦拉神庙，这座高达216英尺的纯花岗岩巍峨主殿是南印度的不朽骄傲！',
    ko: '바낙캄! 나는 촐라 제국의 위대한 황제 라자라자 1세이오. 서기 1010년에 완공한 216피트 높이의 거대한 화강암 비마나 사원, 브리하디스와라에 오신 것을 환영하오.'
  },

  // 6. SANCHI STUPA - Emperor Ashoka the Great
  'sanchi-stupa': {
    en: 'Namo Buddhaya! I am Devanampriya Priyadasi, King Ashoka of the Maurya realm. Here upon this hill of Sanchi, we enshrined the sacred relics to guide all living beings toward peace and compassion.',
    hi: 'नमो बुद्धाय! मैं देवानांप्रिय प्रियदर्शी, मौर्य सम्राट अशोक हूँ। कलिंग युद्ध के पश्चात मैंने तलवार त्यागकर बुद्ध के अहिंसा मार्ग को अपनाया और सांची के इस महास्तूप की नींव रखी।',
    ta: 'நமோ புத்தாய! நான் மௌரியப் பேரரசர் அசோகர். அமைதியையும் கருணையையும் உலகிற்குப் போதிக்க சாஞ்சியின் இந்த புனித ஸ்தூபியை நிர்மாணித்தோம்.',
    te: 'నమో బుద్ధాయ! నేను మౌర్య చక్రవర్తి అశోకుడను. శాంతి, కరుణలను చాటే ప్రసిద్ధ సాంచీ స్తూపానికి మీకు స్వాగతం.',
    bn: 'নমো বুদ্ধায়! আমি মৌর্য সম্রাট অশোক। অহিংসা ও শান্তির প্রতীক সাঁচির মহান স্তূপে আপনাকে স্বাগত জানাই।',
    mr: 'नमो बुद्धाय! मी मौर्य सम्राट अशोक. शांतता आणि करुणेचा संदेश देणाऱ्या सांचीच्या या महास्तूपावर आपले स्वागत आहे.',
    gu: 'નમો બુદ્ધાય! હું મૌર્ય સમ્રાટ અશોક છું. શાંતિ અને અહિંસાના પવિત્ર પ્રતીક એવા સાંચી સ્તૂપમાં તમારું સ્વાગત છે.',
    kn: 'ನಮೋ ಬುದ್ಧಾಯ! ನಾನು ಮೌರ್ಯ ಚಕ್ರವರ್ತಿ ಅಶೋಕ. ಶಾಂತಿ ಮತ್ತು ಕರುಣೆಯ ಪವಿತ್ರ ಸಂಕೇತವಾದ ಸಾಂಚಿ ಮಹಾಸ್ತೂಪಕ್ಕೆ ಸುಸ್ವಾಗತ.',
    ml: 'നമോ ബുദ്ധായ! ഞാൻ മൗര്യ ചക്രവർത്തി അശോകൻ. ശാന്തിയുടെ പ്രതീകമായ സാഞ്ചി സ്തൂപത്തിലേക്ക് ഏവർക്കും സ്വാഗതം.',
    pa: 'ਨਮੋ ਬੁੱਧਾਏ! ਮੈਂ ਮੌਰੀਆ ਸਮਰਾਟ ਅਸ਼ੋਕ ਹਾਂ। ਸਾਂਚੀ ਦੇ ਪਵਿੱਤਰ ਸਤੂਪ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।',
    or: 'ନମୋ ବୁଦ୍ଧାୟ! ମୁଁ ମୌର୍ଯ୍ୟ ସମ୍ରାଟ ଅଶୋକ। ଶାନ୍ତି ଏବଂ ଅହିଂସାର ପବିତ୍ର ପ୍ରତୀକ ସାଞ୍ଚି ମହାସ୍ତୂପରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ।',
    fr: "Namo Buddhaya ! Je suis l'empereur Ashoka le Grand de la dynastie Maurya. Bienvenue au Grand Stupa de Sanchi, sanctuaire de paix et de compassion.",
    de: 'Namo Buddhaya! Ich bin Kaiser Ashoka der Große. Willkommen an der Großen Stupa von Sanchi, der Wiege der buddhistischen Kunst!',
    es: '¡Namo Buddhaya! Soy el emperador Ashoka el Grande del Imperio Maurya. Bienvenido a la Gran Estupa de Sanchi, monumento de paz universal.',
    ja: '南無仏陀！我はマウリヤ朝のアショーカ大王である。平和と慈悲の教えを刻んだインド最古の石造建築、サーンチーの大ストゥーパへようこそ。',
    it: 'Namo Buddhaya! Sono l\'imperatore Ashoka il Grande. Benvenuti al Grande Stupa di Sanchi, culla della pace e dell\'arte buddhista.',
    ru: 'Намо Буддая! Я царь Ашока Великий из династии Маурьев. Добро пожаловать к Великой ступе в Санчи, древнейшему каменному святилищу мира и сострадания.',
    ar: 'نامو بوذايا! أنا الإمبراطور أشوكا العظيم حاكم إمبراطورية موريا. أهلاً بكم في ستوبا سانتشي الكبرى، أقدم صرح حجري يجسد السلام والرحمة.',
    zh: '南无佛陀！我是孔雀王朝的阿育王。经历羯陵伽之战后，我放下刀剑归依佛法，在此修建了桑吉大佛塔，愿慈悲与和平照耀世间众生。',
    ko: '나무 붓다야! 나는 마우리아 제국의 아소카 대왕이오. 칼링가 전쟁의 슬픔을 뒤로하고 비폭력과 평화의 법을 기리기 위해 세운 인도 최고(最古)의 석조 사원, 산치 대탑에 오신 것을 환영하오.'
  },

  // 7. HAWA MAHAL - Maharaja Sawai Pratap Singh
  'hawa-mahal': {
    en: 'Khamma Ghani! I am Sawai Pratap Singh, Maharaja of Jaipur. Step inside the Palace of Winds, sculpted with 953 honeycomb casements shaped like the crown of Lord Krishna!',
    hi: 'खम्मा घणी! मैं जयपुर का महाराजा सवाई प्रताप सिंह हूँ। हवा महल में आपका स्वागत है, जिसे हमने भगवान श्रीकृष्ण के मुकुट के स्वरूप में 953 झरोखों के साथ बनवाया है!',
    ta: 'கம்மா கனி! நான் ஜெய்ப்பூர் மகாராஜா சவாய் பிரதாப் சிங். 953 சாளரங்களுடன் காற்று தவழும் புகழ்மிக்க ஹவா மஹாலுக்கு உங்களை வரவேற்கிறேன்!',
    te: 'ఖమ్మా ఘణీ! నేను జైపూర్ మహారాజు సవాయ్ ప్రతాప్ సింగ్‌ను. 953 కిటికీలతో నిర్మించిన ప్రసిద్ధ హవా మహల్‌కు స్వాగతం!',
    bn: 'খাম্মা ঘনি! আমি জয়পুরের মহারাজা সওয়াই প্রতাপ সিংহ। ৯৫৩টি সুন্দর ঝরোখা বিশিষ্ট হাওয়া মহলে আপনাকে স্বাগত জানাই!',
    mr: 'खम्मा घणी! मी जयपूरचा महाराजा सवाई प्रताप सिंग. ९५३ झरोख्यांच्या या प्रसिद्ध हवा महालात आपले सहर्ष स्वागत आहे.',
    gu: 'ખમ્મા ઘણી! હું જયપુરનો મહારાજા સવાઈ પ્રતાપ સિંહ છું. ૯૫૩ ઝરૂખાઓવાળા સુંદર અને ઠંડા પવનથી લહેરાતા હવા મહેલમાં તમારું સ્વાગત છે.',
    kn: 'ಖಮ್ಮಾ ಘಣಿ! ನಾನು ಜೈಪುರದ ಮಹಾರಾಜ ಸವಾಯಿ ಪ್ರತಾಪ್ ಸಿಂಗ್. 953 ಕಿಟಕಿಗಳ ಸುಂದರ ಹವಾ ಮಹಲ್‌ಗೆ ನಿಮಗೆ ಹಾರ್ದಿಕ ಸುಸ್ವಾಗತ.',
    ml: 'ഖമ്മ ഘണി! ഞാൻ ജയ്പൂർ മഹാരാജാവ് സവായ് പ്രതാപ് സിംഗ്. 953 ജാലകങ്ങളുള്ള ഹവാ മഹലിലേക്ക് ഏവർക്കും സ്വാഗതം.',
    pa: 'ਖੰਮਾ ਘਣੀ! ਮੈਂ ਜੈਪੁਰ ਦਾ ਮਹਾਰਾਜਾ ਸਵਾਈ ਪ੍ਰਤਾਪ ਸਿੰਘ ਹਾਂ। 953 ਝਰੋਖਿਆਂ ਵਾਲੇ ਹਵਾ ਮਹਿਲ ਵਿੱਚ ਆਪ ਸਭ ਦਾ ਸਵਾਗਤ ਹੈ।',
    or: 'ଖମ୍ମା ଘଣୀ! ମୁଁ ଜୟପୁରର ମହାରାଜା ସୱାଇ ପ୍ରତାପ ସିଂହ। ୯୫୩ ଝରୋକା ବିଶିଷ୍ଟ ପ୍ରସିଦ୍ଧ ହୱା ମହଲରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ!',
    fr: 'Khamma Ghani ! Je suis Sawai Pratap Singh, Maharaja de Jaipur. Bienvenue au Palais des Vents et ses 953 fenêtres sculptées.',
    de: 'Khamma Ghani! Ich bin Sawai Pratap Singh, Maharadscha von Jaipur. Willkommen im Hawa Mahal, dem Palast der Winde mit 953 Balkonen!',
    es: '¡Khamma Ghani! Soy Sawai Pratap Singh, Maharajá de Jaipur. Bienvenido al Hawa Mahal, el Palacio de los Vientos con 953 celosías.',
    ja: 'カンマ・ガニ！私はジャイプールの藩王サワーイー・プラタープ・シンである。クリシュナ神の宝冠を模した953の小窓が涼風を呼ぶ風の宮殿（ハワー・マハル）へようこそ！',
    it: 'Khamma Ghani! Sono Sawai Pratap Singh, Maharaja di Jaipur. Benvenuti all\'Hawa Mahal, il Palazzo dei Venti con 953 finestre traforate.',
    ru: 'Хамма Гани! Я Савай Пратап Сингх, махараджа Джайпура. Добро пожаловать в Хава-Махал, Дворец Ветров с его 953 ажурными окнами!',
    ar: 'خاما غاني! أنا ساواي براتاب سينغ مهراجا جايبور. أهلاً بكم في قصر الرياح (هوا محل)، الصرح الوردي المتوج بـ 953 نافذة تشبه تاج الإله كريشنا.',
    zh: '吉祥致意！我是斋浦尔的萨瓦伊·普拉塔普·辛格大君。欢迎来到风之宫殿，这座粉红砂岩建筑拥有953扇精美窗棂，宛如黑天神克里希纳的璀璨宝冠！',
    ko: '캄마 가니! 나는 자이푸르의 마하라자 사와이 프라타프 싱이오. 크리슈나 신의 왕관을 닮은 953개의 창문에서 사막의 시원한 바람이 머무는 바람의 궁전, 하와 마할에 오신 것을 환영하오.'
  },

  // 8. VICTORIA MEMORIAL - Sir William Emerson & Lord Curzon
  'victoria-memorial': {
    en: 'Greetings, visitor! I am Sir William Emerson, architect of the Victoria Memorial. Behold this white Makrana marble palace on the Kolkata Maidan, crowned by the rotating bronze Angel of Victory.',
    hi: 'नमस्ते! मैं सर विलियम इमर्सन, विक्टोरिया मेमोरियल का मुख्य वास्तुकार। कोलकाता के मैदान में मकराना के श्वेत संगमरमर से बने इस भव्य स्मारक में आपका स्वागत है!',
    ta: 'வணக்கம்! நான் விக்டோரியா மெமோரியலின் கட்டிடக்கலைஞர் சர் வில்லியம் எமர்சன். கொல்கத்தாவின் வெள்ளை பளிங்கு மாளிகைக்கு உங்களை வரவேற்கிறேன்.',
    te: 'నమస్కారం! నేను విక్టోరియా మెమోరియల్ ఆర్కిటెక్ట్ సర్ విలియం ఎమర్సన్. కోల్‌కతా మైదానంలోని ఈ తెల్లటి పాలరాతి రాజభవనానికి స్వాగతం.',
    bn: 'নমস্কার! আমি ভিক্টোরিয়া মেমোরিয়ালের প্রধান স্থপতি স্যার উইলিয়াম এমারসন। কলকাতার ময়দানে অবস্থিত মাকরানা মার্বেলের এই ঐতিহাসিক প্রাসাদে আপনাকে স্বাগত জানাই।',
    mr: 'सस्नेह नमस्कार! मी सर विल्यम इमर्सन. कोलकात्याच्या मैदानातील मकराना संगमरवरी पाषाणातील या भव्य व्हिक्टोरिया मेमोरियलमध्ये आपले स्वागत आहे.',
    gu: 'નમસ્તે! હું વિક્ટોરિયા મેમોરિયલનો આર્કિટેક્ટ સર વિલિયમ એમર્સન છું. કોલકાતાના મેદાન પર મકરાનાના સફેદ આરસપહાણથી બનેલા આ ભવ્ય મહેલમાં તમારું સ્વાગત છે.',
    kn: 'ನಮಸ್ಕಾರ! ನಾನು ವಿಕ್ಟೋರಿಯಾ ಮೆಮೋರಿಯಲ್‌ನ ವಾಸ್ತುಶಿಲ್ಪಿ ಸರ್ ವಿಲಿಯಂ ಎಮರ್ಸನ್. ಕೋಲ್ಕತ್ತಾದ ಬಿಳಿ ಅಮೃತಶಿಲೆಯ ಭವ್ಯ ಸ್ಮಾರಕಕ್ಕೆ ನಿಮಗೆ ಸುಸ್ವಾಗತ.',
    ml: 'കൊൽക്കത്തയിലെ വിശ്വപ്രസിദ്ധമായ വിക്ടോറിയ മെമ്മോറിയലിലേക്ക് ഏവർക്കും ഹൃദ്യമായ സ്വാഗതം.',
    pa: 'ਨਮਸਤੇ! ਕੋਲਕਾਤਾ ਦੇ ਸ਼ਾਨਦਾਰ ਵਿਕਟੋਰੀਆ ਮੈਮੋਰੀਅਲ ਵਿੱਚ ਆਪ ਸਭ ਦਾ ਨਿੱਘਾ ਸਵਾਗਤ ਹੈ।',
    or: 'ନମସ୍କାର! କୋଲକାତାର ଐତିହାସିକ ଭିକ୍ଟୋରିଆ ମେମୋରିଆଲରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ।',
    fr: "Bienvenue au Victoria Memorial de Calcutta ! Un magnifique palais de marbre blanc de Makrana mêlant Renaissance italienne et architecture moghole.",
    de: 'Guten Tag! Willkommen am Victoria Memorial in Kolkata, dem weißen Marmorpalast auf dem Maidan.',
    es: '¡Saludos! Bienvenido al Victoria Memorial de Calcuta, majestuoso palacio de mármol blanco de Makrana coronado por el Ángel de la Victoria.',
    ja: 'ごきげんよう！ヴィクトリア記念堂の主任建築家サー・ウィリアム・エマーソンである。コルカタの緑地に佇む純白のマクラナ大理石の宮殿へようこそ。',
    it: 'Buona giornata a voi! Benvenuti al Victoria Memorial di Calcutta, sontuoso palazzo in marmo bianco di Makrana.',
    ru: 'Приветствую вас! Я сэр Уильям Эмерсон, архитектор Мемориала Виктории в Калькутте, шедевра из белого макранского мрамора.',
    ar: 'تحياتي لكم! أنا السير ويليام إيمرسون مصمم نصب فيكتوريا التذكاري. أهلاً بكم في هذا القصر الرخامي الأبيض الناصع المشيد في ميدان كولكاتا.',
    zh: '问候您！我是维多利亚纪念馆的总建筑师威廉·埃默森爵士。欢迎来到加尔各答梅丹公园的白色马克拉纳大理石宫殿，其穹顶巍然矗立着顺风旋转的青铜胜利天使！',
    ko: '안녕하십니까! 나는 빅토리아 기념관의 수석 건축가 윌리엄 에머슨 경이오. 콜카타의 넓은 마이단 평원에 순백의 마크라나 대리석으로 건축한 장엄한 기념궁전에 오신 것을 환영하오.'
  }
};

export function getGreetingForMonument(monumentId, lang = 'en') {
  let id = monumentId;
  if (id === 'konark-sun') id = 'konark-sun-temple';
  if (id === 'brihadisvara') id = 'brihadisvara-temple';

  const monumentGreetings = HISTORICAL_GREETINGS[id] || HISTORICAL_GREETINGS['taj-mahal'];
  if (!monumentGreetings) return '';
  return monumentGreetings[lang] || monumentGreetings.en || '';
}
