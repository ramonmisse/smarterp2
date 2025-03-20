# Database Schema for Jewelry Management System

## Overview

This directory contains the database schema and related files for the Jewelry Management System. The system uses Supabase as the backend database service, which is built on PostgreSQL.

## Files

- `schema.sql`: Contains the SQL schema for creating all tables, indexes, and triggers.
- `functions.sql`: Contains PostgreSQL functions for various business logic operations.
- `supabase.ts`: Contains TypeScript functions for interacting with the Supabase database.

## Database Tables

1. **products**: Stores information about jewelry items in inventory.
2. **customers**: Stores customer information and purchase history.
3. **sellers**: Stores information about sales staff.
4. **consignment_orders**: Tracks consignment orders given to sellers.
5. **consignment_items**: Tracks individual items in consignment orders.
6. **sales**: Records sales transactions.
7. **sale_items**: Records individual items in sales transactions.
8. **appointments**: Tracks customer appointments for custom designs, repairs, etc.
9. **suppliers**: Stores information about suppliers.
10. **purchase_orders**: Tracks orders placed with suppliers.
11. **purchase_order_items**: Tracks individual items in purchase orders.

## Database Functions

- `decrease_product_stock`: Decreases product stock when a sale is made.
- `increase_product_stock`: Increases product stock when a purchase order is received.
- `update_customer_purchase`: Updates customer purchase information and loyalty level.
- `update_seller_sales`: Updates seller sales statistics.
- `get_low_stock_products`: Returns products with stock levels below minimum threshold.
- `get_sales_by_period`: Returns sales statistics for a specified period.
- `get_top_selling_products`: Returns top selling products for a specified period.
- `get_seller_performance`: Returns seller performance metrics for a specified period.

## Setup Instructions

1. Create a new Supabase project.
2. Execute the SQL in `schema.sql` to create the database tables.
3. Execute the SQL in `functions.sql` to create the database functions.
4. Set up the environment variables in your project:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Generating TypeScript Types

To generate TypeScript types for your Supabase database, run:

```bash
npm run types:supabase
```

This will create or update the `src/types/supabase.ts` file with the latest database types.

## Database Relationships

- A **customer** can have multiple **sales** and **appointments**.
- A **seller** can have multiple **sales** and **consignment_orders**.
- A **product** can be included in multiple **sale_items**, **consignment_items**, and **purchase_order_items**.
- A **supplier** can have multiple **purchase_orders**.
- A **sale** can have multiple **sale_items**.
- A **consignment_order** can have multiple **consignment_items**.
- A **purchase_order** can have multiple **purchase_order_items**.

## Data Migration

If you need to migrate data from an existing system, create a migration script that follows these steps:

1. Import products
2. Import customers
3. Import sellers
4. Import suppliers
5. Import sales and sale items
6. Import consignment orders and items
7. Import purchase orders and items
8. Import appointments

Ensure that all foreign key relationships are maintained during the migration.
