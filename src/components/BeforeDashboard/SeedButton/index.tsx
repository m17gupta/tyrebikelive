"use client";
import React, { Fragment, useCallback, useState } from "react";
import "./index.scss";

const SuccessMessage: React.FC = () => (
  <div>
    Database seeded!{" "}
    <a target="_blank" href="/">
      visit your website
    </a>
  </div>
);

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [message, setMessage] = useState("");

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (seeded) { setMessage("Database already seeded."); return; }
      if (loading) { setMessage("Seeding already in progress."); return; }
      if (error) { setMessage(`An error occurred: ${error}`); return; }

      setLoading(true);
      setMessage("Seeding with data...");
      try {
        const res = await fetch("/next/seed", { method: "POST", credentials: "include" });
        if (res.ok) {
          setSeeded(true);
          setMessage("Database seeded! Visit your website.");
        } else {
          setMessage("An error occurred while seeding.");
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        setError(errMsg);
        setMessage("An error occurred while seeding.");
      } finally {
        setLoading(false);
      }
    },
    [loading, seeded, error],
  );

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick} disabled={loading}>
        Seed your database
      </button>
      {message && <span className="ml-2 text-sm opacity-70">{message}</span>}
    </Fragment>
  );
};

