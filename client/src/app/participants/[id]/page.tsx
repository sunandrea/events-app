import ParticipantsList from "@/components/ParticipantsList/ParticipantsList";
import styles from "../../page.module.css";

export default function ParticipantsPage() {
  return (
    <main className={styles.main}>
      <ParticipantsList />
    </main>
  );
}
