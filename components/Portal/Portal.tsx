import { type FC, type ReactNode, useRef, useEffect } from 'react';

import { createPortal } from 'react-dom';

interface PortalProps {
  children?: ReactNode;
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const container = useRef<HTMLDivElement | null>(null);

  if (container.current === null) {
    container.current = document.createElement('div');
  }

  useEffect(() => {
    if (container.current !== null) {
      document.body.appendChild(container.current);
    }

    return () => {
      if (container.current !== null) {
        document.body.removeChild(container.current);
      }
    };
  }, [container]);

  return <>{createPortal(children, container.current)}</>;
};
