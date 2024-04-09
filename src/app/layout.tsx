import './global.css';

import {type Metadata} from 'next';
import {Lato} from 'next/font/google';

import styles from './layout.module.css';
import classNames from 'classnames';

const lato = Lato({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Range Demo',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <main className={classNames(styles.container, lato.className)}>{children}</main>
        </div>
      </body>
    </html>
  );
}
