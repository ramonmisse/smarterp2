import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Barcode, Plus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/components/products/ProductList";
import { Seller } from "@/components/sellers/SellerList";
import { getProductByBarcode } from "@/db/supabase";

const formSchema = z.object({
  createdBy: z.string().min(1, { message: "Usuário é obrigatório" }),
  sellerId: z.string().min(1, { message: "Vendedor é obrigatório" }),
  orderDate: z.string().min(1, { message: "Data do pedido é obrigatória" }),
  settlementDate: z.string().min(1, {
    message: "Data do acerto é obrigatória",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface ConsignmentItem {
  productId: string;
  barcode: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  image?: string;
}

interface ConsignmentFormProps {
  sellers: Seller[];
  products: Product[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ConsignmentForm = ({
  sellers,
  products,
  onSubmit,
  onCancel,
}: ConsignmentFormProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const defaultSettlementDate = format(addDays(new Date(), 30), "yyyy-MM-dd");

  const [items, setItems] = useState<ConsignmentItem[]>([]);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [lastAddedItem, setLastAddedItem] = useState<ConsignmentItem | null>(
    null,
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      createdBy: "",
      sellerId: "",
      orderDate: today,
      settlementDate: defaultSettlementDate,
    },
  });

  const handleAddItem = async () => {
    if (!barcodeInput.trim()) {
      alert("Por favor, insira um código de barras válido.");
      return;
    }

    // Normalizar o código de barras para comparação (remover espaços)
    const normalizedBarcode = barcodeInput.trim();

    try {
      // Primeiro tentar buscar na lista local de produtos
      let product = products.find(
        (p) => p.barcode.trim() === normalizedBarcode,
      );

      // Se não encontrar localmente, buscar no banco de dados
      if (!product) {
        product = await getProductByBarcode(normalizedBarcode);
      }

      if (!product) {
        alert("Produto não encontrado! Verifique o código de barras.");
        return;
      }

      // Verificar se há estoque suficiente
      const stockQuantityValue =
        product.stockQuantity || product.stock_quantity?.toString() || "0";
      const currentStock = parseInt(stockQuantityValue) || 0;

      if (currentStock < quantity) {
        alert(`Estoque insuficiente! Disponível: ${currentStock} unidades.`);
        return;
      }

      console.log("Produto encontrado:", product);

      // Calculate price (for this example, we'll use rawCost + platingCost + 100% markup)
      const rawCostValue =
        product.rawCost || product.raw_cost?.toString() || "0";
      const platingCostValue =
        product.platingCost || product.plating_cost?.toString() || "0";

      const cost = parseFloat(rawCostValue) + parseFloat(platingCostValue);
      const price = cost * 2; // 100% markup

      const newItem: ConsignmentItem = {
        productId: product.id,
        barcode: product.barcode,
        name: product.name,
        category: product.category,
        quantity: quantity,
        unitPrice: price,
        image: product.image || product.image_url,
      };

      // Check if item already exists in the list
      const existingItemIndex = items.findIndex(
        (item) => item.barcode === normalizedBarcode,
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += quantity;
        setItems(updatedItems);
      } else {
        // Add new item
        setItems([...items, newItem]);
      }

      setLastAddedItem(newItem);
      setBarcodeInput("");
      setQuantity(1);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      alert("Erro ao buscar produto. Por favor, tente novamente.");
    }
  };

  const handleRemoveItem = (barcode: string) => {
    setItems(items.filter((item) => item.barcode !== barcode));
    if (lastAddedItem?.barcode === barcode) {
      setLastAddedItem(null);
    }
  };

  const handleFormSubmit = (data: FormValues) => {
    if (items.length === 0) {
      alert("Adicione pelo menos um item ao pedido!");
      return;
    }

    const totalValue = items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );

    const categoryCounts = items.reduce(
      (acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.quantity;
        return acc;
      },
      {} as Record<string, number>,
    );

    const consignmentOrder = {
      ...data,
      items,
      totalValue,
      categoryCounts,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    };

    onSubmit(consignmentOrder);
  };

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

  const totalValue = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );

  const categoryCounts = items.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.quantity;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="createdBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do usuário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sellerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendedor</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um vendedor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sellers.map((seller) => (
                        <SelectItem key={seller.id} value={seller.id}>
                          {seller.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data do Pedido</FormLabel>
                  <FormControl>
                    <Input type="date" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="settlementDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data do Acerto</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Adicionar Produtos</h3>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <FormLabel htmlFor="barcode">Código de Barras</FormLabel>
                <div className="relative">
                  <Barcode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    id="barcode"
                    placeholder="Digite ou escaneie o código de barras"
                    className="pl-10"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddItem();
                      }
                    }}
                  />
                </div>
              </div>
              <div className="w-24">
                <FormLabel htmlFor="quantity">Quantidade</FormLabel>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
              </div>
              <Button type="button" onClick={handleAddItem} className="mb-0.5">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </div>

            {lastAddedItem && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {lastAddedItem.image && (
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={lastAddedItem.image}
                          alt={lastAddedItem.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium">
                        Último item adicionado: {lastAddedItem.name}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Código: {lastAddedItem.barcode}</span>
                        <span>•</span>
                        <span>Quantidade: {lastAddedItem.quantity}</span>
                        <span>•</span>
                        <span>
                          Preço: R$ {lastAddedItem.unitPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="border rounded-md">
              <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
                <h4 className="font-medium">Itens no Pedido</h4>
                <div className="text-sm">
                  Total: R$ {totalValue.toFixed(2)} |{" "}
                  {items.reduce((sum, item) => sum + item.quantity, 0)} itens
                </div>
              </div>
              <ScrollArea className="h-[300px]">
                {items.length > 0 ? (
                  <div className="divide-y">
                    {items.map((item) => (
                      <div
                        key={item.barcode}
                        className="p-3 flex items-center gap-3 hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.name}</span>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700"
                            >
                              {getCategoryLabel(item.category)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <span>Código: {item.barcode}</span>
                            <span>•</span>
                            <span>Quantidade: {item.quantity}</span>
                            <span>•</span>
                            <span>Preço: R$ {item.unitPrice.toFixed(2)}</span>
                            <span>•</span>
                            <span>
                              Subtotal: R${" "}
                              {(item.quantity * item.unitPrice).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.barcode)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    Nenhum item adicionado ao pedido.
                  </div>
                )}
              </ScrollArea>
            </div>

            {items.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Resumo por Categoria</h4>
                    <div className="space-y-2">
                      {Object.entries(categoryCounts).map(
                        ([category, count]) => (
                          <div
                            key={category}
                            className="flex justify-between items-center"
                          >
                            <span>{getCategoryLabel(category)}</span>
                            <Badge variant="outline">{count} itens</Badge>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Resumo do Pedido</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Total de Itens</span>
                        <span className="font-medium">
                          {items.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Valor Total</span>
                        <span className="font-medium">
                          R$ {totalValue.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">Criar Pedido Consignado</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ConsignmentForm;
