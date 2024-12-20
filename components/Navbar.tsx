import {Icon} from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const navIcons = [
  {src: "/assets/icons/search.svg", alt: "search"},
  {src: "/assets/icons/black-heart.svg", alt: "heart"},
  {src: "/assets/icons/user.svg", alt: "user"},
];

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <img src="/assets/icons/logo.svg" width={27} height={27} alt="logo" />

          <p className="nav-logo">
            Trave<span className="text-primary">location</span>
          </p>
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/orders" title="Orders history">
            <Icon icon="ph:clock" fontSize={24} className="text-gray-700" />
          </Link>
          {navIcons.map((icon) => (
            <img
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
