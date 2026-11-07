import type { LegalPageContent } from "./legal-content";

/**
 * The Water Check app's legal pages. The app shows a shorter copy of the Privacy Policy and Terms
 * and links here for the full text, so the two must say the same thing: when the app changes what
 * it collects or how it works, update both on the same day and move the effective date.
 */

const EFFECTIVE = "November 4, 2026";
/** The cycle answer stays on the phone; the legal name is as registered; where you play your sports (6 November). */
const HEALTH_UPDATE = "November 6, 2026";
const EMAIL = "expectedendai@gmail.com";

export const WATER_CHECK_LEGAL = {
  "watercheck-privacy": {
    eyebrow: "The Water Check",
    title: "The Water Check Privacy Policy",
    intro:
      "This policy explains what The Water Check app collects, where it is kept, who helps us run it, and the choices you have. The app is made by EXPECTEDEND LLC, a Florida company. Our Expected End website has its own privacy statement.",
    effectiveDate: HEALTH_UPDATE,
    related: [
      { label: "Consumer Health Data Privacy Policy", href: "/thewatercheck/consumer-health-data" },
      { label: "Delete your account", href: "/thewatercheck/delete-account" },
      { label: "Terms and Conditions", href: "/thewatercheck/terms" },
    ],
    sections: [
      {
        heading: "The short version",
        paragraphs: ["The details are below, but these are the main points:"],
        bullets: [
          "Your account, your sign-up answers, each drink and food you log with its time, your daily water totals and your Crew live on our servers so they follow you to a new phone.",
          "Your Drink Journal, saved drinks and foods, Guide pearls, training sessions, your cycle answer and cycle notes stay on your phone.",
          "On iPhone, if you allow it, the app reads your workouts from Apple Health, and nothing else from it. They stay on your phone and are never sent to us.",
          "Barcode scans look a drink up in Open Food Facts, a free, open food database. Only the barcode number is sent.",
          "Drink Check photo scans are for adults 18 and over. Google's Gemini AI reads the photo, and we do not keep it.",
          "We do not sell your information or share it with advertising networks.",
          "You can delete your account and its data at any time, in the app or by email.",
        ],
      },
      {
        heading: "Information you give us",
        paragraphs: [
          "Account. When you sign in with Apple or Google, we receive an account identifier and the name, email address and basic profile details that provider shares. Apple may give us a private relay email instead of your real one. We use these to create, secure and restore your account. If you sign in with Apple, we also keep the token Apple gives us, only so we can revoke it when you delete your account.",
          "Sign-up answers. To work out your daily water number, the app asks for your age range, sex (and whether you are pregnant or breastfeeding, if you choose to say), weight, height, activity level, the sports you play (and, for a sport that can go either way or one you type in, whether you play it indoors or outside), whether you drink coffee, and your climate. Some of these answers are health information, and we ask for your consent on a screen of its own, with a box you tick, before the first question. You can skip the optional ones and change any of them later in Details and Settings.",
          "Later questions. On Today the app may ask what you want to feel and how often you feel bloated. Both are optional and only show in Your details; your number and tips do not use them.",
          "Drinks and foods you log. Each entry is kept with your account: its time, what it was (such as a glass, a food, or a drink's name, including a name you typed or one Gemini read), its water amount, and any serving and caffeine. This is so your history and streaks follow you to a new phone. Alcohol is different: it goes only to the Drink Journal on your phone, and adding water with it logs only a plain glass.",
          "Daily totals. For each day you log, your account keeps the total from drinks, the total from food and your goal for that day, so your calendar and streaks survive a new phone.",
          "Fruit Fast. When an adult starts Fruit Fast, we keep a record that the safety note was read and accepted, with the date and the version of the note.",
          "Crew. If you use Crew, we store the Crews you make or join, your first name and widget colors as your Crew sees them, your percent of goal and streak, the quick messages and cheers you send, and any blocks and reports.",
          "Language. We keep your language choice with your account, so the app opens in it on a new phone.",
          "Support. If you email us, we receive your email address and whatever you include.",
          "Technical logs. Our hosting provider, Supabase, keeps request logs (such as IP address, device and time) to run and protect the service.",
        ],
      },
      {
        heading: "Information that stays on your phone",
        paragraphs: [
          "Some things are not sent to your account: your Drink Journal (the drinks you scanned and how they made you feel), the drinks and foods you save for one-tap logging, your Guide pearls, your cycle answer if you choose to give one, cycle notes, activity notes, training sessions logged in earlier versions of the app, the body outline you pick, reminder times, sounds and other app settings, and a small note of when the app last showed you an offer.",
          "Your Home Screen widget reads what it shows from the app on the same phone, including today's electrolyte charge from the drinks you scanned. That stays on the phone too.",
          "These may be included in your own phone backup (iCloud or Google) if you use one. Because we do not have this information, we cannot restore it for you. Deleting the app or clearing its data erases it from the phone.",
          "Workouts the app reads from Apple Health, if you allow it, stay on your phone as well. The app does not save them; it reads them from Apple Health each time it opens. It keeps only a note of which workouts it has already shown a card for, for 7 days. See Apple Health and Health Connect below.",
        ],
      },
      {
        heading: "Drink Check: barcode and photo scans",
        paragraphs: [
          "When you scan a drink's barcode, or type one in, the app sends only the barcode number from your phone to Open Food Facts (world.openfoodfacts.org), a free, open food database, and gets back what its label says: the drink's name, size, sugar, caffeine, carbohydrate and electrolytes (sodium, potassium, magnesium and calcium). To suggest similar drinks, the app may also ask Open Food Facts for other drinks in the same category. No account details, photos or location are sent. Open Food Facts receives the request the way any website does, under its own privacy policy.",
          "Photo scans are for adults 18 and over. We check your age range on our server before a photo is read, and ages 13 to 17 can still scan barcodes and type. When you take a photo of a drink or a food, the app makes the image smaller and sends it through our server to Google's Gemini API. Gemini reads it and returns what it found: for a drink, its name, size, sugar, caffeine and ingredients; for a food, what it is and about how much water it holds. The app asks before your first scan.",
          "We do not keep your photo. Google receives it, and may retain data for a limited time under its own terms for the Gemini API. Our server keeps a count of how many scans your account used, so the free allowance works.",
          "AI can be wrong. A Drink Check result is a quick read of a label, not a lab test, a health rating of a product or medical advice. Always check the real label, and never rely on Drink Check for allergies or medical diets.",
        ],
      },
      {
        heading: "Camera, location and notifications",
        paragraphs: [
          "Camera. Used only when you choose to scan a barcode or take a photo of a drink or food.",
          "Location. If you ask the app to use your current weather, it requests your approximate location, rounds the coordinates and sends them to Open-Meteo for temperature and humidity. We save the resulting climate category, not your coordinates. You can pick your climate by hand instead.",
          "Notifications. Fruit Fast reminders are scheduled on your phone. If you allow push notifications, we keep your phone's push token, its language and its time zone with your account, so we can tell you when someone in your Crew cheers you on, who is on top of your Crew each week, when you take the lead in your Crew today, and when a streak of 3 or more days is about to end. For leads and streaks we use the daily totals already kept with your account. Pushes come in your language, never between 9 PM and 8 AM your time, and at most one a day besides cheers. We keep a record of each push sent, and when you open one, so we can keep them rare. Records older than 90 days are deleted the next time we send you a push, and all of them when you delete your account. Google's Firebase Cloud Messaging, and Apple for iPhones, deliver them.",
          "You can turn Crew notifications and streak reminders off separately in the app's Settings, or all of them in your device settings. Signing out or deleting your account removes your phone's push token.",
        ],
      },
      {
        heading: "Apple Health and Health Connect",
        paragraphs: [
          "If you turn on Apple Health (iPhone) or Health Connect (Android) in Settings, the app adds the water you log and the caffeine in your log to it. With Everything Forever it also adds the sodium, potassium, magnesium, calcium and sugar from drinks you scan.",
          "What it adds is kept by Apple Health or Health Connect on your phone. We never sell it, use it for advertising or store it in iCloud. You can turn this off in Settings at any time, and delete what was added in the Health app.",
          "On iPhone, the app also reads your workouts from Apple Health, if you allow it. This is optional: Apple asks you first, and everything else in the app works the same if you say no. It reads workouts only: each one's type (such as a run or a walk), start and end time, length, active energy and distance. It does not read heart rate, sleep, weight or any other health data, and it does not read Health Connect.",
          "The app uses your workouts on your phone for two things: a card on Today after a workout of 20 minutes or more, which suggests about how much to drink over the next hour, and raising today's water number on a day you move more than usual (it never lowers it). Your workouts stay on your phone. They are never sent to our servers or to anyone else, never shown to your Crew, and never logged as water unless you tap Log. The daily goal kept with your account stays the number from your sign-up answers, so nothing from Apple Health reaches us. You can stop it at any time in the Health app (your picture, Apps, The Water Check) or by turning Apple Health off in the app's Settings.",
        ],
      },
      {
        heading: "Crew: what other people see",
        paragraphs: [
          "Crew is invite only. People in a Crew with you see your first name, your widget colors, today's percent of your own goal, your streak, the days you reached your goal this week, and the quick messages and cheers you send. They never see your ounces, body measurements, sign-up answers, notes or anything you drink, including alcohol.",
          "You can hide yourself in a Crew; the Crew's captain can still see that you are a member. Reports are reviewed by us and kept so we can keep Crews safe. A report about you keeps your first name and the Crew name, even after you delete your account.",
        ],
      },
      {
        heading: "Purchases",
        paragraphs: [
          "Purchases are made through the App Store or Google Play, which handle your payment. RevenueCat processes purchase records for us so a purchase works on your account and can be restored. Our server stores whether your account has a purchase. We never receive your card details.",
        ],
      },
      {
        heading: "How we use information",
        paragraphs: ["We use the information above only to:"],
        bullets: [
          "create and secure your account and keep you signed in;",
          "work out your daily water number and personalize the app (for example, showing caffeine tracking only to coffee drinkers);",
          "on your phone, suggest water after a workout and raise today's number, from workouts you allow the app to read from Apple Health;",
          "show your history, calendar, streaks and widgets;",
          "keep adult-only features such as Fruit Fast, alcohol logging and photo scans for adults;",
          "run Drink Check and apply its free allowance;",
          "run Crew, including filtering names, reviewing reports and acting on abuse;",
          "unlock and restore purchases;",
          "answer your messages, fix problems, protect the service and meet legal obligations.",
        ],
      },
      {
        heading: "Who helps us run the app",
        paragraphs: [
          "We share information only with providers that help us run the app, under their terms, and only what each one needs:",
        ],
        bullets: [
          "Supabase: hosts our database, sign-in and server functions, and keeps request logs.",
          "Apple and Google: sign-in, the App Store and Google Play.",
          "Google (Gemini API): reads Drink Check photos, for adults 18 and over.",
          "Open Food Facts: the barcode number of a drink you scan, sent from your phone.",
          "Google (Firebase Cloud Messaging) and Apple: deliver push notifications.",
          "RevenueCat: purchase records.",
          "Open-Meteo: rounded coordinates, only when you ask for current weather.",
        ],
      },
      {
        heading: "When else we might share",
        paragraphs: [
          "With people you choose, such as your Crew, as described above. When the law requires it, or when we believe in good faith it is needed to protect someone's safety, our rights or the security of the app. And as part of a merger, sale or reorganization of the business, in which case this notice keeps applying to your information.",
          "We do not sell personal information, we do not share it for cross-context behavioral advertising, and we do not use it for targeted advertising.",
        ],
      },
      {
        heading: "Google user data",
        paragraphs: [
          "If you sign in with Google, the app requests only your basic profile (name, email address and account identifier). We do not request access to your Gmail, contacts, Drive files or other Google account content. The Water Check's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "We keep account information while your account is open. When you delete your account, we delete it and the information tied to it from our active systems, and the app clears what it kept on that phone. Copies in our backups are deleted within 6 months. A Crew you captain passes to its next member and stays. We may keep a small amount for longer where the law requires it or to keep people safe, such as reports you filed about others (kept without your account), reports about you (which keep your first name and the Crew name) and purchase records the stores keep for tax and accounting. We also ask RevenueCat to delete its record of you.",
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "We use encrypted connections, account-based access rules on our database, and providers with strong security programs. No app or network is perfectly secure, so please keep your Apple or Google account protected.",
        ],
      },
      {
        heading: "Children and teens",
        paragraphs: [
          "The Water Check is not for children under 13, and we do not knowingly collect information from them. If we learn that a child under 13 has an account, we will delete it. A parent or guardian who believes this has happened can email us.",
          "If you are 13 to 17, please use the app with a parent's or guardian's permission and read this notice with them. If you choose the 13 to 17 age range, the app does not offer Fruit Fast, alcohol logging or photo scans. These go by the age range you give, which can be changed in Details, so please answer truthfully. Your water number is an estimate made for adults, so check it with a parent or clinician.",
        ],
      },
      {
        heading: "Your choices and rights",
        paragraphs: [
          "You can see and change your answers in the app, turn off location, camera and notifications in your device settings, and delete your account in the app (Profile, then Settings, then Delete account).",
          `Depending on where you live, you may also have the right to access, correct, download or delete your information, to withdraw consent, and to appeal our decision on a request. To make a request, email ${EMAIL} with “The Water Check privacy request” in the subject. We will confirm the account is yours, answer within 45 days (or tell you if we need more time, as the law allows), and never treat you differently for using your rights. If we say no, you can appeal by replying with “Appeal” in the subject; if you are still unhappy, you can contact your state attorney general or data protection authority. You can also use an authorized agent, who must show us your written permission.`,
        ],
      },
      {
        heading: "Notice for California and other US states",
        paragraphs: [
          "In the past 12 months we collected these categories of personal information: identifiers (account ID, email); personal characteristics (age range, sex); commercial information (whether you made a purchase); approximate location (only to fetch weather, not saved); internet or network activity (request logs); and sensitive personal information about health (body measurements, pregnancy or breastfeeding status, how often you feel bloated, each drink and food you log, hydration data). We collect them from you and your device for the purposes above, and disclose them only to the providers listed above. Workouts the app reads from Apple Health stay on your phone, and we do not receive them.",
          "We do not sell or share personal information as those words are defined in California law, and we use sensitive personal information only to provide the app you asked for. Residents of California, Colorado, Connecticut, Virginia, Texas, Oregon and other states with privacy laws can use the rights described above. Our Consumer Health Data Privacy Policy has more for Washington, Nevada and Connecticut residents.",
        ],
      },
      {
        heading: "If you are outside the United States",
        paragraphs: [
          "The app is offered in 43 languages, and your information is processed in the United States and wherever our providers operate. Where data protection laws like the GDPR apply, we rely on: performing our contract with you (to run the app), your explicit consent (for health information you choose to give us, which you give by ticking the box on the consent screen and can withdraw by changing your answers or deleting your account), our legitimate interests (to keep the app secure and improve it), and legal obligations. You may also complain to your local data protection authority.",
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: [
          "If we change this notice in a way that matters, we will update this page and its effective date before the change applies, and ask for your consent first where the law requires it. Please check back from time to time. The effective date at the top shows the current version.",
          `Questions or requests: ${EMAIL}, with “The Water Check privacy request” in the subject. EXPECTEDEND LLC, Florida, United States.`,
        ],
      },
    ],
  },

  "watercheck-terms": {
    eyebrow: "The Water Check",
    title: "The Water Check Terms and Conditions",
    intro:
      "These terms are an agreement between you and EXPECTEDEND LLC, a Florida company, for The Water Check app. By downloading or using the app you agree to them. Please read the health and safety section closely.",
    effectiveDate: EFFECTIVE,
    related: [
      { label: "Privacy Policy", href: "/thewatercheck/privacy" },
      { label: "Consumer Health Data Privacy Policy", href: "/thewatercheck/consumer-health-data" },
      { label: "Delete your account", href: "/thewatercheck/delete-account" },
    ],
    sections: [
      {
        heading: "Health and safety: please read",
        paragraphs: [
          "The Water Check is a general wellness app. It is not a medical device, and it does not diagnose, treat, cure or prevent any disease or condition. Its water number is an educational estimate from general guidance, not a prescription. It is made for adults, so if you are 13 to 17, check it with a parent or clinician. The P-Meter, the Guide, the body charge, sweat estimates and recharge plans after training, and every score in the app are general information, not medical or sports-medicine advice.",
          "Talk to a doctor or other qualified clinician before changing how much you drink or eat, especially if you are pregnant or breastfeeding, are an older adult, take medicine that affects fluid or salt balance, or have kidney, heart, liver or thyroid disease, diabetes, or a history of eating disorders. Do not force fluids: drinking too much water too fast can be dangerous. If you feel unwell, stop and get care. In an emergency, call 911 or your local emergency number.",
        ],
      },
      {
        heading: "Drink Check and other AI features",
        paragraphs: [
          "Drink Check photo scans are for adults 18 and over. Drink Check uses artificial intelligence to read photos, and AI makes mistakes. It may misread a label, a size, sugar, caffeine or an ingredient, or mistake one food for another. A Drink Check score is a quick read of a label to help you think about a drink. It is not a health rating, a safety certification, or a statement about any brand or product.",
          "Barcode results come from Open Food Facts, a database that anyone can edit, so a drink may be missing, out of date or wrong there. Electrolytes and charge only count what labels list.",
          "Always read the real label. Never use Drink Check to decide whether something is safe for an allergy, intolerance, medical diet or medicine. Food scans estimate water content and are approximate.",
        ],
      },
      {
        heading: "Fruit Fast and alcohol",
        paragraphs: [
          "Fruit Fast is for adults only. It is not for anyone who is pregnant or breastfeeding, has diabetes, kidney disease or a history of eating disorders, takes medicine that needs regular meals, or follows a diet set by a doctor. You choose to start it and can stop at any time; stop if you feel unwell.",
          "Alcohol logging is only for people of legal drinking age where they live, and the app asks you to confirm this first. The app does not encourage drinking alcohol, and alcohol adds nothing to your water for the day. Never drink and drive.",
        ],
      },
      {
        heading: "Who can use the app",
        paragraphs: [
          "You must be at least 13 years old. If you are under 18, or under the age of majority where you live, you may use the app only with a parent's or guardian's permission, and they agree to these terms for you. You must also be allowed to use the app under the laws that apply to you.",
        ],
      },
      {
        heading: "Your account",
        paragraphs: [
          "You sign in with Apple or Google. Keep that account secure, give truthful answers in the app, and do not use someone else's account. You are responsible for what happens under your account. You can delete it at any time in the app (Profile, then Settings, then Delete account).",
        ],
      },
      {
        heading: "Crew rules",
        paragraphs: [
          "Crew is for cheering each other on. Do not bully, harass, threaten or impersonate anyone, and do not use Crew names or messages that are hateful, sexual, violent, or that share someone's personal information. We have zero tolerance for abusive content or users.",
          "Use Report and Block to tell us about a problem and to stop seeing someone. We review reports and may rename or remove a Crew, remove a member, or suspend or close an account that breaks these rules, without notice where safety requires it. A Crew's captain can remove members.",
          "You are responsible for what you send in Crew. You give us permission to store it and show it to your Crew so the feature works, and to review it when it is reported. We do not claim ownership of it.",
        ],
      },
      {
        heading: "Purchases",
        paragraphs: [
          "The app is free to download, and some features need a purchase. Prices are shown in the App Store or Google Play in your currency before you buy, and you are charged by Apple or Google under their terms. Refunds are handled by Apple or Google under their policies; we cannot issue store refunds ourselves. If a purchase is refunded, the features it unlocked are removed from the account. You can restore purchases on your account in the app.",
          "During our opening year we may offer a one-time purchase that unlocks the app's paid features with no subscription. If the app later moves to a monthly plan, a one-time purchase made before then stays unlocked on that account, and we will not take away the features it unlocked while we continue to offer the app. \u201cEverything Forever\u201d, \u201cstays yours\u201d and \u201cfor good\u201d mean exactly this: for as long as we offer the app. They are not a promise that the app will run forever. Free allowances, such as free Drink Check scans, may change. We do not promise any particular future feature.",
          "Drink Check photo scans are for personal use and have a fair-use limit, currently 30 scans a day with the purchase, so the service stays available for everyone. We may change the limit, and will update these terms when we do.",
          "If we ever offer a subscription, the store will show its price and renewal period before you subscribe, it will renew until you cancel in your store settings, and deleting the app or your account does not cancel it.",
        ],
      },
      {
        heading: "Your license to use the app",
        paragraphs: [
          "We give you a personal, limited, non-exclusive, non-transferable, revocable license to use the app on devices you own or control, under these terms and the rules of the store you downloaded it from.",
          "You may not copy, sell, rent or redistribute the app; reverse engineer it except where the law allows; scrape it or use bots against it; get around its locks, limits or security; interfere with other people or our servers; or use it to break any law.",
        ],
      },
      {
        heading: "Our content",
        paragraphs: [
          "The app, its widget designs, illustrations, the character Bubbles, its text, sounds and code, and The Water Check name and logo belong to EXPECTEDEND LLC or our licensors. These terms do not give you any rights in them beyond using the app. If you send us ideas or feedback, we may use them without owing you anything.",
        ],
      },
      {
        heading: "Other services",
        paragraphs: [
          "The app works with services run by others, such as Apple, Google, RevenueCat and Open-Meteo, and it may link to outside websites and sources. Their own terms apply, and we are not responsible for them.",
        ],
      },
      {
        heading: "Changes, beta versions and ending",
        paragraphs: [
          "The app is growing, so features may be added, changed or removed. Test versions (for example through TestFlight) may have bugs and may lose data. We may suspend or end your access if you break these terms or if we stop offering the app. You can stop using the app and delete your account at any time. The sections on health and safety, AI, our content, disclaimers, liability, indemnity and disputes continue after your use ends.",
        ],
      },
      {
        heading: "Disclaimers",
        paragraphs: [
          "To the fullest extent the law allows, the app and everything in it are provided “as is” and “as available”, without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy and non-infringement. We do not promise that the app will be uninterrupted, error-free or secure, or that estimates, scans or content will be accurate or complete.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the fullest extent the law allows, EXPECTEDEND LLC and its owner, team and providers will not be liable for any indirect, incidental, special, consequential or punitive damages, or for lost data, health outcomes or decisions you make based on the app. Our total liability for any claim about the app is limited to the greater of the amount you paid us for the app in the 12 months before the claim, or 50 US dollars.",
          "Some places do not allow these limits, so they apply to you only as far as your local law allows. Nothing in these terms limits liability for things the law says cannot be limited, such as fraud or, where applicable, death or personal injury caused by negligence.",
        ],
      },
      {
        heading: "Indemnity",
        paragraphs: [
          "If you misuse the app, break these terms or violate someone else's rights, you agree to cover the reasonable costs, including legal fees, that EXPECTEDEND LLC faces because of it, as far as your local law allows.",
        ],
      },
      {
        heading: "Disputes and governing law",
        paragraphs: [
          `If you have a problem with the app, please email ${EMAIL} first; most things can be fixed quickly. If we cannot settle it within 60 days, these terms are governed by the laws of the State of Florida, without regard to conflict-of-law rules, and any dispute will be brought in the state or federal courts with jurisdiction over EXPECTEDEND LLC's principal place of business, except that either of us may use small claims court. To the extent the law allows, claims will be brought individually and not as part of a class.`,
          "If you live in the European Union, the United Kingdom or another place whose consumer laws give you rights these terms cannot take away, those rights still apply, and you may also bring a claim in your local courts.",
        ],
      },
      {
        heading: "If you got the app from the Apple App Store",
        paragraphs: ["These additional terms apply between you, us and Apple:"],
        bullets: [
          "These terms are between you and EXPECTEDEND LLC only, not Apple. We, not Apple, are solely responsible for the app and its content.",
          "Your license is limited to using the app on Apple-branded products you own or control, as allowed by the Usage Rules in the Apple Media Services Terms and Conditions, except that the app may be used by other accounts linked to you through Family Sharing or volume purchasing.",
          "We, not Apple, are responsible for any maintenance and support for the app. Apple has no obligation to provide them.",
          "If the app fails to meet any applicable warranty, you may notify Apple, and Apple will refund the purchase price, if any, to you. To the maximum extent the law allows, Apple has no other warranty obligation for the app. Any other claims, losses, liabilities, damages, costs or expenses from a failure to meet a warranty are our responsibility, to the extent these terms do not disclaim them.",
          "We, not Apple, are responsible for addressing any claims by you or a third party about the app or your possession or use of it, including product liability claims, claims that the app fails to meet legal or regulatory requirements, and claims under consumer protection, privacy or similar laws.",
          "If a third party claims the app or your use of it infringes their intellectual property rights, we, not Apple, are solely responsible for the investigation, defense, settlement and discharge of that claim.",
          "You represent that you are not located in a country subject to a US Government embargo or designated as a “terrorist supporting” country, and that you are not on any US Government list of prohibited or restricted parties.",
          `Questions, complaints or claims about the app go to EXPECTEDEND LLC at ${EMAIL}.`,
          "You must follow any third-party terms that apply when you use the app, such as your wireless data service agreement.",
          "Apple and Apple's subsidiaries are third-party beneficiaries of these terms. Once you accept them, Apple has the right (and is deemed to have accepted the right) to enforce these terms against you as a third-party beneficiary.",
        ],
      },
      {
        heading: "If you got the app from Google Play",
        paragraphs: [
          "Purchases through Google Play are also subject to Google Play's terms and policies. Google is not responsible for the app or its support.",
        ],
      },
      {
        heading: "Everything else",
        paragraphs: [
          "These terms, together with the Privacy Policy, the Community Guidelines and the Consumer Health Data Privacy Policy, are the whole agreement between you and us about the app. If any part is found unenforceable, the rest still applies. If we do not enforce a part right away, we have not given up the right to do so later. You may not transfer these terms; we may transfer them as part of a merger, sale or reorganization.",
          "We may update these terms. If a change matters, we will update this page and its effective date before it applies, and continuing to use the app after that means you accept the new terms. If you do not agree, please stop using the app and delete your account.",
          `Contact: EXPECTEDEND LLC, Florida, United States. ${EMAIL}.`,
        ],
      },
    ],
  },

  "watercheck-health-data": {
    eyebrow: "The Water Check",
    title: "Consumer Health Data Privacy Policy",
    intro:
      "Some states, including Washington, Nevada and Connecticut, give extra protection to information about your health. This policy explains how The Water Check, made by EXPECTEDEND LLC, handles that kind of information. It adds to our Privacy Policy.",
    effectiveDate: HEALTH_UPDATE,
    related: [
      { label: "Privacy Policy", href: "/thewatercheck/privacy" },
      { label: "Delete your account", href: "/thewatercheck/delete-account" },
    ],
    sections: [
      {
        heading: "Health data we collect",
        paragraphs: ["Kept with your account, so it follows you to a new phone:"],
        bullets: [
          "body measurements you enter (weight and height), age range and sex;",
          "whether you are pregnant or breastfeeding, if you choose to say;",
          "activity level, sports and whether you play them indoors or outside, whether you drink coffee, and your climate;",
          "each drink and food you log, with its time, amount and any name, serving and caffeine;",
          "your daily water goal and each day's totals from drinks and food;",
          "how often you feel bloated and what you want to feel, if you choose to answer;",
          "a record that you accepted the Fruit Fast safety note;",
          "your percent of goal and streak, which your Crew can see if you join one.",
        ],
      },
      {
        heading: "Health data that stays on your phone",
        paragraphs: [
          "Your Drink Journal (including how drinks made you feel, the electrolytes in them, and any alcohol you log), your cycle answer, cycle notes, activity notes, training sessions, saved drinks and Guide pearls stay in the app's storage on your device. We do not collect them. They may be included in your own phone backup (iCloud or Google) if you use one.",
          "Drink Check photo scans are for adults 18 and over. The photo is sent through our server to Google's Gemini API to be read. We do not keep your photo; Google may retain data for a limited time under its terms. What Gemini reads (such as sugar and caffeine) comes back to your phone.",
          "If you turn on Apple Health or Health Connect, the app adds your water and caffeine to it, and with Everything Forever the electrolytes and sugar from drinks you scan. That copy is kept by Apple Health or Health Connect on your phone, under your control. We do not receive it from there.",
          "Workouts from Apple Health, on iPhone, if you allow it. The app reads workouts and nothing else: each one's type, start and end time, length, active energy and distance. It uses them on your phone to suggest about how much to drink after a workout and to raise, never lower, today's water number. Reading them is optional and needs your permission in Apple's own prompt; you can stop it in the Health app or by turning Apple Health off in the app's Settings. Your workouts stay on your phone: we never receive them, they are never shared with anyone, including your Crew, and the daily goal kept with your account does not include them. The app does not read Health Connect.",
        ],
      },
      {
        heading: "Where it comes from and why",
        paragraphs: [
          "It comes from you and from your device. On iPhone the app can also read your workouts from Apple Health, only if you allow it, and they stay on your phone; it reads nothing else from Apple Health and nothing from Health Connect. We use it only to give you the app: to work out your daily water number, show your history, calendar and widgets, keep adult-only features for adults, run Drink Check, and show your Crew the progress you choose to share. We do not use it for advertising.",
          "We ask for your consent on a screen of its own, with a box you tick, before the first health question. It says what we collect, why, who receives it and how to withdraw. You can withdraw in Settings by changing your answers or deleting your account, or by email.",
        ],
      },
      {
        heading: "Who we share it with",
        bullets: [
          "Supabase, which hosts our database and processes it for us.",
          "Google's Gemini API, which reads Drink Check photos for us, for adults 18 and over.",
          "Google's Firebase Cloud Messaging and Apple, which deliver notifications if you allow them. Lead and streak messages come from your daily totals.",
          "Open Food Facts, which receives the barcode number of a drink you scan, sent from your phone.",
          "Open-Meteo, which receives rounded coordinates when you ask for current weather.",
          "People in your Crew, who see your percent of goal and streak, never your measurements or answers.",
          "Authorities, only when the law requires it.",
        ],
        paragraphs: [
          "We do not sell consumer health data. We do not use geofencing around health care locations.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You can ask us to confirm whether we collect, share or sell your consumer health data; to give you a copy of it and a list of the third parties and affiliates we shared it with; to delete it (and we will tell our processors to delete it too); and to withdraw your consent. You can delete everything yourself in the app (Profile, then Settings, then Delete account) or see our Delete your account page.",
          `To make a request, email ${EMAIL} with “Consumer health data request” in the subject. We will verify the request, answer within 45 days (we may extend once by 45 more days when necessary, and will tell you), and not charge you. If we decline, you can appeal by replying with “Appeal” in the subject, and we will answer within 45 days. If your appeal is denied, you can contact your state attorney general, for example the Washington State Attorney General at atg.wa.gov/file-complaint.`,
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: [
          `We will update this page and its effective date before a change that matters applies, and ask for your consent first where the law requires it. Contact: EXPECTEDEND LLC, Florida, United States. ${EMAIL}.`,
        ],
      },
    ],
  },

  "watercheck-delete-account": {
    eyebrow: "The Water Check",
    title: "Delete your account",
    intro:
      "You can delete your The Water Check account and its data at any time. It takes a few seconds in the app, or you can ask us by email if you no longer have the app.",
    effectiveDate: EFFECTIVE,
    related: [
      { label: "Privacy Policy", href: "/thewatercheck/privacy" },
      { label: "Terms and Conditions", href: "/thewatercheck/terms" },
    ],
    sections: [
      {
        heading: "In the app",
        bullets: ["Open The Water Check and sign in.", "Tap Profile, then Settings.", "Tap Delete account and confirm."],
        paragraphs: ["Your account is deleted right away, and the app clears what it kept on that phone."],
      },
      {
        heading: "By email",
        paragraphs: [
          `Email ${EMAIL} with “Delete my The Water Check account” in the subject, from the email address you sign in with, or tell us that address and whether you use Apple or Google sign-in. We may ask you to confirm the request comes from you. We delete the account within 30 days and reply when it is done.`,
        ],
      },
      {
        heading: "What is deleted",
        paragraphs: [
          "Your account, sign-up answers, each drink and food you logged, daily water totals, language choice, Fruit Fast record, Drink Check scan count, notification settings, records and push tokens, your Apple sign-in token, purchase status on our servers, and your Crew memberships. A Crew you captain passes to its next member and stays; if no one else is in it, it closes. Things that only lived on your phone go away when you delete the app or clear its data.",
        ],
      },
      {
        heading: "What may be kept",
        paragraphs: [
          "Reports you filed about others may be kept without your account, and reports about you keep your first name and the Crew name, so we can keep Crews safe. Copies in our backups are deleted within 6 months. We ask RevenueCat to delete its record of you. Apple and Google keep their own purchase records for tax and accounting, under their policies.",
        ],
      },
      {
        heading: "Purchases are not cancelled",
        paragraphs: [
          "Deleting your account does not cancel an App Store or Google Play subscription or refund a purchase. Manage those in your store account settings.",
        ],
      },
    ],
  },
  "watercheck-community": {
    eyebrow: "The Water Check",
    title: "The Water Check Community Guidelines",
    intro:
      "Crews are small groups of friends, family or teammates who cheer each other on. These rules keep them friendly for everyone. Joining or making a Crew means you agree to them, along with our Terms and Conditions.",
    effectiveDate: "October 27, 2026",
    related: [
      { label: "Terms and Conditions", href: "/thewatercheck/terms" },
      { label: "Privacy Policy", href: "/thewatercheck/privacy" },
    ],
    sections: [
      { heading: "Cheer each other on", paragraphs: ["Crews are for encouragement. Celebrate the wins, big and small."] },
      { heading: "Keep names clean", paragraphs: ["No hateful, sexual, violent or bullying Crew names or display names."] },
      { heading: "No pressure", paragraphs: ["Never push anyone to drink more than their number, to fast or to train while hurt. Every body is different."] },
      { heading: "Respect privacy", paragraphs: ["What you see in a Crew stays in the Crew. Don't share someone else's day or health outside it."] },
      { heading: "No spam or selling", paragraphs: ["Crews are not for ads, links or selling anything."] },
      { heading: "Report and block", paragraphs: ["If someone breaks these rules, use Report or Block on their bubble in the app. We review every report."] },
      {
        heading: "If the rules are broken",
        paragraphs: [
          "We can remove a name or a Crew. Serious or repeated cases can lose Crew access or have their account removed.",
          `Questions or concerns? Email ${EMAIL}, or use Contact support in the app's Settings.`,
        ],
      },
    ],
  },
} satisfies Record<string, LegalPageContent>;
