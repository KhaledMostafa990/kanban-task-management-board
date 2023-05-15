interface ArrowIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}
export function ArrowIcon ({
  className,  
}: {
  className?: string;
}) {
  return (
    <svg    
      className={className ?? ""}
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
  </svg>
  )
}