import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ConsignmentOrder } from "./ConsignmentList";

interface ConsignmentSettlementProps {
  order: ConsignmentOrder;
  currentUser: string;
  onCancel: () => void;
  onComplete: (settledOrder: ConsignmentOrder) => void;
}

const ConsignmentSettlement = ({
  order,
  currentUser = "Jane Doe",
  onCancel,
  onComplete,
}: ConsignmentSettlementProps) => {
  const [items, setItems] = useState<
    Array<{
      productId: string;
      barcode: string;
      name: string;
      category: string;
      quantity: number;
      returnedQuantity: number;
      unitPrice: number;
      image?: string;
      isRemoved: boolean;
    }>
  >(
    order.items.map((item) => ({
      ...item,
      returnedQuantity: 0,
      isRemoved: false,
    })),
  );

  const [commission, setCommission] = useState("5");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [totalValue, setTotalValue] = useState(0);
  const [commissionValue, setCommissionValue] = useState(0);
  const [finalValue, setFinalValue] = useState(0);

  useEffect(() => {
    // Calculate totals
    const soldItems = items.filter((item) => !item.isRemoved);
    const soldQuantities = soldItems.map(
      (item) => item.quantity - item.returnedQuantity,
    );
    const itemValues = soldItems.map(
      (item, index) => soldQuantities[index] * item.unitPrice,
    );
    const total = itemValues.reduce((sum, value) => sum + value, 0);

    const commissionAmount = total * (parseFloat(commission) / 100);

    setTotalValue(total);
    setCommissionValue(commissionAmount);
    setFinalValue(total - commissionAmount);
  }, [items, commission]);

  const handleReturnQuantityChange = (
    productId: string,
    returnedQuantity: number,
  ) => {
    setItems(
      items.map((item) => {
        if (item.productId === productId) {
          const newReturnedQuantity = Math.max(
            0,
            Math.min(returnedQuantity, item.quantity),
          );
          return { ...item, returnedQuantity: newReturnedQuantity };
        }
        return item;
      }),
    );
  };

  const handleRemoveItem = (productId: string) => {
    setItems(
      items.map((item) => {
        if (item.productId === productId) {
          return { ...item, isRemoved: true, returnedQuantity: item.quantity };
        }
        return item;
      }),
    );
  };

  const handleRestoreItem = (productId: string) => {
    setItems(
      items.map((item) => {
        if (item.productId === productId) {
          return { ...item, isRemoved: false, returnedQuantity: 0 };
        }
        return item;
      }),
    );
  };

  const handleComplete = () => {
    // Create updated order with settled status and updated items
    const updatedOrder: ConsignmentOrder = {
      ...order,
      status: "settled",
      items: items
        .filter(
          (item) => !item.isRemoved || item.returnedQuantity < item.quantity,
        )
        .map((item) => ({
          productId: item.productId,
          barcode: item.barcode,
          name: item.name,
          category: item.category,
          quantity: item.isRemoved ? 0 : item.quantity - item.returnedQuantity,
          unitPrice: item.unitPrice,
          image: item.image,
        })),
      totalValue: finalValue,
      totalItems: items.reduce(
        (total, item) =>
          total + (item.isRemoved ? 0 : item.quantity - item.returnedQuantity),
        0,
      ),
      settlementDate: new Date().toISOString().split("T")[0],
      // Add settlement details
      settlementDetails: {
        settledBy: currentUser,
        commission: parseFloat(commission),
        commissionValue: commissionValue,
        paymentMethod: paymentMethod,
        returnedItems: items
          .filter((item) => item.returnedQuantity > 0 || item.isRemoved)
          .map((item) => ({
            productId: item.productId,
            name: item.name,
            returnedQuantity: item.returnedQuantity,
            isFullyReturned:
              item.isRemoved || item.returnedQuantity === item.quantity,
          })),
      },
    };

    // Update category counts
    const categoryCounts: Record<string, number> = {};
    updatedOrder.items.forEach((item) => {
      if (item.quantity > 0) {
        categoryCounts[item.category] =
          (categoryCounts[item.category] || 0) + item.quantity;
      }
    });
    updatedOrder.categoryCounts = categoryCounts;

    onComplete(updatedOrder);
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Informações do Acerto</h3>
                  <p className="text-sm text-gray-500">Pedido #{order.id}</p>
                </div>

                <div className="space-y-2">
                  <div>
                    <Label>Vendedor</Label>
                    <div className="font-medium">{order.sellerName}</div>
                  </div>

                  <div>
                    <Label>Responsável pelo Acerto</Label>
                    <div className="font-medium">{currentUser}</div>
                  </div>

                  <div>
                    <Label htmlFor="commission">Comissão do Vendedor (%)</Label>
                    <Input
                      id="commission"
                      type="number"
                      value={commission}
                      onChange={(e) => setCommission(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
                    <Select
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione a forma de pagamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Dinheiro</SelectItem>
                        <SelectItem value="credit_card">
                          Cartão de Crédito
                        </SelectItem>
                        <SelectItem value="debit_card">
                          Cartão de Débito
                        </SelectItem>
                        <SelectItem value="pix">PIX</SelectItem>
                        <SelectItem value="bank_transfer">
                          Transferência Bancária
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <span>Valor Total das Vendas:</span>
                    <span className="font-medium">
                      R$ {totalValue.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Comissão ({commission}%):</span>
                    <span>- R$ {commissionValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Valor Final:</span>
                    <span>R$ {finalValue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Itens do Pedido</h3>
                  <div className="text-sm text-gray-500">
                    {items.filter((i) => !i.isRemoved).length} de{" "}
                    {order.items.length} itens
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <Label htmlFor="barcodeInput">
                      Remover item por código de barras
                    </Label>
                    <Input
                      id="barcodeInput"
                      placeholder="Escaneie o código de barras..."
                      className="mt-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const barcode = e.currentTarget.value;
                          const item = items.find(
                            (i) => i.barcode === barcode && !i.isRemoved,
                          );
                          if (item) {
                            handleRemoveItem(item.productId);
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.productId}
                        className={`p-3 border rounded-md ${item.isRemoved ? "bg-red-50 border-red-200" : "hover:bg-gray-50"}`}
                      >
                        <div className="flex gap-3">
                          {item.image && (
                            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4
                                className={`font-medium ${item.isRemoved ? "text-red-700 line-through" : ""}`}
                              >
                                {item.name}
                              </h4>
                              <Badge
                                variant="outline"
                                className={
                                  item.isRemoved
                                    ? "bg-red-50 text-red-700"
                                    : "bg-blue-50 text-blue-700"
                                }
                              >
                                {getCategoryLabel(item.category)}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <span>Código: {item.barcode}</span>
                              <span>•</span>
                              <span>Preço: R$ {item.unitPrice.toFixed(2)}</span>
                            </div>

                            {!item.isRemoved ? (
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">
                                    Quantidade: {item.quantity}
                                  </span>
                                  <span className="text-sm">•</span>
                                  <span className="text-sm">Devolvidos:</span>
                                  <div className="flex items-center">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() =>
                                        handleReturnQuantityChange(
                                          item.productId,
                                          item.returnedQuantity - 1,
                                        )
                                      }
                                      disabled={item.returnedQuantity <= 0}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="mx-2 text-sm font-medium w-4 text-center">
                                      {item.returnedQuantity}
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() =>
                                        handleReturnQuantityChange(
                                          item.productId,
                                          item.returnedQuantity + 1,
                                        )
                                      }
                                      disabled={
                                        item.returnedQuantity >= item.quantity
                                      }
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 h-7"
                                  onClick={() =>
                                    handleRemoveItem(item.productId)
                                  }
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Remover
                                </Button>
                              </div>
                            ) : (
                              <div className="mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-blue-600 h-7"
                                  onClick={() =>
                                    handleRestoreItem(item.productId)
                                  }
                                >
                                  Restaurar Item
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleComplete}>Concluir Acerto</Button>
      </div>
    </div>
  );
};

export default ConsignmentSettlement;
