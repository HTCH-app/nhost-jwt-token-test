import { FC, PropsWithChildren } from "react";
import { SignInEmailPasswordForm } from "@/auth/forms";

export const AuthPage: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return  <div className="h-full w-full z-50 absolute top-0 left-0">
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-sm lg:w-96"><SignInEmailPasswordForm /></div>
      </div>
    </div>
  </div>
};

