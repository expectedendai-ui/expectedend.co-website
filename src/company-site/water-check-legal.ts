import type { LegalPageContent } from "./legal-content";

/**
 * The Water Check app's legal pages. The app shows a shorter copy of the Privacy Notice and Terms
 * and links here for the full text, so the two must say the same thing: when the app changes what
 * it collects or how it works, update both on the same day and move the effective date.
 */

const EFFECTIVE = "October 21, 2026";
const EMAIL = "expectedendai@gmail.com";

export const WATER_CHECK_LEGAL = {
  "watercheck-privacy": {
    eyebrow: "The Water Check",
    title: "The Water Check Privacy Notice",
    intro:
      "This notice explains what The Water Check app collects, where it is kept, who helps us run it, and the choices you have. The app is made by Expected End LLC, a Florida company. Our Expected End website has its own privacy statement.",
    effectiveDate: EFFECTIVE,
    related: [
      { label: "Consumer Health Data Privacy Policy", href: "/thewatercheck/consumer-health-data" },
      { label: "Delete your account", href: "/thewatercheck/delete-account" },
      { label: "Terms of Use", href: "/thewatercheck/terms" },
    ],
    sections: [
      {
        heading: "The short version",
        paragraphs: ["The details are below, but these are the main points:"],
        bullets: [
          "Your drink log, Drink Journal, saved drinks and foods, Guide pearls and cycle notes stay on your phone.",
          "Your account, your sign-up answers, your daily water totals and your Crew live on our servers so they follow you to a new phone.",
          "Drink Check photos are read by Google's Gemini AI and are not kept by us.",
          "We do not sell your information or share it with advertising networks.",
          "You can delete your account and its data at any time, in the app or by email.",
        ],
      },
      {
        heading: "Information you give us",
        paragraphs: [
          "Account. When you sign in with Apple or Google, we receive an account identifier and the name, email address and basic profile details that provider shares. Apple may give us a private relay email instead of your real one. We use these to create, secure and restore your account.",
          "Sign-up answers. To work out your daily water number, the app asks for your age range, sex (and whether you are pregnant or breastfeeding, if you choose to say), weight, height, activity level, the sports you play, whether you drink coffee, and your climate. Some of these answers are health information. You can skip the optional ones and change any of them later in Details and Settings.",
          "Daily totals. For each day you log, your account keeps the total from drinks, the total from food and your goal for that day, so your calendar and streaks survive a new phone.",
          "Fruit Fast. When an adult starts Fruit Fast, we keep a record that the safety note was read and accepted, with the date and the version of the note.",
          "Crew. If you use Crew, we store the Crews you make or join, your first name and widget colors as your Crew sees them, your percent of goal and streak, the quick messages and cheers you send, and any blocks and reports.",
          "Splash Slice. If you play the hidden game, we store your best score.",
          "Support. If you email us, we receive your email address and whatever you include.",
        ],
      },
      {
        heading: "Information that stays on your phone",
        paragraphs: [
          "Some things never leave your device and are not sent to your account: each drink and food you log, your Drink Journal (the drinks you scanned and how they made you feel), the drinks and foods you save for one-tap logging, your Guide pearls, cycle notes, activity notes, reminder times, sounds and other app settings, and a small note of when the app last showed you an offer.",
          "Because we do not have this information, we cannot restore it for you. Deleting the app or clearing its data erases it.",
        ],
      },
      {
        heading: "Drink Check photo scans and AI",
        paragraphs: [
          "When you take a photo of a drink or a food, the app makes the image smaller and sends it through our server to Google's Gemini API. Gemini reads it and returns what it found: for a drink, its name, size, sugar, caffeine and ingredients; for a food, what it is and about how much water it holds. The app asks before your first scan.",
          "We do not store the photo. Our server keeps a count of how many scans your account used, so the free allowance works. Google processes the photo under its own terms for the Gemini API.",
          "AI can be wrong. A Drink Check result is a quick read of a label, not a lab test, a health rating of a product or medical advice. Always check the real label, and never rely on Drink Check for allergies or medical diets.",
        ],
      },
      {
        heading: "Camera, location, notifications and health connections",
        paragraphs: [
          "Camera. Used only when you choose to scan a drink or food.",
          "Location. If you ask the app to use your current weather, it requests your approximate location, rounds the coordinates and sends them to Open-Meteo for temperature and humidity. We save the resulting climate category, not your coordinates. You can pick your climate by hand instead.",
          "Notifications. Fruit Fast reminders are scheduled on your phone. If you allow push notifications, we keep your phone's push token, its language and its time zone with your account, so we can tell you when someone in your Crew cheers you on, who is on top of your Crew each week, when you take the lead in your Crew today, and when a streak of 3 or more days is about to end. For leads and streaks we use the daily totals already kept with your account. Pushes come in your language, never between 9 PM and 8 AM your time, and at most one a day besides cheers. We keep a record of each push sent for 90 days so we can keep them rare. Google's Firebase Cloud Messaging, and Apple for iPhones, deliver them.",
          "You can turn Crew notifications and streak reminders off separately in the app's Settings, or all of them in your device settings. Signing out or deleting your account removes your phone's push token.",
          "Health connections. If a connection to Apple Health or Health Connect becomes available and you turn it on, the app requests only the read access shown on your device's permission screen. You can decline or revoke it at any time in your device settings. We do not use health data for advertising and do not sell it.",
        ],
      },
      {
        heading: "Splash Slice",
        paragraphs: [
          "If you play Splash Slice, the game hidden in the app, your best score is kept on your phone and with your account. People in a Crew with you can see your first name and your best score. If you have the one-time unlock and are in a Crew, your Home Screen widget can show your best score too. Deleting your account deletes your score.",
          "Only your best score is kept: not each round, your swipes, or what you sliced. The game's music and sounds are made on your phone and send nothing anywhere.",
        ],
      },
      {
        heading: "Crew: what other people see",
        paragraphs: [
          "Crew is invite only. People in a Crew with you see your first name, your widget colors, today's percent of your own goal, your streak, the days you reached your goal this week, and the quick messages and cheers you send. They never see your ounces, body measurements, sign-up answers, notes or anything you drink, including alcohol.",
          "You can hide yourself in a Crew; the Crew's captain can still see that you are a member. Reports are reviewed by us and kept so we can keep Crews safe.",
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
          "show your history, calendar, streaks and widgets;",
          "keep adult-only features such as Fruit Fast and alcohol logging for adults;",
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
          "Supabase: hosts our database, sign-in and server functions.",
          "Apple and Google: sign-in, the App Store and Google Play.",
          "Google (Gemini API): reads Drink Check photos.",
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
          "We keep account information while your account is open. When you delete your account, we delete it and the information tied to it from our active systems, and the app clears what it kept on that phone. Copies in routine backups are overwritten on their normal schedule. We may keep a small amount for longer where the law requires it or to keep people safe, such as reports you filed about others (kept without your account) and purchase records the stores and RevenueCat keep for tax and accounting.",
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
          "If you are 13 to 17, please use the app with a parent's or guardian's permission and read this notice with them. Teens are never offered Fruit Fast or alcohol logging, and in Splash Slice they see sodas and energy drinks instead of alcoholic drinks.",
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
          "In the past 12 months we collected these categories of personal information: identifiers (account ID, email); personal characteristics (age range, sex); commercial information (whether you made a purchase); approximate location (only to fetch weather, not saved); and sensitive personal information about health (body measurements, pregnancy or breastfeeding status, hydration data). We collect them from you and your device for the purposes above, and disclose them only to the providers listed above.",
          "We do not sell or share personal information as those words are defined in California law, and we use sensitive personal information only to provide the app you asked for. Residents of California, Colorado, Connecticut, Virginia, Texas, Oregon and other states with privacy laws can use the rights described above. Our Consumer Health Data Privacy Policy has more for Washington, Nevada and Connecticut residents.",
        ],
      },
      {
        heading: "If you are outside the United States",
        paragraphs: [
          "The app is offered in 43 languages, and your information is processed in the United States and wherever our providers operate. Where data protection laws like the GDPR apply, we rely on: performing our contract with you (to run the app), your explicit consent (for health information you choose to give us, which you can withdraw by changing your answers or deleting your account), our legitimate interests (to keep the app secure and improve it), and legal obligations. You may also complain to your local data protection authority.",
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: [
          "If we change this notice in a way that matters, we will tell you in the app before the change applies. The effective date at the top shows the current version.",
          `Questions or requests: ${EMAIL}, with “The Water Check privacy request” in the subject. Expected End LLC, Florida, United States.`,
        ],
      },
    ],
  },

  "watercheck-terms": {
    eyebrow: "The Water Check",
    title: "The Water Check Terms of Use",
    intro:
      "These terms are an agreement between you and Expected End LLC, a Florida company, for The Water Check app. By downloading or using the app you agree to them. Please read the health and safety section closely.",
    effectiveDate: EFFECTIVE,
    related: [
      { label: "Privacy Notice", href: "/thewatercheck/privacy" },
      { label: "Consumer Health Data Privacy Policy", href: "/thewatercheck/consumer-health-data" },
      { label: "Delete your account", href: "/thewatercheck/delete-account" },
    ],
    sections: [
      {
        heading: "Health and safety: please read",
        paragraphs: [
          "The Water Check is a general wellness app. It is not a medical device, and it does not diagnose, treat, cure or prevent any disease or condition. Its water number is an educational estimate from general guidance, not a prescription. The P-Meter, the Guide and every score in the app are general information.",
          "Talk to a doctor or other qualified clinician before changing how much you drink or eat, especially if you are pregnant or breastfeeding, are an older adult, take medicine that affects fluid or salt balance, or have kidney, heart, liver or thyroid disease, diabetes, or a history of eating disorders. Do not force fluids: drinking too much water too fast can be dangerous. If you feel unwell, stop and get care. In an emergency, call 911 or your local emergency number.",
        ],
      },
      {
        heading: "Drink Check and other AI features",
        paragraphs: [
          "Drink Check uses artificial intelligence to read photos, and AI makes mistakes. It may misread a label, a size, sugar, caffeine or an ingredient, or mistake one food for another. A Drink Check score is a quick read of a label to help you think about a drink. It is not a health rating, a safety certification, or a statement about any brand or product.",
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
        heading: "Splash Slice",
        paragraphs: [
          "Splash Slice is a free game hidden in the app. In it, drinks are the things to avoid: slicing one costs points and makes the screen tipsy. Adults of legal drinking age see alcoholic drinks; everyone else sees sodas and energy drinks. The game is a reminder to choose water, and it does not encourage drinking alcohol.",
          "Scores are just for fun. They have no cash value and cannot be traded or redeemed. Scores outside what the game can produce are not accepted, and we may remove scores that look tampered with or that break these terms. Showing your best score on your widget is part of the one-time unlock.",
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
          "The app is free to download, and some features need a purchase. Prices are shown in the App Store or Google Play in your currency before you buy, and you are charged by Apple or Google under their terms. Refunds are handled by Apple or Google under their policies. You can restore purchases on your account in the app.",
          "During our opening year we may offer a one-time purchase that unlocks the app's paid features with no subscription. If the app later moves to a monthly plan, a one-time purchase made before then stays unlocked on that account, and we will not take away the features it unlocked while we continue to offer the app. Free allowances, such as free Drink Check scans, may change. We do not promise any particular future feature.",
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
          "The app, its widget designs, illustrations, the character Bubbles, its text, sounds and code, and The Water Check name and logo belong to Expected End LLC or our licensors. These terms do not give you any rights in them beyond using the app. If you send us ideas or feedback, we may use them without owing you anything.",
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
          "To the fullest extent the law allows, Expected End LLC and its owner, team and providers will not be liable for any indirect, incidental, special, consequential or punitive damages, or for lost data, health outcomes or decisions you make based on the app. Our total liability for any claim about the app is limited to the greater of the amount you paid us for the app in the 12 months before the claim, or 50 US dollars.",
          "Some places do not allow these limits, so they apply to you only as far as your local law allows. Nothing in these terms limits liability for things the law says cannot be limited, such as fraud or, where applicable, death or personal injury caused by negligence.",
        ],
      },
      {
        heading: "Indemnity",
        paragraphs: [
          "If you misuse the app, break these terms or violate someone else's rights, you agree to cover the reasonable costs, including legal fees, that Expected End LLC faces because of it, as far as your local law allows.",
        ],
      },
      {
        heading: "Disputes and governing law",
        paragraphs: [
          `If you have a problem with the app, please email ${EMAIL} first; most things can be fixed quickly. If we cannot settle it within 60 days, these terms are governed by the laws of the State of Florida, without regard to conflict-of-law rules, and any dispute will be brought in the state or federal courts with jurisdiction over Expected End LLC's principal place of business, except that either of us may use small claims court. To the extent the law allows, claims will be brought individually and not as part of a class.`,
          "If you live in the European Union, the United Kingdom or another place whose consumer laws give you rights these terms cannot take away, those rights still apply, and you may also bring a claim in your local courts.",
        ],
      },
      {
        heading: "If you got the app from the Apple App Store",
        paragraphs: ["These additional terms apply between you, us and Apple:"],
        bullets: [
          "These terms are between you and Expected End LLC only, not Apple. We, not Apple, are solely responsible for the app and its content.",
          "Your license is limited to using the app on Apple-branded products you own or control, as allowed by the Usage Rules in the Apple Media Services Terms and Conditions, except that the app may be used by other accounts linked to you through Family Sharing or volume purchasing.",
          "We, not Apple, are responsible for any maintenance and support for the app. Apple has no obligation to provide them.",
          "If the app fails to meet any applicable warranty, you may notify Apple, and Apple will refund the purchase price, if any, to you. To the maximum extent the law allows, Apple has no other warranty obligation for the app. Any other claims, losses, liabilities, damages, costs or expenses from a failure to meet a warranty are our responsibility, to the extent these terms do not disclaim them.",
          "We, not Apple, are responsible for addressing any claims by you or a third party about the app or your possession or use of it, including product liability claims, claims that the app fails to meet legal or regulatory requirements, and claims under consumer protection, privacy or similar laws.",
          "If a third party claims the app or your use of it infringes their intellectual property rights, we, not Apple, are solely responsible for the investigation, defense, settlement and discharge of that claim.",
          "You represent that you are not located in a country subject to a US Government embargo or designated as a “terrorist supporting” country, and that you are not on any US Government list of prohibited or restricted parties.",
          `Questions, complaints or claims about the app go to Expected End LLC at ${EMAIL}.`,
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
          "These terms, together with the Privacy Notice and Consumer Health Data Privacy Policy, are the whole agreement between you and us about the app. If any part is found unenforceable, the rest still applies. If we do not enforce a part right away, we have not given up the right to do so later. You may not transfer these terms; we may transfer them as part of a merger, sale or reorganization. The app shows these terms in many languages; if a translation differs from this English version, the English version controls to the extent the law allows.",
          "We may update these terms. If a change matters, we will tell you in the app before it applies, and continuing to use the app after that means you accept the new terms. If you do not agree, please stop using the app and delete your account.",
          `Contact: Expected End LLC, Florida, United States. ${EMAIL}.`,
        ],
      },
    ],
  },

  "watercheck-health-data": {
    eyebrow: "The Water Check",
    title: "Consumer Health Data Privacy Policy",
    intro:
      "Some states, including Washington, Nevada and Connecticut, give extra protection to information about your health. This policy explains how The Water Check, made by Expected End LLC, handles that kind of information. It adds to our Privacy Notice.",
    effectiveDate: EFFECTIVE,
    related: [
      { label: "Privacy Notice", href: "/thewatercheck/privacy" },
      { label: "Delete your account", href: "/thewatercheck/delete-account" },
    ],
    sections: [
      {
        heading: "Health data we collect",
        paragraphs: ["Kept with your account, so it follows you to a new phone:"],
        bullets: [
          "body measurements you enter (weight and height), age range and sex;",
          "whether you are pregnant or breastfeeding, if you choose to say;",
          "activity level, sports, whether you drink coffee, and your climate;",
          "your daily water goal and each day's totals from drinks and food;",
          "a record that you accepted the Fruit Fast safety note;",
          "your percent of goal and streak, which your Crew can see if you join one;",
          "with your permission, records read from Apple Health or Health Connect, if that connection is available and you turn it on.",
        ],
      },
      {
        heading: "Health data that stays on your phone",
        paragraphs: [
          "Your individual drink and food entries, Drink Journal (including how drinks made you feel), cycle notes, activity notes, saved drinks and Guide pearls stay in the app's storage on your device. We do not collect them.",
          "Drink Check photos are sent through our server to Google's Gemini API to be read and are not stored by us. What Gemini reads (such as sugar and caffeine) comes back to your phone.",
        ],
      },
      {
        heading: "Where it comes from and why",
        paragraphs: [
          "It comes from you, from your device, and from a health platform only if you connect one. We use it only to give you the app: to work out your daily water number, show your history, calendar and widgets, keep adult-only features for adults, run Drink Check, and show your Crew the progress you choose to share. We do not use it for advertising.",
        ],
      },
      {
        heading: "Who we share it with",
        bullets: [
          "Supabase, which hosts our database and processes it for us.",
          "Google's Gemini API, which reads Drink Check photos for us.",
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
          `We will update the effective date when this policy changes and tell you in the app if a change matters. Contact: Expected End LLC, Florida, United States. ${EMAIL}.`,
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
      { label: "Privacy Notice", href: "/thewatercheck/privacy" },
      { label: "Terms of Use", href: "/thewatercheck/terms" },
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
          "Your account, sign-up answers, daily water totals, Fruit Fast record, Drink Check scan count, Splash Slice best score, notification settings and push tokens, purchase status on our servers, your Crew membership, and Crews you captain. Things that only lived on your phone go away when you delete the app or clear its data.",
        ],
      },
      {
        heading: "What may be kept",
        paragraphs: [
          "Reports you filed about others may be kept without your account so we can keep Crews safe. Copies in routine backups are overwritten on their normal schedule. Apple, Google and RevenueCat keep their own purchase records for tax and accounting, under their policies.",
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
} satisfies Record<string, LegalPageContent>;
