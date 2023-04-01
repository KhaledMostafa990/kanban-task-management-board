'use client';

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  newProp?: any;
}
export default function Sidebar(props: SidebarProps) {
  return (
    <aside id="sidebar" className={` ${props.className ?? ''}`}>
      aside
    </aside>
  );
}
