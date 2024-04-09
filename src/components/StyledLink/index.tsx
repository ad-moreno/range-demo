import {type ComponentPropsWithoutRef, type ComponentProps} from 'react';
import Link from 'next/link';

import styles from './styles.module.css';
import classNames from 'classnames';

const ArrowRight = (props: ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={20}
    width={20}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

const StyledLink = ({children, className, ...props}: ComponentPropsWithoutRef<typeof Link>) => {
  return (
    <Link className={classNames(styles.link, className)} {...props}>
      {children}
      <ArrowRight />
    </Link>
  );
};

export default StyledLink;
