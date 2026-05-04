type CameraIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export default function CameraIcon({
  width = 24,
  height = 24,
  color = '#fff',
}:CameraIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 24 24">
      <path fill={color} d="M20 4h-3.17L15 2H9L7.17 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 14H4V6h4.05l1.83-2h4.24l1.83 2H20zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10m0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
    </svg>
  );
}