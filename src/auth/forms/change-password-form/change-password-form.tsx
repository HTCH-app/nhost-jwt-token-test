import { FC, useEffect } from 'react';
import { useChangePassword } from '@nhost/nextjs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextInput } from '@/ui';

type FormValues = {
  password: string;
};

export type ChangePasswordFormProps = {
  onSuccess?: () => void;
};

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  onSuccess,
}) => {
  const { changePassword, isSuccess, isError, error } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm<FormValues>();

  useEffect(() => {
    if (onSuccess && isSuccess) {
      onSuccess();
    }
  }, [onSuccess, isSuccess]);

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    changePassword(data.password);

  return isSuccess ? (
    <div className="prose">
      <p>Password changed successfully.</p>
    </div>
  ) : (
    <>
      <div className="prose">
        <h2>Change password</h2>
        <p>Enter new password</p>
      </div>

      <form
        className="mt-4 fle flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          id="passowrd"
          labelText="Password"
          type="password"
          placeholder={`e.g. "*******"`}
          errorText={isError ? error?.message : undefined}
          disabled={isSuccess}
          {...register('password', { required: true })}
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={(isDirty && !isValid) || isSuccess}
        >
          Change password
        </Button>
      </form>
    </>
  );
};
