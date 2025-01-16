import { LucideProps } from "lucide-react";

export const Icons = {
  arrowLeft: (props: LucideProps) => (
    <svg
      {...props}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.25 9H3.75M3.75 9L9 14.25M3.75 9L9 3.75"
        stroke="#1F2A37"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
