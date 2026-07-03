import { Emoji } from "@/components/emoji";
import { P } from "@/components/p";
import { TextArea } from "@/components/textarea";
import { EMOJIS } from "@/constants/emojis";
import { COLORS } from "@/theme/colors";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top + 16 }]}>
      <View style={styles.formContainer}>
        <P>How are you feeling today?</P>
        {/* images */}
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.emojiContainer}
        >
          {EMOJIS.map((emoji) => (
            <Emoji text={emoji.name} key={emoji.name} source={emoji.image} />
          ))}
        </ScrollView>
        <View>
          <P>Notes</P>
          <TextArea />
        </View>
        <Button title="Save" />
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
    gap: 8,
  },
  formContainer: {
    gap: 12,
  },
});
