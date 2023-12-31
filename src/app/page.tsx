'use client';

import styles from './page.module.css';
import Calendar from '@/app/components/UI/Calendar';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

export default function Home() {
  return (
    <main className={styles.main}>
      <Provider store={store}>
        <Calendar />
      </Provider>
    </main>
  );
}
