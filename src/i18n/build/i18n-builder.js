import fs from "fs";
import path from "path";

// This file runs at build time to merge all translation files
const buildTranslations = () => {
  const localesDir = path.join(__dirname, "../locales");
  const outputFile = path.join(__dirname, "../translations.json");

  // Get all locale directories
  const localeDirs = fs
    .readdirSync(localesDir)
    .filter((file) => fs.statSync(path.join(localesDir, file)).isDirectory());

  const translations = {};

  localeDirs.forEach((locale) => {
    const localePath = path.join(localesDir, locale);
    const files = fs
      .readdirSync(localePath)
      .filter((file) => file.endsWith(".json"));

    translations[locale] = {};

    files.forEach((file) => {
      const filePath = path.join(localePath, file);
      const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

      // Merge content, using filename as namespace
      const namespace = file.replace(".json", "");
      translations[locale][namespace] = content;
    });
  });

  // Write the combined translations file
  fs.writeFileSync(outputFile, JSON.stringify(translations, null, 2));
  console.log("✅ Translations built successfully!");
};

// Run if called directly
if (require.main === module) {
  buildTranslations();
}

export default buildTranslations;
