import { Button, TextInput } from '@/ui';
import { useAuthenticationStatus, useResetPassword } from '@nhost/nextjs';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  email: string;
};

export interface ResetPasswordFormProps {
  onSent?: () => null;
  redirectTo?: string;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  onSent,
  redirectTo,
}) => {
  const { resetPassword, isSent, isError, error } = useResetPassword();
  const { isAuthenticated } = useAuthenticationStatus();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm<FormValues>();

  useEffect(() => {
    if (isSent && onSent) {
      onSent();
    }
  }, [isSent, onSent]);

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    resetPassword(data.email, {
      redirectTo,
    });

  if (isAuthenticated) {
    return (
      <div className="prose">
        <p>You're already signed in.</p>
      </div>
    );
  }

  return isSent ? (
    <div className="prose">
      <p>
        Please check your mailbox and follow the verification link to reset
        password.
      </p>
    </div>
  ) : (
    <>
      <div className="prose">
        <h2>Forgot password?</h2>
        <p>
          Enter your email address and we will send you a link to reset your
          password.
        </p>
      </div>

      <form
        className="mt-4 fle flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          id="email"
          labelText="Email"
          type="email"
          placeholder={`e.g. "r.rogers@architects.com"`}
          errorText={isError ? error?.message : undefined}
          disabled={isSent}
          {...register('email', { required: true })}
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={(isDirty && !isValid) || isSent}
        >
          Send link
        </Button>
      </form>
    </>
  );
};
