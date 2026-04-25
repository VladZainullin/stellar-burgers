import { FC } from 'react';
import styles from './layout.module.css';

import { AppHeader } from '@components';
import { TLayoutProps } from './type';

export const Layout: FC<TLayoutProps> = ({ children }) => (
  <div className={styles.layout}>
    <AppHeader />
    {children}
  </div>
);
