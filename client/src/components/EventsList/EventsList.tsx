"use client";
import { IEvent } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import styles from "./events.list.module.css";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const EventsList = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/events`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <h1>Events</h1>
      <ul className={styles.eventsList}>
        {events.map((event) => (
          <li className={styles.eventItem} key={event._id}>
            <p>{event.title}</p>
            <p>{event.description}</p>
            <p>
              {new Date(event.date).toLocaleDateString("uk-UA", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>{" "}
            <div className={styles.linksWrapper}>
              <Link href={`/register/${event._id}`}>Register</Link>
              <Link href="#">View</Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EventsList;
