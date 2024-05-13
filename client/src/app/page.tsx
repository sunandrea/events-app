import EventsList from "@/components/EventsList/EventsList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <EventsList />
    </main>
  );
}
