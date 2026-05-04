type PlayIconProps = {
  size?: number;
  color?: string;
  Bgcolor?: string;
};

export default function PlayIcon({
  size = 40,
  color = '#b90760',
  Bgcolor = '#ffecef',
}:PlayIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 40 40">
      <rect width={size} height={size} fill={Bgcolor} rx="20"/>
      <path fill={color} d="M14.5 27V13l11 7zm2-3.65L21.75 20l-5.25-3.35z"/>
    </svg>
  );
}