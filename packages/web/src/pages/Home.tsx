import { Button } from '../components/atoms/Button';
import { StationInput } from '../components/molecules/StationInput';
import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles.layout}>
      <div>
        <StationInput label="From" />
      </div>
      <StationInput label="To" />
      <Button>Search</Button>
    </div>
  );
};
