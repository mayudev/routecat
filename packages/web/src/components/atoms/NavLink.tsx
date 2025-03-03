import { PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import { NavLink as RouterLink } from 'react-router';
import styles from './NavLink.module.css';

type Props = {
  to: string;
  icon: IconType;
};

export const NavLink = ({ to, icon, children }: PropsWithChildren<Props>) => {
  return (
    <RouterLink
      to={to}
      className={({ isActive }) =>
        `${styles.link} ${isActive && styles.activeLink}`
      }
    >
      <div>{icon({ size: 24 })}</div>
      <div>{children}</div>
    </RouterLink>
  );
};
