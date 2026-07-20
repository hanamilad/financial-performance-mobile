---
name: financial-performance-mobile
description: Use for all Expo React Native client app tasks in the Financial Performance Platform, including auth tokens, reports, offline cache, SQLite encryption, push notifications, routing, charts, RTL, and tests.
---


# Financial Performance Platform — Project Agent Rules

هذه التعليمات خاصة بمنصة متابعة الأداء المالي والتشغيلي للمطاعم والكافيهات.
تُطبق بجانب تعليمات الأدوات أو Laravel Boost الموجودة بالفعل، ولا تُلغيها.

## ترتيب أولوية المراجع

عند التعارض اتبع الترتيب التالي:

1. قرار بشري صريح داخل المحادثة أو `DECISIONS_LOG.md`.
2. `CURRENT_SLICE.md` المعتمد.
3. المواصفات الموجودة داخل `../project-docs/specifications/`.
4. ملف Skill الخاص بالـRepository.
5. `AGENTS.md` وتعليمات الأدوات العامة.
6. الافتراضات الشخصية للـAgent، وهي أقل أولوية ولا تُستخدم عند وجود غموض جوهري.

## قاعدة العمل

لا تبدأ تنفيذًا واسعًا مباشرة. ابدأ بخطة محدودة، واذكر:
- الهدف.
- الملفات المتوقعة.
- التغييرات على قاعدة البيانات أو الـAPI.
- الاختبارات.
- المخاطر.
- ما هو خارج النطاق.

لا تنفذ إلا بعد اعتماد الخطة عندما تكون المهمة مصنفة كـPlan First.


## هوية التطبيق

- React Native + Expo.
- Expo Router.
- TypeScript Strict.
- TanStack Query.
- Zustand للحالة المحلية الخفيفة.
- SecureStore للـToken.
- Expo SQLite + SQLCipher لآخر بيانات منشورة.
- expo-notifications.
- Victory Native.
- التطبيق Read-only.

## المصادقة

- Bearer Token للموبايل.
- Token لكل جهاز.
- خزّن Token في SecureStore فقط.
- لا تخزن Token في AsyncStorage أو SQLite.
- عند Logout:
  - إلغاء Token عند الـBackend.
  - حذف SecureStore token.
  - حذف Offline database/cache.
  - إعادة Query cache للوضع الأولي.

## حدود التطبيق

مستخدم العميل يستطيع:

- عرض البيانات المنشورة.
- اختيار فرع أو كل الفروع.
- اختيار فترة.
- المقارنة.
- عرض التنبيهات.
- مشاركة/تنزيل PDF.

لا يستطيع:

- تعديل بيانات مالية.
- رفع Excel.
- نشر.
- تعديل Thresholds.
- إدارة مستخدمين أو فروع.

## Offline

- احفظ آخر Snapshot منشور فقط.
- أوضح للمستخدم أنه يعرض بيانات محفوظة.
- اعرض وقت آخر تحديث.
- لا تعرض Draft.
- لا تنفذ Mutations أثناء Offline.
- استخدم SQLCipher.
- مفتاح التشفير داخل SecureStore.
- Prepared statements فقط.
- احذف البيانات عند Logout أو تغير المستخدم.

## API

- استخدم OpenAPI-generated types.
- لا تخترع Endpoint أو Response.
- تعامل مع 401 بإغلاق الجلسة بطريقة آمنة.
- Query keys تشمل الفرع والفترة ونسخة النشر.
- لا تنسخ Server State داخل Zustand.

## Push Notifications

- سجل Expo Push Token مع الجهاز.
- Deep link إلى التقرير أو التنبيه المرتبط.
- تحقق من صلاحية Deep Link.
- لا تعتمد على Push كمصدر بيانات؛ اجلب البيانات من API.
- تعامل مع رفض الإذن دون تعطيل التطبيق.

## التقارير

- الأرقام والحسابات الأساسية تأتي من Backend.
- دعم حالات:
  - Available.
  - Partial Data.
  - Not Available.
  - No Published Data.
  - Offline Cached.
- RTL كامل.
- تنسيق SAR والنسب موحد.

## الجودة

- اختبر Auth flow.
- Logout cleanup.
- Offline cache.
- Branch/date filters.
- Push deep links.
- Error/empty states.
- Type check وLint وTests.

## ممنوعات

- كتابة مالية.
- Token في AsyncStorage.
- بيانات مالية غير مشفرة Offline.
- Secrets في `EXPO_PUBLIC_*`.
- Business formulas في التطبيق.
- استدعاءات API غير Typed.
- تعديل Backend أو Web دون تصريح.
