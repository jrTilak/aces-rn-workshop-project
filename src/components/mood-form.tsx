import { Emoji } from "@/components/emoji";
import { P } from "@/components/p";
import { TextArea } from "@/components/textarea";
import { EMOJIS } from "@/constants/emojis";
import { useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";

export default function MoodForm() {
  const [selectedEmoji, setSelectedEmoji] = useState<number>();
  return (
    <View style={styles.formContainer}>
      <P>How are you feeling today?</P>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.emojiContainer}
      >
        {EMOJIS.map((emoji) => (
          <Emoji
            onPress={() => {
              setSelectedEmoji(emoji.id);
            }}
            text={emoji.name}
            key={emoji.name}
            source={emoji.image}
            isSelected={selectedEmoji === emoji.id}
          />
        ))}
      </ScrollView>
      <View>
        <P>Notes</P>
        <TextArea />
      </View>
      <Button title="Save" />
    </View>
  );
}

const styles = StyleSheet.create({
  emojiContainer: {
    gap: 8,
  },
  formContainer: {
    gap: 12,
  },
});
