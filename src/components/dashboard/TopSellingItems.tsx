import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TopSellingItem {
  id: string;
  name: string;
  price: number;
  quantitySold: number;
  image: string;
  category: string;
}

interface TopSellingItemsProps {
  items?: TopSellingItem[];
  title?: string;
  period?: string;
}

const TopSellingItems = ({
  items = [
    {
      id: "1",
      name: "Diamond Engagement Ring",
      price: 2499.99,
      quantitySold: 12,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80",
      category: "Rings",
    },
    {
      id: "2",
      name: "Gold Necklace",
      price: 899.99,
      quantitySold: 8,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80",
      category: "Necklaces",
    },
    {
      id: "3",
      name: "Pearl Earrings",
      price: 349.99,
      quantitySold: 15,
      image:
        "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=300&q=80",
      category: "Earrings",
    },
    {
      id: "4",
      name: "Silver Bracelet",
      price: 199.99,
      quantitySold: 10,
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&q=80",
      category: "Bracelets",
    },
  ],
  title = "Top Selling Items",
  period = "This Month",
}: TopSellingItemsProps) => {
  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="outline" className="text-xs">
            {period}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-gray-500">{item.category}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm font-semibold">
                    ${item.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-600">
                    {item.quantitySold} sold
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSellingItems;
