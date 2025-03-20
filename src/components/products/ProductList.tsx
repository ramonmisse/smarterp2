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
import { Edit, Trash2, Search, Plus, Eye, Barcode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Product {
  id: string;
  barcode: string;
  name: string;
  description?: string;
  category: string;
  subcategory: string;
  rawCost: string;
  platingCost: string;
  stockQuantity: string;
  minStockQuantity: string;
  stockLocation: string;
  image?: string;
}

interface ProductListProps {
  products?: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onView: (product: Product) => void;
  onAdd: () => void;
}

const ProductList = ({
  products = [
    {
      id: "1",
      barcode: "12345678",
      name: "Anel Solitário Diamante",
      description: "Anel solitário com diamante de 0.25 quilates",
      category: "aneis",
      subcategory: "solitario",
      rawCost: "250",
      platingCost: "50",
      stockQuantity: "5",
      minStockQuantity: "2",
      stockLocation: "Vitrine 1, Prateleira A",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80",
    },
    {
      id: "2",
      barcode: "23456789",
      name: "Brinco Argola Ouro",
      description: "Brinco de argola em ouro 18k",
      category: "brincos",
      subcategory: "argola",
      rawCost: "180",
      platingCost: "40",
      stockQuantity: "8",
      minStockQuantity: "3",
      stockLocation: "Vitrine 2, Prateleira B",
      image:
        "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=300&q=80",
    },
    {
      id: "3",
      barcode: "34567890",
      name: "Colar Gargantilha Prata",
      description: "Gargantilha em prata 925 com pingente",
      category: "colares",
      subcategory: "gargantilha",
      rawCost: "120",
      platingCost: "30",
      stockQuantity: "10",
      minStockQuantity: "4",
      stockLocation: "Vitrine 3, Prateleira C",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&q=80",
    },
    {
      id: "4",
      barcode: "45678901",
      name: "Pulseira Tennis Ouro",
      description: "Pulseira estilo tennis em ouro 18k com zircônias",
      category: "pulseiras",
      subcategory: "tennis",
      rawCost: "220",
      platingCost: "45",
      stockQuantity: "6",
      minStockQuantity: "2",
      stockLocation: "Vitrine 4, Prateleira D",
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&q=80",
    },
  ],
  onEdit,
  onDelete,
  onView,
  onAdd,
}: ProductListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      aneis: "Anéis",
      brincos: "Brincos",
      colares: "Colares",
      pulseiras: "Pulseiras",
      pingentes: "Pingentes",
      relogios: "Relógios",
    };
    return categoryMap[category] || category;
  };

  const getStockStatusColor = (quantity: string, minQuantity: string) => {
    const current = parseInt(quantity) || 0;
    const min = parseInt(minQuantity) || 0;
    if (current <= 0) return "bg-red-100 text-red-800 hover:bg-red-100";
    if (current <= min) return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    return "bg-green-100 text-green-800 hover:bg-green-100";
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold">Produtos</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar produto..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={onAdd}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Produto
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">
                  Categoria
                </TableHead>
                <TableHead className="hidden lg:table-cell">Estoque</TableHead>
                <TableHead className="hidden lg:table-cell">
                  Custo Total
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  Localização
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const totalCost =
                    parseFloat(product.rawCost) +
                    parseFloat(product.platingCost);
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-mono">
                        <div className="flex items-center gap-1">
                          <Barcode className="h-4 w-4 text-gray-500" />
                          {product.barcode}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getCategoryLabel(product.category)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge
                          variant="outline"
                          className={getStockStatusColor(
                            product.stockQuantity,
                            product.minStockQuantity,
                          )}
                        >
                          {product.stockQuantity} un
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        R$ {totalCost.toFixed(2)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell truncate max-w-[150px]">
                        {product.stockLocation}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                            onClick={() => onView(product)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Ver</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                            onClick={() => onEdit(product)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Editar</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                            onClick={() => onDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Excluir</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nenhum produto encontrado.
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

export default ProductList;
