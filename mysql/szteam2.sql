CREATE TABLE carbon_footprint (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(255) NOT NULL,
  label VARCHAR(255) NOT NULL,
  unit VARCHAR(10) NOT NULL,
  cost_formula VARCHAR(255) NOT NULL,
  parent_category_id INT,
  FOREIGN KEY (parent_category_id) REFERENCES carbon_footprint(id) ON DELETE SET NULL
);

INSERT INTO carbon_footprint (category_name, label, unit, cost_formula, parent_category_id)
VALUES
  ('electricity', '전기', 'kWh', '0.4781', NULL),
  ('gas', '가스', '㎥', '2.176', NULL),
  ('water', '수도', '㎥', '0.237', NULL),
  ('transportation', '교통', 'km', '', NULL),
  ('gasoline', '휘발유', '', '16.04 * 2.097', 4),
  ('diesel', '경유', '', '15.35 * 2.582', 4),
  ('lpg', 'LPG', '', '11.06 * 1.868', 4),
  ('waste', '폐기물', '', '', NULL),
  ('kg', '', 'kg', '0.5573', 8),
  ('l', '', 'L', '0.171 * 0.5573', 8);
  
  select * from carbon_footprint;