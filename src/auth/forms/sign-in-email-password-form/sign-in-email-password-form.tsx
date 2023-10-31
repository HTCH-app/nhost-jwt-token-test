import { Button, TextInput } from '@/ui';
import { useSignInEmailPassword } from '@nhost/nextjs';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ResetPasswordLink,
  SignUpLink,
} from '../../links';

type FormValues = {
  email: string;
  password: string;
};

export type SignInEmailPasswordFormProps = {
  onSuccess?: () => void;
};

export const SignInEmailPasswordForm: FC<SignInEmailPasswordFormProps> = ({
  onSuccess,
}) => {
  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { isSuccess } = await signInEmailPassword(data.email, data.password);
    if (isSuccess) onSuccess?.();
  };

  if (isSuccess && !needsEmailVerification) {
    return (
      <div className="prose">
        {`You're signed in!`} <br />
      </div>
    );
  }

  return needsEmailVerification ? (
    <div className="prose">
      <p>
        Please check your mailbox and follow the verification link to verify
        your email.
      </p>
    </div>
  ) : (
    <>
      <div className="prose">
        <h1>Hi there!</h1>
        <p>
          Sign in to start using app
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
          disabled={isSuccess}
          {...register('email', { required: true })}
        />

        <TextInput
          id="password"
          labelText={
            <span className="w-[calc(20rem-8px)] flex justify-between text-sm leading-6">
              <span>Password</span>
              <ResetPasswordLink className="link font-semibold">
                Forgot password?
              </ResetPasswordLink>
            </span>
          }
          type="password"
          placeholder={`e.g. "********"`}
          disabled={isSuccess}
          {...register('password', { required: true, minLength: 8 })}
        />

        <Button
          type="submit"
          isLoading={isSubmitting || isLoading}
          disabled={(isDirty && !isValid) || isSuccess}
        >
          Sign In
        </Button>
        <div className="pt-4">
          <p className="text-sm leading-6 text-gray-500">
           New to app
            <SignUpLink className="relative inline-block link text-primary font-semibold">
              Sign Up
            </SignUpLink>
          </p>
        </div>
      </form>
    </>
  );
};
