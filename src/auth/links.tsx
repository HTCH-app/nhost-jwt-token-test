import Link from 'next/link';
import { FC } from "react";

export const SignInLink: FC<any> = ({className, children}) => {
  return (
    <Link href="/sign-in" className={className}>
      {children}
    </Link>
  );
};

export const SignUpLink: FC<any> = ({className, children}) => {
  return (
    <Link href="/sign-up" className={className}>
      {children}
    </Link>
  );
};

export const ResetPasswordLink: FC<any> = ({
                                             className,
                                             children,
                                           }) => {
  return (
    <Link href="/reset-password" className={className}>
      {children}
    </Link>
  );
};
