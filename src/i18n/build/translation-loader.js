import translations from "../translations.json";

class TranslationLoader {
  constructor() {
    this.translations = translations;
    this.currentLocale = "en";
    this.listeners = [];
  }

  setLocale(locale) {
    if (this.translations[locale]) {
      this.currentLocale = locale;
      this.notifyListeners();
    }
  }

  getLocale() {
    return this.currentLocale;
  }

  // Get a translation with namespace and key
  get(namespace, key, params = {}) {
    const localeData = this.translations[this.currentLocale];
    const namespaceData = localeData[namespace];

    if (!namespaceData) {
      console.warn(
        `Namespace "${namespace}" not found for locale "${this.currentLocale}"`
      );
      return key;
    }

    let value = namespaceData[key];

    if (!value) {
      console.warn(
        `Key "${key}" not found in namespace "${namespace}" for locale "${this.currentLocale}"`
      );
      return key;
    }

    // Replace parameters in the string
    if (params && Object.keys(params).length > 0) {
      Object.keys(params).forEach((paramKey) => {
        const regex = new RegExp(`{{${paramKey}}}`, "g");
        value = value.replace(regex, params[paramKey]);
      });
    }

    return value;
  }

  // Get translation with dot notation (e.g., 'auth.login')
  getNested(path, params = {}) {
    const parts = path.split(".");
    const namespace = parts[0];
    const key = parts.slice(1).join(".");

    return this.get(namespace, key, params);
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentLocale));
  }

  // Get all available locales
  getAvailableLocales() {
    return Object.keys(this.translations);
  }
}

export default new TranslationLoader();
