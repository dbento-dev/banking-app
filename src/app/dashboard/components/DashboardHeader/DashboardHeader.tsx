"use client";

interface DashboardHeaderProps {
  name: string;
}

export default function DashboardHeader({ name }: DashboardHeaderProps) {
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(currentDate);

  return (
    <div className="flex flex-row justify-between">
      <div>
        <h3 className="text-xl">Olá, {name}! :]</h3>
        <h1 className="text-3xl font-bold">Bem vinda de volta!</h1>
      </div>
      <div className="flex items-end">
        <h4 className="text-sm capitalize">{formattedDate}</h4>
      </div>
    </div>
  );
}
