import React from 'react';
import { Analytics } from "@vercel/analytics/react"

const PATREON_URL = import.meta.env.VITE_PATREON_URL;
const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL;
const EMAIL = import.meta.env.VITE_EMAIL;


const socialButtons = [
  {
    href: PATREON_URL,
    label: 'Support on Patreon',
    icon: (
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.82 2.41C10.52 2.41 7 5.93 7 10.23c0 4.28 3.52 7.77 7.82 7.77 4.29 0 7.77-3.49 7.77-7.77 0-4.3-3.48-7.82-7.77-7.82zM2 21.6h3.5V2.41H2V21.6z" />
      </svg>
    ),
    style: { backgroundColor: '#FF424D', color: '#fff' },
    hoverStyle: '#e03040',
  },
  {
    href: LINKEDIN_URL,
    label: 'Follow on LinkedIn',
    icon: (
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    style: { backgroundColor: '#0A66C2', color: '#fff' },
    hoverStyle: '#0958a8',
  },
  {
    href: `mailto:${EMAIL}`,
    label: 'Email me',
    icon: (
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
    style: { backgroundColor: '#0F6E56', color: '#fff' },
    hoverStyle: '#0d5e49',
  },
];

const Header = React.memo(function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 bg-white"
      style={{ height: '56px', borderBottom: '1px solid #E5E7EB' }}
    >
    <Analytics />
      <div className="flex items-center gap-2">
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 2L4 13h7l-2 7 9-11h-7l2-7z"
            fill="#0F6E56"
            stroke="#0F6E56"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-bold text-xl" style={{ color: '#0F6E56' }}>
          FitScore
        </span>
      </div>

      <div className="flex items-center gap-2">
        {socialButtons.map(({ href, label, icon, style }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            aria-label={label}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 rounded-full text-xs font-medium transition-opacity hover:opacity-85"
            style={style}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </a>
        ))}

        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: '#EDE9FE', color: '#6D28D9' }}
        >
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#6D28D9" strokeWidth="1.5" />
            <path d="M6 3v3l2 1" stroke="#6D28D9" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline">Powered by Claude AI</span>
        </div>
      </div>
    </header>
    
  );
});

export default Header;
