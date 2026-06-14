'use client';
import { Briefcase, Plus, BarChart3, User, Bell, LogOut } from "lucide-react";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import Providers from "@/components/providers";
import LoginButton from "@/components/LoginButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "JobTrack",
//   description: "Job application tracking dashboard",
// };

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/jobs", label: "Jobs" },
  { href: "/applications", label: "Applications" },
  {href:"/dashboard/resume_analyzer", label: "Analyze Resume"}
  // { href: "/ai/cover-letter", label: "Cover Letter" },
  // { href: "/ai/follow-up", label: "Follow‑Up Email" },
  // { href: "/ai/resume-feedback", label: "Resume Feedback" },
  // { href: "/login", label: "Login" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Header Nav */}
        <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">JobTrack</h1>
          </div>
           

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-lg">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-gray-700 dark:text-gray-200 hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div> */}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
           <Providers>  <LoginButton></LoginButton></Providers>

          </nav>
          
          {/* Mobile Nav Dropdown */}
          {mobileMenuOpen && (
            <ul className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </header>
        <Providers>
         
          {children}
          
        </Providers>
      </body>
    </html>
  );
}
