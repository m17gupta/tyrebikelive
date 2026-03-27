"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LoginForm } from "./components/LoginForm";

export const LoginPageWithoutOAuth = ({ verified }: { verified?: string }) => {
  const t = useTranslations("LoginForm");

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white overflow-hidden ">
      
      {/* 1. BACKGROUND LAYER */}
      {/* This represents the large yellow winged foot graphic behind the form */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <Image
          alt="Goodyear Winged Foot Background"
          src="/assets/img/wingfoot_yellow-1000x1000px.png" // Replace with your actual large yellow background asset
          width={1000}
          height={1000}
          className="w-[90%] max-w-4xl opacity-100 object-contain"
          priority
        />
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="z-10 flex w-full flex-col items-center justify-center p-4">
        {/* Main Logo (Top) */}
        <div className="mb-6">
          <img
            alt="Goodyear Bicycle Tires"
            src="/assets/img/Goodyear-Bicyle-Logo-Black-logo.png" // Replace with the black text logo
            className="h-auto w-[380px]"
          />
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[400px] bg-white border border-gray-200 shadow-xl rounded-sm p-6 sm:p-8 ">
          
          {/* Form Component */}
          {/* Note: Ensure your LoginForm component has inputs with 'bg-blue-50' to match the screenshot */}
          <LoginForm />
          
          {/* Verification Messages */}
          {verified === "true" && (
            <p className="mt-4 text-sm text-green-600 text-center">{t("verified-success")}</p>
          )}
          {verified === "false" && (
            <p className="mt-4 text-sm text-red-500 text-center">{t("verified-fail")}</p>
          )}
        </div>

        {/* Footer Links (Privacy & Language) */}
        <div className="mt-8 flex flex-col items-center gap-4">
          
          {/* Privacy Policy */}
          {/* <Link 
            href="/privacy-policy" 
            className="text-sm text-blue-600 hover:text-blue-800 underline decoration-1 underline-offset-2"
          >
            Privacy Policy
          </Link> */}

          {/* Language Selector (Visual Match) */}
    

        </div>
      </div>
    </main>
  );
};
