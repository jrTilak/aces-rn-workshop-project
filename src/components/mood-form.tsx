import { Emoji } from "@/components/emoji";
import { P } from "@/components/p";
import { TextArea } from "@/components/textarea";
import { EMOJIS } from "@/constants/emojis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";

type SavedMood = {
  emoji: number;
  text: string;
  date: string;
};

export default function MoodForm() {
  const [selectedEmoji, setSelectedEmoji] = useState<number>();
  const [text, setText] = useState("");
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
        <TextArea
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
        />
      </View>
      <Button
        onPress={async () => {
          if (!selectedEmoji) return;

          const existing = await AsyncStorage.getItem("moods");

          let data: SavedMood[] = [];

          if (existing) {
            data = JSON.parse(existing);
          }

          data.push({
            date: new Date().toISOString(),
            emoji: selectedEmoji,
            text: text,
          });

          await AsyncStorage.setItem("moods", JSON.stringify(data));

          console.log(await AsyncStorage.getItem("moods"));

          setSelectedEmoji(undefined);
          setText("");
        }}
        title="Save"
      />
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
