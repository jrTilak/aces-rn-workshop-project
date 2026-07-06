import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { Heart } from "lucide-react-native";

import { P } from "@/components/p";
import { COLORS } from "@/theme/colors";

type Props = {
  isSaving: boolean;
  onPress: () => void;
};

export function SaveMoodButton({ isSaving, onPress }: Props) {
  return (
    <Pressable
      disabled={isSaving}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        isSaving && styles.disabled,
      ]}
    >
      {isSaving ? (
        <ActivityIndicator color={COLORS.card} />
      ) : (
        <>
          <Heart color={COLORS.card} size={22} strokeWidth={2} />
          <P style={styles.text}>Save Mood</P>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    flexDirection: "row",
    gap: 10,
    height: 52,
    justifyContent: "center",
    marginTop: 18,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
  },
  pressed: {
    backgroundColor: COLORS.primaryDark,
  },
  disabled: {
    opacity: 0.72,
  },
  text: {
    color: COLORS.card,
    fontFamily: "SpaceGrotesk_700Bold",
    fontSize: 20,
    lineHeight: 26,
  },
});
