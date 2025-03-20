import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductList, { Product } from "@/components/products/ProductList";
import ProductForm from "@/components/products/ProductForm";
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

const Products = () => {
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

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string>("");

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsFormOpen(true);
  };

  const handleViewProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsViewDialogOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter((product) => product.id !== productToDelete));
    setIsDeleteDialogOpen(false);
  };

  const handleFormSubmit = (data: any) => {
    if (currentProduct) {
      // Edit existing product
      setProducts(
        products.map((product) =>
          product.id === currentProduct.id ? { ...product, ...data } : product,
        ),
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: `${products.length + 1}`,
        ...data,
        image:
          "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&q=80",
      };
      setProducts([...products, newProduct]);
    }
    setIsFormOpen(false);
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

  const getSubcategoryLabel = (category: string, subcategory: string) => {
    const subcategoryMap: Record<string, Record<string, string>> = {
      aneis: {
        alianca: "Aliança",
        solitario: "Solitário",
        aparador: "Aparador",
        formatura: "Formatura",
      },
      brincos: {
        argola: "Argola",
        tarraxa: "Tarraxa",
        ear_cuff: "Ear Cuff",
        piercing: "Piercing",
      },
      colares: {
        gargantilha: "Gargantilha",
        corrente: "Corrente",
        choker: "Choker",
      },
      pulseiras: {
        bracelete: "Bracelete",
        berloques: "Berloques",
        tennis: "Tennis",
      },
      pingentes: {
        religioso: "Religioso",
        letra: "Letra",
        simbolo: "Símbolo",
      },
      relogios: {
        analogico: "Analógico",
        digital: "Digital",
        smartwatch: "Smartwatch",
      },
    };
    return subcategoryMap[category]?.[subcategory] || subcategory;
  };

  return (
    <MainLayout title="Gerenciamento de Produtos">
      <div className="space-y-6">
        <ProductList
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onView={handleViewProduct}
          onAdd={handleAddProduct}
        />

        {/* Add/Edit Product Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentProduct ? "Editar Produto" : "Adicionar Novo Produto"}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              initialData={currentProduct || undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* View Product Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Produto</DialogTitle>
            </DialogHeader>
            {currentProduct && (
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="stock">Estoque</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                          <AspectRatio ratio={1 / 1}>
                            <img
                              src={
                                currentProduct.image ||
                                "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&q=80"
                              }
                              alt={currentProduct.name}
                              className="object-cover w-full h-full"
                            />
                          </AspectRatio>
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {currentProduct.name}
                          </CardTitle>
                          <CardDescription>
                            Código: {currentProduct.barcode}
                          </CardDescription>
                          <div className="flex gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700"
                            >
                              {getCategoryLabel(currentProduct.category)}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-gray-50 text-gray-700"
                            >
                              {getSubcategoryLabel(
                                currentProduct.category,
                                currentProduct.subcategory,
                              )}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Descrição
                        </h4>
                        <p className="text-sm text-gray-600">
                          {currentProduct.description || "Sem descrição."}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Custo da Peça Bruta
                          </h4>
                          <p>
                            R$ {parseFloat(currentProduct.rawCost).toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Custo do Banho
                          </h4>
                          <p>
                            R${" "}
                            {parseFloat(currentProduct.platingCost).toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Custo Total
                          </h4>
                          <p className="font-medium">
                            R${" "}
                            {(
                              parseFloat(currentProduct.rawCost) +
                              parseFloat(currentProduct.platingCost)
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="stock" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Informações de Estoque
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Quantidade em Estoque
                            </h4>
                            <p className="text-xl font-semibold">
                              {currentProduct.stockQuantity} unidades
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Quantidade Mínima
                            </h4>
                            <p>{currentProduct.minStockQuantity} unidades</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Status do Estoque
                            </h4>
                            <div className="mt-1">
                              {(parseInt(currentProduct.stockQuantity) || 0) <=
                              0 ? (
                                <Badge
                                  variant="outline"
                                  className="bg-red-100 text-red-800"
                                >
                                  Sem estoque
                                </Badge>
                              ) : (parseInt(currentProduct.stockQuantity) ||
                                  0) <=
                                (parseInt(currentProduct.minStockQuantity) ||
                                  0) ? (
                                <Badge
                                  variant="outline"
                                  className="bg-amber-100 text-amber-800"
                                >
                                  Estoque baixo
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="bg-green-100 text-green-800"
                                >
                                  Estoque adequado
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Localização no Estoque
                            </h4>
                            <p>{currentProduct.stockLocation}</p>
                          </div>
                        </div>
                      </div>
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
                Tem certeza que deseja excluir este produto? Esta ação não pode
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

export default Products;
