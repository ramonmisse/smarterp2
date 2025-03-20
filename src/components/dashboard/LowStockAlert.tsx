import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { AlertCircle, ShoppingCart } from "lucide-react";

interface LowStockItem {
  id: string;
  name: string;
  currentStock: number;
  minStockLevel: number;
  supplier: string;
  supplierContact: string;
  lastOrdered: string;
  image: string;
}

interface LowStockAlertProps {
  items?: LowStockItem[];
  title?: string;
}

const LowStockAlert = ({
  items = [
    {
      id: "1",
      name: "Diamond Solitaire Ring",
      currentStock: 2,
      minStockLevel: 5,
      supplier: "Brilliant Gems Inc.",
      supplierContact: "sales@brilliantgems.com",
      lastOrdered: "2023-10-15",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&q=80",
    },
    {
      id: "2",
      name: 'Pearl Necklace 18"',
      currentStock: 1,
      minStockLevel: 3,
      supplier: "Ocean Treasures Ltd.",
      supplierContact: "orders@oceantreasures.com",
      lastOrdered: "2023-11-02",
      image:
        "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=100&q=80",
    },
    {
      id: "3",
      name: "Gold Chain Bracelet",
      currentStock: 3,
      minStockLevel: 8,
      supplier: "Golden Links Co.",
      supplierContact: "supply@goldenlinks.com",
      lastOrdered: "2023-09-28",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&q=80",
    },
  ],
  title = "Low Stock Alert",
}: LowStockAlertProps) => {
  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="bg-amber-50 border-b">
        <CardTitle className="flex items-center text-amber-800">
          <AlertCircle className="mr-2 h-5 w-5 text-amber-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-auto max-h-[220px]">
        <div className="divide-y">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 flex items-center gap-3 hover:bg-gray-50"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-red-600 font-medium">
                    Stock: {item.currentStock} / {item.minStockLevel}
                  </span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-xs text-gray-500 truncate">
                    Supplier: {item.supplier}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="flex-shrink-0 text-xs border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                <ShoppingCart className="mr-1 h-3 w-3" />
                Reorder
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 justify-between py-3">
        <span className="text-xs text-gray-500">
          {items.length} items below minimum stock level
        </span>
        <Button variant="link" size="sm" className="text-amber-700">
          View all low stock items
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LowStockAlert;
