import React from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  barcode: z
    .string()
    .length(8, { message: "Código de barras deve ter 8 dígitos" })
    .regex(/^\d+$/, { message: "Código de barras deve conter apenas números" })
    .refine((val) => val.trim() !== "", {
      message: "Código de barras é obrigatório",
    }),
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  description: z.string().optional(),
  category: z.string().min(1, { message: "Categoria é obrigatória" }),
  subcategory: z.string().min(1, { message: "Subcategoria é obrigatória" }),
  rawCost: z.string().min(1, { message: "Custo da peça bruta é obrigatório" }),
  platingCost: z.string().min(1, { message: "Custo do banho é obrigatório" }),
  stockQuantity: z
    .string()
    .min(1, { message: "Quantidade em estoque é obrigatória" }),
  minStockQuantity: z
    .string()
    .min(1, { message: "Quantidade mínima é obrigatória" }),
  stockLocation: z
    .string()
    .min(1, { message: "Localização no estoque é obrigatória" }),
});

type FormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData?: FormValues;
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

const ProductForm = ({
  initialData = {
    barcode: "",
    name: "",
    description: "",
    category: "",
    subcategory: "",
    rawCost: "",
    platingCost: "",
    stockQuantity: "",
    minStockQuantity: "",
    stockLocation: "",
  },
  onSubmit,
  onCancel,
}: ProductFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  const categories = [
    { value: "aneis", label: "Anéis" },
    { value: "brincos", label: "Brincos" },
    { value: "colares", label: "Colares" },
    { value: "pulseiras", label: "Pulseiras" },
    { value: "pingentes", label: "Pingentes" },
    { value: "relogios", label: "Relógios" },
  ];

  const subcategories = {
    aneis: [
      { value: "alianca", label: "Aliança" },
      { value: "solitario", label: "Solitário" },
      { value: "aparador", label: "Aparador" },
      { value: "formatura", label: "Formatura" },
    ],
    brincos: [
      { value: "argola", label: "Argola" },
      { value: "tarraxa", label: "Tarraxa" },
      { value: "ear_cuff", label: "Ear Cuff" },
      { value: "piercing", label: "Piercing" },
    ],
    colares: [
      { value: "gargantilha", label: "Gargantilha" },
      { value: "corrente", label: "Corrente" },
      { value: "choker", label: "Choker" },
    ],
    pulseiras: [
      { value: "bracelete", label: "Bracelete" },
      { value: "berloques", label: "Berloques" },
      { value: "tennis", label: "Tennis" },
    ],
    pingentes: [
      { value: "religioso", label: "Religioso" },
      { value: "letra", label: "Letra" },
      { value: "simbolo", label: "Símbolo" },
    ],
    relogios: [
      { value: "analogico", label: "Analógico" },
      { value: "digital", label: "Digital" },
      { value: "smartwatch", label: "Smartwatch" },
    ],
  };

  const selectedCategory = form.watch("category");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="barcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de Barras (8 dígitos)</FormLabel>
                <FormControl>
                  <Input placeholder="12345678" maxLength={8} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
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
            name="subcategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!selectedCategory}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma subcategoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedCategory &&
                      subcategories[
                        selectedCategory as keyof typeof subcategories
                      ]?.map((subcategory) => (
                        <SelectItem
                          key={subcategory.value}
                          value={subcategory.value}
                        >
                          {subcategory.label}
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
            name="rawCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custo da Peça Bruta (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="platingCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custo do Banho (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stockQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade em Estoque</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minStockQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade Mínima</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stockLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localização no Estoque</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Prateleira A, Gaveta 3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Breve descrição do produto"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Salvar Produto</Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
