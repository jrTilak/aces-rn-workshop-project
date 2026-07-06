import { StyleSheet, TextInput, View } from "react-native";

import { Heading } from "@/components/heading";
import { P } from "@/components/p";
import { COLORS } from "@/theme/colors";

const MAX_NOTE_LENGTH = 300;

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function NotesInput({ value, onChangeText }: Props) {
  return (
    <View>
      <Heading style={styles.title}>Notes</Heading>
      <View style={styles.box}>
        <TextInput
          maxLength={MAX_NOTE_LENGTH}
          multiline
          onChangeText={(text) => onChangeText(text.slice(0, MAX_NOTE_LENGTH))}
          placeholder="Write a quick note about your day..."
          placeholderTextColor={COLORS.subtle}
          style={styles.input}
          textAlignVertical="top"
          value={value}
        />
        <P style={styles.count}>
          {value.length}/{MAX_NOTE_LENGTH}
        </P>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
  },
  box: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    minHeight: 122,
    paddingHorizontal: 14,
    paddingTop: 14,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
  },
  input: {
    color: COLORS.text,
    flex: 1,
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 16,
    lineHeight: 22,
    minHeight: 76,
    padding: 0,
  },
  count: {
    alignSelf: "flex-end",
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 18,
    paddingBottom: 10,
  },
});
