type CheckIconProps = {
  size?: number;
  checked?: boolean;
};

export default function CheckIcon({
  size = 16,
  checked = false
}:CheckIconProps) {
  return (
    checked ? 
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 16 16">
      <g>
        <rect width="15" height="15" x=".5" y=".5" fill="#005cba" stroke="#94a3b8" rx="3.5"/>
        <path fill="#fff" d="M11.978 5.129a.625.625 0 0 1 0 .883l-4.685 4.685a.665.665 0 0 1-.943 0L4.023 8.37a.625.625 0 1 1 .884-.884l1.915 1.915 4.272-4.272a.624.624 0 0 1 .884 0" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z"/>
        </clipPath>
      </defs>
    </svg>:
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 16 16">
      <rect width="15" height="15" x=".5" y=".5" fill="#fff" stroke="#94a3b8" rx="3.5"/>
    </svg>
    
  );
}