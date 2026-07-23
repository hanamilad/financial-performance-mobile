import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCurrentUser, useLogout } from "@/hooks/use-auth";
import { AppButton } from "@/components/ui/app-button";
import { colors, radius, spacing } from "@/theme";

const roleLabels: Record<string, string> = {
  system_admin: "مدير النظام",
  client_user: "مستخدم عميل",
};

export default function HomeScreen() {
  const { data: user } = useCurrentUser(true);
  const logoutMutation = useLogout();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>مرحبًا، {user?.name ?? ""}</Text>
          {user ? (
            <Text style={styles.role}>{roleLabels[user.role] ?? user.role}</Text>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>التقارير</Text>
          <Text style={styles.cardText}>
            ستظهر تقارير الأداء المالي والتشغيلي لفروعك هنا في التحديثات القادمة.
          </Text>
        </View>

        <View style={styles.spacer} />

        <AppButton
          label="تسجيل الخروج"
          variant="outline"
          onPress={() => logoutMutation.mutate()}
          loading={logoutMutation.isPending}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.xl,
    gap: spacing.xl,
  },
  header: {
    gap: spacing.xs,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.foreground,
    textAlign: "right",
  },
  role: {
    fontSize: 15,
    color: colors.muted,
    textAlign: "right",
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.foreground,
    textAlign: "right",
  },
  cardText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.muted,
    textAlign: "right",
  },
  spacer: {
    flex: 1,
  },
});
