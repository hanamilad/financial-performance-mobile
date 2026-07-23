import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "@/theme";

export function FullScreenLoader({ label }: { label: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    backgroundColor: colors.background,
  },
  label: {
    color: colors.muted,
    fontSize: 14,
  },
});
