type ArrowIcon2Props = {
  size?: number;
  className?: string;
};

export default function ArrowIcon2({
  size = 10,
  className = "text-text-main",
}: ArrowIcon2Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      fill="none"
      viewBox="0 0 10 10"
    >
      <path
        fill="currentColor"
        d="M7.102 5.25H0V4.083h7.102L3.835.817 4.667 0l4.666 4.667-4.666 4.666-.832-.816z"
      />
    </svg>
  );
}
