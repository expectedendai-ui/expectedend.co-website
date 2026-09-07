interface ActionIconProps {
  className?: string;
}

export function ArrowUpRightIcon({ className }: ActionIconProps) {
  return (
    <svg
      className={className}
      data-action-icon="up-right"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowDownIcon({ className }: ActionIconProps) {
  return (
    <svg
      className={className}
      data-action-icon="down"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 5v14" />
      <path d="m7 14 5 5 5-5" />
    </svg>
  );
}

export function InstagramIcon({ className }: ActionIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="instagram-gradient" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFDC80" />
          <stop offset=".48" stopColor="#F77737" />
          <stop offset=".72" stopColor="#E1306C" />
          <stop offset="1" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#instagram-gradient)" />
      <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="3.25" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.75" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="16.25" cy="7.8" r="1.05" fill="#fff" />
    </svg>
  );
}

export function LinkedInIcon({ className }: ActionIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="20" height="20" rx="2.5" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M7.15 9.3h2.52V17H7.15V9.3ZM8.41 5.6a1.46 1.46 0 1 1 0 2.92 1.46 1.46 0 0 1 0-2.92ZM11.25 9.3h2.42v1.05h.04c.34-.64 1.16-1.32 2.4-1.32 2.57 0 3.04 1.69 3.04 3.89V17h-2.52v-3.62c0-.86-.02-1.98-1.2-1.98-1.2 0-1.39.94-1.39 1.92V17h-2.79V9.3Z"
      />
    </svg>
  );
}

export function YouTubeIcon({ className }: ActionIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="1.5" y="4.5" width="21" height="15" rx="4.5" fill="#FF0000" />
      <path fill="#fff" d="M10 8.9v6.2l5.4-3.1L10 8.9Z" />
    </svg>
  );
}
