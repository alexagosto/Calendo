"use client";

import { redirect } from "next/navigation";
import Calendar from "./calendar/calendar";

//TODO: Fix dark mode styles, for ease of use keep everything in light mode
export default function Home() {
  if (typeof window !== "undefined") {
    // do your stuff with sessionStorage
    const email = sessionStorage.getItem("email");
    const password = sessionStorage.getItem("password");
    const name = localStorage.getItem(email + "name");

    if (localStorage.getItem(email) == null) {
      redirect("/auth");
    }
  }

  return (
    <div className="flex flex-col items-center h-screen text-sm">
      <Calendar />
    </div>
  );
}
