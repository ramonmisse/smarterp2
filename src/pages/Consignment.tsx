import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ConsignmentList, {
  ConsignmentOrder,
} from "@/components/consignment/ConsignmentList";
import ConsignmentForm from "@/components/consignment/ConsignmentForm";
import ConsignmentSettlement from "@/components/consignment/ConsignmentSettlement";
import { Product } from "@/components/products/ProductList";
import { Seller } from "@/components/sellers/SellerList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Consignment = () => {
  // Sample data for products and sellers
  const [products, setProducts] = useState<Product[]>([
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
  ]);

  const [sellers, setSellers] = useState<Seller[]>([
    {
      id: "1",
      name: "Pedro Almeida",
      email: "pedro.almeida@email.com",
      phone: "(11) 97654-3210",
      position: "gerente",
      hireDate: "2020-03-15",
      commission: "8",
      status: "active",
      notes: "Gerente de vendas com experiência em joias de luxo.",
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
      notes: "Especialista em atendimento a clientes VIP.",
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
      notes: "Especialista em relógios de luxo.",
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
      notes:
        "Consultora especializada em joias personalizadas e design exclusivo.",
      salesCount: 112,
      totalSales: 198750.0,
    },
  ]);

  const [orders, setOrders] = useState<ConsignmentOrder[]>([
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
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isSettlementOpen, setIsSettlementOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<ConsignmentOrder | null>(
    null,
  );
  const [orderToDelete, setOrderToDelete] = useState<string>("");

  const handleAddOrder = () => {
    setCurrentOrder(null);
    setIsFormOpen(true);
  };

  const handleEditOrder = (order: ConsignmentOrder) => {
    setCurrentOrder(order);
    setIsFormOpen(true);
  };

  const handleViewOrder = (order: ConsignmentOrder) => {
    setCurrentOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrderToDelete(orderId);
    setIsDeleteDialogOpen(true);
  };

  const handleSettleOrder = (order: ConsignmentOrder) => {
    setCurrentOrder(order);
    setIsSettlementOpen(true);
  };

  const confirmDelete = () => {
    setOrders(orders.filter((order) => order.id !== orderToDelete));
    setIsDeleteDialogOpen(false);
  };

  const handleSettlementComplete = (settledOrder: ConsignmentOrder) => {
    setOrders(
      orders.map((order) =>
        order.id === settledOrder.id ? settledOrder : order,
      ),
    );
    setIsSettlementOpen(false);
  };

  const handleFormSubmit = (data: any) => {
    // Find seller name
    const seller = sellers.find((s) => s.id === data.sellerId);
    const sellerName = seller ? seller.name : "Desconhecido";

    if (currentOrder) {
      // Edit existing order
      setOrders(
        orders.map((order) =>
          order.id === currentOrder.id
            ? { ...data, id: order.id, sellerName, status: order.status }
            : order,
        ),
      );
    } else {
      // Add new order
      const newOrder: ConsignmentOrder = {
        ...data,
        id: `${orders.length + 1}`,
        sellerName,
        status: "pending",
      };
      setOrders([...orders, newOrder]);
    }
    setIsFormOpen(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
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
    <MainLayout title="Pedidos Consignados">
      <div className="space-y-6">
        <ConsignmentList
          orders={orders}
          onView={handleViewOrder}
          onEdit={handleEditOrder}
          onDelete={handleDeleteOrder}
          onAdd={handleAddOrder}
          onSettle={handleSettleOrder}
        />

        {/* Add/Edit Order Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentOrder
                  ? "Editar Pedido Consignado"
                  : "Novo Pedido Consignado"}
              </DialogTitle>
            </DialogHeader>
            <ConsignmentForm
              sellers={sellers}
              products={products}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* View Order Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Pedido Consignado</DialogTitle>
            </DialogHeader>
            {currentOrder && (
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="items">Itens</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            Pedido #{currentOrder.id}
                          </CardTitle>
                          <CardDescription>
                            Criado por: {currentOrder.createdBy}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            currentOrder.status === "pending"
                              ? "bg-blue-50 text-blue-700"
                              : currentOrder.status === "settled"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                          }
                        >
                          {currentOrder.status === "pending"
                            ? "Pendente"
                            : currentOrder.status === "settled"
                              ? "Acertado"
                              : "Cancelado"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Vendedor
                          </h4>
                          <p>{currentOrder.sellerName}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Total de Itens
                          </h4>
                          <p>{currentOrder.totalItems} itens</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Data do Pedido
                          </h4>
                          <p>{formatDate(currentOrder.orderDate)}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Data do Acerto
                          </h4>
                          <p>{formatDate(currentOrder.settlementDate)}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Valor Total
                          </h4>
                          <p className="text-lg font-semibold">
                            R$ {currentOrder.totalValue.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Resumo por Categoria
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(currentOrder.categoryCounts).map(
                            ([category, count]) => (
                              <Badge
                                key={category}
                                variant="outline"
                                className="bg-gray-50"
                              >
                                {getCategoryLabel(category)}: {count} itens
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 border-t pt-4">
                      {currentOrder.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setOrders(
                                orders.map((order) =>
                                  order.id === currentOrder.id
                                    ? { ...order, status: "canceled" }
                                    : order,
                                ),
                              );
                              setIsViewDialogOpen(false);
                            }}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Cancelar Pedido
                          </Button>
                          <Button
                            onClick={() => {
                              setOrders(
                                orders.map((order) =>
                                  order.id === currentOrder.id
                                    ? { ...order, status: "settled" }
                                    : order,
                                ),
                              );
                              setIsViewDialogOpen(false);
                            }}
                          >
                            Marcar como Acertado
                          </Button>
                        </>
                      )}
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="items" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Itens do Pedido</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-4">
                          {currentOrder.items.map((item) => (
                            <div
                              key={`${item.barcode}-${item.productId}`}
                              className="flex items-center gap-4 p-3 border rounded-md hover:bg-gray-50"
                            >
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
                                  <h4 className="font-medium">{item.name}</h4>
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
                                  <span>
                                    Preço: R$ {item.unitPrice.toFixed(2)}
                                  </span>
                                  <span>•</span>
                                  <span>
                                    Subtotal: R${" "}
                                    {(item.quantity * item.unitPrice).toFixed(
                                      2,
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir este pedido? Esta ação não pode
                ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Settlement Dialog */}
        <Dialog open={isSettlementOpen} onOpenChange={setIsSettlementOpen}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Baixar Pedido Consignado</DialogTitle>
            </DialogHeader>
            {currentOrder && (
              <ConsignmentSettlement
                order={currentOrder}
                currentUser="Jane Doe"
                onCancel={() => setIsSettlementOpen(false)}
                onComplete={handleSettlementComplete}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Consignment;
