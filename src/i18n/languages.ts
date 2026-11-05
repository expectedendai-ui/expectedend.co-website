/**
 * The 43 languages the site speaks: the same list, names and flags as The Water Check and MyBibleLens apps.
 * A language is not a country, so each gets the flag of the place most people know it from.
 */
export const LANGUAGES = [
  { id: "en", nativeName: "English", englishName: "English", flag: "🇺🇸" },
  { id: "es", nativeName: "Español", englishName: "Spanish", flag: "🇪🇸" },
  { id: "pt", nativeName: "Português", englishName: "Portuguese", flag: "🇧🇷" },
  { id: "fr", nativeName: "Français", englishName: "French", flag: "🇫🇷" },
  { id: "de", nativeName: "Deutsch", englishName: "German", flag: "🇩🇪" },
  { id: "it", nativeName: "Italiano", englishName: "Italian", flag: "🇮🇹" },
  { id: "nl", nativeName: "Nederlands", englishName: "Dutch", flag: "🇳🇱" },
  { id: "pl", nativeName: "Polski", englishName: "Polish", flag: "🇵🇱" },
  { id: "ro", nativeName: "Română", englishName: "Romanian", flag: "🇷🇴" },
  { id: "ru", nativeName: "Русский", englishName: "Russian", flag: "🇷🇺" },
  { id: "uk", nativeName: "Українська", englishName: "Ukrainian", flag: "🇺🇦" },
  { id: "zh", nativeName: "简体中文", englishName: "Simplified Chinese", flag: "🇨🇳" },
  { id: "ko", nativeName: "한국어", englishName: "Korean", flag: "🇰🇷" },
  { id: "ja", nativeName: "日本語", englishName: "Japanese", flag: "🇯🇵" },
  { id: "vi", nativeName: "Tiếng Việt", englishName: "Vietnamese", flag: "🇻🇳" },
  { id: "id", nativeName: "Bahasa Indonesia", englishName: "Indonesian", flag: "🇮🇩" },
  { id: "tl", nativeName: "Filipino", englishName: "Filipino", flag: "🇵🇭" },
  { id: "hi", nativeName: "हिन्दी", englishName: "Hindi", flag: "🇮🇳" },
  { id: "sw", nativeName: "Kiswahili", englishName: "Swahili", flag: "🇰🇪" },
  { id: "ht", nativeName: "Kreyòl Ayisyen", englishName: "Haitian Creole", flag: "🇭🇹" },
  { id: "tr", nativeName: "Türkçe", englishName: "Turkish", flag: "🇹🇷" },
  { id: "am", nativeName: "አማርኛ", englishName: "Amharic", flag: "🇪🇹" },
  { id: "yo", nativeName: "Yorùbá", englishName: "Yoruba", flag: "🇳🇬" },
  { id: "ig", nativeName: "Igbo", englishName: "Igbo", flag: "🇳🇬" },
  { id: "so", nativeName: "Soomaali", englishName: "Somali", flag: "🇸🇴" },
  { id: "bn", nativeName: "বাংলা", englishName: "Bengali", flag: "🇧🇩" },
  { id: "ta", nativeName: "தமிழ்", englishName: "Tamil", flag: "🇮🇳" },
  { id: "te", nativeName: "తెలుగు", englishName: "Telugu", flag: "🇮🇳" },
  { id: "th", nativeName: "ไทย", englishName: "Thai", flag: "🇹🇭" },
  { id: "my", nativeName: "မြန်မာ", englishName: "Burmese", flag: "🇲🇲" },
  { id: "km", nativeName: "ខ្មែរ", englishName: "Khmer", flag: "🇰🇭" },
  { id: "ms", nativeName: "Bahasa Melayu", englishName: "Malay", flag: "🇲🇾" },
  { id: "pa", nativeName: "ਪੰਜਾਬੀ", englishName: "Punjabi", flag: "🇮🇳" },
  { id: "ne", nativeName: "नेपाली", englishName: "Nepali", flag: "🇳🇵" },
  { id: "el", nativeName: "Ελληνικά", englishName: "Greek", flag: "🇬🇷" },
  { id: "cs", nativeName: "Čeština", englishName: "Czech", flag: "🇨🇿" },
  { id: "hu", nativeName: "Magyar", englishName: "Hungarian", flag: "🇭🇺" },
  { id: "sv", nativeName: "Svenska", englishName: "Swedish", flag: "🇸🇪" },
  { id: "no", nativeName: "Norsk", englishName: "Norwegian", flag: "🇳🇴" },
  { id: "sr", nativeName: "Српски", englishName: "Serbian", flag: "🇷🇸" },
  { id: "bg", nativeName: "Български", englishName: "Bulgarian", flag: "🇧🇬" },
  { id: "hr", nativeName: "Hrvatski", englishName: "Croatian", flag: "🇭🇷" },
  { id: "ceb", nativeName: "Cebuano", englishName: "Cebuano", flag: "🇵🇭" },
] as const;

export type LanguageId = (typeof LANGUAGES)[number]["id"];

const IDS = new Set<string>(LANGUAGES.map((language) => language.id));

export const isLanguageId = (value: unknown): value is LanguageId => typeof value === "string" && IDS.has(value);

/** Browser tags that name one of our languages by another code. */
const ALIASES: Record<string, LanguageId> = { fil: "tl", nb: "no", nn: "no" };

/** The first of the browser's languages the site speaks, or English. */
export function browserLanguage(preferred: readonly string[] = navigator.languages ?? [navigator.language]): LanguageId {
  for (const tag of preferred) {
    const base = tag.toLowerCase().split("-")[0];
    const id = ALIASES[base] ?? base;
    if (isLanguageId(id)) return id;
  }
  return "en";
}
