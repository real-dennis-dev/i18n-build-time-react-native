import React from "react";
import { Text } from "react-native";
import { useI18n } from "../i18n/i18n-context";

const LocalizedText = ({
  namespace,
  key,
  params = {},
  children,
  style,
  ...props
}) => {
  const { getTranslation } = useI18n();

  // If children are provided, use them as fallback or for nested translations
  const text = children || getTranslation(namespace, key, params);

  return (
    <Text style={style} {...props}>
      {text}
    </Text>
  );
};

export default LocalizedText;
