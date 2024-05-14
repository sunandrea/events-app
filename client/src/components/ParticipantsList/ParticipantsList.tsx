"use client";
import { IEvent, IParticipant } from "@/interfaces/interfaces";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./participants.module.css";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const initialEvent: IEvent = {
  _id: "",
  title: "",
  description: "",
  date: "",
  organizer: "",
  createdAt: "",
  updatedAt: "",
};

const ParticipantsList = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [event, setEvent] = useState<IEvent>(initialEvent);

  const pathName = usePathname();
  const eventId = pathName.split("/")[2];

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(`${API_URL}/participants/${eventId}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error("Failed to fetch participants", error);
      }
    };

    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_URL}/events/${eventId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    fetchEvent();
    fetchParticipants();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>{event.title} participants</h2>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search by full name or email"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className={styles.participantsList}>
        {filteredParticipants.map((participant) => (
          <li className={styles.participantItem} key={participant._id}>
            <p>{participant.fullName}</p>
            <p>{participant.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantsList;
