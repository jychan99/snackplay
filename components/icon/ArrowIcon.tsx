type ArrowIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export default function ArrowIcon({
  width = 6,
  height = 9,
  color = '#475569',
}:ArrowIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 6 9">
      <path fill={color} d="M3.45 4.5 0 1.05 1.05 0l4.5 4.5L1.05 9 0 7.95z"/>
    </svg>
  );
}