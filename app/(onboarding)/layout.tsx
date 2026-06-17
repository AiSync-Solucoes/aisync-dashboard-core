// app/(onboarding)/layout.tsx
export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ padding: 36, background: 'linear-gradient(135deg,#EEF2FA 0%,#E8EDF9 50%,#EAF1F8 100%)' }}
    >
      {children}
    </div>
  )
}
