import urls from '../urls';
import StyledLink from '../components/StyledLink';

import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <StyledLink href={urls.Exercise1}>Exercise 1</StyledLink>
      <StyledLink href={urls.Exercise2}>Exercise 2</StyledLink>
    </div>
  );
};

export default Home;
