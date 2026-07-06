import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { P } from "@/components/p";
import { COLORS } from "@/theme/colors";

type Props = {
  icon: ReactNode;
  iconColor: string;
  label: string;
  value: string;
};

export function SmallStatCard({ icon, iconColor, label, value }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: iconColor }]}>{icon}</View>
      <View style={styles.copy}>
        <P style={styles.label}>{label}</P>
        <P style={styles.value}>{value}</P>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 2,
    flexDirection: "row",
    minHeight: 86,
    paddingHorizontal: 14,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    width: "48%",
  },
  icon: {
    alignItems: "center",
    borderRadius: 26,
    height: 52,
    justifyContent: "center",
    marginRight: 12,
    width: 52,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 20,
  },
  value: {
    color: COLORS.primary,
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 21,
    lineHeight: 28,
    marginTop: 2,
  },
});
