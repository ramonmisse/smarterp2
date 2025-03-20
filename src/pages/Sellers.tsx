import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import SellerList, { Seller } from "@/components/sellers/SellerList";
import SellerForm from "@/components/sellers/SellerForm";
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
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sellers = () => {
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

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentSeller, setCurrentSeller] = useState<Seller | null>(null);
  const [sellerToDelete, setSellerToDelete] = useState<string>("");

  const handleAddSeller = () => {
    setCurrentSeller(null);
    setIsFormOpen(true);
  };

  const handleEditSeller = (seller: Seller) => {
    setCurrentSeller(seller);
    setIsFormOpen(true);
  };

  const handleViewSeller = (seller: Seller) => {
    setCurrentSeller(seller);
    setIsViewDialogOpen(true);
  };

  const handleDeleteSeller = (sellerId: string) => {
    setSellerToDelete(sellerId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setSellers(sellers.filter((seller) => seller.id !== sellerToDelete));
    setIsDeleteDialogOpen(false);
  };

  const handleFormSubmit = (data: any) => {
    if (currentSeller) {
      // Edit existing seller
      setSellers(
        sellers.map((seller) =>
          seller.id === currentSeller.id ? { ...seller, ...data } : seller,
        ),
      );
    } else {
      // Add new seller
      const newSeller: Seller = {
        id: `${sellers.length + 1}`,
        ...data,
        salesCount: 0,
        totalSales: 0,
      };
      setSellers([...sellers, newSeller]);
    }
    setIsFormOpen(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
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

  return (
    <MainLayout title="Gerenciamento de Vendedores">
      <div className="space-y-6">
        <SellerList
          sellers={sellers}
          onEdit={handleEditSeller}
          onDelete={handleDeleteSeller}
          onView={handleViewSeller}
          onAdd={handleAddSeller}
        />

        {/* Add/Edit Seller Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentSeller ? "Editar Vendedor" : "Adicionar Novo Vendedor"}
              </DialogTitle>
            </DialogHeader>
            <SellerForm
              initialData={currentSeller || undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* View Seller Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Vendedor</DialogTitle>
            </DialogHeader>
            {currentSeller && (
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="performance">Desempenho</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        {currentSeller.name}
                      </CardTitle>
                      <CardDescription>
                        {getPositionLabel(currentSeller.position)} | Contratado
                        em {formatDate(currentSeller.hireDate)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Email
                          </h4>
                          <p>{currentSeller.email}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Telefone
                          </h4>
                          <p>{currentSeller.phone}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Comissão
                          </h4>
                          <p>{currentSeller.commission}%</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Status
                          </h4>
                          <p>{getStatusLabel(currentSeller.status)}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Total de Vendas
                          </h4>
                          <p>{currentSeller.salesCount} vendas</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Valor Total
                          </h4>
                          <p>
                            R${" "}
                            {currentSeller.totalSales?.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Observações
                        </h4>
                        <p className="text-sm text-gray-600">
                          {currentSeller.notes || "Sem observações."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="performance" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Desempenho de Vendas
                      </CardTitle>
                      <CardDescription>
                        Histórico e métricas de desempenho
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-4">
                          <p className="text-center text-gray-500 py-8">
                            Métricas de desempenho em desenvolvimento.
                          </p>
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
                Tem certeza que deseja excluir este vendedor? Esta ação não pode
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
      </div>
    </MainLayout>
  );
};

export default Sellers;
