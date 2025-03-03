"use client"; 

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="signin-container">
      <SignIn forceRedirectUrl="/dashboard" />
    </div>
  );
}
