import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Heading } from "@/components/heading";
import { MoodEntryRow } from "@/components/mood-entry-row";
import { P } from "@/components/p";
import { MoodEntry, groupMoodEntriesByDate } from "@/lib/moods";
import { COLORS } from "@/theme/colors";

type Props = {
  entries: MoodEntry[];
  isLoading: boolean;
  onEntryPress: (entry: MoodEntry) => void;
};

export function MoodHistory({ entries, isLoading, onEntryPress }: Props) {
  const groups = groupMoodEntriesByDate(entries);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={COLORS.primary} />
      </View>
    );
  }

  if (groups.length === 0) {
    return (
      <View style={styles.empty}>
        <P style={styles.emptyTitle}>No moods yet</P>
        <P style={styles.emptyText}>Save your first mood to start.</P>
      </View>
    );
  }

  return (
    <>
      {groups.map((group) => (
        <View key={group.key} style={styles.dayGroup}>
          <Heading style={styles.dayTitle}>{group.title}</Heading>
          <View style={styles.card}>
            {group.data.map((entry, index) => (
              <MoodEntryRow
                entry={entry}
                key={entry.id}
                onPress={() => onEntryPress(entry)}
                showDivider={index < group.data.length - 1}
              />
            ))}
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    paddingVertical: 40,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 44,
  },
  emptyTitle: {
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 18,
    lineHeight: 24,
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  dayGroup: {
    marginTop: 18,
  },
  dayTitle: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    overflow: "hidden",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 18,
  },
});
