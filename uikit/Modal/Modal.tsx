import { memo, type FC, type ReactNode } from 'react';

import { Portal } from '@/components/Portal';

import styles from './Modal.module.pcss';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = memo(({ opened = false, onClose, children }) => {
  if (!opened) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.modal}>
        <div
          className={styles.modalOverlay}
          aria-hidden='true'
          role='button'
          title='Close modal'
          onClick={onClose}
        />

        <div className={styles.modalContent}>{children}</div>
      </div>
    </Portal>
  );
});
