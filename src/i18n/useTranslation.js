import { useI18n } from "./i18n-context";

export const useTranslation = () => {
  const { t, locale, changeLocale, locales } = useI18n();

  return {
    t,
    locale,
    changeLocale,
    locales,
    // Helper for formatting dates
    formatDate: (date, options = {}) => {
      return new Date(date).toLocaleDateString(locale, options);
    },
    // Helper for formatting numbers
    formatNumber: (number, options = {}) => {
      return new Intl.NumberFormat(locale, options).format(number);
    },
    // Helper for formatting currency
    formatCurrency: (amount, currency = "USD") => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(amount);
    },
  };
};
