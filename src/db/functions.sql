-- Database functions for jewelry management system

-- Function to decrease product stock when a sale is made
CREATE OR REPLACE FUNCTION decrease_product_stock(product_id_param UUID, quantity_param INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE products
  SET stock_quantity = stock_quantity - quantity_param
  WHERE id = product_id_param;
  
  -- Ensure stock doesn't go below zero
  UPDATE products
  SET stock_quantity = 0
  WHERE id = product_id_param AND stock_quantity < 0;
END;
$$ LANGUAGE plpgsql;

-- Function to increase product stock when a purchase order is received
CREATE OR REPLACE FUNCTION increase_product_stock(product_id_param UUID, quantity_param INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE products
  SET stock_quantity = stock_quantity + quantity_param
  WHERE id = product_id_param;
END;
$$ LANGUAGE plpgsql;

-- Function to update customer purchase information
CREATE OR REPLACE FUNCTION update_customer_purchase(customer_id_param UUID, amount_param DECIMAL, date_param DATE)
RETURNS VOID AS $$
BEGIN
  UPDATE customers
  SET 
    total_spent = total_spent + amount_param,
    last_purchase = date_param
  WHERE id = customer_id_param;
  
  -- Update loyalty level based on total spent
  UPDATE customers
  SET loyalty_level = 
    CASE 
      WHEN total_spent >= 10000 THEN 'platinum'
      WHEN total_spent >= 5000 THEN 'gold'
      WHEN total_spent >= 1000 THEN 'silver'
      ELSE 'regular'
    END
  WHERE id = customer_id_param;
END;
$$ LANGUAGE plpgsql;

-- Function to update seller sales statistics
CREATE OR REPLACE FUNCTION update_seller_sales(seller_id_param UUID, amount_param DECIMAL)
RETURNS VOID AS $$
BEGIN
  UPDATE sellers
  SET 
    sales_count = sales_count + 1,
    total_sales = total_sales + amount_param
  WHERE id = seller_id_param;
END;
$$ LANGUAGE plpgsql;

-- Function to get low stock products
CREATE OR REPLACE FUNCTION get_low_stock_products()
RETURNS TABLE (
  id UUID,
  barcode VARCHAR,
  name VARCHAR,
  category VARCHAR,
  subcategory VARCHAR,
  current_stock INTEGER,
  min_stock_level INTEGER,
  stock_location VARCHAR,
  image_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.barcode,
    p.name,
    p.category,
    p.subcategory,
    p.stock_quantity AS current_stock,
    p.min_stock_quantity AS min_stock_level,
    p.stock_location,
    p.image_url
  FROM products p
  WHERE p.stock_quantity <= p.min_stock_quantity
  ORDER BY (p.stock_quantity::float / NULLIF(p.min_stock_quantity, 0)) ASC;
END;
$$ LANGUAGE plpgsql;

-- Function to get sales statistics by period
CREATE OR REPLACE FUNCTION get_sales_by_period(start_date DATE, end_date DATE)
RETURNS TABLE (
  date DATE,
  total_sales DECIMAL,
  items_sold INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.sale_date AS date,
    SUM(s.total_amount) AS total_sales,
    SUM((SELECT SUM(quantity) FROM sale_items WHERE sale_id = s.id)) AS items_sold
  FROM sales s
  WHERE s.sale_date BETWEEN start_date AND end_date
  GROUP BY s.sale_date
  ORDER BY s.sale_date;
END;
$$ LANGUAGE plpgsql;

-- Function to get top selling products
CREATE OR REPLACE FUNCTION get_top_selling_products(limit_param INTEGER, period_start DATE, period_end DATE)
RETURNS TABLE (
  id UUID,
  barcode VARCHAR,
  name VARCHAR,
  category VARCHAR,
  quantity_sold INTEGER,
  total_revenue DECIMAL,
  image_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.barcode,
    p.name,
    p.category,
    SUM(si.quantity)::INTEGER AS quantity_sold,
    SUM(si.quantity * si.unit_price)::DECIMAL AS total_revenue,
    p.image_url
  FROM products p
  JOIN sale_items si ON p.id = si.product_id
  JOIN sales s ON si.sale_id = s.id
  WHERE s.sale_date BETWEEN period_start AND period_end
  GROUP BY p.id, p.barcode, p.name, p.category, p.image_url
  ORDER BY quantity_sold DESC
  LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- Function to get seller performance
CREATE OR REPLACE FUNCTION get_seller_performance(period_start DATE, period_end DATE)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  sales_count INTEGER,
  total_sales DECIMAL,
  commission_rate DECIMAL,
  commission_amount DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.name,
    COUNT(sa.id)::INTEGER AS sales_count,
    SUM(sa.total_amount)::DECIMAL AS total_sales,
    s.commission AS commission_rate,
    (SUM(sa.total_amount) * s.commission / 100)::DECIMAL AS commission_amount
  FROM sellers s
  LEFT JOIN sales sa ON s.id = sa.seller_id AND sa.sale_date BETWEEN period_start AND period_end
  GROUP BY s.id, s.name, s.commission
  ORDER BY total_sales DESC NULLS LAST;
END;
$$ LANGUAGE plpgsql;
