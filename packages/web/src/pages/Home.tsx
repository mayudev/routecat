import { PiGear, PiMagnifyingGlass } from 'react-icons/pi';
import { Button } from '../components/atoms/Button';
import { StationInput } from '../components/molecules/StationInput';
import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.headline}>Plan your trip</div>
      <div>
        <StationInput label="From" />
      </div>
      <StationInput label="To" />
      <div className={styles.buttons}>
        <Button icon={PiGear} />
        <Button variant="filled" fullWidth icon={PiMagnifyingGlass}>
          Search
        </Button>
      </div>
    </div>
  );
};
