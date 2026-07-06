import { StyleSheet, View } from "react-native";
import { Flame } from "lucide-react-native";

import { P } from "@/components/p";
import { COLORS } from "@/theme/colors";

type Props = {
  currentStreak: number;
};

export function StatSummaryCard({ currentStreak }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Flame color={COLORS.primary} size={42} strokeWidth={2.3} />
      </View>
      <View style={styles.copy}>
        <P style={styles.label}>Current Streak</P>
        <P style={styles.value}>{currentStreak} days</P>
        <P style={styles.subtext}>Keep it going!</P>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    flexDirection: "row",
    minHeight: 112,
    paddingHorizontal: 18,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
  },
  iconCircle: {
    alignItems: "center",
    backgroundColor: COLORS.iconPurpleSoft,
    borderRadius: 40,
    height: 80,
    justifyContent: "center",
    marginRight: 18,
    width: 80,
  },
  copy: {
    flex: 1,
  },
  label: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 20,
  },
  value: {
    color: COLORS.primary,
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 26,
    lineHeight: 34,
    marginTop: 4,
  },
  subtext: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 20,
    marginTop: 2,
  },
});
