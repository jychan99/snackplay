type CloseIconProps = {
  size?: number;
  color?: string;
};

export default function CloseIcon({
  size = 40,
  color = '#475569',
}:CloseIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 40 40">
      <path stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M30 10 10 30M10 10l20 20"/>
    </svg>
  );
}