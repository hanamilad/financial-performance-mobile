import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { z } from "zod";
import { isAxiosError } from "axios";

import { useSession } from "@/providers/session-provider";
import { useLogin } from "@/hooks/use-auth";
import { TextField } from "@/components/ui/text-field";
import { AppButton } from "@/components/ui/app-button";
import { colors, radius, spacing } from "@/theme";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("صيغة البريد الإلكتروني غير صحيحة"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

type LoginValues = z.infer<typeof loginSchema>;

function resolveLoginError(error: unknown): string {
  if (isAxiosError(error) && error.response?.status === 429) {
    return "محاولات كثيرة خلال وقت قصير. انتظر قليلًا ثم حاول مجددًا.";
  }
  return "تعذّر تسجيل الدخول. تأكد من البريد الإلكتروني وكلمة المرور.";
}

export default function LoginScreen() {
  const { token } = useSession();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: standardSchemaResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  if (token) {
    return <Redirect href="/" />;
  }

  const onSubmit = handleSubmit((values) => loginMutation.mutate(values));

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>منصة الأداء المالي</Text>
            <Text style={styles.subtitle}>سجّل الدخول إلى حسابك</Text>
          </View>

          <View style={styles.form}>
            {loginMutation.isError ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>
                  {resolveLoginError(loginMutation.error)}
                </Text>
              </View>
            ) : null}

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  label="البريد الإلكتروني"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  label="كلمة المرور"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  textContentType="password"
                  trailing={
                    <Pressable
                      onPress={() => setShowPassword((shown) => !shown)}
                      hitSlop={8}
                      accessibilityRole="button"
                      accessibilityLabel={
                        showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                      }
                    >
                      <Text style={styles.toggle}>
                        {showPassword ? "إخفاء" : "إظهار"}
                      </Text>
                    </Pressable>
                  }
                />
              )}
            />

            <AppButton
              label="تسجيل الدخول"
              onPress={onSubmit}
              loading={loginMutation.isPending}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.xxl,
  },
  header: {
    alignItems: "center",
    gap: spacing.xs,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.foreground,
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
  },
  form: {
    gap: spacing.lg,
  },
  errorBanner: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: radius.md,
    padding: spacing.md,
  },
  errorBannerText: {
    color: colors.destructive,
    fontSize: 14,
    textAlign: "center",
  },
  toggle: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "600",
  },
});
