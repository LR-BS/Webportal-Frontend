import type { JSX } from 'react';

import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';

import { Button, CloseButton } from '@chakra-ui/react';

import { Heading } from '@/uikit/Heading';

import { FormInput, type FormInputProps } from './FormInput';

import styles from './Form.module.pcss';

interface BulletPoint {
  id: string;
  bulletText: string;
}

interface FormProps<T extends FieldValues> {
  bulletPoints?: BulletPoint[];
  description?: string;
  fieldsTitle?: string;
  formFields: Array<FormInputProps<T>>;
  subDesc?: string;
  title: string;
  onSubmit: SubmitHandler<T>;
  onClose: () => void;
}

export const Form = <T extends FieldValues>({
  bulletPoints,
  description,
  fieldsTitle,
  formFields,
  subDesc,
  title,
  onSubmit,
  onClose,
}: FormProps<T>): JSX.Element => {
  const { control, handleSubmit } = useForm<T>({
    criteriaMode: 'all',
    mode: 'onTouched',
  });

  return (
    <form className={styles.form}>
      <div className={styles.scrollContainer}>
        <Heading size='lg'>{title}</Heading>

        <div className={styles.formContent}>
          {(Boolean(description?.length) || Boolean(subDesc?.length)) && (
            <Heading
              size='sm'
              className={styles.formDesc}
            >
              {Boolean(description) && <p>{description}</p>}

              {Boolean(subDesc) && <p>{subDesc}</p>}
            </Heading>
          )}

          {bulletPoints !== undefined && (
            <div className={styles.formBullets}>
              {bulletPoints.map(({ id, bulletText }, index) => (
                <div
                  key={id}
                  className={styles.bulletPoint}
                  data-stepnumber={index + 1}
                >
                  <Heading
                    size='xs'
                    className={styles.bulletText}
                  >
                    {bulletText}
                  </Heading>
                </div>
              ))}
            </div>
          )}
        </div>

        {Boolean(fieldsTitle?.length) && <Heading size='md'>{fieldsTitle}</Heading>}

        <div className={styles.formFields}>
          {formFields.map(
            ({ name, type, className, defaultValue, placeholder, rules, shouldUnregister }) => (
              <FormInput<T>
                key={name}
                name={name}
                type={type}
                placeholder={placeholder}
                className={className}
                control={control}
                rules={rules ?? {}}
                shouldUnregister={shouldUnregister ?? false}
                {...(defaultValue !== undefined && {
                  defaultValue,
                })}
              />
            ),
          )}
        </div>

        <Button onClick={handleSubmit(onSubmit)}>Send</Button>
      </div>

      <CloseButton onClick={onClose} />
    </form>
  );
};
