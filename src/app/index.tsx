import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image
        style={styles.image}
        source={require("@/images/emoji/happy.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  image: {
    height: 100,
    width: 100,
  },
});
