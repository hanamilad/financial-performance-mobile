import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";

import { colors, radius, spacing } from "@/theme";

type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
  trailing?: React.ReactNode;
};

export function TextField({ label, error, trailing, ...inputProps }: TextFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error ? styles.inputRowError : null]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.muted}
          {...inputProps}
        />
        {trailing}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing.xs,
  },
  label: {
    fontSize: 14,
    color: colors.foreground,
    textAlign: "right",
  },
  inputRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
  },
  inputRowError: {
    borderColor: colors.destructive,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: colors.foreground,
    textAlign: "left",
  },
  error: {
    fontSize: 13,
    color: colors.destructive,
    textAlign: "right",
  },
});
