import { Emoji } from "@/components/emoji";
import { P } from "@/components/p";
import { EMOJIS } from "@/constants/emojis";
import { COLORS } from "@/theme/colors";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top + 16 }]}>
      <View style={styles.formContainer}>
        <P>How are you feeling today?</P>
        {/* images */}
        <View style={styles.emojiContainer}>
          {EMOJIS.map((emoji) => (
            <Emoji text={emoji.name} key={emoji.name} source={emoji.image} />
          ))}
        </View>
        {/* input */}
        {/* button */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    paddingHorizontal: 16,
  },
  emojiContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    gap: 12,
  },
});
