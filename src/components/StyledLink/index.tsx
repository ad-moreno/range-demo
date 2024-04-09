import styled from 'styled-components';
import {Link, LinkProps} from 'react-router-dom';
import {ComponentProps} from 'react';

const LinkStyled = styled(Link)`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: #007bff;
  text-decoration: none;
  transition: filter 0.3s ease;
  &:hover {
    filter: brightness(75%);
  }
`;

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

const StyledLink = ({children, ...props}: LinkProps) => {
  return (
    <LinkStyled {...props}>
      {children}
      <ArrowRight />
    </LinkStyled>
  );
};

export default StyledLink;
