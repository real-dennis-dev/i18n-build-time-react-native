```markdown
# React Native i18n Solution (Build-Time Translations)

A comprehensive, performant, and developer-friendly internationalization (i18n) solution for **React Native** that processes translations at build time. No TypeScript required.

---

## ✨ Features

- **Build-time translation merging** — All JSON files are combined into a single optimized bundle
- **Namespace-based organization** — Keep translations clean and modular (common, auth, home, settings, etc.)
- **Interpolation support** — `Hello, {{name}}!`
- **Strongly-typed experience without TypeScript** — Constants for namespaces and keys (with autocomplete)
- **React Context + Custom Hook** — Easy access throughout the app
- **Language switching at runtime** — With persistence
- **Formatters included** — Dates, numbers, and currency
- **Fully typed constants** — Reduce translation key typos
- **Ready-to-use components** — `LanguageSelector` and `LocalizedText`

---

## 📁 Project Structure
```

src/
├── i18n/
│ ├── locales/
│ │ ├── en/
│ │ ├── es/
│ │ ├── fr/
│ │ └── index.js
│ ├── build/
│ │ ├── i18n-builder.js
│ │ └── translation-loader.js
│ ├── i18n-context.js
│ ├── useTranslation.js
│ ├── constants.js
│ └── translations.json (auto-generated)
├── components/
│ ├── LanguageSelector.js
│ └── LocalizedText.js
├── screens/
│ ├── HomeScreen.js
│ └── SettingsScreen.js
└── App.js

````

---

## 🚀 Installation & Setup

1. **Copy the files** into your React Native project following the structure above.

2. **Install dependencies** (if not already present):

```bash
npm install @react-navigation/native @react-navigation/bottom-tabs
# or
yarn add @react-navigation/native @react-navigation/bottom-tabs
````

3. **Add build script** to your `package.json`:

```json
{
  "scripts": {
    "build:i18n": "node src/i18n/build/i18n-builder.js",
    "start": "npm run build:i18n && react-native start",
    "ios": "npm run build:i18n && react-native run-ios",
    "android": "npm run build:i18n && react-native run-android"
  }
}
```

4. **Run the build once**:

```bash
npm run build:i18n
```

---

## 💡 Usage

### Basic Translation

```jsx
import { useTranslation } from "./src/i18n/useTranslation";
import { NAMESPACES, TRANSLATION_KEYS } from "./src/i18n/constants";

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <Text>
      {t(NAMESPACES.HOME, TRANSLATION_KEYS.GREETING, { name: "John" })}
    </Text>
  );
};
```

### Using Dot Notation

```jsx
const { t } = useTranslation();
t.getNested("home.greeting", { name: "John" });
```

### Language Switching

```jsx
const { changeLocale, locale } = useTranslation();
changeLocale("es");
```

### LocalizedText Component

```jsx
<LocalizedText namespace={NAMESPACES.COMMON} key={TRANSLATION_KEYS.WELCOME} />
```

---

## 📚 Adding a New Language

1. Create a new folder: `src/i18n/locales/de/`
2. Add JSON files with the same structure (`common.json`, `auth.json`, etc.)
3. Update `src/i18n/locales/index.js`:

```js
de: {
  name: 'Deutsch',
  code: 'de',
  flag: '🇩🇪'
}
```

4. Run `npm run build:i18n`

---

## 🔧 How It Works

1. **Build Phase**: `i18n-builder.js` scans all locale folders and merges translations into `translations.json`
2. **Runtime**: `TranslationLoader` loads the pre-built file (fast lookups)
3. **React Layer**: `I18nProvider` + `useI18n` context provides reactivity
4. **UI Updates**: Language change instantly updates all components via context

---

## 🛠 Key Files Explained

| File                    | Purpose                         |
| ----------------------- | ------------------------------- |
| `i18n-builder.js`       | Build-time merger               |
| `translation-loader.js` | Core translation engine         |
| `i18n-context.js`       | React Context provider          |
| `useTranslation.js`     | User-friendly hook + formatters |
| `constants.js`          | Namespaces & translation keys   |
| `locales/index.js`      | Supported languages config      |

---

## 🎨 Customization

- Add more namespaces easily
- Extend formatters in `useTranslation.js`
- Customize `LanguageSelector` styles
- Add RTL support (coming soon)
- Integrate with `AsyncStorage` instead of `localStorage` for better mobile persistence

---

## 📝 Example Translations

See the provided `locales/en/`, `locales/es/`, and `locales/fr/` folders for complete examples.

---

## 🔄 Future Enhancements

- [ ] AsyncStorage persistence
- [ ] Over-the-air (OTA) translation updates
- [ ] Pluralization support
- [ ] RTL language support
- [ ] Translation validation script
- [ ] CLI tool for managing translations

---

## 📄 License

MIT License — feel free to use this in your personal or commercial projects.

---

**Made with ❤️ for React Native developers**

Happy translating!

```

```
