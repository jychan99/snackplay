type PlayIconProps = {
  size?: number;
  color?: string;
  className?: string;
};
type Variant = "primary" | "secondary";

export default function PlayIcon({
  size = 40,
  color = "var(--color-primary-light)",
  className = "text-primary",
}: PlayIconProps) {
  // const variantStyle = {
  //   primary: "color-primary",
  //   secondary: "color-primary",
  // };
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 40 40"
    >
      <rect width={size} height={size} fill={color} rx="20" />
      <path
        fill="currentColor"
        d="M14.5 27V13l11 7zm2-3.65L21.75 20l-5.25-3.35z"
      />
    </svg>
  );
}
