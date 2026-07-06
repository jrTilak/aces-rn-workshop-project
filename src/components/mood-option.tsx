import { Pressable, StyleSheet } from "react-native";

import { MoodIcon } from "@/components/mood-icon";
import { P } from "@/components/p";
import { MoodOption as MoodOptionType } from "@/lib/moods";
import { COLORS } from "@/theme/colors";

type Props = {
  mood: MoodOptionType;
  isSelected: boolean;
  onPress: () => void;
};

export function MoodOption({ mood, isSelected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, isSelected && styles.selectedCard]}
    >
      <MoodIcon
        moodId={mood.id}
        size={46}
        imageSize={42}
        showBackground={false}
        style={styles.image}
      />
      <P
        adjustsFontSizeToFit
        numberOfLines={1}
        style={[styles.label, isSelected && styles.selectedLabel]}
      >
        {mood.label}
      </P>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderColor: COLORS.transparent,
    borderRadius: 14,
    borderWidth: 2,
    elevation: 3,
    height: 96,
    justifyContent: "center",
    paddingHorizontal: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    width: 104,
  },
  selectedCard: {
    borderColor: COLORS.primary,
  },
  image: {
    marginBottom: 7,
  },
  label: {
    fontFamily: "SpaceGrotesk_500Medium",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
  },
  selectedLabel: {
    color: COLORS.primary,
    fontFamily: "SpaceGrotesk_700Bold",
  },
});
