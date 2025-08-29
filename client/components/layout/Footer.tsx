import Link from "next/link";
import {
  GraduationCap,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col items-center text-center">
        <Link href="/" className="flex items-center space-x-2 mb-4">
          <GraduationCap className="h-8 w-8 text-white" />
          <span className="font-bold text-xl text-white">E-Learn</span>
        </Link>
        <p className="text-gray-300 text-base mb-4">Online Learning Platform</p>
        <div className="flex space-x-4 mb-4">
          <Facebook className="h-6 w-6 text-gray-400 cursor-pointer" />
          <Twitter className="h-6 w-6 text-gray-400 cursor-pointer" />
          <Instagram className="h-6 w-6 text-gray-400 cursor-pointer" />
          <Linkedin className="h-6 w-6 text-gray-400 cursor-pointer" />
        </div>
        <p className="text-sm text-gray-400">
          &copy; 2025 E-Learn. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
