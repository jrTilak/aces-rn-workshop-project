import { ComponentProps } from "react";
import { StyleSheet } from "react-native";

import { P } from "@/components/p";

type Props = ComponentProps<typeof P> & {
  level?: "screen" | "section";
};

export function Heading({ level = "section", style, ...props }: Props) {
  return <P style={[styles[level], style]} {...props} />;
}

const styles = StyleSheet.create({
  screen: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 24,
    lineHeight: 30,
  },
  section: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 18,
    lineHeight: 24,
  },
});
