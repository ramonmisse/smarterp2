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
import { Edit, Trash2, Search, UserPlus, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthdate?: string;
  loyaltyLevel?: string;
  notes?: string;
  lastPurchase?: string;
  totalSpent?: number;
}

interface CustomerListProps {
  customers?: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
  onView: (customer: Customer) => void;
  onAdd: () => void;
}

const CustomerList = ({
  customers = [
    {
      id: "1",
      name: "Maria Silva",
      email: "maria.silva@email.com",
      phone: "(11) 98765-4321",
      address: "Rua das Flores, 123 - São Paulo, SP",
      birthdate: "1985-06-15",
      loyaltyLevel: "gold",
      lastPurchase: "2023-05-10",
      totalSpent: 5280.5,
    },
    {
      id: "2",
      name: "João Santos",
      email: "joao.santos@email.com",
      phone: "(21) 99876-5432",
      address: "Av. Atlântica, 456 - Rio de Janeiro, RJ",
      birthdate: "1990-03-22",
      loyaltyLevel: "silver",
      lastPurchase: "2023-06-05",
      totalSpent: 1850.75,
    },
    {
      id: "3",
      name: "Ana Oliveira",
      email: "ana.oliveira@email.com",
      phone: "(31) 97654-3210",
      address: "Rua das Acácias, 789 - Belo Horizonte, MG",
      birthdate: "1978-11-30",
      loyaltyLevel: "platinum",
      lastPurchase: "2023-06-12",
      totalSpent: 12450.0,
    },
    {
      id: "4",
      name: "Carlos Mendes",
      email: "carlos.mendes@email.com",
      phone: "(41) 98765-1234",
      address: "Rua XV de Novembro, 1010 - Curitiba, PR",
      birthdate: "1982-08-17",
      loyaltyLevel: "regular",
      lastPurchase: "2023-04-28",
      totalSpent: 780.25,
    },
  ],
  onEdit,
  onDelete,
  onView,
  onAdd,
}: CustomerListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  );

  const getLoyaltyBadgeColor = (level: string) => {
    switch (level) {
      case "platinum":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "gold":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "silver":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
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
          <CardTitle className="text-xl font-semibold">Clientes</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar cliente..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={onAdd} size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Cliente
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
                <TableHead className="hidden lg:table-cell">
                  Última Compra
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  Total Gasto
                </TableHead>
                <TableHead className="hidden sm:table-cell">Nível</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {customer.email}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {customer.phone}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {formatDate(customer.lastPurchase || "")}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {customer.totalSpent
                        ? `R$ ${customer.totalSpent.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                        : "-"}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {customer.loyaltyLevel && (
                        <Badge
                          variant="outline"
                          className={getLoyaltyBadgeColor(
                            customer.loyaltyLevel,
                          )}
                        >
                          {customer.loyaltyLevel.charAt(0).toUpperCase() +
                            customer.loyaltyLevel.slice(1)}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onView(customer)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(customer)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(customer.id)}
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
                    Nenhum cliente encontrado.
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

export default CustomerList;
