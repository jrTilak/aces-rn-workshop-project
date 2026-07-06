import { Image, StyleSheet, View, ViewStyle } from "react-native";

import { MoodId, getMood } from "@/lib/moods";
import { COLORS } from "@/theme/colors";

type Props = {
  moodId: MoodId;
  size?: number;
  imageSize?: number;
  showBackground?: boolean;
  style?: ViewStyle;
};

export function MoodIcon({
  moodId,
  size = 46,
  imageSize = 34,
  showBackground = true,
  style,
}: Props) {
  const mood = getMood(moodId);

  return (
    <View
      style={[
        styles.root,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: showBackground ? mood.tint : COLORS.transparent,
        },
        style,
      ]}
    >
      <Image
        resizeMode="contain"
        source={mood.image}
        style={{ height: imageSize, width: imageSize }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
  },
});
