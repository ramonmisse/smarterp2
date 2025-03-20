import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingBag,
  Package,
  DollarSign,
  Users,
  Calendar,
  Settings,
} from "lucide-react";

interface ModuleCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  onClick?: () => void;
  bgColor?: string;
}

const ModuleCard = ({
  title = "Module",
  icon = <Package size={24} />,
  description = "Module description",
  onClick = () => {},
  bgColor = "bg-blue-50",
}: ModuleCardProps) => {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${bgColor} border-none`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <div className="rounded-full bg-white p-2 shadow-sm">{icon}</div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

interface ModuleCardsProps {
  modules?: ModuleCardProps[];
}

const ModuleCards = ({ modules }: ModuleCardsProps) => {
  const defaultModules: ModuleCardProps[] = [
    {
      title: "Inventory Management",
      icon: <Package size={24} />,
      description:
        "Manage your jewelry inventory, add new items, and track stock levels",
      bgColor: "bg-blue-50",
    },
    {
      title: "POS System",
      icon: <ShoppingBag size={24} />,
      description: "Process sales, returns, and manage customer transactions",
      bgColor: "bg-green-50",
    },
    {
      title: "Financial Dashboard",
      icon: <DollarSign size={24} />,
      description:
        "View sales analytics, profit margins, and financial reports",
      bgColor: "bg-purple-50",
    },
    {
      title: "Customer Management",
      icon: <Users size={24} />,
      description:
        "Manage customer profiles, purchase history, and loyalty programs",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Appointments",
      icon: <Calendar size={24} />,
      description: "Schedule and manage custom design and repair appointments",
      bgColor: "bg-pink-50",
    },
    {
      title: "System Settings",
      icon: <Settings size={24} />,
      description: "Configure store information, users, and system preferences",
      bgColor: "bg-gray-50",
    },
  ];

  const displayModules = modules || defaultModules;

  return (
    <div className="w-full bg-white p-4">
      <h2 className="mb-4 text-xl font-semibold">Quick Access</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {displayModules.map((module, index) => (
          <ModuleCard
            key={index}
            title={module.title}
            icon={module.icon}
            description={module.description}
            onClick={module.onClick}
            bgColor={module.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleCards;
