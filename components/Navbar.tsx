"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image
            src="/icons/logo.png"
            alt="DevEvents Logo"
            width={32}
            height={32}
          />
          <p>DevEvents</p>
        </Link>
        <ul className="list-none">
          <li>
            <Link href="/events" onClick={() => posthog.capture("nav_link_clicked", { label: "Events", href: "/events" })}>Events</Link>
          </li>
          <li>
            <Link href="/about" onClick={() => posthog.capture("nav_link_clicked", { label: "About", href: "/about" })}>About</Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => posthog.capture("nav_link_clicked", { label: "Contact", href: "/contact" })}>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
