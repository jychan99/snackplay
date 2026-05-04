
import Link from "next/link";
import ArrowIcon2 from "@/components/icon/ArrowIcon2";
export default function LinkComponent( 
  {href,
  children,
  ariaLabel
  } : {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {

  return (
    <Link href={href} aria-label={ariaLabel} className="group flex items-center gap-1 justify-center p-[10px] text-secondary transition text-body-m"> 
      {children} 
      <span className="group-hover:left-1 relative">
        <ArrowIcon2 size={10} />
      </span>
    </Link>
  );
}