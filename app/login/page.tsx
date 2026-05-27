import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Giriş",
  robots: { index: false, follow: false },
};

function LoginFallback() {
  return (
    <div className="flex min-h-full items-center justify-center bg-forest-deep text-cream/60">
      Yükleniyor…
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
