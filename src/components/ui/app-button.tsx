import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
} from "react-native";

import { colors, radius } from "@/theme";

type AppButtonProps = Omit<PressableProps, "children"> & {
  label: string;
  loading?: boolean;
  variant?: "primary" | "outline";
};

export function AppButton({
  label,
  loading = false,
  variant = "primary",
  disabled,
  ...props
}: AppButtonProps) {
  const isDisabled = Boolean(disabled) || loading;
  const isOutline = variant === "outline";

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        isOutline ? styles.outline : styles.primary,
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={isOutline ? colors.foreground : colors.primaryForeground}
        />
      ) : (
        <Text style={[styles.label, isOutline ? styles.outlineLabel : styles.primaryLabel]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryLabel: {
    color: colors.primaryForeground,
  },
  outlineLabel: {
    color: colors.foreground,
  },
});
