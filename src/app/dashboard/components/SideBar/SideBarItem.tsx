import React from "react";

interface SideBarItemProps {
  IconComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  isActive?: boolean;
  onClick: () => void;
  className?: string
}

export default function SideBarItem({
  IconComponent: Icon,
  text,
  isActive = false,
  onClick,
}: SideBarItemProps) {
  const baseClasses =
    "flex cursor-pointer items-center rounded-sm px-6 py-4 no-underline transition-colors duration-150";

  const stateClasses = isActive
    ? "bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)]" // Active state styles
    : "text-[var(--color-text-menu)] hover:bg-[var(--surface-hover)] active:bg-[var(--color-primary)] active:text-[var(--color-on-primary)]"; // Inactive state styles

  return (
    <div className={`${baseClasses} ${stateClasses}`} onClick={onClick}>
      <Icon className="mr-8 h-[32px] w-[32px] stroke-current" />
      <span>{text}</span>
    </div>
  );
}
