import ComingSoonButton from "@/components/ComingSoonButton";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.6L18.9 2Zm-1.2 18h1.7L7.4 4H5.6l12.1 16Z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialLinks = [
  { Icon: InstagramIcon, label: "اینستاگرام" },
  { Icon: TwitterIcon, label: "توییتر" },
  { Icon: YoutubeIcon, label: "یوتیوب" },
];

export default function FooterSocial() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map(({ Icon, label }) => (
        <ComingSoonButton
          key={label}
          ariaLabel={label}
          className="flex size-9 items-center justify-center rounded-full bg-white/[0.06] transition hover:bg-white/20"
        >
          <Icon className="size-4 text-white" strokeWidth={2} />
        </ComingSoonButton>
      ))}
    </div>
  );
}
