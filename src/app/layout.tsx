import './global.css';

import {type Metadata} from 'next';
import {Inter} from 'next/font/google';

import styles from './layout.module.css';
import classNames from 'classnames';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
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
          <main className={classNames(styles.container, inter.className)}>{children}</main>
        </div>
      </body>
    </html>
  );
}
