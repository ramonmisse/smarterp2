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
import { Edit, Trash2, Search, UserPlus, Eye, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  hireDate: string;
  commission: string;
  status: string;
  notes?: string;
  salesCount?: number;
  totalSales?: number;
}

interface SellerListProps {
  sellers?: Seller[];
  onEdit: (seller: Seller) => void;
  onDelete: (sellerId: string) => void;
  onView: (seller: Seller) => void;
  onAdd: () => void;
  onViewPerformance?: (seller: Seller) => void;
}

const SellerList = ({
  sellers = [
    {
      id: "1",
      name: "Pedro Almeida",
      email: "pedro.almeida@email.com",
      phone: "(11) 97654-3210",
      position: "gerente",
      hireDate: "2020-03-15",
      commission: "8",
      status: "active",
      salesCount: 145,
      totalSales: 287500.75,
    },
    {
      id: "2",
      name: "Carla Souza",
      email: "carla.souza@email.com",
      phone: "(11) 98765-4321",
      position: "vendedor",
      hireDate: "2021-06-10",
      commission: "5",
      status: "active",
      salesCount: 98,
      totalSales: 156320.5,
    },
    {
      id: "3",
      name: "Roberto Ferreira",
      email: "roberto.ferreira@email.com",
      phone: "(11) 91234-5678",
      position: "vendedor",
      hireDate: "2022-01-20",
      commission: "5",
      status: "vacation",
      salesCount: 67,
      totalSales: 89450.25,
    },
    {
      id: "4",
      name: "Juliana Costa",
      email: "juliana.costa@email.com",
      phone: "(11) 99876-5432",
      position: "consultor",
      hireDate: "2021-11-05",
      commission: "6",
      status: "active",
      salesCount: 112,
      totalSales: 198750.0,
    },
  ],
  onEdit,
  onDelete,
  onView,
  onAdd,
  onViewPerformance,
}: SellerListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.phone.includes(searchTerm),
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "inactive":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "vacation":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "leave":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getPositionLabel = (position: string) => {
    switch (position) {
      case "gerente":
        return "Gerente";
      case "vendedor":
        return "Vendedor";
      case "supervisor":
        return "Supervisor";
      case "consultor":
        return "Consultor";
      default:
        return position.charAt(0).toUpperCase() + position.slice(1);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "vacation":
        return "Em férias";
      case "leave":
        return "Licença";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold">Vendedores</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar vendedor..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={onAdd} size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Vendedor
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Telefone</TableHead>
                <TableHead className="hidden lg:table-cell">Cargo</TableHead>
                <TableHead className="hidden lg:table-cell">Comissão</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSellers.length > 0 ? (
                filteredSellers.map((seller) => (
                  <TableRow key={seller.id}>
                    <TableCell className="font-medium">{seller.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {seller.email}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {seller.phone}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {getPositionLabel(seller.position)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {seller.commission}%
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant="outline"
                        className={getStatusBadgeColor(seller.status)}
                      >
                        {getStatusLabel(seller.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onView(seller)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {onViewPerformance && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onViewPerformance(seller)}
                          >
                            <BarChart className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(seller)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(seller.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nenhum vendedor encontrado.
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

export default SellerList;
