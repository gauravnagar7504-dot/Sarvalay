import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      padding: "24px",
      zIndex: 1
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at center, rgba(179,18,23,0.1) 0%, transparent 70%)",
        zIndex: -1
      }} />
      <div style={{
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        padding: "8px",
        border: "1px solid rgba(179, 18, 23, 0.15)",
        boxShadow: "0 24px 80px rgba(179, 18, 23, 0.1)"
      }}>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-[var(--color-indigo)] hover:bg-[var(--color-indigo-dark)] text-white font-medium py-2 px-4 rounded-lg transition-all",
              card: "shadow-none bg-transparent border-0",
              headerTitle: "font-heading text-xl font-bold text-[var(--color-text-primary)]",
              headerSubtitle: "text-[var(--color-text-secondary)]",
              socialButtonsBlockButton: "border border-gray-200 hover:bg-gray-50 transition-all rounded-lg",
              formFieldInput: "rounded-lg border-gray-200 focus:border-[var(--color-indigo)] focus:ring-[var(--color-indigo)]"
            }
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/dashboard/sync"
        />
      </div>
    </div>
  );
}
