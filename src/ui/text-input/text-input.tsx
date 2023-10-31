import { forwardRef, ReactNode } from 'react';
import { cns } from '@/utils';

export enum TextInputSize {
  xs = 'input-xs',
  sm = 'input-sm',
  md = 'input-md',
  lg = 'input-lg',
}

export enum TextInputWidth {
  none = 'max-w-none',
  xs = 'max-w-xs',
  sm = 'max-w-sm',
  md = 'max-w-md',
  lg = 'max-w-lg',
}

export type TextInputProps = Omit<JSX.IntrinsicElements['input'], 'width'> & {
  errorText?: ReactNode;
  helpText?: ReactNode;
  labelText?: ReactNode;
  preview?: ReactNode;
  variantSize?: TextInputSize;
  width?: TextInputWidth;
  id: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      errorText,
      helpText,
      labelText,
      variantSize = TextInputSize.md,
      id,
      preview,
      className,
      width = TextInputWidth.xs,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cns(
          'form-control w-full grid-cols-1 space-y-1',
          width,
          className
        )}
      >
        {labelText && (
          <label className="label" htmlFor={id}>
            <span className="label-text font-semibold">{labelText}</span>
          </label>
        )}
        <label className="input-group">
          <input
            id={id}
            ref={ref}
            type="text"
            placeholder="Type here"
            className={cns(
              `input input-bordered w-full border-2`,
              variantSize,
              width,
              {
                '!border !border-b focus-visible:!outline-1': [
                  TextInputSize.xs,
                  TextInputSize.sm,
                ].includes(variantSize),
              }
            )}
            {...props}
          />
          {preview ? <span>{preview}</span> : null}
        </label>
        {(helpText || errorText) && (
          <p className="label">
            {helpText && <span className="label-text-alt">{helpText}</span>}
            {errorText && (
              <span className="label-text-alt bg-error text-error-content px-2 inline-block">
                {errorText}
              </span>
            )}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';