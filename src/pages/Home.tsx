import styled from 'styled-components';
import urls from '../urls';
import StyledLink from '../components/StyledLink';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  return (
    <Container>
      <StyledLink to={urls.Exercise1}>Exercise 1</StyledLink>
      <StyledLink to={urls.Exercise2}>Exercise 2</StyledLink>
    </Container>
  );
};

export default Home;
