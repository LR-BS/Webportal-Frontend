import type { HTMLInputTypeAttribute, JSX } from 'react';

import { clsx } from 'clsx';

import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

import { Heading } from '@/uikit/Heading';

import styles from './FormInput.module.pcss';

type FormInputType = 'text' | 'phone' | 'email';

type FormInputMap = Record<FormInputType, HTMLInputTypeAttribute>;

const formFieldMap: FormInputMap = {
  phone: 'tel',
  text: 'text',
  email: 'email',
};

export interface FormInputProps<T extends FieldValues> extends UseControllerProps<T> {
  className?: string | undefined;
  placeholder?: string | undefined;
  type: FormInputType;
}

export const FormInput = <T extends FieldValues>({
  className,
  placeholder,
  type,
  ...restProps
}: FormInputProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error, isTouched },
  } = useController(restProps);

  return (
    <span className={styles.inputContainer}>
      <label
        htmlFor='input'
        className={styles.inputLabel}
      >
        <Heading
          size='sm'
          className={styles.labelHeading}
        >
          {error?.message}
        </Heading>
      </label>

      {(type === 'text' || type === 'email') && (
        <input
          id='input'
          aria-invalid={Boolean(error)}
          data-error={error?.message}
          type={formFieldMap[type]}
          placeholder={placeholder}
          className={clsx(
            styles.input,
            {
              [styles.inputInvalid!]: Boolean(error),
            },
            {
              [styles.inputValid!]: isTouched && error === undefined,
            },
            className,
          )}
          {...field}
        />
      )}

      {type === 'phone' && (
        <input
          id='input'
          aria-invalid={Boolean(error)}
          data-text={error?.message}
          type={formFieldMap[type]}
          maxLength={12}
          placeholder={placeholder}
          className={clsx(
            styles.input,
            {
              [styles.inputInvalid!]: Boolean(error),
            },
            {
              [styles.inputValid!]: isTouched && error === undefined,
            },
            className,
          )}
          {...field}
        />
      )}
    </span>
  );
};
