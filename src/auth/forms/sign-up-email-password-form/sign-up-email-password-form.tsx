import { Button, TextInput } from '@/ui';
import { useSignUpEmailPassword, useUserIsAnonymous } from '@nhost/nextjs';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ResetPasswordLink,
  SignInLink,
} from '../../links';

type FormValues = {
  email: string;
  password: string;
};

export type SignUpEmailPasswordFormProps = {
  onSuccess?: () => void;
  redirectTo?: string;
}

export const SignUpEmailPasswordForm: FC<SignUpEmailPasswordFormProps> = ({
  onSuccess,
  redirectTo,
}) => {
  const isUserAnonymous = useUserIsAnonymous();

  const {
    signUpEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignUpEmailPassword();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    signUpEmailPassword(data.email, data.password, {
      redirectTo,
      metadata: {
        avatarSeed: data.email,
      },
    });

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

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
        {isUserAnonymous ? (
          <>
            <h1>
              Register to
              <br /> Continue
            </h1>
            <p>
              You need an account to contribute
            </p>
          </>
        ) : (
          <>
            <h1>
              You're almost <br />
              there!
            </h1>
            <p>
              Just sign up to start using app
            </p>
          </>
        )}
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
          Sign Up
        </Button>

        {!isUserAnonymous && (
          <div className="pt-4">
            <p className="text-sm leading-6 text-gray-500">
              Already have an account?{' '}
              <SignInLink className="relative inline-block link text-primary font-semibold">
                {isError && error?.error === 'email-already-in-use' ? (
                  <span className="animate-ping absolute h-full w-full bg-brand opacity-50"></span>
                ) : null}
                Sign in
              </SignInLink>
            </p>
          </div>
        )}
      </form>
    </>
  );
};
