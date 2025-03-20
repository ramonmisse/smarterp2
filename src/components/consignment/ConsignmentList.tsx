import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  Search,
  Plus,
  Eye,
  FileText,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface ConsignmentOrder {
  id: string;
  createdBy: string;
  sellerId: string;
  sellerName: string;
  orderDate: string;
  settlementDate: string;
  totalValue: number;
  totalItems: number;
  status: "pending" | "settled" | "canceled";
  items: {
    productId: string;
    barcode: string;
    name: string;
    category: string;
    quantity: number;
    unitPrice: number;
    image?: string;
  }[];
  categoryCounts: Record<string, number>;
  settlementDetails?: {
    settledBy: string;
    commission: number;
    commissionValue: number;
    paymentMethod: string;
    returnedItems: {
      productId: string;
      name: string;
      returnedQuantity: number;
      isFullyReturned: boolean;
    }[];
  };
}

interface ConsignmentListProps {
  orders?: ConsignmentOrder[];
  onView: (order: ConsignmentOrder) => void;
  onEdit: (order: ConsignmentOrder) => void;
  onDelete: (orderId: string) => void;
  onAdd: () => void;
  onSettle?: (order: ConsignmentOrder) => void;
}

const ConsignmentList = ({
  orders = [
    {
      id: "1",
      createdBy: "Jane Doe",
      sellerId: "2",
      sellerName: "Carla Souza",
      orderDate: "2023-06-01",
      settlementDate: "2023-07-01",
      totalValue: 3250.75,
      totalItems: 12,
      status: "pending",
      items: [
        {
          productId: "1",
          barcode: "12345678",
          name: "Anel Solitário Diamante",
          category: "aneis",
          quantity: 2,
          unitPrice: 600,
          image:
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80",
        },
        {
          productId: "2",
          barcode: "23456789",
          name: "Brinco Argola Ouro",
          category: "brincos",
          quantity: 5,
          unitPrice: 440,
          image:
            "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=300&q=80",
        },
        {
          productId: "3",
          barcode: "34567890",
          name: "Colar Gargantilha Prata",
          category: "colares",
          quantity: 5,
          unitPrice: 300,
          image:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80",
        },
      ],
      categoryCounts: {
        aneis: 2,
        brincos: 5,
        colares: 5,
      },
    },
    {
      id: "2",
      createdBy: "Jane Doe",
      sellerId: "4",
      sellerName: "Juliana Costa",
      orderDate: "2023-06-05",
      settlementDate: "2023-07-05",
      totalValue: 4800.25,
      totalItems: 15,
      status: "pending",
      items: [
        {
          productId: "1",
          barcode: "12345678",
          name: "Anel Solitário Diamante",
          category: "aneis",
          quantity: 3,
          unitPrice: 600,
          image:
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80",
        },
        {
          productId: "4",
          barcode: "45678901",
          name: "Pulseira Tennis Ouro",
          category: "pulseiras",
          quantity: 7,
          unitPrice: 530,
          image:
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&q=80",
        },
        {
          productId: "3",
          barcode: "34567890",
          name: "Colar Gargantilha Prata",
          category: "colares",
          quantity: 5,
          unitPrice: 300,
          image:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80",
        },
      ],
      categoryCounts: {
        aneis: 3,
        pulseiras: 7,
        colares: 5,
      },
    },
  ],
  onView,
  onEdit,
  onDelete,
  onAdd,
  onSettle,
}: ConsignmentListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.includes(searchTerm) ||
      order.createdBy.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Pendente
          </Badge>
        );
      case "settled":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Acertado
          </Badge>
        );
      case "canceled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Cancelado
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold">
            Pedidos Consignados
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar pedido..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={onAdd} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Novo Pedido
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead className="hidden md:table-cell">
                  Data do Pedido
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Data do Acerto
                </TableHead>
                <TableHead className="hidden lg:table-cell">Itens</TableHead>
                <TableHead className="hidden lg:table-cell">
                  Valor Total
                </TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-gray-500" />#
                        {order.id}
                      </div>
                    </TableCell>
                    <TableCell>{order.sellerName}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(order.orderDate)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(order.settlementDate)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {order.totalItems} itens
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      R$ {order.totalValue.toFixed(2)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onView(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {order.status === "pending" && onSettle && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onSettle(order)}
                            className="text-green-600"
                            title="Baixar Pedido"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(order)}
                          disabled={order.status !== "pending"}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(order.id)}
                          disabled={order.status !== "pending"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Nenhum pedido consignado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsignmentList;
