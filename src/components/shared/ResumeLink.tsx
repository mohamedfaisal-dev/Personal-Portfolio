"use client";

import { useResume } from "@/components/shared/ResumeProvider";

interface ResumeLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export default function ResumeLink({ children, className, ...props }: ResumeLinkProps) {
  const { resume_url, resume_filename } = useResume();
  const isLocal = resume_url.startsWith("/");

  return (
    <a
      href={resume_url}
      download={isLocal ? resume_filename : undefined}
      target={isLocal ? undefined : "_blank"}
      rel={isLocal ? undefined : "noopener noreferrer"}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
