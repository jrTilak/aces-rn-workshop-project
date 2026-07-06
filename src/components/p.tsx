import { ComponentProps } from "react";
import { StyleSheet, Text } from "react-native";

import { COLORS } from "@/theme/colors";

type Props = ComponentProps<typeof Text>;

export function P({ style, ...props }: Props) {
  return <Text style={[styles.text, style]} {...props} />;
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.text,
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 16,
    lineHeight: 22,
  },
});
