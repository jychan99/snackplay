type ArrowIcon2Props = {
  size?: number;
  color?: string;
};

export default function ArrowIcon2({
  size = 10,
  color = '#005cba',
}:ArrowIcon2Props) {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 10 10">
    <path fill={color} d="M7.102 5.25H0V4.083h7.102L3.835.817 4.667 0l4.666 4.667-4.666 4.666-.832-.816z"/>
  </svg>
  );
}