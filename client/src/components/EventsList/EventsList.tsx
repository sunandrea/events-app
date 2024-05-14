"use client";
import { IEvent } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import styles from "./events.list.module.css";
import Link from "next/link";
import Pagination from "../Pagination/Pagination";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ITEMS_PER_PAGE = 20;

const EventsList = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [page, setPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${API_URL}/events?limit=${ITEMS_PER_PAGE}&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const { events, totalEvents } = await response.json();
        setEvents(events);
        setTotalEvents(totalEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, [page]);

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

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
            </p>
            <p>{event.organizer}</p>
            <div className={styles.linksWrapper}>
              <Link href={`/register/${event._id}`}>Register</Link>
              <Link href={`participants/${event._id}`}>View</Link>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        totalPages={totalEvents / ITEMS_PER_PAGE}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default EventsList;
