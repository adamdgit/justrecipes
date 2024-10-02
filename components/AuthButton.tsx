'use client'

import Link from "next/link";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function AuthButton({ user }: { user: User | null }) {

  const [show, setShow] = useState(false);

  // onclick outside of dropdown, close dropdown
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target instanceof Element) {
        if (!e.target.classList.contains('dropdown-menu') && 
            !e.target.classList.contains('menu-items')) {
          setShow(false)
        }
      }
    })
  },[])

  return user ? (
    <div className="user-nav-wrap">
      {user.email}
      <button 
        className="dropdown-menu btn"
        onClick={() => setShow(!show)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <nav className={show ? "menu-items show" : "menu-items hide"}>
        <Navbar />
        <a href={`/auth/signout`} className="btn logout">
          Logout
        </a>
      </nav>
    </div>
  ) : (
    <Link
      href="/login"
      className="btn login"
    >
      Login
    </Link>
  );
}
