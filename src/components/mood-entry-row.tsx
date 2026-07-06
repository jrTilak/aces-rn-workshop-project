import { Pressable, StyleSheet, View } from "react-native";
import { ChevronRight } from "lucide-react-native";

import { MoodIcon } from "@/components/mood-icon";
import { P } from "@/components/p";
import { MoodEntry, formatEntryTime, getMood } from "@/lib/moods";
import { COLORS } from "@/theme/colors";

type Props = {
  entry: MoodEntry;
  showDivider: boolean;
  onPress: () => void;
};

export function MoodEntryRow({ entry, showDivider, onPress }: Props) {
  const mood = getMood(entry.moodId);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, showDivider && styles.divider]}
    >
      <MoodIcon moodId={entry.moodId} size={46} imageSize={32} />
      <View style={styles.textBlock}>
        <P style={styles.time}>{formatEntryTime(entry.createdAt)}</P>
        <P style={styles.mood}>{mood.label}</P>
        <P numberOfLines={1} style={styles.note}>
          {entry.note || "No note added."}
        </P>
      </View>
      <ChevronRight color={COLORS.muted} size={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 78,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  divider: {
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
  },
  textBlock: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },
  time: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 18,
  },
  mood: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 17,
    lineHeight: 22,
  },
  note: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 20,
  },
});
