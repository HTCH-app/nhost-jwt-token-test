import {
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  PropsWithChildren,
} from 'react';
import { cns } from "@/utils";

export enum ButtonSize {
  xs = 'btn-xs',
  sm = 'btn-sm',
  md = 'btn-md',
  lg = 'btn-lg',
}

const BASE_STYLES = `
  border-b-4
  border-current
  btn
  btn-outline
  space-x-2
  flex
  bg-white
`;

export type InnerButtonProps = {
  isLoading?: boolean;
  size?: ButtonSize;
  asChild?: boolean;
};

export type ButtonProps<C extends ElementType = 'button'> =
  PropsWithChildren<InnerButtonProps> & ComponentPropsWithoutRef<C>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps<'button'>>(
  (
    {asChild, isLoading = false, size = ButtonSize.md, className, ...props},
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cns(
          BASE_STYLES,
          size,
          isLoading ? 'loading' : '',
          [ButtonSize.xs, ButtonSize.sm].includes(size)
            ? '!border !border-b-2 focus-visible:!outline-1'
            : '',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
