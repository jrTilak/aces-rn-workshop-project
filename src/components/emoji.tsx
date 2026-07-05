import { P } from "@/components/p";
import { COLORS } from "@/theme/colors";
import { ComponentProps } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
} from "react-native";

type Props = {
  text: string;
  source: ImageSourcePropType;
  isSelected: boolean;
} & ComponentProps<typeof Pressable>;

export function Emoji({ text, source, isSelected, ...rest }: Props) {
  return (
    <Pressable
      style={[
        styles.emojiContainer,
        {
          borderColor: isSelected ? COLORS.primary : COLORS.border,
        },
      ]}
      {...rest}
    >
      <Image style={styles.image} source={source} />
      <P style={styles.emojiText}>{text}</P>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 70,
    width: 70,
  },
  emojiContainer: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    gap: 6,
  },
  emojiText: {
    textAlign: "center",
  },
});
