'use client';

interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  newProp?: any;
}

export default function Header(props: HeroProps) {
  return (
    <header {...props} className={` ${props.className && props.className}`}>
      header
    </header>
  );
}
