import { ComponentType } from 'react';
import { useAuthenticationStatus } from '@nhost/nextjs';
import { AuthPage } from "@/auth/pages";

type ROLE = 'anonymous' | 'user' | 'public';

export const Allow =
  <T extends Record<string, unknown>>(
    Component: ComponentType<T>,
    allowedRoles: ROLE[]
  ) => {
    return function Wrapped(props: T) {
      const { isAuthenticated, isLoading, isError, error } =
        useAuthenticationStatus();

      if (isError) {
        return (
          <div className="p-6 lg:p-12">
            <h1>Something went wrong</h1>
            <pre>{JSON.stringify(error?.message, undefined, 2)}</pre>
          </div>
        );
      }

      if (isLoading) {
        return <div className="p-6 lg:p-10">Loading…</div>;
      }

      const isPagePublic = allowedRoles.includes('public');
      const isPageAnonymous = allowedRoles.includes('anonymous');
      const isPageAllowedToUser = allowedRoles.includes('user');

      if (isPagePublic) {
        return <Component {...props} />;
      }

      if (!isAuthenticated && (isPageAllowedToUser || isPageAnonymous)) {
        return <AuthPage />;
      }

      return <Component {...props} />;
    };
  };
