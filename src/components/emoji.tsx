import { P } from "@/components/p";
import { COLORS } from "@/theme/colors";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

type Props = {
  text: string;
  source: ImageSourcePropType;
};

export function Emoji({ text, source }: Props) {
  return (
    <View style={styles.emojiContainer}>
      <Image style={styles.image} source={source} />
      <P style={styles.emojiText}>{text}</P>
    </View>
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
    borderColor: COLORS.border,
    borderWidth: 2,
    gap: 6,
  },
  emojiText: {
    textAlign: "center",
  },
});
