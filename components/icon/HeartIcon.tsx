type HeartIconProps = {
  width?: number;
  height?: number;
  className?: string;
  checked: boolean;
};
export default function HeartIcon({
  width = 22,
  height = 22,
  className,
  checked = false,
}: HeartIconProps) {
  const fill = checked ? "#d93179" : "none";
  const fillPath = checked ? "#d93179" : "#475569";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        stroke={fillPath}
        strokeWidth="1.5"
        d="m12 21.35-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
      />
    </svg>
  );
}
