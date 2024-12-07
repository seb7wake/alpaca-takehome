import { LiaHippoSolid } from "react-icons/lia";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link href="/" className="flex items-center gap-2">
        <LiaHippoSolid className="w-8 h-8 text-indigo-600" />
        <span className="text-xl font-semibold text-gray-900">
          Hippo Health
        </span>
      </Link>
    </div>
  );
};

export default Header;
