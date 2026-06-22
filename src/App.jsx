import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams, Link } from "react-router-dom";

const PINK = {
  50:"#FFF0F5",100:"#FFD6E7",200:"#FFB3CE",300:"#FF80B0",
  400:"#F5527E",500:"#E8335A",600:"#C41F45",700:"#9B1535",800:"#6E0D24",900:"#3D0612",
};

const TRANSLATIONS = {
  en:{
    heroTag:"FREE PREGNANCY TOOL",
    heroTitle:"Your Pregnancy Journey, Week by Week",
    heroDesc:"Calculate your due date, track baby's development, and get personalized tips for every stage of your pregnancy.",
    calcBtn:"Calculate My Due Date →",
    viewMilestones:"View Milestones",
    allInOne:"Everything You Need, In One Place",
    inputLmp:"First day of last period (LMP)",
    inputCycle:"Average cycle length",
    days:"days",avg:"average",
    calcActionBtn:"Calculate My Due Date 🌸",
    infoOnly:"For informational purposes only. Always confirm with your doctor.",
    dueDate:"Due Date",weeksAt:"You're at week",daysRem:"Days remaining",progress:"Progress",
    babyThisWeek:"🍼 Baby this week",babySize:"Size of a",symptomsTitle:"⚡ Common symptoms",
    aiInsightsTitle:"AI-Personalized Tips for Week",loadingAi:"Generating your personalized tips...",
    anyDay:"Any day now!",untilArrival:"until baby arrives",compComplete:"of pregnancy complete",
    navHome:"Home",navCalc:"Calculator",navMilestones:"Milestones",navSymptoms:"Symptoms",
    navNutrition:"Nutrition",navFaq:"FAQ",navAbout:"About & Contact",navPrivacy:"Privacy & Terms",
    footerDesc:"Your trusted companion through every week of pregnancy.",
    trimester1:"1st Trimester",trimester2:"2nd Trimester",trimester3:"3rd Trimester",
  },
  ur:{
    heroTag:"مفت پریگننسی ٹول",
    heroTitle:"آپ کا حمل کا سفر، ہفتہ بہ ہفتہ",
    heroDesc:"اپنے بچے کی پیدائش کی متوقع تاریخ کا حساب لگائیں، بچے کی نشوونما کو ٹریک کریں، اور ہر مرحلے کے لیے اے آئی مشورے حاصل کریں۔",
    calcBtn:"تاریخ کا حساب لگائیں ←",viewMilestones:"نشوونما کے مراحل",
    allInOne:"سب کچھ ایک ہی جگہ پر دستیاب ہے",
    inputLmp:"آخری ماہواری کا پہلا دن (LMP)",inputCycle:"ماہواری کے دنوں کا دورانیہ",
    days:"دن",avg:"اوسط",calcActionBtn:"حمل کی تاریخ معلوم کریں 🌸",
    infoOnly:"یہ معلومات صرف رہنمائی کے لیے ہیں۔ ہمیشہ اپنے ڈاکٹر سے تصدیق کریں۔",
    dueDate:"پیدائش کی متوقع تاریخ",weeksAt:"آپ کا ہفتہ ہے",daysRem:"باقی دن",progress:"صحت کا سفر",
    babyThisWeek:"🍼 بچہ اس ہفتے",babySize:"سائز:",symptomsTitle:"⚡ عام علامات",
    aiInsightsTitle:"اے آئی کے خاص مشورے برائے ہفتہ",loadingAi:"اے آئی معلومات تیار کر رہا ہے...",
    anyDay:"کسی بھی وقت!",untilArrival:"بچے کی آمد تک",compComplete:"حمل مکمل",
    navHome:"ہوم",navCalc:"کیلکولیٹر",navMilestones:"مراحل",navSymptoms:"علامات",
    navNutrition:"غذا",navFaq:"سوالات",navAbout:"ہمارے بارے میں",navPrivacy:"پرائیویسی",
    footerDesc:"حمل کے ہر ہفتے میں آپ کا قابل اعتماد ساتھی۔",
    trimester1:"پہلا مرحلہ",trimester2:"دوسرا مرحلہ",trimester3:"تیسرا مرحلہ",
  },
  hi:{
    heroTag:"मुफ़्त प्रेग्नेंसी टूल",
    heroTitle:"आपकी गर्भावस्था की यात्रा, सप्ताह दर सप्ताह",
    heroDesc:"अपने शिशु के जन्म की संभावित तारीख की गणना करें, विकास को ट्रैक करें, और गर्भावस्था के हर चरण के लिए व्यक्तिगत एआई टिप्स प्राप्त करें।",
    calcBtn:"डिलीवरी डेट जानें →",viewMilestones:"विकास के चरण देखें",
    allInOne:"सब कुछ एक ही स्थान पर उपलब्ध",
    inputLmp:"अंतिम मासिक धर्म का पहला दिन (LMP)",inputCycle:"मासिक धर्म चक्र की अवधि",
    days:"दिन",avg:"औसत",calcActionBtn:"डिलीवरी की तारीख जानें 🌸",
    infoOnly:"यह जानकारी केवल मार्गदर्शन के लिए है। हमेशा अपने डॉक्टर से पुष्टि करें।",
    dueDate:"प्रसव की संभावित तिथि",weeksAt:"आप इस सप्ताह में हैं",daysRem:"शेष दिन",progress:"प्रगति",
    babyThisWeek:"🍼 शिशु इस सप्ताह",babySize:"आकार:",symptomsTitle:"⚡ सामान्य लक्षण",
    aiInsightsTitle:"सप्ताह के लिए एआई टिप्स",loadingAi:"एआई जानकारी तैयार कर रहा है...",
    anyDay:"किसी भी दिन!",untilArrival:"शिशु के आगमन तक",compComplete:"गर्भावस्था पूरी",
    navHome:"होम",navCalc:"कैलकुलेटर",navMilestones:"माइलस्टोन्स",navSymptoms:"लक्षण",
    navNutrition:"पोषण",navFaq:"सवाल-जवाब",navAbout:"हमारे बारे में",navPrivacy:"गोपनीयता",
    footerDesc:"गर्भावस्था के हर सप्ताह में आपका सच्चा साथी।",
    trimester1:"पहली तिमाही",trimester2:"दूसरी तिमाही",trimester3:"तीसरी तिमाही",
  },
};

const MILESTONES = [
  {week:4,title:"Positive Test",desc:"Baby is the size of a poppy seed. Heart begins forming.",baby:"Poppy seed",icon:"🌸"},
  {week:6,title:"Heartbeat Detected",desc:"A tiny heartbeat can be seen on ultrasound.",baby:"Sweet pea",icon:"💗"},
  {week:8,title:"Embryo → Fetus",desc:"All major organs are forming. Fingers and toes appear.",baby:"Raspberry",icon:"🍓"},
  {week:10,title:"1st Trimester Screening",desc:"NT scan and blood tests to check baby's development.",baby:"Strawberry",icon:"🌺"},
  {week:12,title:"12-Week Scan",desc:"Risk of miscarriage drops significantly. Baby can yawn!",baby:"Lime",icon:"✨"},
  {week:16,title:"Gender Reveal Possible",desc:"You may be able to find out baby's sex. Baby can hear you!",baby:"Avocado",icon:"🥑"},
  {week:20,title:"Anatomy Scan",desc:"Detailed ultrasound checks all organs and structures.",baby:"Banana",icon:"🍌"},
  {week:24,title:"Viability Milestone",desc:"Baby is now considered viable outside the womb.",baby:"Corn cob",icon:"🌟"},
  {week:28,title:"Third Trimester Begins",desc:"Baby's eyes open. Brain develops rapidly.",baby:"Eggplant",icon:"🍆"},
  {week:32,title:"Baby Turns Head-Down",desc:"Most babies shift into birth position now.",baby:"Squash",icon:"💫"},
  {week:36,title:"Nearly Full Term",desc:"Lungs are nearly mature. Weekly visits begin.",baby:"Honeydew",icon:"🍈"},
  {week:40,title:"Due Date!",desc:"Your baby is ready to meet the world!",baby:"Watermelon",icon:"🎀"},
];

const WEEKLY_TIPS = {
  1:{baby:"Microscopic cells",symptoms:["No symptoms yet","Possible implantation spotting"],tips:["Start taking folic acid","Avoid alcohol and smoking","Schedule your first prenatal visit","Stay hydrated"]},
  4:{baby:"Poppy seed (1mm)",symptoms:["Missed period","Breast tenderness","Fatigue","Light spotting"],tips:["Confirm with blood test","Begin prenatal vitamins","Avoid raw fish and deli meats","Reduce caffeine to under 200mg/day"]},
  8:{baby:"Raspberry (1.6cm)",symptoms:["Morning sickness","Fatigue","Food aversions","Mood swings"],tips:["Eat small frequent meals for nausea","Ginger tea can help morning sickness","Rest when you can","Stay away from strong smells"]},
  12:{baby:"Lime (5.4cm)",symptoms:["Nausea may ease","Increased energy","Visible bump starting"],tips:["Schedule NT scan if not done","Begin sharing your news!","Start gentle prenatal exercise","Research childbirth classes"]},
  16:{baby:"Avocado (11.6cm)",symptoms:["Feeling baby flutters","Glowing skin","Back pain starting","Congestion"],tips:["Consider maternity clothes","Sleep on your left side","Do pelvic floor exercises","Ask about gender at next appointment"]},
  20:{baby:"Banana (25.6cm)",symptoms:["Stronger kicks","Heartburn","Swollen ankles","Stretch marks"],tips:["Schedule anatomy scan","Use stretch mark cream","Elevate feet when sitting","Consider a pregnancy pillow"]},
  24:{baby:"Corn cob (30cm)",symptoms:["Braxton Hicks","Back pain","Shortness of breath","Vivid dreams"],tips:["Take glucose tolerance test","Sign up for childbirth classes","Tour your delivery hospital","Pack hospital bag early"]},
  28:{baby:"Eggplant (37.6cm)",symptoms:["Frequent urination","Leg cramps","Difficulty sleeping","Pelvic pressure"],tips:["Track baby's kick counts","Begin birth plan","Arrange maternity leave","Set up the nursery"]},
  32:{baby:"Squash (42.4cm)",symptoms:["Heartburn worsens","Breathlessness","Pelvic girdle pain","Tiredness"],tips:["Sleep semi-upright for heartburn","Practice breathing exercises","Finalize hospital bag","Learn signs of preterm labor"]},
  36:{baby:"Honeydew (47.4cm)",symptoms:["Increased discharge","Baby drops lower","Nesting urge","Frequent urination"],tips:["Weekly prenatal visits start","Install car seat","Freeze meals for postpartum","Review birth plan with doctor"]},
  40:{baby:"Watermelon (51cm)",symptoms:["Contractions","Mucus plug loss","Water may break","Intense pressure"],tips:["Know signs of labor","Have bag ready","Rest as much as possible","Call doctor if contractions are 5 min apart"]},
};

const FAQS = [
  {q:"How is my due date calculated?",a:"Your due date is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period (LMP). This is known as Naegele's rule the standard method used by doctors worldwide."},
  {q:"Can my due date change?",a:"Yes! Your doctor may adjust your due date after an early ultrasound, which is more accurate than LMP dates. Only about 5% of babies are born exactly on their due date most arrive within 2 weeks before or after."},
  {q:"What if my cycle is not 28 days?",a:"Our calculator adjusts for cycle length. If your cycle is longer than 28 days, your ovulation and due date shifts later. If shorter, it shifts earlier. Enter your actual cycle length for a more accurate result."},
  {q:"When should I call my doctor immediately?",a:"Call your doctor right away if you experience heavy bleeding, severe abdominal pain, signs of preeclampsia (severe headache, vision changes, rapid swelling), decreased fetal movement after 28 weeks, or if your water breaks."},
  {q:"What are the three trimesters?",a:"First trimester: Weeks 1 13. Second trimester: Weeks 14 26. Third trimester: Weeks 27 40. Each trimester brings different developments for your baby and different experiences for you."},
  {q:"Is this calculator medically accurate?",a:"This calculator uses the standard Naegele's rule used by healthcare professionals worldwide. It is for informational purposes only. Always confirm your due date with your OB-GYN or midwife who may also use ultrasound measurements."},
  {q:"Is it safe to exercise during pregnancy?",a:"Yes! For most healthy pregnancies, moderate exercise is safe and beneficial. Walking, swimming, and prenatal yoga are excellent choices. Always consult your doctor before starting or continuing any exercise routine during pregnancy."},
  {q:"What foods should I avoid during pregnancy?",a:"Avoid raw or undercooked meat and fish, high-mercury fish (shark, swordfish), unpasteurized dairy and juices, deli meats unless heated, alcohol (no safe amount exists), and limit caffeine to under 200mg per day."},
];

const NUTRITION = [
  {nutrient:"Folic Acid",amount:"600 mcg/day",foods:"Leafy greens, fortified cereals, lentils",why:"Prevents neural tube defects",icon:"🥬"},
  {nutrient:"Iron",amount:"27 mg/day",foods:"Red meat, spinach, beans, fortified cereal",why:"Prevents anemia",icon:"💪"},
  {nutrient:"Calcium",amount:"1000 mg/day",foods:"Milk, yogurt, cheese, broccoli",why:"Builds baby's bones & teeth",icon:"🥛"},
  {nutrient:"Protein",amount:"70 100 g/day",foods:"Chicken, eggs, fish, legumes",why:"Baby's growth & development",icon:"🥚"},
  {nutrient:"Omega-3 DHA",amount:"200 mg/day",foods:"Salmon, sardines, walnuts, flaxseed",why:"Brain & eye development",icon:"🐟"},
  {nutrient:"Vitamin D",amount:"600 IU/day",foods:"Fortified milk, egg yolks, sunlight",why:"Bone health & immunity",icon:"☀️"},
];

const SYMPTOMS_BY_TRIMESTER = [
  {trimester:"1st Trimester",weeks:"Weeks 1 13",items:["Morning sickness & nausea","Breast tenderness & swelling","Extreme fatigue","Frequent urination","Food aversions & cravings","Mood swings","Light spotting (implantation)","Heightened sense of smell"]},
  {trimester:"2nd Trimester",weeks:"Weeks 14 26",items:["Baby movements (quickening)","Growing baby bump","Skin changes & pregnancy glow","Back pain begins","Heartburn & indigestion","Leg cramps at night","Nasal congestion","Increased energy (golden trimester!)"]},
  {trimester:"3rd Trimester",weeks:"Weeks 27 40",items:["Braxton Hicks contractions","Shortness of breath","Swollen feet & ankles","Difficulty sleeping","Pelvic pressure & pain","Frequent urination returns","Strong nesting instinct","Lightning crotch pains"]},
];

const ARTICLES = [
  {
    id:"early-signs",
    title:"10 Early Signs of Pregnancy You Should Know",
    cat:"First Trimester",read:"5 min read",icon:"🌸",
    desc:"From missed periods to tender breasts, learn the earliest signs that you might be pregnant before taking a test.",
    content:[
      {type:"intro",text:"Finding out you might be pregnant is one of those moments that feels both thrilling and nerve-wracking at the same time. Before you even take a test, your body might already be quietly sending you signals. Here are the most common early signs, and what they actually mean for you."},
      {type:"heading",text:"1. A Missed Period 📅"},
      {type:"para",text:"This is usually the first thing that makes most of us start wondering. If your cycle is regular and your period is late, that's often the earliest and most reliable sign. That said, stress, illness, or hormonal shifts can also delay your period, so a missed period alone doesn't confirm pregnancy."},
      {type:"heading",text:"2. Breast Tenderness 💗"},
      {type:"para",text:"Your breasts might feel sore, heavy, or extra sensitive in the first few weeks. This happens because your hormone levels, especially progesterone and estrogen, are rising rapidly to support a possible pregnancy. It can feel similar to PMS breast tenderness, but often more intense and longer-lasting."},
      {type:"heading",text:"3. Fatigue Like Never Before 😴"},
      {type:"para",text:"Feeling absolutely exhausted even after a full night's sleep? That's your body working overtime. In early pregnancy, your progesterone levels surge, which naturally makes you feel sleepy and drained. Your body is also rapidly increasing blood production and doing the extraordinary work of building a whole new person, even when you can't see or feel it yet."},
      {type:"heading",text:"4. Light Spotting (Implantation Bleeding) 🩸"},
      {type:"para",text:"About 6 to 12 days after conception, the fertilized egg attaches itself to the lining of your uterus. This can cause light pink or brownish spotting, which is completely normal and called implantation bleeding. It is usually much lighter than a period and only lasts a day or two. Many women mistake it for an early or light period."},
      {type:"heading",text:"5. Nausea, With or Without Vomiting 🤢"},
      {type:"para",text:"Morning sickness is a bit of a misnomer because it can strike at literally any time of day or night. The rising levels of hCG, the pregnancy hormone, are thought to trigger nausea. Some women feel it as early as 2 weeks after conception, while others never experience it at all. If you fall into the lucky group with no nausea, that is completely okay too."},
      {type:"heading",text:"6. Frequent Bathroom Trips 🚽"},
      {type:"para",text:"Early pregnancy increases blood flow to your kidneys, making them filter more fluid than usual, which translates to more trips to the bathroom. This can start as early as 6 weeks and tends to ease in the second trimester before returning in the third as your baby gets bigger and presses on your bladder."},
      {type:"heading",text:"7. Food Aversions or Strong Cravings 🥗"},
      {type:"para",text:"Suddenly unable to stand the smell of coffee you used to love? Desperately craving pickles at 10pm? Food aversions and cravings can begin very early in pregnancy and are caused by hormonal changes affecting your taste and smell. Trust your body, it's sending you real, meaningful signals about what it needs."},
      {type:"heading",text:"8. Mood Swings 🎢"},
      {type:"para",text:"Feeling emotional for no clear reason, crying at a commercial or feeling irritable over something small? Hormonal changes in early pregnancy affect the chemistry in your brain, making you feel more emotionally reactive than usual. This is completely normal and typically settles down as your body adjusts to its new hormonal environment."},
      {type:"heading",text:"9. Bloating and Mild Cramping 🫃"},
      {type:"para",text:"Light cramping and bloating in early pregnancy can feel deceptively similar to period cramps. This is caused by your uterus beginning to expand and the significant hormonal changes happening throughout your body. As long as the cramping is mild and not accompanied by heavy bleeding, it is usually nothing to worry about, though always mention it to your doctor if you're unsure."},
      {type:"heading",text:"10. A Heightened Sense of Smell 👃"},
      {type:"para",text:"Many pregnant women suddenly become super-sensitive to smells, sometimes to the point where previously loved scents now trigger nausea or headaches. Scientists believe this heightened olfactory sensitivity is an evolutionary response designed to help protect the growing baby from potentially harmful substances in food and the environment."},
      {type:"tip",text:"💡 The most reliable way to confirm pregnancy is a home pregnancy test taken with your first morning urine, or a blood test at your doctor's office. If you think you might be pregnant, book an appointment with your OB-GYN as soon as possible to get the care and support you deserve!"},
    ]
  },
  {
    id:"first-prenatal",
    title:"Your First Prenatal Visit: Complete Guide",
    cat:"Doctor Visits",read:"7 min read",icon:"👩‍⚕️",
    desc:"What to expect at your first OB appointment, which tests will be done, and what questions to ask your doctor.",
    content:[
      {type:"intro",text:"Your first prenatal visit can feel a little overwhelming, especially if it's your first pregnancy. But honestly, it's also genuinely exciting. This appointment is where your official journey begins, where you'll hear your baby's heartbeat for the first time, and where you'll start building a relationship with the healthcare team that will support you through everything. Here's exactly what to expect."},
      {type:"heading",text:"When Should You Schedule It? ⏰"},
      {type:"para",text:"Most doctors recommend booking your first prenatal appointment around 8 weeks of pregnancy. However, if you have any pre-existing medical conditions, have been through fertility treatments, or experienced complications in a previous pregnancy, your doctor may want to see you as early as 6 weeks. Don't wait too long, early care makes a real difference."},
      {type:"heading",text:"What Happens at This Appointment? 🏥"},
      {type:"para",text:"Your first visit is usually the longest of all your prenatal appointments. Your doctor or midwife will go through your complete medical history, including any previous pregnancies, chronic health conditions, medications you're currently taking, allergies, and your family's health history. Please don't hold back. The more honest and complete information you share, the better and more tailored your care will be."},
      {type:"heading",text:"The Physical Examination 🩺"},
      {type:"para",text:"You can expect a thorough general physical exam that includes a blood pressure check, height and weight measurement, calculation of your BMI, and a pelvic exam. Your doctor may also perform a Pap smear if you're due for one. These are all entirely routine and simply help establish your baseline health at the start of your pregnancy."},
      {type:"heading",text:"Blood Tests You'll Have 🔬"},
      {type:"para",text:"Several blood tests will be ordered at your first visit. These typically check your blood type and Rh factor (important for compatibility with your baby), iron levels to screen for anemia, immunity to rubella and chickenpox, STI screening, blood sugar levels to assess gestational diabetes risk, and thyroid function. It sounds like a lot, but these are all standard tests that give your doctor crucial information to keep you and your baby safe."},
      {type:"heading",text:"Your First Ultrasound 🌟"},
      {type:"para",text:"Many practices will perform a dating ultrasound at your first visit, or schedule one very soon after. This confirms your due date and, most importantly, verifies that the pregnancy is in the right location (not ectopic). If you're lucky, you may see your baby's heartbeat flickering on the screen for the very first time. Most parents describe this as one of the most emotional and unforgettable moments of their lives."},
      {type:"heading",text:"Questions to Ask Your Doctor 💬"},
      {type:"para",text:"Come prepared with your questions, your doctor expects them! Great ones to start with include: What prenatal vitamins do you specifically recommend? What symptoms should prompt me to call you immediately? Is it safe for me to continue exercising? What foods should I avoid? What's your policy on birth plans? When will my next appointment be scheduled, and how often will I be seen?"},
      {type:"tip",text:"💡 Bring a written list of all medications and supplements you're currently taking, the date of your last menstrual period, your insurance card, and a notepad to jot things down. And if you can, bring your partner or a trusted support person, having someone with you for this big first milestone appointment is really wonderful."},
    ]
  },
  {
    id:"nutrition-guide",
    title:"Best Foods to Eat During Each Trimester",
    cat:"Nutrition",read:"6 min read",icon:"🥗",
    desc:"A complete trimester-by-trimester nutrition guide to nourish both you and your growing baby optimally.",
    content:[
      {type:"intro",text:"Eating well during pregnancy doesn't mean eating for two, it means eating smarter and more intentionally. Everything your baby needs to grow and develop comes directly from what you eat, so the quality of your food genuinely matters. Here's a practical, realistic guide to what to focus on in each trimester."},
      {type:"heading",text:"First Trimester: Build the Foundation (Weeks 1, 13) 🌱"},
      {type:"para",text:"This is the most critical period for your baby's neural tube, brain, and spine development, which means folic acid is absolutely non-negotiable right now. Load up on leafy greens like spinach, kale, and romaine lettuce, plus fortified breakfast cereals, lentils, beans, and avocado. Even if nausea makes eating feel impossible, try to get small amounts of these foods in whenever you can manage."},
      {type:"para",text:"If morning sickness is hitting you hard, bland and easy-to-digest foods are your best friends right now, plain crackers, dry toast, bananas, and white rice. Cold foods often smell less strong than hot ones, which can help if strong smells are triggering your nausea. Ginger in the form of tea, ginger ale made with real ginger, or ginger chews has genuine scientific evidence behind it for reducing pregnancy nausea."},
      {type:"heading",text:"Second Trimester: Fuel the Growth (Weeks 14, 26) 📈"},
      {type:"para",text:"Welcome to the golden trimester! Nausea usually eases and your energy comes back, which means you can finally eat more normally. Your baby is growing rapidly now, so protein becomes especially important. Aim for 70 to 100 grams of protein per day from sources like chicken, turkey, eggs, fish that's low in mercury, Greek yogurt, cottage cheese, and legumes."},
      {type:"para",text:"Calcium is also critical right now as your baby's bones and teeth are actively developing. Dairy products like milk, yogurt, and cheese are excellent sources, as are fortified plant-based milks, broccoli, kale, and almonds. Try to get at least 1,000mg of calcium every day, that's roughly equivalent to three servings of dairy products."},
      {type:"heading",text:"Third Trimester: Prepare for the Finish Line (Weeks 27, 40) 🍼"},
      {type:"para",text:"Your baby is putting on weight and building up fat reserves in these final weeks, and your body is simultaneously preparing for labor and delivery. Iron becomes especially important now because your blood volume has increased dramatically and you need extra iron to support it. Red meat, spinach, lentils, and fortified cereals are all excellent sources, and pairing them with vitamin C foods like orange juice significantly boosts iron absorption."},
      {type:"para",text:"Omega-3 fatty acids, particularly DHA, are crucial for your baby's brain and eye development in the third trimester. Aim for two servings of low-mercury fish per week, salmon, sardines, and trout are all great choices. If you don't eat fish or seafood, DHA supplements derived from algae are a safe and effective alternative."},
      {type:"tip",text:"💡 Think of your prenatal vitamins as a safety net, not a replacement for real food. They fill in the nutritional gaps on the days when your diet isn't perfect, which is totally normal and expected during pregnancy. Whole foods always come first, but your prenatal vitamin has your back on the harder days."},
    ]
  },
  {
    id:"morning-sickness",
    title:"How to Manage Morning Sickness Naturally",
    cat:"Symptoms",read:"4 min read",icon:"💚",
    desc:"Evidence-based tips for managing nausea during pregnancy, from ginger to diet changes to acupressure.",
    content:[
      {type:"intro",text:"If you're in the thick of morning sickness right now, whether it's mild queasiness that comes and goes or full-on vomiting that's making you miserable, please know that you are absolutely not alone. Up to 80% of pregnant women experience nausea in the first trimester. The good news is that there are things that genuinely help, and most of them are natural, safe, and easy to try."},
      {type:"heading",text:"Why Does Morning Sickness Happen? 🤔"},
      {type:"para",text:"Despite the misleading name, morning sickness can strike at any time of day or night. It's primarily caused by the rapid rise of hCG (human chorionic gonadotropin), the hormone that your body produces during pregnancy, combined with increased estrogen levels, a dramatically heightened sense of smell, and a more sensitive digestive system. It usually peaks around weeks 8 to 10 and improves significantly by week 14 for most women, though some experience it longer."},
      {type:"heading",text:"1. Never Let Your Stomach Get Completely Empty 🍽️"},
      {type:"para",text:"An empty stomach is one of the biggest triggers for pregnancy nausea. Try eating something small every two hours throughout the day rather than three large meals. Keep plain crackers, rice cakes, or dry toast within reach at all times, especially on your nightstand so you can eat a few crackers before even getting out of bed in the morning. This simple habit alone makes a huge difference for many women."},
      {type:"heading",text:"2. Ginger, Nature's Anti-Nausea Remedy 🫚"},
      {type:"para",text:"Ginger is genuinely one of the most well-studied natural remedies for nausea, with solid scientific evidence behind it. You can try it in many forms, ginger tea, ginger chews or candies, ginger ale made with real ginger extract, fresh ginger added to meals, or ginger capsules. Research suggests that 250mg of ginger taken four times a day can significantly reduce nausea, but as always, check with your doctor before starting any supplement."},
      {type:"heading",text:"3. Acupressure Wristbands 💙"},
      {type:"para",text:"Those elastic wristbands originally designed for motion sickness, like Sea-Bands, work by applying continuous pressure to a specific acupressure point on the inner wrist called the P6 or Neiguan point. Multiple clinical studies have found them helpful for reducing pregnancy nausea, and the best part is they're completely safe, very affordable, drug-free, and can be worn all day long."},
      {type:"heading",text:"4. Stay Hydrated But Sip Slowly 💧"},
      {type:"para",text:"Dehydration can worsen nausea significantly, but drinking large amounts of liquid at once can also trigger it, it's a frustrating balance. Try sipping small amounts of water, electrolyte drinks, or cold herbal teas like peppermint or chamomile slowly throughout the day rather than gulping. Ice chips and cold popsicles can also be helpful when drinking feels difficult."},
      {type:"heading",text:"5. Identify and Avoid Your Personal Triggers 👃"},
      {type:"para",text:"Every woman's nausea triggers are different. Keep a mental note or even write down what makes yours worse. For many women, it's the smell of cooking meat, strong perfumes or cleaning products, fatty or spicy foods, or even certain sounds or environments. Avoiding your specific triggers, even temporarily, can dramatically reduce how often and how severely you feel sick."},
      {type:"tip",text:"💡 If you're vomiting more than 3 to 4 times a day, cannot keep any food or liquid down for more than 24 hours, are losing weight, or feel dizzy and weak, please see your doctor right away. You may have hyperemesis gravidarum, severe pregnancy nausea that requires medical treatment. There is no need to suffer in silence when effective treatments are available!"},
    ]
  },
  {
    id:"anatomy-scan",
    title:"Understanding Your 20-Week Anatomy Scan",
    cat:"Ultrasound",read:"5 min read",icon:"🔬",
    desc:"What the 20-week anatomy scan checks, how to prepare, and what results mean for you and your baby.",
    content:[
      {type:"intro",text:"The 20-week anatomy scan is one of the most anticipated and emotionally significant appointments of your entire pregnancy. It's the appointment where many parents find out whether they're having a boy or a girl, but far more importantly, it's a comprehensive check-up that looks in remarkable detail at how your baby is growing and whether all the major organs and structures are developing exactly as they should be."},
      {type:"heading",text:"What Exactly Is the Anatomy Scan? 🖥️"},
      {type:"para",text:"Also called the mid-pregnancy ultrasound, the level 2 ultrasound, or the anomaly scan, this detailed examination is typically scheduled between weeks 18 and 22 of pregnancy. A specially trained sonographer uses high-frequency sound waves to create detailed images of your baby from multiple angles. The appointment usually takes between 30 and 45 minutes, though it can occasionally take longer if your baby is in an uncooperative position, which they often are!"},
      {type:"heading",text:"What Does the Sonographer Check? 🔍"},
      {type:"para",text:"The level of detail in this scan is genuinely remarkable. The sonographer will carefully examine your baby's brain and spinal cord, all four chambers of the heart and major blood vessels, kidneys and bladder, stomach and abdominal wall, face and lips (specifically checking for cleft lip), arms and legs and their bones, fingers and toes, and the umbilical cord. They'll also assess your placenta's position, check your amniotic fluid levels, and confirm your baby's measurements to verify the due date."},
      {type:"heading",text:"Finding Out the Sex 👶"},
      {type:"para",text:"If your baby is in the right position and you'd like to know the sex, this is typically when you'll find out. The sonographer will ask you before the scan whether you want to know. If you'd prefer a surprise, simply say so and they'll carefully avoid revealing it. Some parents ask for the information to be written in a sealed envelope for a gender reveal celebration later, just ask your clinic if they offer this option."},
      {type:"heading",text:"What If Something Looks Unusual? 💙"},
      {type:"para",text:"Please try not to panic if the sonographer says they need to look more closely at a particular area or wants to repeat a measurement. This is extremely common and usually simply means your baby was in an awkward position or the image quality wasn't quite clear enough. If there is a genuine finding of concern, you will be referred for a more detailed scan with a specialist or a maternal-fetal medicine doctor. The vast majority of so-called 'soft markers' turn out to be completely insignificant."},
      {type:"heading",text:"How to Prepare for the Appointment 📋"},
      {type:"para",text:"Unlike earlier pregnancy scans, you generally don't need a full bladder for the 20-week anatomy scan. Wear comfortable, loose-fitting clothing that gives the sonographer easy access to your belly. Eating a meal or snack beforehand can encourage your baby to be more active and potentially move into a better position. And please, bring your partner, a family member, or a close friend, this is genuinely one of the highlights of pregnancy."},
      {type:"tip",text:"💡 Ask your clinic if they offer printed photos or a short video clip of the scan, many do, sometimes for a small fee. These images become incredibly precious keepsakes. And don't feel shy about asking the sonographer to explain what you're looking at during the scan, they love helping parents see and understand what they're seeing on the screen!"},
    ]
  },
  {
    id:"sleep-tips",
    title:"Pregnancy Sleep Tips: How to Rest Better",
    cat:"Wellness",read:"5 min read",icon:"😴",
    desc:"Why sleep is harder during pregnancy and science-backed strategies to get better rest every trimester.",
    content:[
      {type:"intro",text:"Sleep during pregnancy, why does it feel like your body suddenly forgot how to do something it's been doing your whole life? Between the midnight bathroom trips, the relentless leg cramps, the pregnancy brain keeping you awake with a thousand thoughts, and the increasingly challenging mission of finding a comfortable position with a growing bump, restful sleep can feel genuinely impossible some nights. Here's what actually helps."},
      {type:"heading",text:"Why Is Sleep So Hard During Pregnancy? 🤷‍♀️"},
      {type:"para",text:"Each trimester brings its own unique set of sleep challenges. In the first trimester, extreme fatigue makes you desperate for sleep, but frequent urination and nausea often disrupt it. The second trimester usually brings welcome relief for most women. By the third trimester, your growing belly makes comfortable positions limited, heartburn worsens when you lie down, leg cramps wake you at night, and anxiety about the upcoming birth can keep your mind racing when you most want to rest."},
      {type:"heading",text:"Sleep on Your Left Side, Here's Why It Matters 🛌"},
      {type:"para",text:"You've probably heard this recommendation before, and it's genuinely important, especially in the third trimester. Sleeping on your left side optimizes blood flow through your inferior vena cava (the large vein that carries blood back to your heart), improves circulation to the placenta and kidneys, and reduces pressure on your liver. A large C-shaped or U-shaped pregnancy pillow can make left-side sleeping dramatically more comfortable and help you stay in position throughout the night."},
      {type:"heading",text:"Dealing with Leg Cramps 🦵"},
      {type:"para",text:"Those sudden, intensely painful muscle cramps that jolt you awake in the middle of the night are one of the most universally complained-about pregnancy symptoms. Making a habit of stretching your calf muscles before bed can help prevent them. When a cramp does strike, immediately flex your foot upward so your toes point toward your knee, and gently massage the cramping muscle. Staying well-hydrated and ensuring you're getting adequate magnesium and calcium in your diet can also reduce the frequency of cramps."},
      {type:"heading",text:"Taming Nighttime Heartburn 🔥"},
      {type:"para",text:"As your uterus expands and your growing baby puts increasing pressure on your stomach, stomach acid can be pushed upward into your esophagus, causing that burning, uncomfortable sensation of heartburn. Eating smaller meals throughout the day instead of large ones, avoiding eating within 2 to 3 hours of bedtime, and elevating your upper body with a wedge pillow or extra pillows can all help significantly. Antacids like Tums are generally considered safe during pregnancy, but always confirm with your doctor first."},
      {type:"heading",text:"When Anxiety Keeps You Awake 💭"},
      {type:"para",text:"It's completely normal to lie awake at night thinking about whether you'll be a good parent, whether your baby is healthy, whether labor will go smoothly, and a thousand other worries. Writing down your concerns in a journal before bed, practicing deep diaphragmatic breathing, doing a short prenatal yoga session in the evening, or talking through your worries with your partner can all help quiet an anxious mind. If anxiety is severe or persistent, please mention it to your healthcare provider."},
      {type:"tip",text:"💡 Napping during pregnancy is not laziness, it's genuinely recommended by most healthcare providers. A 20 to 30 minute nap in the early afternoon can dramatically restore your energy and improve how you feel for the rest of the day. Your body is growing an entire human being from scratch. It deserves rest. Don't fight the urge to nap, embrace it!"},
    ]
  },
  {
    id:"week-by-week-first",
    title:"First Trimester Week by Week: What to Expect",
    cat:"First Trimester",read:"8 min read",icon:"🌷",
    desc:"A warm, detailed guide to weeks 1 through 13 what's happening with your baby and your body each week.",
    content:[
      {type:"intro",text:"The first trimester is simultaneously the most invisible and the most transformative period of your entire pregnancy. From the outside, nothing looks different. But inside your body, an absolutely extraordinary process is underway. Here's what's really happening week by week during these remarkable first 13 weeks."},
      {type:"heading",text:"Weeks 1, 2: The Very Beginning 🌱"},
      {type:"para",text:"Interestingly, during weeks 1 and 2 you aren't actually pregnant yet, at least not in the conventional sense. Week 1 starts on the first day of your last menstrual period, and conception typically occurs around day 14 of your cycle during ovulation. This is why pregnancy is counted from your last period rather than from the moment of conception."},
      {type:"heading",text:"Week 3: Conception! ✨"},
      {type:"para",text:"This is when the magic actually happens. A single sperm fertilizes your egg in the fallopian tube, creating a zygote containing 46 chromosomes, 23 from you and 23 from your partner. This microscopic bundle of cells already contains everything that will determine your baby's eye color, hair color, height, and countless other traits. It begins traveling down toward the uterus, dividing and growing with every hour."},
      {type:"heading",text:"Week 4: Implantation 🏠"},
      {type:"para",text:"The rapidly growing ball of cells, now called a blastocyst, burrows into the lining of your uterus in a process called implantation. This is when you might notice very light spotting. Your body begins producing hCG, the pregnancy hormone, and a home pregnancy test will now show a positive result. Your baby is currently about the size of a poppy seed."},
      {type:"heading",text:"Weeks 5, 6: The Heart Begins Beating 💗"},
      {type:"para",text:"By week 5, the neural tube that will become your baby's brain and spinal cord is forming. By week 6, something truly miraculous happens, your baby's tiny heart begins beating. It's incredibly small, but it's beating. This is also when morning sickness typically begins for many women, as hCG levels rise rapidly. Your baby is now the size of a sweet pea."},
      {type:"heading",text:"Weeks 7, 8: Features Form 👶"},
      {type:"para",text:"Your baby is growing at a breathtaking pace, doubling in size almost weekly. Tiny arm and leg buds are forming and growing longer. The face is beginning to take shape, with dark spots where the eyes will be, and small indentations where the ears and nose will form. All the major internal organs are beginning to develop. By week 8, your baby officially graduates from embryo to fetus, a real milestone."},
      {type:"heading",text:"Weeks 9, 10: Fingers and Toes 🖐️"},
      {type:"para",text:"This is one of the most exciting developmental periods. Your baby's tiny fingers and toes are forming, separating from what were previously paddle-shaped hands and feet. The teeth are beginning to form inside the gums. Your baby can now make tiny spontaneous movements, though you won't feel them for many more weeks yet. The face is becoming increasingly recognizable as a human face."},
      {type:"heading",text:"Weeks 11, 13: End of the First Trimester 🎉"},
      {type:"para",text:"You are almost through the first trimester! By week 11, all of your baby's major organ systems have formed and are beginning to function. By week 12, your baby can yawn, make facial expressions, and even suck their thumb. The risk of miscarriage drops significantly around this time, which is why many couples choose to share their pregnancy news at the end of the first trimester. By week 13, your baby is about the size of a lemon and weighs nearly 23 grams."},
      {type:"tip",text:"💡 The first trimester is exhausting, nauseating, and often emotionally intense, but you're doing an incredible thing. Be gentle with yourself. Rest when you need to, eat what you can manage, and know that most of the hardest symptoms will ease significantly as you move into the second trimester."},
    ]
  },
  {
    id:"week-by-week-second",
    title:"Second Trimester Guide: The Golden Weeks",
    cat:"Second Trimester",read:"7 min read",icon:"⭐",
    desc:"Everything you need to know about weeks 14 to 26 the most comfortable and exciting phase of pregnancy.",
    content:[
      {type:"intro",text:"Welcome to the second trimester, what many pregnant women affectionately call the golden trimester. And for very good reason. The relentless nausea of the first trimester has usually eased. Your energy is returning. You're starting to look visibly pregnant in the most beautiful way. And this is when you'll feel your baby move for the very first time. These are special weeks, here's what to expect."},
      {type:"heading",text:"Week 14: A New Chapter Begins 🌤️"},
      {type:"para",text:"Congratulations on reaching the second trimester! Your baby's facial muscles are now developed enough to make expressions, they can squint, frown, and even make sucking movements. Your risk of miscarriage has dropped significantly. Many women notice their appetite returning with renewed enthusiasm this week, which is wonderful because your baby needs good nutrition now more than ever."},
      {type:"heading",text:"Week 16: Baby Can Hear You 👂"},
      {type:"para",text:"One of the most touching milestones of the second trimester happens around week 16, your baby can now hear sounds from the outside world. Your voice, your heartbeat, music, and the sounds of your daily life are all reaching your baby. Many parents begin talking, singing, or reading to their baby from this point. Research suggests babies can recognize their mother's voice from birth partly because they've been listening to it in the womb for months."},
      {type:"heading",text:"Week 18, 20: Quickening, Feeling Baby Move 🦋"},
      {type:"para",text:"This is one of the most magical moments in all of pregnancy, feeling your baby move for the first time, a sensation called quickening. First-time mothers often describe it as feeling like butterfly wings, gentle bubbles, or a soft fluttering low in the abdomen. It can be easy to mistake for gas initially. Second-time mothers usually feel it earlier because they know what to look for. Once you feel it, you'll want to feel it every day."},
      {type:"heading",text:"Week 20: The Halfway Point and Anatomy Scan 🔬"},
      {type:"para",text:"You've reached the halfway point of your pregnancy! This week is also when the detailed anatomy scan is typically scheduled, giving you and your medical team a comprehensive look at your baby's development. Many parents also find out the baby's sex at this appointment if they choose to. Your baby now weighs about 300 grams and is roughly the length of a banana, they're getting real!"},
      {type:"heading",text:"Week 24: Viability Milestone 🌟"},
      {type:"para",text:"Week 24 marks an incredibly significant milestone, the point of viability. This means that if your baby were born now, they would have a chance of surviving with intensive medical care. Of course, the goal is for your baby to continue growing and developing in the womb for many more weeks. But reaching this milestone is an important and emotionally significant moment for many parents."},
      {type:"heading",text:"Weeks 25, 26: Growing Fast 📏"},
      {type:"para",text:"In these final weeks of the second trimester, your baby is putting on weight rapidly, developing a layer of fat under the skin, and their lungs are beginning to produce surfactant, the substance that allows them to breathe air after birth. Your baby's eyes can now open and close, and they're becoming increasingly responsive to light and sound. The kicks and movements are getting stronger and more noticeable."},
      {type:"tip",text:"💡 The second trimester is the perfect time to start your baby registry, tour your delivery hospital, sign up for childbirth education classes, and begin gentle prenatal exercise if you haven't already. You'll have more energy now than in the third trimester, so make the most of this wonderful window!"},
    ]
  },
  {
    id:"week-by-week-third",
    title:"Third Trimester: Your Final Stretch Guide",
    cat:"Third Trimester",read:"7 min read",icon:"🎀",
    desc:"Week by week guide to the third trimester preparing your body, your home, and your heart for baby's arrival.",
    content:[
      {type:"intro",text:"You've made it to the third trimester, the final stretch! Your baby is nearly fully formed and is now focused primarily on gaining weight and strength. Your body is working incredibly hard. Sleep is getting harder, movement is more challenging, and you're probably counting down the days. Here's your complete guide to these remarkable final weeks."},
      {type:"heading",text:"Week 28: Eyes Open for the First Time 👀"},
      {type:"para",text:"Welcome to the third trimester! This week, your baby opens their eyes for the very first time. They can see light filtering through the walls of your uterus. Their brain is developing rapidly, and they're entering a period of dramatic growth. You'll likely notice your baby's movements becoming stronger and more deliberate. This is also a good time to start tracking kick counts, your doctor may recommend feeling for at least 10 movements within two hours each day."},
      {type:"heading",text:"Week 30, 32: Getting Into Position 🔄"},
      {type:"para",text:"Between weeks 30 and 32, most babies begin turning into a head-down position in preparation for birth. This is called cephalic presentation, and it's exactly where you want your baby to be. Your uterus is now large enough that you might feel breathless going up stairs or even just walking quickly, as your baby is pressing up against your diaphragm. Sleeping is becoming increasingly challenging, this is completely normal."},
      {type:"heading",text:"Week 34, 36: Final Preparations 📋"},
      {type:"para",text:"Your baby's lungs are maturing rapidly in these weeks and will be nearly ready to breathe air by week 36. The fine hair covering their body (called lanugo) is mostly gone. Your baby is now practicing breathing movements, sucking, and swallowing in preparation for life outside the womb. This is the ideal time to pack your hospital bag, install the car seat, and finalize your birth plan."},
      {type:"heading",text:"Week 37, 38: Full Term! 🎉"},
      {type:"para",text:"At week 37, your baby is considered full term, meaning they are fully developed and ready to be born at any time. Some babies come early, some come late, but they're all ready. In these weeks you might notice a sudden burst of energy and an overwhelming urge to clean and organize your home, this is called the nesting instinct, and it's completely real and very common. Enjoy it, but don't overdo it."},
      {type:"heading",text:"Week 39, 40: Any Day Now 👶"},
      {type:"para",text:"You've reached your due date zone. Your baby could arrive any day. Watch for the signs of labor: regular contractions that get closer together and more intense over time, your water breaking, losing your mucus plug (a thick discharge that may be tinged with blood), and feeling increasing pressure in your pelvis. When contractions are consistently 5 minutes apart for at least an hour, it's time to head to the hospital or birth center."},
      {type:"tip",text:"💡 Remember that your due date is an estimate, not a deadline. Only about 5% of babies are born on their actual due date. Most babies arrive within two weeks before or after. Stay in close communication with your healthcare provider, rest as much as you can, and trust your body, it knows exactly what to do."},
    ]
  },
  {
    id:"hospital-bag",
    title:"The Ultimate Hospital Bag Checklist",
    cat:"Preparation",read:"6 min read",icon:"🎒",
    desc:"Everything you need to pack for the hospital for mom, baby, and your support person so you're ready when the moment comes.",
    content:[
      {type:"intro",text:"There's something about packing your hospital bag that makes everything feel suddenly very real. Your baby is actually coming, and you need to be ready. The good news is that most hospitals provide more than you'd expect, so you don't need to pack your entire house. Here's a thoughtfully curated, practical list of everything that will genuinely make your hospital stay more comfortable."},
      {type:"heading",text:"When Should You Pack? ⏰"},
      {type:"para",text:"Most pregnancy experts recommend having your hospital bag packed and ready by week 35 or 36. Babies don't always wait until their due date, and the last thing you want is to be frantically stuffing a bag while you're in early labor. Pack it early, keep it by the door, and give yourself the peace of mind of knowing you're prepared."},
      {type:"heading",text:"For Mom: Labor and Delivery 🌸"},
      {type:"para",text:"Your most important documents: your birth plan (if you have one), your ID, insurance card, and hospital pre-registration paperwork. Comfortable, loose clothing, a zip-up robe or button-front nightgown works perfectly for skin-to-skin contact with your newborn and breastfeeding. Your own pillow with a distinctive pillowcase so it doesn't get mixed up with hospital pillows. Phone charger, absolutely essential. Snacks for labor if your hospital permits them. A small speaker for music if you'd like it during labor."},
      {type:"heading",text:"For Mom: Recovery Stay 💆"},
      {type:"para",text:"After delivery you'll typically stay 24 to 48 hours for a vaginal birth or 3 to 4 days for a cesarean section. Pack comfortable, loose pajamas or nightgowns (dark colors are practical), warm socks with non-slip grips, your own toiletries including shampoo, conditioner, toothbrush, and lip balm, nipple cream like Lansinoh if you plan to breastfeed, any medications you take regularly, and comfortable underwear or disposable postpartum underwear."},
      {type:"heading",text:"For Baby 👶"},
      {type:"para",text:"The hospital will provide diapers, wipes, and basic clothing during your stay. But for the trip home you'll need: a properly installed infant car seat, you cannot leave the hospital without one, a warm going-home outfit in newborn size (and one in 0-3 months as backup), a soft blanket, and a hat. That's genuinely all you need for baby at the hospital, keep it simple."},
      {type:"heading",text:"For Your Support Person 👫"},
      {type:"para",text:"Labor can be long and your support person needs to be comfortable too. They should pack a change of clothes (at least one), comfortable shoes, snacks (lots of snacks, the cafeteria closes at night), their phone charger, and cash for vending machines. A pillow and blanket for the pull-out chair or sofa in the room is also a thoughtful addition."},
      {type:"tip",text:"💡 Don't stress about forgetting something, the hospital gift shop or a nearby pharmacy can usually supply anything you've missed. The most important things are your documents, your car seat, and your support person. Everything else is just comfort. You've got this!"},
    ]
  },
  {
    id:"baby-names",
    title:"How to Choose the Perfect Baby Name",
    cat:"Preparation",read:"5 min read",icon:"📝",
    desc:"A warm, practical guide to choosing a baby name you'll love forever including tips, trends, and common mistakes to avoid.",
    content:[
      {type:"intro",text:"Choosing your baby's name is one of the most personal, meaningful, and, let's be honest, occasionally stressful decisions of your entire pregnancy. This is a name your child will carry with them for their entire life. No pressure! Here's a genuinely helpful guide to finding a name that feels right for your family."},
      {type:"heading",text:"Start With What Matters to You 💗"},
      {type:"para",text:"Before diving into name lists, take a moment to think about what qualities matter most to you in a name. Do you want something with family meaning or cultural significance? Do you prefer classic, timeless names or something more modern and unique? Does it matter that the name is easy to pronounce and spell? Is a specific initial, meaning, or sound important to you? Knowing your priorities makes the search much more focused."},
      {type:"heading",text:"The Sound Test 🔊"},
      {type:"para",text:"Say the full name out loud, first, middle, and last name together. How does it flow? Names where the first name ends with the same sound that the last name begins with can sometimes sound like one long blur. Also say the name in the context you'll use it most: calling it across a playground, saying it sternly when your child is in trouble, and whispering it softly. If it sounds right in all three contexts, that's a great sign."},
      {type:"heading",text:"Consider the Nickname Factor 🏷️"},
      {type:"para",text:"Almost every name gets shortened or nicknamed eventually, by classmates, by grandparents, or by your child themselves. Think about what nicknames naturally come from the name you're considering. Some parents love built-in nickname options (Elizabeth becoming Ellie, Liz, Beth, or Betsy). Others want a name with no obvious nickname. Neither approach is wrong, just be intentional about it."},
      {type:"heading",text:"The Initials and Combination Check ✏️"},
      {type:"para",text:"This one sounds silly but is genuinely worth doing, write out your baby's full initials. Some initial combinations spell things that could become the source of childhood teasing. Similarly, check whether the first and last name combination sounds like something unintended. These things might seem minor, but your child will appreciate the thoughtfulness when they're older."},
      {type:"heading",text:"Trust Your Gut, But Sleep on It 🌙"},
      {type:"para",text:"When you find a name that makes both of you feel something, a warmth, an excitement, a sense of rightness, pay attention to that feeling. But also give it a few days before committing. Names can grow on you or grow off you with time. The name you're obsessed with at week 20 might feel different at week 38. And it's completely okay to wait until you meet your baby to make the final decision."},
      {type:"tip",text:"💡 You don't have to announce your chosen name to the world before the birth, and many parents choose not to. Keeping it private protects you from unsolicited opinions from well-meaning family members. Once the baby is here and named, people are much less likely to criticize!"},
    ]
  },
  {
    id:"exercise-pregnancy",
    title:"Safe Exercise During Pregnancy: Complete Guide",
    cat:"Wellness",read:"6 min read",icon:"🧘‍♀️",
    desc:"Which exercises are safe, which to avoid, and how staying active during pregnancy benefits both you and your baby.",
    content:[
      {type:"intro",text:"The idea of exercising while pregnant might seem counterintuitive, you're exhausted, your body is changing rapidly, and the sofa is calling your name. But staying active during pregnancy is genuinely one of the best things you can do for both yourself and your baby, and most women can continue exercising safely throughout all three trimesters with a few thoughtful modifications."},
      {type:"heading",text:"Why Exercise During Pregnancy Is So Beneficial 💪"},
      {type:"para",text:"Regular moderate exercise during pregnancy has been shown to reduce the risk of gestational diabetes, reduce the severity of back pain and other musculoskeletal discomforts, improve sleep quality, boost mood and reduce anxiety and depression, potentially reduce labor time, speed postpartum recovery, and may even benefit your baby's heart health and brain development. The evidence is genuinely compelling."},
      {type:"heading",text:"The Best Exercises When Pregnant 🏃‍♀️"},
      {type:"para",text:"Walking is the single most universally recommended exercise during pregnancy, it's free, requires no equipment, and can be done at any intensity level that feels comfortable. Swimming and water aerobics are also excellent because the water supports your growing belly and takes pressure off your joints. Prenatal yoga improves flexibility, strengthens the muscles you'll use during labor, and has wonderful benefits for mental health and stress reduction."},
      {type:"para",text:"Stationary cycling is safe because it eliminates the fall risk of regular outdoor cycling. Low-impact aerobics specifically designed for pregnancy are widely available in classes and on YouTube. Strength training with light to moderate weights is also safe and beneficial, just avoid exercises that require lying flat on your back after the first trimester, as this position can compress a major blood vessel and reduce blood flow."},
      {type:"heading",text:"Exercises to Avoid ⚠️"},
      {type:"para",text:"Some activities carry risks that outweigh their benefits during pregnancy. Avoid contact sports like basketball, soccer, or hockey where falls or collisions are possible. Avoid scuba diving, high-altitude activities above 6,000 feet if you're not acclimatized, activities with a high fall risk like skiing or horseback riding, and any exercise that causes significant breathlessness where you can't hold a conversation. After the first trimester, avoid exercises done lying flat on your back for extended periods."},
      {type:"heading",text:"Listening to Your Body 💗"},
      {type:"para",text:"Pregnancy is not the time to push your limits or try to hit personal records. Exercise should feel moderately challenging, what experts call the 'talk test' is a helpful guide: you should be working hard enough to raise your heart rate but still able to hold a conversation. Stop immediately and call your doctor if you experience chest pain, severe shortness of breath, dizziness, vaginal bleeding, or painful contractions during or after exercise."},
      {type:"tip",text:"💡 If you weren't exercising regularly before pregnancy, this is not the time to suddenly start an intense new routine. Start gently with 10-15 minutes of walking per day and build gradually. If you were very active before pregnancy, you can usually continue your routine with modifications. Always discuss your exercise plans with your healthcare provider, they know your specific situation best."},
    ]
  },
  {
    id:"mental-health",
    title:"Pregnancy and Mental Health: You Are Not Alone",
    cat:"Wellness",read:"6 min read",icon:"🧡",
    desc:"Honest, compassionate guidance on managing anxiety, depression, and emotional wellbeing during pregnancy.",
    content:[
      {type:"intro",text:"We talk a lot about the physical aspects of pregnancy, the symptoms, the appointments, the nutrition. But the emotional and mental health journey of pregnancy deserves just as much attention and care. The truth is that pregnancy can be emotionally complex and sometimes very challenging, even when everything is going well medically. You are not alone in this, and there is no shame in struggling."},
      {type:"heading",text:"It's Normal to Have Mixed Feelings 💭"},
      {type:"para",text:"Society often presents pregnancy as a uniformly joyful, glowing experience. But real pregnancy is far more nuanced than that. It's completely normal to feel excited one moment and terrified the next. It's normal to have days where you feel overwhelmed, resentful, grieving your pre-pregnancy life, or simply not happy, even if your pregnancy was very much wanted. These feelings don't make you a bad mother. They make you human."},
      {type:"heading",text:"Prenatal Anxiety, More Common Than You Think 😟"},
      {type:"para",text:"Prenatal anxiety is extremely common, affecting roughly 15 to 20 percent of pregnant women. It might show up as constant worry about your baby's health, fear of miscarriage or complications, excessive fear about labor and delivery, or generalized anxiety that makes it hard to concentrate or sleep. If anxiety is significantly interfering with your daily life or your ability to enjoy your pregnancy, please talk to your healthcare provider, effective help is available."},
      {type:"heading",text:"Prenatal Depression Is Real and Treatable 🌧️"},
      {type:"para",text:"Depression during pregnancy (not just postpartum depression) affects approximately 10 to 15 percent of pregnant women. Symptoms include persistent sadness, loss of interest in things you used to enjoy, feeling hopeless or worthless, changes in appetite or sleep beyond what pregnancy normally causes, and difficulty bonding with your pregnancy. Please know that prenatal depression is a medical condition, not a personal failing, and it responds well to treatment."},
      {type:"heading",text:"What Actually Helps 🌱"},
      {type:"para",text:"Talking honestly with your partner, a close friend, or a family member about how you're feeling is one of the most powerful things you can do. Prenatal counseling or therapy with a professional experienced in perinatal mental health can be transformative. Support groups, both in person and online, connect you with other pregnant women who truly understand what you're going through. Regular gentle exercise, adequate sleep, time in nature, and limiting social media comparisons all contribute meaningfully to emotional wellbeing."},
      {type:"tip",text:"💡 If you are having thoughts of harming yourself or feeling like you cannot cope, please reach out for help immediately. Call your doctor, go to your nearest emergency room, or contact a crisis helpline. You are not alone. You deserve support. And getting help is one of the most loving things you can do for yourself and your baby."},
    ]
  },
  {
    id:"labor-signs",
    title:"Signs of Labor: How to Know When It's Time",
    cat:"Birth Preparation",read:"5 min read",icon:"🏥",
    desc:"A calm, clear guide to recognizing the signs of labor so you know exactly when to head to the hospital.",
    content:[
      {type:"intro",text:"As your due date approaches, one question takes over everything else: how will I know when I'm actually in labor? The good news is that your body gives you clear signals, and once you know what to look for, you'll feel much more confident and much less anxious about recognizing the real thing. Here's your complete, calm guide to the signs of labor."},
      {type:"heading",text:"Early Signs That Labor Is Approaching (Days to Weeks Before) 📅"},
      {type:"para",text:"In the weeks before active labor begins, your body starts preparing in several noticeable ways. Baby dropping (also called lightening) is when your baby settles lower into your pelvis, you might feel less pressure on your ribs and be able to breathe more easily, but you'll need to urinate even more frequently. Losing your mucus plug is when the thick plug of mucus that has sealed your cervix throughout pregnancy comes out as a clear, pink, or slightly blood-tinged discharge. Increased Braxton Hicks contractions become more frequent and sometimes uncomfortable."},
      {type:"heading",text:"Your Water Breaking 💧"},
      {type:"para",text:"Despite how it's depicted in movies, as a sudden dramatic gush at an inconvenient moment, your water (amniotic fluid) breaking actually feels different for most women. For some it is indeed a gush, but for many others it's a slow, steady trickle of clear or slightly pinkish fluid that doesn't stop. If you think your water has broken, put on a pad and call your healthcare provider immediately, even if you're not having contractions yet. Your baby needs to be born within a certain timeframe once the protective sac has ruptured."},
      {type:"heading",text:"Real Labor Contractions vs. Braxton Hicks 🔄"},
      {type:"para",text:"This is the question that keeps most first-time mothers awake at night. Here's the key difference: Braxton Hicks contractions are irregular, don't follow a pattern, tend to ease when you change positions or drink water, and don't get progressively stronger. Real labor contractions are regular and rhythmic, get longer, stronger, and closer together over time, don't go away when you change positions or rest, and feel like a tightening that starts in your back and wraps around to your front."},
      {type:"heading",text:"The 5-1-1 Rule ⏱️"},
      {type:"para",text:"Most healthcare providers use what's called the 5-1-1 rule as the guideline for when to go to the hospital: contractions that are 5 minutes apart, lasting at least 1 minute each, for at least 1 hour. However, every provider and every pregnancy is different, your doctor or midwife will give you personalized guidance at your appointments. If you're ever unsure, it is always okay to call your provider or go in to be checked. There is no such thing as a silly question when it comes to labor."},
      {type:"tip",text:"💡 Pack your hospital bag well before your due date so you're never scrambling. Keep your provider's phone number saved somewhere easy to find. And try to remember: your body was designed for this. Millions of women have done exactly what you're about to do. You are more prepared and more capable than you realize."},
    ]
  },
  {
    id:"postpartum-prep",
    title:"Preparing for Postpartum: What Nobody Tells You",
    cat:"Birth Preparation",read:"7 min read",icon:"🤱",
    desc:"An honest, compassionate guide to the fourth trimester what to expect after birth and how to prepare for recovery.",
    content:[
      {type:"intro",text:"Everyone prepares intensely for the birth. Classes, books, YouTube videos, birth plans, there's a wealth of preparation for the moment of labor and delivery. But the weeks and months after birth, the postpartum period, sometimes called the fourth trimester, are often where new parents feel most blindsided and least prepared. Here's the honest, practical guide nobody gives you."},
      {type:"heading",text:"Physical Recovery Is Real, For Everyone 💪"},
      {type:"para",text:"Whether you had a vaginal delivery or a cesarean section, your body has been through a significant physical experience and it needs time to heal. For vaginal deliveries, perineal soreness, swelling, and discomfort are normal and can last several weeks. Sitz baths, witch hazel pads, and ice packs provide real relief. For cesarean births, recovery takes longer, typically 6 to 8 weeks, and involves managing incision care and gradually returning to activity. Either way, please ask for and accept all the help that's offered."},
      {type:"heading",text:"The Baby Blues vs. Postpartum Depression 💙"},
      {type:"para",text:"Up to 80 percent of new mothers experience the baby blues in the first two weeks after birth, brief but intense episodes of sadness, weepiness, anxiety, and irritability that come and go unpredictably. This is caused by the dramatic hormonal shift after delivery and typically resolves on its own within two weeks. Postpartum depression is different: it's more persistent, more severe, and doesn't improve without support and treatment. If sadness, anxiety, or feelings of hopelessness last longer than two weeks or feel overwhelming, please reach out to your healthcare provider right away."},
      {type:"heading",text:"Breastfeeding Is a Skill, It Takes Practice 🤱"},
      {type:"para",text:"Many new mothers are surprised to discover that breastfeeding, despite being natural, doesn't always come naturally or easily at first. Latch difficulties, engorgement, nipple soreness, and supply concerns are all very common in the first weeks. This doesn't mean you're failing. Working with a lactation consultant, ideally before you leave the hospital, can make an enormous difference. Give yourself and your baby time to learn together. It usually does get easier."},
      {type:"heading",text:"The Importance of Having Help Ready 🙌"},
      {type:"para",text:"The single most important thing you can do to prepare for postpartum is to arrange for help before your baby arrives. Line up family or friends who can cook meals, do laundry, hold the baby while you sleep, and help with older children. If your budget allows, a postpartum doula can be invaluable. Accept every offer of help that comes. You cannot pour from an empty cup, and taking care of yourself is one of the most important things you can do for your baby."},
      {type:"heading",text:"Freezer Meals Are Life-Changing 🍲"},
      {type:"para",text:"Spend some time during your third trimester preparing and freezing meals for the postpartum period. Double recipes when you cook and freeze half. Ask friends and family to organize a meal train. Simple, nutritious meals that can be reheated in minutes are worth their weight in gold during those early weeks when you're running on interrupted sleep and every spare moment is precious."},
      {type:"tip",text:"💡 Lower your expectations for the first few weeks after birth, not because you're not capable, but because you're doing something incredibly demanding: recovering physically, learning to care for a newborn, and going through a profound life transition simultaneously. A clean house can wait. Answered messages can wait. Rest, bond with your baby, and heal. Everything else can wait."},
    ]
  }  ,{
    id:"pregnancy-travel",
    title:"Travel During Pregnancy: Complete Safety Guide for 2026",
    cat:"Lifestyle",read:"7 min read",icon:"✈️",
    desc:"Everything you need to know about traveling safely during pregnancy best trimester to travel, flying tips, road trip advice, and international travel precautions.",
    content:[
      {type:"intro",text:"Pregnancy does not have to mean putting your entire life on hold for nine months, and that includes travel. The vast majority of healthy pregnant women can travel safely throughout much of their pregnancy, whether the purpose is a family visit, work travel, or the increasingly popular babymoon before your baby arrives and changes everything. That said, pregnancy introduces genuine considerations and precautions that matter deeply for both your safety and your baby's wellbeing. Here is your comprehensive, practical guide to everything you need to know about travel during pregnancy, covering flying, road trips, and international journeys."},
      {type:"heading",text:"Best Time to Travel During Pregnancy 📅"},
      {type:"para",text:"If you have any flexibility about when during your pregnancy to take a significant trip, the second trimester, broadly from weeks fourteen through twenty-eight, is universally recognized as the safest and most comfortable window for expectant travelers. Several factors converge to make the second trimester the sweet spot. The risk of miscarriage, which is highest in the first trimester, drops substantially after twelve weeks. The relentless nausea and crushing fatigue that define the first trimester have typically eased or resolved entirely by week fourteen. The extreme discomfort, breathlessness, and logistical challenges of a very large third trimester bump have not yet arrived. Your energy levels during the second trimester are generally at their peak for the entire pregnancy, meaning you can actually enjoy the experience of traveling rather than simply enduring it. And most airlines impose no flying restrictions during the second trimester, giving you maximum booking flexibility."},
      {type:"heading",text:"Flying During Pregnancy: Everything You Need to Know ✈️"},
      {type:"para",text:"Commercial air travel is generally considered safe for healthy pregnant women with uncomplicated pregnancies up to approximately thirty-six weeks of gestation. The cabin pressure maintained in commercial aircraft, equivalent to an altitude of roughly six to eight thousand feet, is considered safe for healthy pregnant women and their babies. The cosmic radiation exposure from a single flight, even a long-haul international journey, is negligible and poses no meaningful risk. The primary pregnancy-specific concern with air travel is deep vein thrombosis, the formation of blood clots in the deep veins of the legs, which is naturally elevated during pregnancy due to changes in blood clotting factors and is further increased by prolonged immobility in a confined aircraft seat."},
      {type:"para",text:"To meaningfully reduce your deep vein thrombosis risk on any flight, adopt several practical evidence-based strategies consistently throughout your journey. Get up from your seat and walk the length of the aisle for several minutes every hour. When getting up is not possible, perform regular calf raises, ankle circles, and foot flexion exercises in your seat to actively pump blood through the leg veins. Wear properly fitted graduated compression stockings throughout the entire journey, multiple clinical studies have demonstrated that compression stockings meaningfully reduce DVT risk in pregnant air travelers. Stay consistently hydrated by sipping water throughout the flight rather than waiting until you feel thirsty, as dehydration exacerbates clotting risk. Choose an aisle seat whenever possible to make it easier to get up frequently. For very long-haul flights over eight hours, speak with your healthcare provider beforehand, as they may recommend a preventive injection of low-molecular-weight heparin as an additional protective measure."},
      {type:"heading",text:"Understanding Airline Policies and Restrictions 🎫"},
      {type:"para",text:"Every airline has its own specific policies regarding pregnant passengers, and these policies vary considerably between carriers, so checking your airline's current rules before booking is genuinely important. Most airlines allow pregnant passengers to fly freely with no documentation required up to approximately twenty-eight weeks. Between weeks twenty-eight and thirty-six, many airlines require a medical certificate from your obstetrician or midwife confirming your due date, that you are in good health, that your pregnancy is uncomplicated, and that you are medically fit to fly. Most airlines will not carry passengers beyond thirty-six weeks at all, with stricter cutoffs sometimes applied to very long international routes. If you are carrying twins or higher-order multiples, restrictions typically begin considerably earlier than for singleton pregnancies. Always contact your specific airline directly and verify their current policy before booking flights, as airline policies do change and vary significantly."},
      {type:"heading",text:"Road Trips and Car Travel During Pregnancy 🚗"},
      {type:"para",text:"Long car journeys are generally safe during pregnancy with some straightforward and important planning adjustments. The most significant modification from non-pregnant travel is the frequency of rest breaks. Plan to stop the car and get out completely every sixty to ninety minutes throughout any long journey, walking around for at least five to ten minutes and using the restroom at each stop. Prolonged sitting in any fixed position impairs circulation in the legs and is associated with increased blood clot risk during pregnancy, making regular movement breaks a genuine safety measure rather than merely a comfort preference. Pack healthy snacks and water to maintain your energy and stay hydrated throughout the journey, and wear comfortable, non-restrictive clothing."},
      {type:"para",text:"Seatbelt use during pregnancy is absolutely non-negotiable and is significantly safer than not wearing one in virtually every possible circumstance. The correct positioning of the seatbelt matters particularly during pregnancy. Place the lap belt portion as low as possible, across your hip bones and pubic bone, below your bump rather than across it. Position the shoulder belt across your chest between your breasts and over your collarbone, not under your arm or behind your back, both of which dramatically reduce its effectiveness. If you are involved in any road accident during pregnancy, even a minor one where you feel completely fine immediately afterward, seek medical evaluation from a healthcare provider as a precaution, as the forces involved in a collision can potentially affect the placenta even without obvious external injury to you."},
      {type:"heading",text:"International Travel: Special Considerations 🌍"},
      {type:"para",text:"International travel during pregnancy requires considerably more advance planning than domestic travel. Before booking any international trip while pregnant, research the quality and accessibility of obstetric medical care at your destination. If a pregnancy complication or emergency were to arise while abroad, preterm labor, significant bleeding, a fall, or any other acute pregnancy concern, knowing in advance where you would seek care and whether appropriate facilities and expertise are available is genuinely important for your safety. This consideration is especially relevant for remote destinations, countries with limited healthcare infrastructure, or locations where language barriers would create significant obstacles to receiving care quickly."},
      {type:"para",text:"Review the travel health advisories for your specific destination thoroughly and well in advance. Zika virus remains an active concern in parts of Central and South America, the Caribbean, Southeast Asia, and various Pacific Island nations, and infection during pregnancy is associated with serious congenital abnormalities in the developing baby including microcephaly. If Zika virus transmission is occurring at your intended destination, the recommendation is to postpone travel until after birth. Malaria poses particular risks during pregnancy, the disease is significantly more severe in pregnant women, and a number of commonly used anti-malarial medications are contraindicated in pregnancy. Ensure that your travel insurance policy explicitly and clearly covers pregnancy-related medical emergencies, emergency obstetric care, and the potential cost of early delivery or extended medical stay abroad, as standard travel insurance policies very commonly exclude pregnancy-related claims."},
      {type:"tip",text:"💡 Before booking any travel during pregnancy, have a detailed conversation with your healthcare provider. Share specifics: your exact destination, planned mode of travel, how many weeks pregnant you will be at the time of the trip, and the total duration. Your provider knows your individual health status and pregnancy risk level and can give you personalized guidance that no general article can fully replace. The vast majority of healthy pregnant women are cleared to travel with appropriate precautions. Get that professional clearance first, then enjoy planning your trip, you absolutely deserve it!"},
    ]
  }
  ,{
    id:"prenatal-vitamins",
    title:"Prenatal Vitamins Guide: What to Take and When to Start",
    cat:"Nutrition",read:"6 min read",icon:"💊",
    desc:"Which prenatal vitamins actually matter, when to start taking them, and how to choose the right one for you.",
    content:[
      {type:"intro",text:"Walk into any pharmacy and you will find an entire wall devoted to prenatal vitamins, different brands, different formulas, vastly different price points ranging from a few dollars to over fifty dollars per month. The sheer variety is genuinely bewildering, and the marketing language on many products makes the choice no clearer. The truth is that not all prenatal vitamins are created equal, and understanding what specific nutrients to look for and what form those nutrients should come in makes the decision considerably more straightforward. Here is everything you actually need to know about prenatal vitamins to make a confident, informed choice."},
      {type:"heading",text:"When Should You Start Taking Prenatal Vitamins? ⏰"},
      {type:"para",text:"Ideally, you should begin taking a prenatal vitamin at least one full month before you start trying to conceive, and continue taking it throughout your entire pregnancy and for as long as you breastfeed your baby afterward. The reason early timing matters so profoundly is that folic acid, the single most critical nutrient in a prenatal vitamin, does its most important protective work during the very first weeks of neural tube development, which occurs before many women even know they are pregnant. If conception happens while your folic acid levels are already at optimal levels, the protection is already in place when it is needed most. If you are already pregnant and have not yet started a prenatal vitamin, begin today without delay. It is genuinely never too late to start giving your body and your baby essential nutritional support."},
      {type:"heading",text:"The Essential Nutrients to Look For 🌟"},
      {type:"para",text:"When evaluating any prenatal vitamin, there are specific nutrients that must be present in adequate amounts for the supplement to be genuinely valuable during pregnancy. Folic acid or folate at a minimum of 400 micrograms and ideally 600 to 800 micrograms is essential for preventing neural tube defects such as spina bifida and anencephaly. Iron at approximately 27 milligrams supports your dramatically increased blood volume during pregnancy and prevents iron-deficiency anemia, one of the most common pregnancy complications. Calcium between 200 and 300 milligrams in the prenatal vitamin itself, with the remainder coming from your diet, builds your baby's bones and protects your own bone density. Vitamin D at 600 International Units or more works alongside calcium for bone development and immune function. Iodine at 150 micrograms supports your baby's thyroid development and brain function, a critically important nutrient that is frequently overlooked in prenatal formulas. DHA omega-3 fatty acids at 200 milligrams support brain and eye development, particularly during the third trimester of rapid brain growth."},
      {type:"heading",text:"Folate vs. Folic Acid: Does the Form Actually Matter? 🔬"},
      {type:"para",text:"The distinction between folic acid and methylfolate is one that is genuinely worth understanding, particularly if you are planning a pregnancy carefully. Folic acid is the synthetic, oxidized form found in most supplements and fortified foods. To be biologically useful to your body, folic acid must be converted through several enzymatic steps into the active form, methylfolate, that your cells can actually use. A significant proportion of people, estimates range from fifteen to forty percent depending on ethnic background, carry a genetic variant in the MTHFR gene that reduces the efficiency of this conversion process to varying degrees. For these individuals, taking methylfolate directly in its pre-converted active form provides more reliable and complete folate protection. If you have a family history of neural tube defects, have experienced a pregnancy affected by a neural tube defect, or know that you carry an MTHFR genetic variant, discuss with your healthcare provider whether a methylfolate-containing prenatal vitamin would be a better choice for your specific situation."},
      {type:"heading",text:"Managing Nausea from Prenatal Vitamins 🤢"},
      {type:"para",text:"Nausea caused by prenatal vitamins is one of the most common complaints among pregnant women, and the iron content is almost invariably the primary culprit. Iron is notoriously irritating to the gastrointestinal tract, particularly when taken on an empty stomach or in forms that the body absorbs inefficiently. Several strategies can meaningfully and sometimes dramatically reduce this problem. Taking your prenatal vitamin with a meal rather than on an empty stomach is the single most effective strategy. Taking it at bedtime means you sleep through the window of maximum gastrointestinal irritation. Switching to a gummy prenatal vitamin can be helpful for tolerability, though be aware that most gummy prenatal formulations do not contain iron, requiring you to supplement iron separately. Slow-release iron formulations or alternative iron compounds such as ferrous bisglycinate or iron glycinate are often substantially better tolerated than standard ferrous sulfate."},
      {type:"tip",text:"💡 Price does not equal quality when it comes to prenatal vitamins. A forty-dollar brand is not necessarily superior to a twelve-dollar brand, what matters is the specific nutrients present, their amounts, and their forms. Read the label carefully for the key nutrients described above, look for third-party quality certification from organizations like USP, NSF International, or ConsumerLab, and prioritize finding a formula that you can tolerate and will actually take consistently every single day. The best prenatal vitamin is categorically the one you take reliably."},
    ]
  },{
    id:"pregnancy-complications",
    title:"Common Pregnancy Complications: What Every Mom Should Know",
    cat:"Health",read:"7 min read",icon:"🩺",
    desc:"A calm, informative guide to the most common pregnancy complications what they are, how they are detected, and how they are managed.",
    content:[
      {type:"intro",text:"Reading about pregnancy complications can feel frightening, and we want to begin by being very clear about something important: the vast majority of pregnancies progress without serious complications, and even when complications do arise, modern obstetric care is remarkably effective at managing them. The purpose of this guide is not to generate anxiety but to give you calm, accurate, empowering information. Being informed means that if something does arise, you will recognize it promptly, respond appropriately, understand what your healthcare team is telling you, and be an active participant in your own care."},
      {type:"heading",text:"Gestational Diabetes 🍬"},
      {type:"para",text:"Gestational diabetes mellitus is a form of diabetes that develops during pregnancy in women who did not have diabetes beforehand. It occurs when the hormones produced by the placenta interfere with the action of insulin, the hormone responsible for moving glucose from the bloodstream into cells for energy, causing blood glucose levels to remain elevated beyond normal ranges. Gestational diabetes affects approximately six to nine percent of pregnancies and is typically detected through the oral glucose tolerance test performed between weeks twenty-four and twenty-eight. Risk factors include being overweight or obese before pregnancy, being over the age of thirty-five, having a first-degree relative with type 2 diabetes, having previously delivered a very large baby, and certain ethnic backgrounds including South Asian, East Asian, Middle Eastern, and Hispanic heritage. The good news is that gestational diabetes is very manageable with dietary modifications, regular blood glucose monitoring, appropriate exercise, and sometimes medication. With consistent management, the vast majority of women with gestational diabetes deliver healthy babies."},
      {type:"heading",text:"Preeclampsia 💊"},
      {type:"para",text:"Preeclampsia is a serious hypertensive disorder of pregnancy characterized by high blood pressure developing after twenty weeks of gestation in a woman whose blood pressure was previously normal, combined with signs of damage to at least one other organ system, most commonly the kidneys or liver. It affects approximately five to eight percent of pregnancies globally and is one of the leading causes of maternal and neonatal morbidity and mortality worldwide. Warning signs that should prompt immediate contact with your healthcare provider include severe headaches that do not respond to paracetamol, visual disturbances such as blurring, flashing lights, spots, or temporary vision loss, severe pain in the right upper abdomen beneath the rib cage, sudden and significant swelling of the face and hands, and nausea or vomiting in the second half of pregnancy. Preeclampsia can progress rapidly and unpredictably, which is why any combination of these symptoms warrants urgent medical evaluation. The only definitive treatment is delivery of the baby and placenta."},
      {type:"heading",text:"Placenta Previa 🔴"},
      {type:"para",text:"Placenta previa is a condition in which the placenta is implanted in the lower segment of the uterus, partially or completely covering the internal opening of the cervix. It is typically identified during routine ultrasound examinations and affects approximately one in two hundred pregnancies at the time of delivery, though a significantly larger proportion of women are told at their mid-pregnancy scan that they have a low-lying placenta. In most of these cases, the placenta moves upward relative to the cervix as the uterus grows throughout the pregnancy and ceases to be an issue by the third trimester, so an early finding of low-lying placenta is not necessarily cause for alarm. The characteristic presentation of placenta previa that persists into the second and third trimester is painless, sudden, bright red vaginal bleeding. When placenta previa is confirmed at or near term, a planned cesarean section is necessary to safely deliver the baby and avoid catastrophic hemorrhage."},
      {type:"heading",text:"Preterm Labor ⏰"},
      {type:"para",text:"Labor that begins before thirty-seven completed weeks of pregnancy is classified as preterm labor, and birth occurring before thirty-seven weeks is preterm birth. Preterm birth affects approximately one in ten pregnancies in many countries and is the leading cause of neonatal mortality and long-term disability in developed nations. Warning signs of preterm labor include regular uterine contractions occurring before thirty-seven weeks that may or may not be painful, a feeling of increased pelvic pressure or heaviness, a persistent dull lower backache that may feel rhythmic, menstrual-like cramping in the lower abdomen, and a change in vaginal discharge including increased volume, a watery consistency, or blood-tinged mucus. If you experience any of these warning signs before thirty-seven weeks of pregnancy, contact your healthcare provider immediately rather than waiting to see if they resolve. Medical interventions are available that may slow or arrest preterm labor and allow additional time for fetal lung maturation."},
      {type:"tip",text:"💡 The single most effective thing you can do to reduce your overall risk of pregnancy complications and to ensure that any that do arise are detected and managed at the earliest possible stage is to attend every single one of your scheduled prenatal appointments without exception. At each visit your healthcare provider specifically monitors your blood pressure, urine protein, weight, fundal height, and baby's heart rate to detect the early warning signs of complications before they become severe. Regular, consistent prenatal care genuinely saves lives, both yours and your baby's."},
    ]
  },{
    id:"breastfeeding-guide",
    title:"Breastfeeding for Beginners: Your Complete Honest Guide",
    cat:"Postpartum",read:"7 min read",icon:"🤱",
    desc:"Everything you need to know about breastfeeding from getting started to common challenges and how to solve them.",
    content:[
      {type:"intro",text:"Breastfeeding is one of those experiences that pregnancy books and antenatal classes often describe in reassuringly simple terms, your baby will instinctively know what to do, your body will know what to do, and it will all come together beautifully and naturally. And sometimes, wonderfully, it really does unfold that easily. But for a significant proportion of new mothers, breastfeeding involves a genuine learning curve in the first days and weeks that includes pain, uncertainty, exhaustion, and emotional vulnerability that can feel genuinely shocking. The gap between the idealized image of effortless breastfeeding and the complex reality of establishing it can be one of the hardest parts of the early postpartum period. Here is the honest, complete picture you deserve to have."},
      {type:"heading",text:"Colostrum: The First Liquid Gold 🌟"},
      {type:"para",text:"Before your mature milk comes in, which typically happens between days two and five after birth, your breasts produce colostrum, a thick, concentrated fluid ranging in color from clear to yellow or orange that is sometimes called liquid gold, and the description is genuinely apt. Colostrum is produced from approximately mid-pregnancy and is exquisitely tailored to the specific needs of a newborn in those critical first days of life. It is extraordinarily rich in secretory immunoglobulin A and other antibodies that coat the lining of your baby's immature gut and provide crucial protection against infection during the vulnerable newborn period. It contains growth factors that promote intestinal maturation. It acts as a gentle natural laxative that helps your baby pass meconium, their first dark, tarry stools, which reduces the risk of jaundice developing. And it accomplishes all of this in remarkably small volumes that are perfectly calibrated to your newborn's marble-sized stomach capacity on day one."},
      {type:"heading",text:"Getting the Latch Right: The Foundation of Everything 👶"},
      {type:"para",text:"A correct latch is the single most important element of successful breastfeeding and is the solution to the majority of the most common breastfeeding difficulties, including nipple pain and damage, inadequate milk transfer to the baby, poor weight gain, and recurring mastitis. The fundamental principle of a good latch is that your baby needs to take a large mouthful of breast tissue, not just the nipple. When your baby is correctly positioned and latched, their mouth will be wide open with the lips flanged outward like a fish, their chin will be pressed firmly into your breast with their nose just clear enough to breathe, and their cheeks will appear rounded and full rather than visibly sucked in. You should be able to hear rhythmic swallowing sounds as they feed. There may be mild tenderness when your baby first latches in the first few days as your nipples adjust, but breastfeeding should not be acutely painful throughout the feed. Persistent, significant pain is a reliable signal that the latch needs adjustment."},
      {type:"heading",text:"How Breast Milk Supply Actually Works 🍼"},
      {type:"para",text:"Understanding the mechanism behind breast milk production is one of the most valuable things you can know as a breastfeeding mother, because supply concerns are among the most common reasons women discontinue breastfeeding earlier than they intended. Breast milk production operates entirely on a supply and demand system. The more milk that is removed from your breasts, whether through your baby nursing, through pumping, or through hand expression, the more milk your body receives the hormonal signal to produce. Conversely, milk that is not removed signals to your body that less milk is needed, and production decreases accordingly. This is precisely why feeding frequently in the first weeks is so important: every feed is actively building your supply for the months ahead. If you supplement with formula before your milk supply is well established, your breasts receive less stimulation and may produce less milk as a direct consequence."},
      {type:"para",text:"Most new mothers experience a period of genuine anxiety about whether they are producing enough milk, and this worry is completely understandable given that unlike bottle feeding you cannot see precisely how many milliliters your baby is consuming at each feed. The most reliable indicators that your baby is receiving enough breast milk are that they are producing at least six to eight wet diapers per day after the first three to four days of life, that they are having regular bowel movements with frequency appropriate for their age, that they appear alert and content between feeds rather than constantly distressed, and that they are gaining weight appropriately when weighed at healthcare appointments. If you have genuine, persistent concerns about your supply, please consult a certified lactation consultant before making the decision to supplement with formula, as supply concerns are frequently very addressable with proper support."},
      {type:"tip",text:"💡 If breastfeeding is painful, if your nipples are cracked or bleeding, if you are concerned your baby is not getting enough milk, or if you are struggling in any way with breastfeeding, please reach out for professional help before deciding to stop. A certified lactation consultant with IBCLC credentials has specialized, evidence-based training in exactly these challenges and can frequently identify and resolve problems that feel completely insurmountable in just one or two consultations. Many hospitals have lactation consultants on staff who can help before you are even discharged, and many offer home visit services afterward. You absolutely do not have to figure this out alone."},
    ]
  },{
    id:"pregnancy-sex-gender",
    title:"Baby Gender Prediction: Science vs. Old Wives Tales",
    cat:"Fun & Lifestyle",read:"5 min read",icon:"💕",
    desc:"From heart rate theories to ring tests which gender prediction methods have any science behind them and which are purely for fun?",
    content:[
      {type:"intro",text:"One of the most universally exciting parts of pregnancy, particularly in the weeks between finding out you are expecting and potentially finding out the sex, is speculating about whether you are having a boy or a girl. Humanity has been attempting to predict the sex of unborn babies for as long as pregnancy has existed, which has generated a wonderfully rich collection of old wives tales, folk wisdom, and supposedly foolproof prediction methods that have been passed down through generations with complete confidence. We took a careful and honest look at the scientific evidence behind the most popular ones. Some of the results may genuinely surprise you."},
      {type:"heading",text:"The Heart Rate Theory 💓"},
      {type:"para",text:"Perhaps the most frequently cited and widely believed gender prediction theory holds that a fetal heart rate consistently above 140 beats per minute indicates a girl, while a rate below 140 beats per minute suggests a boy. The appeal of this theory is obvious and understandable: it is based on an actual measurement taken at prenatal appointments, it provides a specific and memorable numeric threshold, and it feels reassuringly scientific. Unfortunately, the scientific evidence does not support it. Multiple rigorous and well-designed studies have examined this theory specifically and consistently found no statistically significant relationship between fetal heart rate and the sex of the baby at any gestational age. What fetal heart rate does meaningfully correlate with is gestational age and the baby's level of activity at the time of measurement, a baby who is awake and moving will have a noticeably faster heart rate than a baby who is resting quietly, regardless of whether they are male or female. The 140 beats per minute threshold has no genuine predictive value."},
      {type:"heading",text:"Morning Sickness Severity 🤢"},
      {type:"para",text:"The folk theory that severe morning sickness predicts you are carrying a girl has more genuine scientific plausibility than many gender prediction myths, and some research does lend it partial support. The reasoning has a real biological basis: female fetuses are statistically associated with somewhat higher levels of hCG, the pregnancy hormone that is the primary driver of nausea, so a more severe nausea response would theoretically be more likely with a girl pregnancy. A notable study examining women hospitalized for hyperemesis gravidarum, the most severe form of pregnancy nausea, did find that these women were modestly more likely to be carrying girls. However, the association is nowhere near strong or reliable enough to serve as a meaningful prediction tool. Many women with severe, debilitating nausea go on to deliver boys, and many women carrying girls experience minimal nausea or none at all."},
      {type:"heading",text:"Carrying High vs. Carrying Low 👶"},
      {type:"para",text:"The enduring theory that carrying high during pregnancy means you are expecting a girl while carrying low means you are expecting a boy is one of the most widespread gender prediction myths, and also one of the most thoroughly unsupported by evidence. The way a pregnant woman carries her bump is determined by genuine physiological factors that have nothing whatsoever to do with the baby's sex. These factors include the shape and tilt of the mother's pelvis, her core muscle strength and tone, the position of the baby in the uterus, the volume of amniotic fluid, whether this is a first or subsequent pregnancy, the mother's height and overall body composition, and the baby's size. Despite having zero scientific basis, the carrying high versus carrying low observation will be offered confidently by virtually every person in your life, so having this information ready can be useful."},
      {type:"heading",text:"What Actually Works: The Reliable Methods 🔬"},
      {type:"para",text:"Setting the myths and folk wisdom entirely aside, the medically reliable methods for determining your baby's sex before birth are clear and well-established. Non-invasive prenatal testing, commonly known as NIPT or the cell-free DNA test, is a blood test available from approximately ten weeks of pregnancy that analyzes fetal DNA circulating in the maternal bloodstream. When performed by a certified laboratory, NIPT determines fetal sex with very high accuracy, typically over 99 percent. The anatomy scan ultrasound performed around twenty weeks can determine sex with good accuracy when the baby is positioned favorably, though it is not infallible and the occasional error does occur. Chorionic villus sampling and amniocentesis directly analyze fetal chromosomes and are essentially one hundred percent accurate, but these are invasive procedures recommended only when medically indicated for other reasons."},
      {type:"tip",text:"💡 Whatever the heart rate, the ring test, the shape of your bump, or your mother-in-law's confident prediction says, remember that all old wives tales are effectively coin flips with elaborate narratives attached. Try them for the entertainment value and the fun of speculation with your partner and family, they are genuinely good fun. But if knowing your baby's sex before birth genuinely matters to you, NIPT from ten weeks or the anatomy scan at twenty weeks are the only methods worth trusting. And of course, if you choose to wait, the delivery room remains the original and ultimate reveal!"},
    ]
  }
];

const MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_EN=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function getWeeklyData(week){
  const keys=Object.keys(WEEKLY_TIPS).map(Number).sort((a,b)=>a-b);
  let best=keys[0];
  for(const k of keys){if(k<=week)best=k;}
  return WEEKLY_TIPS[best];
}

function getMilestone(week){
  let best=MILESTONES[0];
  for(const m of MILESTONES){if(m.week<=week)best=m;}
  return best;
}

const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',system-ui,sans-serif}

  /* ====== HEADER ====== */
  .site-header{
    position:sticky;
    top:0;
    z-index:500;
    background:#fff;
    box-shadow:0 2px 12px rgba(232,51,90,0.08);
  }

  /* Language bar */
  .lang-bar{
    background:#6E0D24;
    padding:4px 16px;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    gap:6px;
  }
  .lang-btn{
    background:transparent;border:none;
    color:#FFD6E7;font-size:11px;font-weight:500;
    cursor:pointer;padding:2px 9px;border-radius:4px;
    transition:background 0.15s;
  }
  .lang-btn:hover{background:rgba(255,255,255,0.15)}
  .lang-btn.active{background:#E8335A;color:#fff;font-weight:700}

  /* Main nav row */
  .nav-row{
    height:54px;
    display:flex;
    align-items:center;
    padding:0 16px;
    gap:8px;
    border-bottom:2px solid #FFB3CE;
  }
  .nav-logo{
    display:flex;align-items:center;gap:7px;
    cursor:pointer;flex-shrink:0;margin-right:6px;
    text-decoration:none;
  }
  .nav-logo-icon{font-size:22px}
  .nav-logo-text{
    font-family:'Playfair Display',Georgia,serif;
    font-size:15px;font-weight:700;color:#C41F45;
    white-space:nowrap;line-height:1.2;
  }

  /* Desktop links */
  .nav-links{
    display:flex;
    align-items:center;
    gap:2px;
    flex:1;
    overflow-x:auto;
    scrollbar-width:none;
    -ms-overflow-style:none;
    flex-wrap:nowrap;
    justify-content:flex-end;
  }
  .nav-links::-webkit-scrollbar{display:none}
  .nav-link{
    white-space:nowrap;flex-shrink:0;
    border:none;border-radius:8px;
    padding:6px 11px;font-size:12.5px;font-weight:500;
    cursor:pointer;background:transparent;color:#555;
    transition:background 0.15s,color 0.15s;
    position:relative;
  }
  .nav-link:hover{background:#FFF0F5;color:#9B1535}
  .nav-link.active{background:#FFD6E7;color:#9B1535;font-weight:700}
  .nav-link.active::after{
    content:'';position:absolute;
    bottom:-2px;left:15%;width:70%;
    height:2.5px;background:#E8335A;border-radius:99px;
  }

  /* Hamburger: hidden on desktop */
  .ham-btn{
    display:none;
    flex-direction:column;justify-content:center;
    gap:5px;background:none;border:none;
    cursor:pointer;padding:8px;border-radius:8px;
    margin-left:auto;flex-shrink:0;
  }
  .ham-line{
    display:block;width:22px;height:2.5px;
    background:#C41F45;border-radius:2px;
    transition:transform 0.25s ease,opacity 0.2s ease;
  }

  /* Mobile slide-down menu */
  .mob-menu{
    overflow:hidden;
    max-height:0;
    transition:max-height 0.38s cubic-bezier(0.4,0,0.2,1);
    background:#fff;
    border-bottom:2px solid #FFD6E7;
  }
  .mob-menu.open{max-height:520px}
  .mob-menu-inner{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:6px;
    padding:10px 12px 16px;
  }
  .mob-link{
    display:flex;align-items:center;gap:8px;
    background:transparent;border:none;
    border-radius:10px;padding:11px 12px;
    font-size:13.5px;font-weight:500;color:#444;
    cursor:pointer;text-align:left;
    transition:background 0.15s,color 0.15s;
    width:100%;
  }
  .mob-link:hover{background:#FFF0F5;color:#9B1535}
  .mob-link.active{background:#FFD6E7;color:#9B1535;font-weight:700}
  .mob-link-icon{font-size:17px;flex-shrink:0}

  /* Show hamburger on mobile, hide desktop links */
  @media(max-width:820px){
    .nav-links{display:none!important}
    .ham-btn{display:flex!important}
    .nav-logo-text{font-size:13px}
  }
  @media(max-width:400px){
    .nav-logo-text{font-size:12px}
    .mob-menu-inner{grid-template-columns:1fr}
  }

  /* ====== OVERLAY ====== */
  .mob-overlay{
    position:fixed;inset:0;
    background:rgba(0,0,0,0.18);
    z-index:499;
    pointer-events:all;
  }

  /* ====== PAGE ANIMATIONS ====== */
  @keyframes fadeInUp{
    from{opacity:0;transform:translateY(14px)}
    to{opacity:1;transform:translateY(0)}
  }
  .page-enter{animation:fadeInUp 0.3s ease both}

  /* ====== LAYOUT RESPONSIVE ====== */
  @media(max-width:640px){
    .calc-grid-2{grid-template-columns:1fr!important}
    .results-stat-grid{grid-template-columns:1fr 1fr!important}
    .two-col-grid{grid-template-columns:1fr!important}
    .hero-h1{font-size:24px!important;line-height:1.3!important}
    .features-grid{grid-template-columns:1fr 1fr!important}
    .footer-grid{grid-template-columns:1fr 1fr!important}
    .testi-grid{grid-template-columns:1fr!important}
    .nutr-grid{grid-template-columns:1fr 1fr!important}
    .blog-grid{grid-template-columns:1fr!important}
    .symp-items{grid-template-columns:1fr 1fr!important}
    .hero-btns{flex-direction:column!important;align-items:center!important}
    .hero-btns button{width:100%!important;max-width:280px!important}
  }
  @media(max-width:400px){
    .features-grid{grid-template-columns:1fr!important}
    .nutr-grid{grid-template-columns:1fr!important}
    .results-stat-grid{grid-template-columns:1fr!important}
    .footer-grid{grid-template-columns:1fr!important}
  }

  /* ====== MISC ====== */
  button{font-family:inherit}
  select{font-family:inherit}
  textarea{font-family:inherit}
  input{font-family:inherit}
  html{scroll-behavior:smooth}
  input[type=date]::-webkit-calendar-picker-indicator{cursor:pointer}
`;

function AdBanner({slot="top"}){
  return null;
}

function MedicalDisclaimer(){ return null; }

const ROUTES={Home:"/",Calculator:"/calculator",Milestones:"/milestones",Symptoms:"/symptoms",Nutrition:"/nutrition",Blog:"/blog",FAQ:"/faq","About & Contact":"/about","Privacy & Terms":"/privacy","Terms of Service":"/terms"};

function Nav({t,lang,setLang}){
  const [open,setOpen]=useState(false);
  const location=useLocation();
  const items=[
    {key:"Home",      label:t.navHome,       icon:"🏠"},
    {key:"Calculator",label:t.navCalc,       icon:"🗓️"},
    {key:"Milestones",label:t.navMilestones, icon:"✨"},
    {key:"Symptoms",  label:t.navSymptoms,   icon:"💆"},
    {key:"Nutrition", label:t.navNutrition,  icon:"🥗"},
    {key:"Blog",      label:"Blog",          icon:"📝"},
    {key:"FAQ",       label:t.navFaq,        icon:"❓"},
    {key:"About & Contact",label:t.navAbout, icon:"💌"},
  ];

  const isActive=(key)=>{
    const path=ROUTES[key];
    if(path==="/") return location.pathname==="/";
    return location.pathname.startsWith(path);
  };

  return(
    <header className="site-header">
      {/* Language bar */}
      <div className="lang-bar">
        <span style={{fontSize:11,color:"#FFB3CE",marginRight:2}}>🌐</span>
        {[["en","English"],["ur","اردو"],["hi","हिंदी"]].map(([code,label])=>(
          <button key={code} onClick={()=>setLang(code)} className={`lang-btn${lang===code?" active":""}`}>{label}</button>
        ))}
      </div>

      {/* Main nav row */}
      <div className="nav-row">
        <Link to="/" className="nav-logo" onClick={()=>setOpen(false)} style={{textDecoration:"none"}}>
          <span className="nav-logo-icon">🤰</span>
          <span className="nav-logo-text">Mother Pregnancy Care</span>
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          {items.map(({key,label})=>(
            <Link key={key} to={ROUTES[key]} className={`nav-link${isActive(key)?" active":""}`}>
              {label}
            </Link>
          ))}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="ham-btn"
          onClick={()=>setOpen(o=>!o)}
          aria-label="Toggle menu"
        >
          <span className="ham-line" style={{transform:open?"rotate(45deg) translate(5px,5px)":"none"}}/>
          <span className="ham-line" style={{opacity:open?0:1}}/>
          <span className="ham-line" style={{transform:open?"rotate(-45deg) translate(5px,-5px)":"none"}}/>
        </button>
      </div>

      {/* Mobile dropdown — inside sticky header, no offset issues */}
      <div className={`mob-menu${open?" open":""}`}>
        <div className="mob-menu-inner">
          {items.map(({key,label,icon})=>(
            <Link key={key} to={ROUTES[key]} onClick={()=>setOpen(false)} className={`mob-link${isActive(key)?" active":""}`}>
              <span className="mob-link-icon">{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}


function Hero({t}){
  return(
    <div style={{background:`linear-gradient(135deg,${PINK[50]} 0%,#fff 50%,${PINK[100]} 100%)`,padding:"52px 20px 44px",textAlign:"center"}}>
      <div style={{display:"inline-block",background:PINK[100],color:PINK[700],fontSize:10,fontWeight:700,padding:"4px 14px",borderRadius:99,marginBottom:16,letterSpacing:"0.06em"}}>{t.heroTag}</div>
      <h1 className="hero-h1" style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(26px,4.5vw,46px)",fontWeight:700,color:PINK[800],margin:"0 0 14px",lineHeight:1.2}}>{t.heroTitle.split(",")[0]},<br/><span style={{color:PINK[500]}}>{t.heroTitle.split(",")[1]||""}</span></h1>
      <p style={{fontSize:15,color:"#666",maxWidth:520,margin:"0 auto 28px",lineHeight:1.7}}>{t.heroDesc}</p>
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:40}}>
        <Link to="/calculator" style={{background:PINK[500],color:"#fff",border:"none",borderRadius:12,padding:"13px 26px",fontSize:14,fontWeight:700,cursor:"pointer",textDecoration:"none",display:"inline-block"}}>{t.calcBtn}</Link>
        <Link to="/milestones" style={{background:"#fff",color:PINK[600],border:`2px solid ${PINK[300]}`,borderRadius:12,padding:"13px 26px",fontSize:14,fontWeight:700,cursor:"pointer",textDecoration:"none",display:"inline-block"}}>{t.viewMilestones}</Link>
      </div>
      <div style={{display:"flex",gap:32,justifyContent:"center",flexWrap:"wrap"}}>
        {[["2M+","Moms helped"],["40","Weeks tracked"],["100%","Free forever"],["AI","Powered tips"]].map(([v,l])=>(
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:700,color:PINK[600]}}>{v}</div>
            <div style={{fontSize:11,color:"#999",marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturesSection({t}){
  const features=[
    {icon:"🗓️",title:t.navCalc,desc:"Accurate due date with AI-personalized weekly tips for your current stage.",page:"Calculator"},
    {icon:"✨",title:t.navMilestones,desc:"Track your baby's development from poppy seed to watermelon week by week.",page:"Milestones"},
    {icon:"💆",title:t.navSymptoms,desc:"Know what symptoms are normal in each trimester and when to call your doctor.",page:"Symptoms"},
    {icon:"🥗",title:t.navNutrition,desc:"Essential nutrients, safe foods, and what to avoid for a healthy pregnancy.",page:"Nutrition"},
    {icon:"📝",title:"Blog",desc:"Expert articles on every topic from morning sickness to birth preparation.",page:"Blog"},
    {icon:"❓",title:t.navFaq,desc:"Answers to the most common pregnancy questions, written clearly and simply.",page:"FAQ"},
  ];
  return(
    <div style={{background:"#fff",padding:"48px 16px",borderTop:`1px solid ${PINK[100]}`}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,color:PINK[800],textAlign:"center",marginBottom:8}}>{t.allInOne}</h2>
        <p style={{color:"#777",fontSize:14,textAlign:"center",marginBottom:28}}>Trusted by millions of moms worldwide</p>
        <div className="features-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
          {features.map(f=>(
            <Link key={f.title} to={ROUTES[f.page]} style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:16,padding:18,cursor:"pointer",textDecoration:"none",display:"block"}}>
              <div style={{fontSize:26,marginBottom:10}}>{f.icon}</div>
              <div style={{fontWeight:700,color:PINK[800],marginBottom:5,fontSize:13}}>{f.title}</div>
              <div style={{fontSize:12,color:"#888",lineHeight:1.6}}>{f.desc}</div>
            </Link>
          ))}
        </div>
        <AdBanner slot="top"/>
      </div>
    </div>
  );
}

function Testimonials(){
  const reviews=[
    {name:"Sarah M.",text:"This calculator was so accurate! My OB confirmed the exact same due date. Love the weekly tips!",stars:5},
    {name:"Priya K.",text:"The AI tips for week 28 were incredibly helpful. Felt like having a pregnancy coach in my pocket.",stars:5},
    {name:"Jessica L.",text:"Best free pregnancy tool I've found. The milestone tracker made every week so exciting!",stars:5},
  ];
  return(
    <div style={{background:PINK[50],padding:"44px 16px"}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,color:PINK[800],textAlign:"center",marginBottom:28}}>Loved by Moms Everywhere 💗</h2>
        <div className="testi-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14}}>
          {reviews.map(r=>(
            <div key={r.name} style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:16,padding:20}}>
              <div style={{color:PINK[400],fontSize:15,marginBottom:8}}>{"★".repeat(r.stars)}</div>
              <div style={{fontSize:13,color:"#555",lineHeight:1.7,fontStyle:"italic",marginBottom:10}}>"{r.text}"</div>
              <div style={{fontWeight:700,color:PINK[700],fontSize:13}}>— {r.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Calculator({t}){
  const [lmp,setLmp]=useState(()=>{try{return localStorage.getItem("bb_lmp")||"";}catch{return "";}});
  const [cycle,setCycle]=useState(()=>{try{return Number(localStorage.getItem("bb_cycle"))||28;}catch{return 28;}});
  const [result,setResult]=useState(null);
  const [aiTips,setAiTips]=useState(null);
  const [loading,setLoading]=useState(false);

  const calculate=async()=>{
    if(!lmp)return;
    try{localStorage.setItem("bb_lmp",lmp);localStorage.setItem("bb_cycle",cycle);}catch{}
    const lmpDate=new Date(lmp);
    const adjust=cycle-28;
    const due=new Date(lmpDate);
    due.setDate(due.getDate()+280+adjust);
    const today=new Date();today.setHours(0,0,0,0);
    const diffDays=Math.floor((today-lmpDate)/86400000);
    const weeks=Math.max(0,Math.floor(diffDays/7));
    const days=Math.max(0,diffDays%7);
    const daysLeft=Math.ceil((due-today)/86400000);
    const pct=Math.min(100,Math.max(0,Math.round((diffDays/280)*100)));
    const trimester=weeks<=13?"1st Trimester":weeks<=26?"2nd Trimester":"3rd Trimester";
    const weekData=getWeeklyData(weeks);
    const milestone=getMilestone(weeks);
    setResult({due,weeks,days,daysLeft,pct,trimester,weekData,milestone});
    setAiTips(null);setLoading(true);
    try{
      const resp=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,
          messages:[{role:"user",content:`Pregnant woman at week ${weeks} (${trimester}), ${daysLeft} days until due date. Give 5 warm, practical, specific tips for THIS exact week. Return ONLY valid JSON no markdown: {"tips":["tip1","tip2","tip3","tip4","tip5"],"weekHighlight":"One exciting sentence about baby development at week ${weeks}"}`}]
        })
      });
      const data=await resp.json();
      const text=data.content[0].text.replace(/```json|```/g,"").trim();
      setAiTips(JSON.parse(text));
    }catch{
      setAiTips({tips:["Take your prenatal vitamins daily","Stay hydrated with 8-10 glasses of water","Eat small, frequent nutritious meals","Get gentle exercise like walking or swimming","Rest when tired — your body is working incredibly hard!"],weekHighlight:`At week ${weeks}, your baby is growing and developing amazing new features!`});
    }
    setLoading(false);
  };

  return(
    <div style={{maxWidth:760,margin:"0 auto",padding:"36px 16px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:PINK[800],margin:"0 0 6px"}}>Pregnancy Due Date Calculator</h2>
        <p style={{color:"#777",fontSize:14}}>Enter your last period date for your exact due date + personalized AI tips.</p>
      </div>
      <AdBanner slot="top"/>
      <div style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:18,padding:24,marginBottom:20}}>
        <div className="calc-grid-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
          <div>
            <label style={{display:"block",fontSize:12,fontWeight:700,color:PINK[700],marginBottom:7}}>{t.inputLmp}</label>
            <input type="date" value={lmp} onChange={e=>setLmp(e.target.value)} style={{width:"100%",padding:"11px 13px",borderRadius:10,border:`1.5px solid ${PINK[200]}`,fontSize:15,outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div>
            <label style={{display:"block",fontSize:12,fontWeight:700,color:PINK[700],marginBottom:7}}>{t.inputCycle}</label>
            <select value={cycle} onChange={e=>setCycle(Number(e.target.value))} style={{width:"100%",padding:"11px 13px",borderRadius:10,border:`1.5px solid ${PINK[200]}`,fontSize:15,outline:"none",boxSizing:"border-box",background:"#fff"}}>
              {[24,25,26,27,28,29,30,31,32,33,34,35].map(d=><option key={d} value={d}>{d} {t.days}{d===28?` (${t.avg})`:""}</option>)}
            </select>
          </div>
        </div>
        <button onClick={calculate} style={{width:"100%",background:PINK[500],color:"#fff",border:"none",borderRadius:12,padding:14,fontSize:15,fontWeight:700,cursor:"pointer"}}>{t.calcActionBtn}</button>
        <p style={{textAlign:"center",fontSize:11,color:"#bbb",marginTop:8,marginBottom:0}}>{t.infoOnly}</p>
      </div>

      {result&&(
        <div>
          <div className="results-stat-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
            {[
              {label:t.dueDate,value:`${result.due.getDate()} ${MONTHS[result.due.getMonth()]} ${result.due.getFullYear()}`,sub:DAYS_EN[result.due.getDay()],accent:true},
              {label:t.weeksAt,value:`Wk ${result.weeks}`,sub:`${result.days}d • ${result.trimester}`},
              {label:t.daysRem,value:result.daysLeft>0?result.daysLeft:t.anyDay,sub:t.untilArrival},
              {label:t.progress,value:`${result.pct}%`,sub:t.compComplete},
            ].map(c=>(
              <div key={c.label} style={{background:c.accent?PINK[500]:PINK[50],border:`1.5px solid ${c.accent?PINK[500]:PINK[200]}`,borderRadius:12,padding:"14px 10px",textAlign:"center"}}>
                <div style={{fontSize:9,fontWeight:700,color:c.accent?PINK[200]:PINK[500],marginBottom:4,letterSpacing:"0.05em",textTransform:"uppercase"}}>{c.label}</div>
                <div style={{fontSize:c.value.toString().length>9?12:18,fontWeight:700,color:c.accent?"#fff":PINK[800],lineHeight:1.2}}>{c.value}</div>
                <div style={{fontSize:9,color:c.accent?PINK[200]:"#999",marginTop:3}}>{c.sub}</div>
              </div>
            ))}
          </div>

          <div style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:14,padding:18,marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontWeight:700,color:PINK[700],marginBottom:7}}>
              <span>Pregnancy Progress</span><span>{result.pct}%</span>
            </div>
            <div style={{background:PINK[100],borderRadius:99,height:11,overflow:"hidden"}}>
              <div style={{width:`${result.pct}%`,background:PINK[500],height:"100%",borderRadius:99,transition:"width 1s ease"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:5,fontSize:9,color:"#bbb"}}>
              <span>1st (1–13)</span><span>2nd (14–26)</span><span>3rd (27–40)</span>
            </div>
          </div>

          <div className="two-col-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
            <div style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:14,padding:18}}>
              <div style={{fontSize:11,fontWeight:700,color:PINK[600],marginBottom:8}}>{t.babyThisWeek}</div>
              <div style={{fontSize:24,marginBottom:5}}>{result.milestone.icon}</div>
              <div style={{fontWeight:700,color:PINK[800],fontSize:13,marginBottom:4}}>{t.babySize} {result.weekData.baby}</div>
              <div style={{fontSize:12,color:"#666",lineHeight:1.6}}>{result.milestone.desc}</div>
            </div>
            <div style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:14,padding:18}}>
              <div style={{fontSize:11,fontWeight:700,color:PINK[600],marginBottom:8}}>{t.symptomsTitle}</div>
              {result.weekData.symptoms.map(s=>(
                <div key={s} style={{display:"flex",gap:7,padding:"5px 0",fontSize:12,color:"#555",borderBottom:`0.5px solid ${PINK[100]}`}}>
                  <span style={{color:PINK[400]}}>•</span>{s}
                </div>
              ))}
            </div>
          </div>

          <AdBanner slot="rect"/>

          <div style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:16,padding:20}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{background:PINK[100],borderRadius:10,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>✨</div>
              <div>
                <div style={{fontWeight:700,color:PINK[800],fontSize:14}}>{t.aiInsightsTitle} {result.weeks}</div>
                <div style={{fontSize:11,color:"#999"}}>Personalized weekly tips</div>
              </div>
            </div>
            {loading&&<div style={{color:"#bbb",fontStyle:"italic",textAlign:"center",padding:16,fontSize:13}}>{t.loadingAi}</div>}
            {aiTips&&(
              <>
                <div style={{background:PINK[50],borderRadius:10,padding:"11px 14px",marginBottom:12,fontSize:13,color:PINK[800],fontStyle:"italic",lineHeight:1.6}}>💡 {aiTips.weekHighlight}</div>
                {aiTips.tips.map((tip,i)=>(
                  <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"9px 12px",background:i%2===0?PINK[50]:"#fff",borderRadius:9,fontSize:13,color:"#444",lineHeight:1.6,marginBottom:5}}>
                    <span style={{background:PINK[500],color:"#fff",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</span>
                    {tip}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Milestones(){
  return(
    <div style={{maxWidth:760,margin:"0 auto",padding:"36px 16px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <h2 className="milest-title" style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:PINK[800],margin:"0 0 6px"}}>Pregnancy Milestones</h2>
        <p style={{color:"#777",fontSize:14}}>Your baby's incredible journey from conception to birth.</p>
      </div>
      <AdBanner slot="top"/>
      <div style={{position:"relative"}}>
        <div style={{position:"absolute",left:26,top:0,bottom:0,width:2,background:PINK[200]}}/>
        {MILESTONES.map((m,i)=>(
          <div key={m.week} style={{display:"flex",gap:16,marginBottom:20,position:"relative"}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:i%2===0?PINK[500]:PINK[200],display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0,border:"3px solid #fff",zIndex:1}}>
              <span style={{fontSize:16}}>{m.icon}</span>
              <span style={{fontSize:9,fontWeight:700,color:i%2===0?"#fff":PINK[700]}}>Wk {m.week}</span>
            </div>
            <div style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:14,padding:"14px 18px",flex:1}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5,flexWrap:"wrap",gap:6}}>
                <span style={{fontWeight:700,color:PINK[800],fontSize:13}}>{m.title}</span>
                <span style={{background:PINK[50],border:`1px solid ${PINK[200]}`,color:PINK[600],fontSize:10,padding:"2px 9px",borderRadius:99,fontWeight:700}}>Size: {m.baby}</span>
              </div>
              <p style={{color:"#666",fontSize:12,margin:0,lineHeight:1.6}}>{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Symptoms(){
  return(
    <div style={{maxWidth:760,margin:"0 auto",padding:"36px 16px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:PINK[800],margin:"0 0 6px"}}>Symptoms by Trimester</h2>
        <p style={{color:"#777",fontSize:14}}>Know what to expect — and when to worry — at every stage.</p>
      </div>
      <AdBanner slot="top"/>
      <div style={{display:"grid",gap:16,marginBottom:20}}>
        {SYMPTOMS_BY_TRIMESTER.map(s=>(
          <div key={s.trimester} style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:18,padding:22}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap"}}>
              <div style={{background:PINK[500],borderRadius:10,padding:"7px 14px",color:"#fff",fontWeight:700,fontSize:12}}>{s.trimester}</div>
              <div style={{color:PINK[500],fontSize:12,fontWeight:600}}>{s.weeks}</div>
            </div>
            <div className="symp-items" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:8}}>
              {s.items.map(item=>(
                <div key={item} style={{display:"flex",gap:7,fontSize:12,color:"#555",lineHeight:1.5}}>
                  <span style={{color:PINK[400],flexShrink:0}}>✦</span>{item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{background:PINK[50],border:`1.5px solid ${PINK[300]}`,borderRadius:16,padding:20}}>
        <div style={{fontWeight:700,color:PINK[700],marginBottom:10,fontSize:13}}>⚠️ Call your doctor immediately if you experience:</div>
        <div className="symp-items" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8}}>
          {["Heavy vaginal bleeding","Severe abdominal pain","Signs of preeclampsia","Decreased fetal movement after 28w","Water breaking early","High fever over 101°F (38.3°C)","Severe headache with vision changes","Painful urination (UTI signs)"].map(s=>(
            <div key={s} style={{display:"flex",gap:8,fontSize:12,color:"#555"}}>
              <span style={{color:"#E24B4A",flexShrink:0}}>•</span>{s}
            </div>
          ))}
        </div>
      </div>
      <AdBanner slot="rect"/>
    </div>
  );
}

function Nutrition(){
  return(
    <div style={{maxWidth:760,margin:"0 auto",padding:"36px 16px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:PINK[800],margin:"0 0 6px"}}>Pregnancy Nutrition Guide</h2>
        <p style={{color:"#777",fontSize:14}}>Essential nutrients your body and baby need every single day.</p>
      </div>
      <AdBanner slot="top"/>
      <div className="nutr-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:14,marginBottom:20}}>
        {NUTRITION.map(n=>(
          <div key={n.nutrient} style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:16,padding:18}}>
            <div style={{fontSize:26,marginBottom:8}}>{n.icon}</div>
            <div style={{fontWeight:700,color:PINK[800],fontSize:13,marginBottom:5}}>{n.nutrient}</div>
            <div style={{background:PINK[100],color:PINK[700],fontSize:10,fontWeight:700,padding:"2px 10px",borderRadius:99,display:"inline-block",marginBottom:8}}>{n.amount}</div>
            <div style={{fontSize:11,color:"#888",marginBottom:4}}><strong style={{color:"#555"}}>Why: </strong>{n.why}</div>
            <div style={{fontSize:11,color:"#888"}}><strong style={{color:"#555"}}>From: </strong>{n.foods}</div>
          </div>
        ))}
      </div>
      <div style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:18,padding:22,marginBottom:20}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:PINK[800],margin:"0 0 14px"}}>Foods to Avoid During Pregnancy</h3>
        <div className="symp-items" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:8}}>
          {["Raw or undercooked meat & fish","High-mercury fish (shark, swordfish)","Unpasteurized dairy and juices","Deli meats unless fully heated","Alcohol — no safe amount exists","Excess caffeine (limit to 200mg/day)","Unwashed fruits and vegetables","Raw sprouts"].map(f=>(
            <div key={f} style={{display:"flex",gap:8,fontSize:12,color:"#555",alignItems:"flex-start"}}>
              <span style={{color:"#E24B4A",flexShrink:0}}>✕</span>{f}
            </div>
          ))}
        </div>
      </div>
      <AdBanner slot="rect"/>
    </div>
  );
}

function ArticlePage(){
  const { articleId } = useParams();
  const navigate = useNavigate();
  const article = ARTICLES.find(a=>a.id===articleId);

  useEffect(()=>{
    if(article){
      document.title=`${article.title} — Mother Pregnancy Care`;
    }
    window.scrollTo({top:0,behavior:"smooth"});
    return()=>{ document.title="Mother Pregnancy Care | Due Date Calculator & Pregnancy Guide"; };
  },[article]);

  if(!article){
    return(
      <div style={{maxWidth:720,margin:"0 auto",padding:"60px 16px",textAlign:"center"}}>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:PINK[800]}}>Article not found</h1>
        <Link to="/blog" style={{color:PINK[500],fontWeight:700}}>← Back to all articles</Link>
      </div>
    );
  }

  return(
    <div style={{maxWidth:720,margin:"0 auto",padding:"32px 16px"}}>
      {/* Back button */}
      <button onClick={()=>navigate("/blog")} style={{display:"flex",alignItems:"center",gap:7,background:"none",border:"none",color:PINK[600],fontSize:13,fontWeight:700,cursor:"pointer",marginBottom:24,padding:0}}>
        ← Back to Articles
      </button>
      {/* Article header */}
      <div style={{background:`linear-gradient(135deg,${PINK[50]},#fff)`,border:`1.5px solid ${PINK[200]}`,borderRadius:20,padding:"28px 24px",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,flexWrap:"wrap"}}>
          <span style={{fontSize:28}}>{article.icon}</span>
          <span style={{background:PINK[100],color:PINK[700],fontSize:11,fontWeight:700,padding:"3px 12px",borderRadius:99}}>{article.cat}</span>
          <span style={{fontSize:11,color:"#bbb"}}>{article.read}</span>
        </div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,4vw,32px)",color:PINK[800],margin:"0 0 12px",lineHeight:1.3,fontWeight:700}}>{article.title}</h1>
        <p style={{fontSize:15,color:"#777",margin:0,lineHeight:1.7,fontStyle:"italic"}}>{article.desc}</p>
      </div>

      <AdBanner slot="top"/>

      {/* Article body */}
      <div style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:20,padding:"28px 24px",marginBottom:20}}>
        {article.content.map((block,i)=>{
          if(block.type==="intro") return(
            <p key={i} style={{fontSize:16,color:"#444",lineHeight:1.9,marginBottom:24,fontWeight:500,borderLeft:`4px solid ${PINK[300]}`,paddingLeft:16}}>{block.text}</p>
          );
          if(block.type==="heading") return(
            <h2 key={i} style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:PINK[800],margin:"28px 0 10px",fontWeight:700}}>{block.text}</h2>
          );
          if(block.type==="para") return(
            <p key={i} style={{fontSize:14,color:"#555",lineHeight:1.9,marginBottom:16}}>{block.text}</p>
          );
          if(block.type==="tip") return(
            <div key={i} style={{background:PINK[50],border:`1.5px solid ${PINK[200]}`,borderRadius:14,padding:"16px 20px",margin:"24px 0",fontSize:13,color:PINK[800],lineHeight:1.8,fontWeight:500}}>
              {block.text}
            </div>
          );
          return null;
        })}
      </div>

      {/* Medically Reviewed Badge */}
      <div style={{background:`linear-gradient(135deg,${PINK[50]},#fff)`,border:`1.5px solid ${PINK[200]}`,borderRadius:16,padding:"18px 22px",marginBottom:20,display:"flex",alignItems:"flex-start",gap:14}}>
        <div style={{background:PINK[100],borderRadius:"50%",width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>✅</div>
        <div>
          <div style={{fontSize:11,fontWeight:700,color:PINK[600],letterSpacing:"0.04em",marginBottom:3,textTransform:"uppercase"}}>Medically Reviewed</div>
          <div style={{fontSize:14,color:PINK[800],fontWeight:700,marginBottom:2}}>Dr. Amra Lodhi</div>
          <div style={{fontSize:12,color:"#777",lineHeight:1.6}}>Gynecologist, Amra Medical Center — This article has been medically reviewed for accuracy.</div>
        </div>
      </div>

      <AdBanner slot="rect"/>

      {/* Related articles */}
      <div style={{marginBottom:20}}>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:PINK[800],marginBottom:14}}>More Articles You Might Like</h3>
        <div className="blog-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:14}}>
          {ARTICLES.filter(a=>a.id!==article.id).slice(0,3).map(a=>(
            <Link key={a.id} to={`/blog/${a.id}`} style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:14,padding:16,cursor:"pointer",textDecoration:"none",display:"block"}}>
              <div style={{fontSize:20,marginBottom:7}}>{a.icon}</div>
              <div style={{fontWeight:700,color:PINK[800],fontSize:13,marginBottom:5,lineHeight:1.4}}>{a.title}</div>
              <div style={{fontSize:11,color:PINK[500],fontWeight:700}}>Read →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Blog(){
  return(
    <div style={{maxWidth:760,margin:"0 auto",padding:"36px 16px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:PINK[800],margin:"0 0 6px"}}>Pregnancy Resource Center</h2>
        <p style={{color:"#777",fontSize:14}}>Warm, honest articles to guide you through every stage of your pregnancy journey.</p>
      </div>
      <AdBanner slot="top"/>
      <div className="blog-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16,marginBottom:22}}>
        {ARTICLES.map(a=>(
          <Link key={a.id} to={`/blog/${a.id}`} style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:16,padding:20,cursor:"pointer",transition:"border-color 0.2s",textDecoration:"none",display:"block"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=PINK[400]}
            onMouseLeave={e=>e.currentTarget.style.borderColor=PINK[200]}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{fontSize:20}}>{a.icon}</span>
              <span style={{background:PINK[100],color:PINK[700],fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:99}}>{a.cat}</span>
              <span style={{fontSize:10,color:"#bbb",marginLeft:"auto"}}>{a.read}</span>
            </div>
            <h3 style={{fontSize:14,fontWeight:700,color:PINK[800],margin:"0 0 7px",lineHeight:1.4}}>{a.title}</h3>
            <p style={{fontSize:12,color:"#777",margin:"0 0 12px",lineHeight:1.6}}>{a.desc}</p>
            <div style={{fontSize:12,color:PINK[500],fontWeight:700}}>Read full article →</div>
          </Link>
        ))}
      </div>
      <div style={{background:PINK[50],border:`1.5px solid ${PINK[200]}`,borderRadius:16,padding:22,textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:22,marginBottom:7}}>📧</div>
        <div style={{fontWeight:700,color:PINK[800],fontSize:15,marginBottom:5}}>Get Weekly Pregnancy Tips in Your Inbox</div>
        <div style={{fontSize:13,color:"#888",marginBottom:14}}>Join 50,000+ expecting moms getting personalized weekly updates — completely free.</div>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <input type="email" placeholder="Enter your email address" style={{padding:"10px 14px",borderRadius:10,border:`1.5px solid ${PINK[200]}`,fontSize:13,width:240,outline:"none",boxSizing:"border-box"}}/>
          <button style={{background:PINK[500],color:"#fff",border:"none",borderRadius:10,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Subscribe Free</button>
        </div>
      </div>
      <AdBanner slot="rect"/>
    </div>
  );
}

function FAQ(){
  const [open,setOpen]=useState(null);
  return(
    <div style={{maxWidth:760,margin:"0 auto",padding:"36px 16px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:PINK[800],margin:"0 0 6px"}}>Frequently Asked Questions</h2>
        <p style={{color:"#777",fontSize:14}}>Clear answers to the most common pregnancy questions.</p>
      </div>
      <AdBanner slot="top"/>
      <div style={{display:"grid",gap:10,marginBottom:20}}>
        {FAQS.map((f,i)=>(
          <div key={i} style={{background:"#fff",border:`1.5px solid ${open===i?PINK[400]:PINK[200]}`,borderRadius:14,overflow:"hidden"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"15px 18px",background:"transparent",border:"none",cursor:"pointer",textAlign:"left",gap:14}}>
              <span style={{fontWeight:700,color:PINK[800],fontSize:13,lineHeight:1.4}}>{f.q}</span>
              <span style={{color:PINK[500],fontSize:20,flexShrink:0,transform:open===i?"rotate(45deg)":"rotate(0)",transition:"transform 0.2s"}}>+</span>
            </button>
            {open===i&&<div style={{padding:"0 18px 14px",fontSize:13,color:"#666",lineHeight:1.8}}>{f.a}</div>}
          </div>
        ))}
      </div>
      <div style={{background:PINK[50],border:`1.5px solid ${PINK[200]}`,borderRadius:14,padding:20,textAlign:"center"}}>
        <div style={{fontWeight:700,color:PINK[800],marginBottom:5,fontSize:14}}>💬 Still have questions?</div>
        <div style={{fontSize:12,color:"#888"}}>Always consult your OB-GYN or midwife for personalized medical advice. This tool is for informational purposes only.</div>
      </div>
      <AdBanner slot="rect"/>
    </div>
  );
}

function PrivacyTerms(){
  return(
    <div style={{maxWidth:760,margin:"0 auto",padding:"36px 16px"}}>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:PINK[800],marginBottom:4}}>Privacy Policy & Terms</h2>
      <p style={{color:"#999",fontSize:12,marginBottom:28}}>Last updated: June 2026</p>
      <div style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:18,padding:28}}>
        {[
          ["1. Data Privacy","Mother Pregnancy Care does not collect, store, or share any personal health information you enter into our calculator. All calculations are performed locally in your browser. We do not have access to your pregnancy dates, cycle length, or any other health data you enter."],
          ["2. Cookies & Analytics","We use anonymous analytics cookies (such as Google Analytics) to understand how visitors use our website. These cookies do not identify you personally."],
          ["3. Google AdSense","We use Google AdSense to display advertisements on our website. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings at adssettings.google.com."],
          ["4. Third-Party Links","Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites."],
          ["5. Medical Disclaimer","Mother Pregnancy Care is an informational tool only. The content on this website is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your doctor or qualified health provider."],
          ["6. Children's Privacy","Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children."],
          ["7. Contact","For questions about this Privacy Policy: usama1500usama@gmail.com"],
        ].map(([title,body])=>(
          <div key={title} style={{marginBottom:22}}>
            <h3 style={{fontSize:15,fontWeight:700,color:PINK[800],marginBottom:7}}>{title}</h3>
            <p style={{fontSize:13,color:"#555",lineHeight:1.9,margin:0}}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutContact(){
  const [submitted,setSubmitted]=useState(false);
  return(
    <div style={{maxWidth:760,margin:"0 auto",padding:"36px 16px"}}>
      <div style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:18,padding:26,marginBottom:20}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:26,color:PINK[800],marginBottom:10}}>About Mother Pregnancy Care</h2>
        <p style={{fontSize:14,lineHeight:1.8,color:"#555",margin:0}}>Mother Pregnancy Care was created with one simple goal: to give every expecting mother access to accurate, easy-to-understand pregnancy information — completely free. We believe that knowledge empowers mothers, and that every woman deserves clear guidance through one of life's most important journeys. Our calculator uses the standard Naegele's Rule formula used by healthcare professionals worldwide.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10,marginTop:18}}>
          {["AI-powered due date calculator","Week-by-week baby development","Personalized pregnancy tips","Trimester symptom guides","Pregnancy nutrition advice","Expert-written articles"].map(f=>(
            <div key={f} style={{display:"flex",gap:8,fontSize:13,color:"#555"}}>
              <span style={{color:PINK[500]}}>✓</span>{f}
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:18,padding:26}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:PINK[800],marginBottom:8}}>Contact Our Support Team</h2>
        <p style={{fontSize:13,color:"#777",marginBottom:20}}>Have questions or feedback? Reach us at <strong style={{color:PINK[600]}}>usama1500usama@gmail.com</strong> or use the form below.</p>
        {submitted?(
          <div style={{background:PINK[50],color:PINK[700],padding:18,borderRadius:12,fontWeight:600,textAlign:"center",fontSize:14}}>
            ✨ Message sent successfully! We'll get back to you within 48 hours.
          </div>
        ):(
          <div style={{display:"grid",gap:14}}>
            {[["Full Name","text","Your name"],["Email Address","email","Your email"],["Subject","text","Subject"]].map(([label,type,ph])=>(
              <div key={label}>
                <label style={{display:"block",fontSize:12,fontWeight:700,color:PINK[700],marginBottom:6}}>{label}</label>
                <input type={type} placeholder={ph} style={{width:"100%",padding:"11px 13px",borderRadius:10,border:`1.5px solid ${PINK[200]}`,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
              </div>
            ))}
            <div>
              <label style={{display:"block",fontSize:12,fontWeight:700,color:PINK[700],marginBottom:6}}>Message</label>
              <textarea rows={4} placeholder="Your message..." style={{width:"100%",padding:"11px 13px",borderRadius:10,border:`1.5px solid ${PINK[200]}`,fontSize:13,outline:"none",boxSizing:"border-box",resize:"vertical"}}/>
            </div>
            <button onClick={()=>setSubmitted(true)} style={{background:PINK[500],color:"#fff",border:"none",borderRadius:10,padding:13,fontSize:14,fontWeight:700,cursor:"pointer"}}>Send Message 💌</button>
            <div style={{borderTop:`1px solid ${PINK[100]}`,paddingTop:12}}>
              <div style={{fontSize:12,color:"#888"}}>📧 usama1500usama@gmail.com</div>
              <div style={{fontSize:12,color:"#888",marginTop:4}}>⏰ Response time: within 48 hours</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



function CookieBanner({onAccept,onDecline}){
  return(
    <div style={{
      position:"fixed",bottom:0,left:0,right:0,zIndex:9999,
      background:"#fff",borderTop:`2px solid ${PINK[200]}`,
      boxShadow:"0 -4px 32px rgba(110,13,36,0.10)",
      padding:"16px 20px",
    }}>
      <div style={{maxWidth:900,margin:"0 auto",display:"flex",alignItems:"flex-start",gap:16,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:260}}>
          <div style={{fontWeight:700,color:PINK[800],fontSize:14,marginBottom:5}}>🍪 We use cookies</div>
          <div style={{fontSize:12,color:"#666",lineHeight:1.7}}>
            Mother Pregnancy Care uses cookies to improve your experience and to display personalised advertisements through Google AdSense. 
            By clicking <strong>"Accept All"</strong>, you consent to our use of cookies as described in our{" "}
            <span style={{color:PINK[500],cursor:"pointer",textDecoration:"underline"}} onClick={()=>{}}>Privacy Policy</span>.
            You can also choose to decline non-essential cookies.
          </div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexShrink:0,flexWrap:"wrap"}}>
          <button onClick={onDecline} style={{
            background:"#fff",color:"#666",border:"1.5px solid #ddd",
            borderRadius:10,padding:"9px 20px",fontSize:13,fontWeight:600,cursor:"pointer",
          }}>Essential Only</button>
          <button onClick={onAccept} style={{
            background:PINK[500],color:"#fff",border:"none",
            borderRadius:10,padding:"9px 22px",fontSize:13,fontWeight:700,cursor:"pointer",
          }}>Accept All 🌸</button>
        </div>
      </div>
    </div>
  );
}


function TermsOfService(){
  const Section = ({num,title,body}) => (
    <div style={{marginBottom:24}}>
      <h3 style={{fontSize:15,fontWeight:700,color:PINK[800],marginBottom:8}}>{num}. {title}</h3>
      <div style={{fontSize:13,color:"#555",lineHeight:1.9}}>{body}</div>
    </div>
  );
  return(
    <div style={{maxWidth:760,margin:"0 auto",padding:"36px 16px"}}>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:PINK[800],marginBottom:4}}>Terms of Service</h2>
      <p style={{color:"#999",fontSize:12,marginBottom:6}}>Last updated: June 2026 · Effective immediately upon use</p>
      <p style={{fontSize:13,color:"#777",marginBottom:28,lineHeight:1.7}}>Please read these Terms of Service carefully before using Mother Pregnancy Care. By accessing or using our website, you agree to be bound by these terms.</p>
      <div style={{background:"#fff",border:`1.5px solid ${PINK[200]}`,borderRadius:18,padding:28}}>
        <Section num="1" title="Acceptance of Terms"
          body="By accessing and using Mother Pregnancy Care (motherpregnancycare.com), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website." />
        <Section num="2" title="Medical Disclaimer — Please Read Carefully"
          body="Mother Pregnancy Care provides pregnancy information and tools for informational and educational purposes only. Our content does not constitute medical advice, diagnosis, treatment, or a substitute for professional medical consultation. The due date calculator and all other tools on this site are estimates based on standard formulas and should not replace the guidance of a qualified healthcare provider. Always consult your OB-GYN, midwife, or certified healthcare professional for any medical concerns, questions, or decisions related to your pregnancy." />
        <Section num="3" title="Accuracy of Information"
          body="We make every effort to ensure the information on Mother Pregnancy Care is accurate, up-to-date, and based on current medical guidelines. However, medical knowledge evolves continuously, and we cannot guarantee the absolute accuracy, completeness, or timeliness of all content. Information should not be relied upon as the sole basis for any health-related decision." />
        <Section num="4" title="Intellectual Property"
          body="All content on Mother Pregnancy Care — including text, graphics, logos, icons, images, and software — is the property of Mother Pregnancy Care and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from our content without express written permission." />
        <Section num="5" title="User Conduct"
          body="You agree to use Mother Pregnancy Care only for lawful purposes and in a way that does not infringe the rights of others. You agree not to attempt to gain unauthorized access to any part of the site, introduce malicious software, or use the site in any way that could damage, disable, or impair its functionality." />
        <Section num="6" title="Third-Party Links and Advertising"
          body="Mother Pregnancy Care may contain links to third-party websites and display advertisements through Google AdSense. We are not responsible for the content, accuracy, or practices of any third-party sites. The presence of a link or advertisement does not constitute our endorsement of that site or product. Google AdSense uses cookies to display relevant ads — see our Privacy Policy for details." />
        <Section num="7" title="Limitation of Liability"
          body="To the fullest extent permitted by applicable law, Mother Pregnancy Care and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, our website or content. Our total liability to you for any claim shall not exceed the amount you paid to access our services (which is zero, as Mother Pregnancy Care is free)." />
        <Section num="8" title="Privacy"
          body="Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms by reference, explains how we collect, use, and protect information about you. By using Mother Pregnancy Care, you consent to our privacy practices as described in our Privacy Policy." />
        <Section num="9" title="Changes to Terms"
          body="We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of Mother Pregnancy Care after any changes constitutes your acceptance of the new terms. We encourage you to review these terms periodically." />
        <Section num="10" title="Governing Law"
          body="These Terms of Service are governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of Mother Pregnancy Care shall be subject to the exclusive jurisdiction of the appropriate courts." />
        <Section num="11" title="Contact Us"
          body="If you have any questions about these Terms of Service, please contact us at: usama1500usama@gmail.com" />
      </div>
    </div>
  );
}


function Footer({t}){
  const tools=["Calculator","Milestones","Symptoms","Nutrition","Blog","FAQ"];
  return(
    <footer style={{background:PINK[800],color:"#fff",padding:"44px 16px 24px",marginTop:40}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <div className="footer-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:28,marginBottom:36}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,marginBottom:8}}>🤰 Mother Pregnancy Care</div>
            <div style={{fontSize:12,color:PINK[200],lineHeight:1.7}}>{t.footerDesc}</div>
            <div style={{fontSize:11,color:PINK[400],marginTop:12}}>© 2026 Mother Pregnancy Care</div>
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:11,marginBottom:10,color:PINK[200],letterSpacing:"0.06em"}}>TOOLS</div>
            {tools.map(l=>(
              <Link key={l} to={ROUTES[l]} style={{display:"block",background:"none",border:"none",color:PINK[100],fontSize:12,cursor:"pointer",padding:"0 0 7px",textAlign:"left",textDecoration:"none"}}>{l}</Link>
            ))}
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:11,marginBottom:10,color:PINK[200],letterSpacing:"0.06em"}}>COMPANY</div>
            {[["Home",t.navHome],["About & Contact",t.navAbout],["Privacy & Terms",t.navPrivacy],["Terms of Service","Terms of Service"]].map(([page,label])=>(
              <Link key={page} to={ROUTES[page]} style={{display:"block",background:"none",border:"none",color:PINK[100],fontSize:12,cursor:"pointer",padding:"0 0 7px",textAlign:"left",textDecoration:"none"}}>{label}</Link>
            ))}
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:11,marginBottom:10,color:PINK[200],letterSpacing:"0.06em"}}>DISCLAIMER</div>
            <div style={{fontSize:11,color:PINK[300],lineHeight:1.8}}>This tool is for informational purposes only and does not constitute medical advice. Always consult your healthcare provider.</div>
          </div>
        </div>
        <div style={{borderTop:`1px solid ${PINK[700]}`,paddingTop:18,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <div style={{fontSize:11,color:PINK[400]}}>All rights reserved. Mother Pregnancy Care 2026.</div>
          <div style={{fontSize:11,color:PINK[400]}}>Made with 💗 for every expecting mother</div>
        </div>
      </div>
    </footer>
  );
}

function PageTitleUpdater(){
  const location=useLocation();
  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"});
    const titles={
      "/":"Mother Pregnancy Care | Free Pregnancy Due Date Calculator",
      "/calculator":"Pregnancy Due Date Calculator | Mother Pregnancy Care",
      "/milestones":"Pregnancy Milestones Week by Week | Mother Pregnancy Care",
      "/symptoms":"Pregnancy Symptoms by Trimester | Mother Pregnancy Care",
      "/nutrition":"Pregnancy Nutrition Guide | Mother Pregnancy Care",
      "/blog":"Pregnancy Articles & Expert Guides | Mother Pregnancy Care",
      "/faq":"Pregnancy FAQs Answered | Mother Pregnancy Care",
      "/about":"About Mother Pregnancy Care",
      "/privacy":"Privacy Policy | Mother Pregnancy Care",
      "/terms":"Terms of Service | Mother Pregnancy Care",
    };
    if(titles[location.pathname]){
      document.title=titles[location.pathname];
    }
  },[location.pathname]);
  return null;
}

function AppLayout({t,lang,setLang,cookieConsent,handleCookieAccept,handleCookieDecline}){
  const location=useLocation();
  return(
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#FAFAFA",minHeight:"100vh",paddingBottom:cookieConsent?0:80}}>
      <Nav t={t} lang={lang} setLang={setLang}/>
      <PageTitleUpdater/>
      <main>
        <div key={location.pathname} className="page-enter">
          <Routes>
            <Route path="/" element={<><Hero t={t}/><FeaturesSection t={t}/><Testimonials/></>}/>
            <Route path="/calculator" element={<Calculator t={t}/>}/>
            <Route path="/milestones" element={<Milestones/>}/>
            <Route path="/symptoms" element={<Symptoms/>}/>
            <Route path="/nutrition" element={<Nutrition/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/blog/:articleId" element={<ArticlePage/>}/>
            <Route path="/faq" element={<FAQ/>}/>
            <Route path="/privacy" element={<PrivacyTerms/>}/>
            <Route path="/terms" element={<TermsOfService/>}/>
            <Route path="/about" element={<AboutContact/>}/>
          </Routes>
        </div>
        <MedicalDisclaimer/>
      </main>
      <Footer t={t}/>
      {!cookieConsent && (
        <CookieBanner onAccept={handleCookieAccept} onDecline={handleCookieDecline}/>
      )}
    </div>
  );
}

export default function App(){
  const [lang,setLang]=useState("en");
  const [cookieConsent,setCookieConsent]=useState(()=>{
    try{ return localStorage.getItem("bb_cookie_consent") || null; }catch{ return null; }
  });
  const t=TRANSLATIONS[lang];

  useEffect(()=>{
    const link=document.createElement("link");
    link.href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap";
    link.rel="stylesheet";
    document.head.appendChild(link);
    const style=document.createElement("style");
    style.textContent=css;
    document.head.appendChild(style);
    // SEO Meta tags
    const setMeta=(n,v,prop=false)=>{
      let el=document.querySelector(prop?`meta[property="${n}"]`:`meta[name="${n}"]`);
      if(!el){el=document.createElement("meta");prop?el.setAttribute("property",n):el.setAttribute("name",n);document.head.appendChild(el);}
      el.setAttribute("content",v);
    };
    document.title="Mother Pregnancy Care | Due Date Calculator & Pregnancy Guide";
    setMeta("description","Calculate your pregnancy due date instantly. Get week-by-week baby development, trimester guides, nutrition advice, and 20+ expert pregnancy articles. Completely free.");
    setMeta("keywords","pregnancy due date calculator, pregnancy week calculator, baby milestones, pregnancy tips, when is my due date, free pregnancy calculator, week by week pregnancy, pregnancy symptoms, prenatal nutrition guide");
    setMeta("robots","index, follow");
    setMeta("author","Mother Pregnancy Care");
    setMeta("og:title","Mother Pregnancy Care | Free Pregnancy Calculator & Expert Guides",true);
    setMeta("og:description","Your free pregnancy companion. Due date calculator, baby milestones, nutrition guide, and 20+ expert articles.",true);
    setMeta("og:type","website",true);
    setMeta("og:site_name","Mother Pregnancy Care",true);
    setMeta("twitter:card","summary_large_image");
    setMeta("twitter:title","Mother Pregnancy Care | Free Pregnancy Calculator");
    setMeta("twitter:description","Calculate your due date and get personalized pregnancy tips. Free forever.");
    let can=document.querySelector("link[rel=canonical]");
    if(!can){can=document.createElement("link");can.rel="canonical";document.head.appendChild(can);}
    can.href="https://www.motherpregnancy.com";
    const schema=document.createElement("script");
    schema.type="application/ld+json";
    schema.textContent=JSON.stringify({"@context":"https://schema.org","@type":"WebSite","name":"Mother Pregnancy Care","url":"https://www.motherpregnancy.com","description":"Free pregnancy due date calculator with week-by-week guides, baby milestones, and expert articles."});
    document.head.appendChild(schema);
  },[]);

  const handleCookieAccept=()=>{
    try{localStorage.setItem("bb_cookie_consent","all");}catch{}
    setCookieConsent("all");
  };
  const handleCookieDecline=()=>{
    try{localStorage.setItem("bb_cookie_consent","essential");}catch{}
    setCookieConsent("essential");
  };

  return(
    <BrowserRouter>
      <AppLayout
        t={t}
        lang={lang}
        setLang={setLang}
        cookieConsent={cookieConsent}
        handleCookieAccept={handleCookieAccept}
        handleCookieDecline={handleCookieDecline}
      />
    </BrowserRouter>
  );
}
