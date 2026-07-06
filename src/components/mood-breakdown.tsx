import { StyleSheet, View } from "react-native";

import { MoodIcon } from "@/components/mood-icon";
import { P } from "@/components/p";
import { MOODS, MoodCounts } from "@/lib/moods";
import { COLORS } from "@/theme/colors";

type Props = {
  counts: MoodCounts;
  maxCount: number;
};

export function MoodBreakdown({ counts, maxCount }: Props) {
  return (
    <View style={styles.card}>
      {MOODS.map((mood, index) => {
        const count = counts[mood.id];
        const widthPercent = `${Math.max(
          (count / maxCount) * 100,
          4,
        )}%` as `${number}%`;

        return (
          <View
            key={mood.id}
            style={[
              styles.row,
              index < MOODS.length - 1 && styles.rowDivider,
            ]}
          >
            <MoodIcon moodId={mood.id} size={42} imageSize={29} />
            <P style={styles.label}>{mood.label}</P>
            <View style={styles.track}>
              <View style={[styles.fill, { width: widthPercent }]} />
            </View>
            <P style={styles.count}>{count}</P>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 2,
    overflow: "hidden",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 64,
    paddingHorizontal: 14,
  },
  rowDivider: {
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
  },
  label: {
    flex: 1,
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 12,
    minWidth: 92,
  },
  track: {
    backgroundColor: COLORS.track,
    borderRadius: 999,
    flex: 1.15,
    height: 6,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  fill: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    height: "100%",
  },
  count: {
    color: COLORS.muted,
    fontSize: 18,
    lineHeight: 24,
    minWidth: 26,
    textAlign: "right",
  },
});
