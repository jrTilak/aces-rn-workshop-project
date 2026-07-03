import { COLORS } from "@/theme/colors";
import { ComponentProps } from "react";
import { StyleSheet, TextInput } from "react-native";

type Props = ComponentProps<typeof TextInput>;

export const TextArea = ({ style, ...props }: Props) => {
  return (
    <TextInput
      numberOfLines={5}
      textAlign="left"
      textAlignVertical="top"
      style={[styles.root, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    borderColor: COLORS.border,
    borderWidth: 2,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
  },
});
