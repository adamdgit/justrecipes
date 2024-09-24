'use client'

import Link from "next/link";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { User } from "@supabase/supabase-js";
import { useState } from "react";

export default function AuthButton({ user }: { user: User | null }) {

  const [show, setShow] = useState(false);

  return user ? (
    <div className="user-nav-wrap">
      {user.email}

      <FontAwesomeIcon icon={faBars} 
        className="dropdown-menu btn" 
        onClick={() => setShow(!show)} 
      />
      <div className={show ? "menu-items show" : "menu-items hide"}>
        <Navbar />
        <a href="http://localhost:3000/auth/signout" className="btn logout">
          Logout
        </a>
      </div>
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
