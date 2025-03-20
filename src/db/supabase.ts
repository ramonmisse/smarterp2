import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for database operations

// Products
export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name");

  if (error) throw error;

  // Mapear os dados do banco para o formato esperado pela interface Product
  return data?.map((item) => ({
    id: item.id,
    barcode: item.barcode,
    name: item.name,
    description: item.description,
    category: item.category,
    subcategory: item.subcategory,
    rawCost: item.raw_cost?.toString() || "0",
    platingCost: item.plating_cost?.toString() || "0",
    stockQuantity: item.stock_quantity?.toString() || "0",
    minStockQuantity: item.min_stock_quantity?.toString() || "0",
    stockLocation: item.stock_location,
    image: item.image_url,
    // Manter os campos originais também
    raw_cost: item.raw_cost,
    plating_cost: item.plating_cost,
    stock_quantity: item.stock_quantity,
    min_stock_quantity: item.min_stock_quantity,
    stock_location: item.stock_location,
    image_url: item.image_url,
  }));
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const getProductByBarcode = async (barcode: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("barcode", barcode.trim())
    .single();

  if (error && error.code !== "PGRST116") throw error;

  if (!data) return null;

  // Mapear para o formato esperado pela interface Product
  return {
    id: data.id,
    barcode: data.barcode,
    name: data.name,
    description: data.description,
    category: data.category,
    subcategory: data.subcategory,
    rawCost: data.raw_cost?.toString() || "0",
    platingCost: data.plating_cost?.toString() || "0",
    stockQuantity: data.stock_quantity?.toString() || "0",
    minStockQuantity: data.min_stock_quantity?.toString() || "0",
    stockLocation: data.stock_location,
    image: data.image_url,
    // Manter os campos originais também
    raw_cost: data.raw_cost,
    plating_cost: data.plating_cost,
    stock_quantity: data.stock_quantity,
    min_stock_quantity: data.min_stock_quantity,
    stock_location: data.stock_location,
    image_url: data.image_url,
  };
};

export const createProduct = async (
  product: Omit<
    Database["public"]["Tables"]["products"]["Insert"],
    "id" | "created_at" | "updated_at"
  >,
) => {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProduct = async (
  id: string,
  product: Partial<Database["public"]["Tables"]["products"]["Update"]>,
) => {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) throw error;
};

// Customers
export const getCustomers = async () => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
};

export const getCustomerById = async (id: string) => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createCustomer = async (
  customer: Omit<
    Database["public"]["Tables"]["customers"]["Insert"],
    "id" | "created_at" | "updated_at"
  >,
) => {
  const { data, error } = await supabase
    .from("customers")
    .insert(customer)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateCustomer = async (
  id: string,
  customer: Partial<Database["public"]["Tables"]["customers"]["Update"]>,
) => {
  const { data, error } = await supabase
    .from("customers")
    .update(customer)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteCustomer = async (id: string) => {
  const { error } = await supabase.from("customers").delete().eq("id", id);

  if (error) throw error;
};

// Sellers
export const getSellers = async () => {
  const { data, error } = await supabase
    .from("sellers")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
};

export const getSellerById = async (id: string) => {
  const { data, error } = await supabase
    .from("sellers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createSeller = async (
  seller: Omit<
    Database["public"]["Tables"]["sellers"]["Insert"],
    "id" | "created_at" | "updated_at"
  >,
) => {
  const { data, error } = await supabase
    .from("sellers")
    .insert(seller)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateSeller = async (
  id: string,
  seller: Partial<Database["public"]["Tables"]["sellers"]["Update"]>,
) => {
  const { data, error } = await supabase
    .from("sellers")
    .update(seller)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteSeller = async (id: string) => {
  const { error } = await supabase.from("sellers").delete().eq("id", id);

  if (error) throw error;
};

// Consignment Orders
export const getConsignmentOrders = async () => {
  const { data, error } = await supabase
    .from("consignment_orders")
    .select(
      `
      *,
      seller:sellers(name)
    `,
    )
    .order("order_date", { ascending: false });

  if (error) throw error;
  return data;
};

export const getConsignmentOrderById = async (id: string) => {
  const { data, error } = await supabase
    .from("consignment_orders")
    .select(
      `
      *,
      seller:sellers(name),
      items:consignment_items(*, product:products(*))
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createConsignmentOrder = async (
  order: Omit<
    Database["public"]["Tables"]["consignment_orders"]["Insert"],
    "id" | "created_at" | "updated_at"
  >,
  items: Omit<
    Database["public"]["Tables"]["consignment_items"]["Insert"],
    "id" | "created_at" | "updated_at" | "consignment_order_id"
  >[],
) => {
  // Start a transaction
  const { data: orderData, error: orderError } = await supabase
    .from("consignment_orders")
    .insert(order)
    .select()
    .single();

  if (orderError) throw orderError;

  // Add items with the new order ID
  const itemsWithOrderId = items.map((item) => ({
    ...item,
    consignment_order_id: orderData.id,
  }));

  const { error: itemsError } = await supabase
    .from("consignment_items")
    .insert(itemsWithOrderId);

  if (itemsError) throw itemsError;

  return orderData;
};

export const updateConsignmentOrderStatus = async (
  id: string,
  status: string,
) => {
  const { data, error } = await supabase
    .from("consignment_orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteConsignmentOrder = async (id: string) => {
  // The items will be deleted automatically due to the ON DELETE CASCADE constraint
  const { error } = await supabase
    .from("consignment_orders")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

// Sales
export const getSales = async () => {
  const { data, error } = await supabase
    .from("sales")
    .select(
      `
      *,
      customer:customers(name),
      seller:sellers(name)
    `,
    )
    .order("sale_date", { ascending: false });

  if (error) throw error;
  return data;
};

export const getSaleById = async (id: string) => {
  const { data, error } = await supabase
    .from("sales")
    .select(
      `
      *,
      customer:customers(*),
      seller:sellers(name),
      items:sale_items(*, product:products(*))
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createSale = async (
  sale: Omit<
    Database["public"]["Tables"]["sales"]["Insert"],
    "id" | "created_at" | "updated_at"
  >,
  items: Omit<
    Database["public"]["Tables"]["sale_items"]["Insert"],
    "id" | "created_at" | "updated_at" | "sale_id"
  >[],
) => {
  // Start a transaction
  const { data: saleData, error: saleError } = await supabase
    .from("sales")
    .insert(sale)
    .select()
    .single();

  if (saleError) throw saleError;

  // Add items with the new sale ID
  const itemsWithSaleId = items.map((item) => ({
    ...item,
    sale_id: saleData.id,
  }));

  const { error: itemsError } = await supabase
    .from("sale_items")
    .insert(itemsWithSaleId);

  if (itemsError) throw itemsError;

  // Update product stock quantities
  for (const item of items) {
    const { error: stockError } = await supabase.rpc("decrease_product_stock", {
      product_id_param: item.product_id,
      quantity_param: item.quantity,
    });

    if (stockError) throw stockError;
  }

  // Update customer total spent if customer_id is provided
  if (sale.customer_id) {
    const { error: customerError } = await supabase.rpc(
      "update_customer_purchase",
      {
        customer_id_param: sale.customer_id,
        amount_param: sale.total_amount,
        date_param: sale.sale_date,
      },
    );

    if (customerError) throw customerError;
  }

  // Update seller statistics
  const { error: sellerError } = await supabase.rpc("update_seller_sales", {
    seller_id_param: sale.seller_id,
    amount_param: sale.total_amount,
  });

  if (sellerError) throw sellerError;

  return saleData;
};

export const deleteSale = async (id: string) => {
  // The items will be deleted automatically due to the ON DELETE CASCADE constraint
  const { error } = await supabase.from("sales").delete().eq("id", id);

  if (error) throw error;
};

// Appointments
export const getAppointments = async () => {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      `
      *,
      customer:customers(name, phone)
    `,
    )
    .order("date")
    .order("time");

  if (error) throw error;
  return data;
};

export const getAppointmentById = async (id: string) => {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      `
      *,
      customer:customers(*)
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createAppointment = async (
  appointment: Omit<
    Database["public"]["Tables"]["appointments"]["Insert"],
    "id" | "created_at" | "updated_at"
  >,
) => {
  const { data, error } = await supabase
    .from("appointments")
    .insert(appointment)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateAppointment = async (
  id: string,
  appointment: Partial<Database["public"]["Tables"]["appointments"]["Update"]>,
) => {
  const { data, error } = await supabase
    .from("appointments")
    .update(appointment)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteAppointment = async (id: string) => {
  const { error } = await supabase.from("appointments").delete().eq("id", id);

  if (error) throw error;
};

// Suppliers
export const getSuppliers = async () => {
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
};

export const getSupplierById = async (id: string) => {
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createSupplier = async (
  supplier: Omit<
    Database["public"]["Tables"]["suppliers"]["Insert"],
    "id" | "created_at" | "updated_at"
  >,
) => {
  const { data, error } = await supabase
    .from("suppliers")
    .insert(supplier)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateSupplier = async (
  id: string,
  supplier: Partial<Database["public"]["Tables"]["suppliers"]["Update"]>,
) => {
  const { data, error } = await supabase
    .from("suppliers")
    .update(supplier)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteSupplier = async (id: string) => {
  const { error } = await supabase.from("suppliers").delete().eq("id", id);

  if (error) throw error;
};

// Purchase Orders
export const getPurchaseOrders = async () => {
  const { data, error } = await supabase
    .from("purchase_orders")
    .select(
      `
      *,
      supplier:suppliers(name)
    `,
    )
    .order("order_date", { ascending: false });

  if (error) throw error;
  return data;
};

export const getPurchaseOrderById = async (id: string) => {
  const { data, error } = await supabase
    .from("purchase_orders")
    .select(
      `
      *,
      supplier:suppliers(*),
      items:purchase_order_items(*, product:products(*))
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createPurchaseOrder = async (
  order: Omit<
    Database["public"]["Tables"]["purchase_orders"]["Insert"],
    "id" | "created_at" | "updated_at"
  >,
  items: Omit<
    Database["public"]["Tables"]["purchase_order_items"]["Insert"],
    "id" | "created_at" | "updated_at" | "purchase_order_id"
  >[],
) => {
  // Start a transaction
  const { data: orderData, error: orderError } = await supabase
    .from("purchase_orders")
    .insert(order)
    .select()
    .single();

  if (orderError) throw orderError;

  // Add items with the new order ID
  const itemsWithOrderId = items.map((item) => ({
    ...item,
    purchase_order_id: orderData.id,
  }));

  const { error: itemsError } = await supabase
    .from("purchase_order_items")
    .insert(itemsWithOrderId);

  if (itemsError) throw itemsError;

  return orderData;
};

export const updatePurchaseOrderStatus = async (id: string, status: string) => {
  const { data, error } = await supabase
    .from("purchase_orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  // If status is 'received', update product stock quantities
  if (status === "received") {
    const { data: items } = await supabase
      .from("purchase_order_items")
      .select("product_id, quantity")
      .eq("purchase_order_id", id);

    if (items) {
      for (const item of items) {
        if (item.product_id) {
          const { error: stockError } = await supabase.rpc(
            "increase_product_stock",
            {
              product_id_param: item.product_id,
              quantity_param: item.quantity,
            },
          );

          if (stockError) throw stockError;
        }
      }
    }
  }

  return data;
};

export const deletePurchaseOrder = async (id: string) => {
  // The items will be deleted automatically due to the ON DELETE CASCADE constraint
  const { error } = await supabase
    .from("purchase_orders")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
