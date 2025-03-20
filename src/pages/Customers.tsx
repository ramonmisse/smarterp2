import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CustomerList, { Customer } from "@/components/customers/CustomerList";
import CustomerForm from "@/components/customers/CustomerForm";
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

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Maria Silva",
      email: "maria.silva@email.com",
      phone: "(11) 98765-4321",
      address: "Rua das Flores, 123 - São Paulo, SP",
      birthdate: "1985-06-15",
      loyaltyLevel: "gold",
      notes: "Cliente fiel desde 2018. Prefere joias em ouro amarelo.",
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
      notes: "Compra principalmente relógios e acessórios masculinos.",
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
      notes: "Cliente VIP. Prefere diamantes e pedras preciosas.",
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
      notes: "Primeira compra em 2023. Interessado em alianças de casamento.",
      lastPurchase: "2023-04-28",
      totalSpent: 780.25,
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<string>("");

  const handleAddCustomer = () => {
    setCurrentCustomer(null);
    setIsFormOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsFormOpen(true);
  };

  const handleViewCustomer = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsViewDialogOpen(true);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomerToDelete(customerId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setCustomers(
      customers.filter((customer) => customer.id !== customerToDelete),
    );
    setIsDeleteDialogOpen(false);
  };

  const handleFormSubmit = (data: any) => {
    if (currentCustomer) {
      // Edit existing customer
      setCustomers(
        customers.map((customer) =>
          customer.id === currentCustomer.id
            ? { ...customer, ...data }
            : customer,
        ),
      );
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: `${customers.length + 1}`,
        ...data,
        lastPurchase: "",
        totalSpent: 0,
      };
      setCustomers([...customers, newCustomer]);
    }
    setIsFormOpen(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <MainLayout title="Gerenciamento de Clientes">
      <div className="space-y-6">
        <CustomerList
          customers={customers}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
          onView={handleViewCustomer}
          onAdd={handleAddCustomer}
        />

        {/* Add/Edit Customer Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentCustomer ? "Editar Cliente" : "Adicionar Novo Cliente"}
              </DialogTitle>
            </DialogHeader>
            <CustomerForm
              initialData={currentCustomer || undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* View Customer Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Cliente</DialogTitle>
            </DialogHeader>
            {currentCustomer && (
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="purchases">
                    Histórico de Compras
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        {currentCustomer.name}
                      </CardTitle>
                      <CardDescription>
                        Cliente desde{" "}
                        {formatDate(
                          currentCustomer.lastPurchase || "2023-01-01",
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Email
                          </h4>
                          <p>{currentCustomer.email}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Telefone
                          </h4>
                          <p>{currentCustomer.phone}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Endereço
                          </h4>
                          <p>{currentCustomer.address}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Data de Nascimento
                          </h4>
                          <p>{formatDate(currentCustomer.birthdate || "")}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Nível de Fidelidade
                          </h4>
                          <p className="capitalize">
                            {currentCustomer.loyaltyLevel}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Total Gasto
                          </h4>
                          <p>
                            R${" "}
                            {currentCustomer.totalSpent?.toLocaleString(
                              "pt-BR",
                              { minimumFractionDigits: 2 },
                            )}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Observações
                        </h4>
                        <p className="text-sm text-gray-600">
                          {currentCustomer.notes || "Sem observações."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="purchases" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Histórico de Compras
                      </CardTitle>
                      <CardDescription>
                        Últimas compras realizadas pelo cliente
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-4">
                          <p className="text-center text-gray-500 py-8">
                            Histórico de compras em desenvolvimento.
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
                Tem certeza que deseja excluir este cliente? Esta ação não pode
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

export default Customers;
