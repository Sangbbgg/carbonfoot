use ezteam2;

CREATE TABLE carbon_footprint (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(255) ,
  label VARCHAR(255) ,
  sublabel VARCHAR(255) , 
  unit VARCHAR(10) NOT NULL,
  cost_formula VARCHAR(255) NOT NULL,
  parent_category_id INT,
  FOREIGN KEY (parent_category_id) REFERENCES carbon_footprint(id) ON DELETE SET NULL
);

INSERT INTO carbon_footprint (category_name, label, sublabel, unit, cost_formula, parent_category_id)
VALUES
  ('electricity','전기',  null, 'kWh', '0.4781', NULL),
  ('gas','가스',  null, '㎥', '2.176', NULL),
  ('water','수도',  null, '㎥', '0.237', NULL),
  ('transportation','교통',  null, 'km', '', NULL),
  ('gasoline', null, '휘발유', '', '16.04 * 2.097', 4),
  ('diesel', null, '경유', '', '15.35 * 2.582', 4),
  ('lpg', null, 'LPG', '', '11.06 * 1.868', 4),
  ('waste','폐기물',  null, '', '', NULL),
  ('kg',  null, '', 'kg', '0.5573', 8),
  ('l',  null, '', 'L', '0.171 * 0.5573', 8);
  
select * from carbon_footprint;