import { StyleSheet, View } from "react-native";

import { MoodIcon } from "@/components/mood-icon";
import { P } from "@/components/p";
import { MoodId } from "@/lib/moods";
import { COLORS } from "@/theme/colors";

type Props = {
  label: string;
  moodId?: MoodId;
};

export function WeekMoodCard({ label, moodId }: Props) {
  return (
    <View style={styles.card}>
      <P style={styles.label}>{label}</P>
      {moodId ? (
        <MoodIcon moodId={moodId} size={38} imageSize={28} />
      ) : (
        <View style={styles.emptyDot}>
          <P style={styles.emptyText}>-</P>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    flex: 1,
    minHeight: 78,
    paddingHorizontal: 4,
    paddingVertical: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },
  label: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  emptyDot: {
    alignItems: "center",
    backgroundColor: COLORS.track,
    borderRadius: 19,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  emptyText: {
    color: COLORS.subtle,
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 16,
  },
});
