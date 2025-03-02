/*!
 * This file is part of the Stooa codebase.
 *
 * (c) 2020 - present Runroom SL
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { forwardRef } from 'react';
import { InputStyled } from '@/ui/Form';
import { ValidationError, ValidationIcon } from '@/ui/Validation';
import Icon from '../Icon';
import { FieldError } from 'react-hook-form';

type Props = Omit<JSX.IntrinsicElements['input'], 'as' | 'type' | 'ref'> & {
  label?: string;
  icon?:
    | 'avatar'
    | 'calendar'
    | 'checkmark'
    | 'chevron-down'
    | 'clock'
    | 'hourglass'
    | 'cross'
    | 'language'
    | 'lock'
    | 'mail'
    | 'world';
  hasError?: FieldError;
  isValid?: boolean;
  validationError?: string;
  isDirty?: boolean;
};

const NewInput = forwardRef<HTMLInputElement, Props>(
  ({ label, hasError, isValid, isDirty, icon, ...props }, ref) => {
    return (
      <InputStyled className={icon ? 'withicon' : ''}>
        {icon && <Icon variant={icon} className="icon" />}
        <input
          ref={ref}
          className={` ${isDirty ? 'filled' : ''} ${hasError ? 'invalid' : ''}`}
          aria-invalid={hasError ? 'true' : 'false'}
          {...props}
        />
        {isValid && (
          <ValidationIcon>
            <Icon variant="checkmark" />
          </ValidationIcon>
        )}
        <label htmlFor={props.id || props.name}>{label}</label>
        {hasError && (
          <>
            <ValidationIcon>
              <Icon variant="cross" />
            </ValidationIcon>
            <ValidationError>{hasError.message}</ValidationError>
          </>
        )}
      </InputStyled>
    );
  }
);

export default NewInput;
