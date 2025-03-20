import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  AlertTriangle,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  bgColor?: string;
}

const StatCard = ({
  title = "Stat Title",
  value = "$0",
  change = { value: "0%", isPositive: true },
  icon = <ArrowUpCircle />,
  bgColor = "bg-blue-50",
}: StatCardProps) => {
  return (
    <Card className="bg-white">
      <CardContent className="p-4 flex items-center">
        <div className={`${bgColor} p-3 rounded-full mr-4`}>{icon}</div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {change && (
              <span
                className={`ml-2 text-sm ${change.isPositive ? "text-green-500" : "text-red-500"}`}
              >
                {change.isPositive ? "+" : ""}
                {change.value}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatCardsProps {
  cards?: StatCardProps[];
}

const StatCards = ({
  cards = [
    {
      title: "Today's Sales",
      value: "$12,426",
      change: { value: "8.2%", isPositive: true },
      icon: <ArrowUpCircle className="text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Inventory Value",
      value: "$1.2M",
      change: { value: "2.1%", isPositive: true },
      icon: <ArrowUpCircle className="text-green-500" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Appointments",
      value: "24",
      change: { value: "4", isPositive: false },
      icon: <Calendar className="text-purple-500" />,
      bgColor: "bg-purple-50",
    },
    {
      title: "Low Stock Items",
      value: "18",
      change: { value: "5", isPositive: false },
      icon: <AlertTriangle className="text-amber-500" />,
      bgColor: "bg-amber-50",
    },
  ],
}: StatCardsProps) => {
  return (
    <div className="w-full bg-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default StatCards;
