CREATE DATABASE sales;
USE sales;

CREATE TABLE sales_data (
    id INT,
    employee VARCHAR(50),
    department VARCHAR(40),
    sales_amount INT,
    sale_date DATE
);

INSERT INTO sales_data VALUES
(1, 'Alice', 'A', 1000, '2024-01-01'),
(2, 'Bob', 'B', 1500, '2024-01-02'),
(3, 'Alice', 'A', 2000, '2024-01-03'),
(4, 'Bob', 'B', 1800, '2024-01-04'),
(5, 'Alice', 'A', 1200, '2024-01-05'),
(6, 'Bob', 'B', 1600, '2024-01-06');


SELECT id, employee, department, sales_amount, sale_date,
       SUM(sales_amount) OVER (PARTITION BY employee ORDER BY sale_date, id) AS running_total_sales
FROM sales_data;


SELECT id, employee, department, sales_amount, sale_date,
       ROW_NUMBER() OVER (PARTITION BY employee ORDER BY sale_date, id) AS row_num
FROM sales_data;


SELECT id, employee, department, sales_amount, sale_date,
       RANK() OVER (PARTITION BY department ORDER BY sales_amount DESC) AS sales_rank_dept
FROM sales_data;

SELECT id, employee, department, sales_amount, sale_date,
       LEAD(sales_amount) OVER (PARTITION BY employee ORDER BY sale_date, id) AS next_sale_amount
FROM sales_data;


SELECT id, employee, department, sales_amount, sale_date,
       LAG(sales_amount) OVER (PARTITION BY employee ORDER BY sale_date, id) AS prev_sale_amount
FROM sales_data;


SELECT id, employee, department, sales_amount, sale_date,
       AVG(sales_amount) OVER (PARTITION BY employee) AS avg_sales_employee
FROM sales_data;


SELECT id, employee, department, sales_amount, sale_date,
       FIRST_VALUE(sales_amount) OVER (PARTITION BY employee ORDER BY sale_date, id) AS first_sale_amount,
       LAST_VALUE(sales_amount) OVER (PARTITION BY employee ORDER BY sale_date, id 
                                      ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_sale_amount
FROM sales_data;


SELECT id, employee, department, sales_amount, sale_date,
       DENSE_RANK() OVER (PARTITION BY department ORDER BY sales_amount DESC) AS sales_dense_rank_dept
FROM sales_data;


SELECT id, employee, department, sales_amount, sale_date,
       AVG(sales_amount) OVER (PARTITION BY employee ORDER BY sale_date, id) AS cumulative_avg_sales
FROM sales_data;


WITH RankedSales AS (
    SELECT id, employee, department, sales_amount, sale_date,
           RANK() OVER (PARTITION BY employee ORDER BY sales_amount DESC) AS rnk
    FROM sales_data
)
SELECT id, employee, department, sales_amount, sale_date
FROM RankedSales
WHERE rnk = 1;


SELECT id, employee, department, sales_amount, sale_date,
       sales_amount - LAG(sales_amount) OVER (PARTITION BY employee ORDER BY sale_date, id) AS sales_diff_from_prev
FROM sales_data;


SELECT id, employee, department, sales_amount, sale_date,
       COUNT(sales_amount) OVER (PARTITION BY employee ORDER BY sale_date, id) AS cumulative_sales_count
FROM sales_data;


WITH AvgSales AS (
    SELECT id, employee, department, sales_amount, sale_date,
           AVG(sales_amount) OVER (PARTITION BY employee) AS avg_sales
    FROM sales_data
)
SELECT id, employee, department, sales_amount, sale_date,
       CASE WHEN sales_amount > avg_sales THEN 'Yes' ELSE 'No' END AS is_above_average
FROM AvgSales;


WITH RankedSales AS (
    SELECT id, employee, department, sales_amount, sale_date,
           DENSE_RANK() OVER (PARTITION BY employee ORDER BY sales_amount DESC) AS rnk
    FROM sales_data
)
SELECT id, employee, department, sales_amount, sale_date
FROM RankedSales
WHERE rnk = 2;

