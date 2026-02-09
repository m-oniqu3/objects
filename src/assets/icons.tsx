type IconProps = {
  className?: string;
};

export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 9h16.5m-16.5 6.75h16.5"
      />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function AddIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

export function HorizontalEllipsisIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      className={className}
    >
      <path
        d="M12.0045 11.5C12.5568 11.5 13.0045 11.9477 13.0045 12.5C13.0045 13.0523 12.5568 13.5 12.0045 13.5C11.4522 13.5 11.0045 13.0523 11.0045 12.5C11.0045 11.9477 11.4522 11.5 12.0045 11.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M18.0045 11.5C18.5568 11.5 19.0045 11.9477 19.0045 12.5C19.0045 13.0523 18.5568 13.5 18.0045 13.5C17.4522 13.5 17.0045 13.0523 17.0045 12.5C17.0045 11.9477 17.4522 11.5 18.0045 11.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M6.00449 11.5C6.55677 11.5 7.00449 11.9477 7.00449 12.5C7.00449 13.0523 6.55677 13.5 6.00449 13.5C5.4522 13.5 5.00449 13.0523 5.00449 12.5C5.00449 11.9477 5.4522 11.5 6.00449 11.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
}

export function LoadingIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      className={className}
    >
      <path
        d="M12 3V6"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 18V21"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M21 12L18 12"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 12L3 12"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18.3635 5.63672L16.2422 7.75804"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.75804 16.2422L5.63672 18.3635"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18.3635 18.3635L16.2422 16.2422"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.75804 7.75804L5.63672 5.63672"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EditIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      className={className}
    >
      <path
        d="M3.78181 16.3092L3 21L7.69086 20.2182C8.50544 20.0825 9.25725 19.6956 9.84119 19.1116L20.4198 8.53288C21.1934 7.75922 21.1934 6.5049 20.4197 5.73126L18.2687 3.58024C17.495 2.80658 16.2406 2.80659 15.4669 3.58027L4.88841 14.159C4.30447 14.7429 3.91757 15.4947 3.78181 16.3092Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M14 6L18 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
export function RemoveIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      className={className}
    >
      <path
        d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </svg>
  );
}
export function MoreVerticalIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      className={className}
    >
      <path
        d="M11.9967 11.5C12.549 11.5 12.9967 11.9477 12.9967 12.5C12.9967 13.0523 12.549 13.5 11.9967 13.5C11.4444 13.5 10.9967 13.0523 10.9967 12.5C10.9967 11.9477 11.4444 11.5 11.9967 11.5Z"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9967 5.5C12.549 5.5 12.9967 5.94772 12.9967 6.5C12.9967 7.05228 12.549 7.5 11.9967 7.5C11.4444 7.5 10.9967 7.05228 10.9967 6.5C10.9967 5.94772 11.4444 5.5 11.9967 5.5Z"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9967 17.5C12.549 17.5 12.9967 17.9477 12.9967 18.5C12.9967 19.0523 12.549 19.5 11.9967 19.5C11.4444 19.5 10.9967 19.0523 10.9967 18.5C10.9967 17.9477 11.4444 17.5 11.9967 17.5Z"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
// export function ({ className }: IconProps) { }
// export function ({ className }: IconProps) { }
// export function ({ className }: IconProps) { }
