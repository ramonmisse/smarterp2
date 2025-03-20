// Database schema types for the jewelry management system

// Products table
export interface Product {
  id: string;
  barcode: string;
  name: string;
  description: string | null;
  category: string;
  subcategory: string;
  raw_cost: number;
  plating_cost: number;
  stock_quantity: number;
  min_stock_quantity: number;
  stock_location: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

// Customers table
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string | null;
  loyalty_level: string;
  notes: string | null;
  last_purchase: string | null;
  total_spent: number;
  created_at: string;
  updated_at: string;
}

// Sellers table
export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  hire_date: string;
  commission: number;
  status: string;
  notes: string | null;
  sales_count: number;
  total_sales: number;
  created_at: string;
  updated_at: string;
}

// Consignment orders table
export interface ConsignmentOrder {
  id: string;
  created_by: string;
  seller_id: string;
  order_date: string;
  settlement_date: string;
  total_value: number;
  total_items: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// Consignment items table (related to consignment orders)
export interface ConsignmentItem {
  id: string;
  consignment_order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  created_at: string;
  updated_at: string;
}

// Sales table
export interface Sale {
  id: string;
  customer_id: string | null;
  seller_id: string;
  sale_date: string;
  total_amount: number;
  discount_amount: number;
  payment_method: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Sale items table (related to sales)
export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  discount: number;
  created_at: string;
  updated_at: string;
}

// Appointments table
export interface Appointment {
  id: string;
  customer_id: string;
  appointment_type: string;
  date: string;
  time: string;
  notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

// Suppliers table
export interface Supplier {
  id: string;
  name: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Purchase orders table (for supplier orders)
export interface PurchaseOrder {
  id: string;
  supplier_id: string;
  order_date: string;
  expected_delivery_date: string | null;
  total_amount: number;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Purchase order items table
export interface PurchaseOrderItem {
  id: string;
  purchase_order_id: string;
  product_id: string | null;
  description: string;
  quantity: number;
  unit_price: number;
  created_at: string;
  updated_at: string;
}
