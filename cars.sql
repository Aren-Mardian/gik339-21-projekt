DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS cars(
   id        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,brandmodel         VARCHAR(8) NOT NULL
  ,yearmodel          VARCHAR(9) NOT NULL
  ,mileage            VARCHAR(8) NOT NULL
  ,registrationnumber VARCHAR(8) NOT NULL
  ,color              VARCHAR(6) NOT NULL
  ,firstname          VARCHAR(12) NOT NULL
  ,lastname           VARCHAR(12) NOT NULL
  ,email              VARCHAR(20) NOT NULL
  ,phonenumber        VARCHAR(20) NOT NULL


);
INSERT INTO cars(id,brandmodel,yearmodel,mileage,registrationnumber,color,firstname,lastname,email,phonenumber) VALUES (1,'Audi S5','2016','1200','eqw312','bg-slate-800','Aren','Mouradian','h22arema@du.se', '0735473885');
INSERT INTO cars(id,brandmodel,yearmodel,mileage,registrationnumber,color,firstname,lastname,email,phonenumber) VALUES (2,'BMW M4','2012','300','fmw781','bg-red-500','Wabe','Chermakyan','h22chermo@du.se', '0720454875');
INSERT INTO cars(id,brandmodel,yearmodel,mileage,registrationnumber,color,firstname,lastname,email,phonenumber) VALUES (3,'Dodge Challenger','2022','4120','ocs854','bg-sky-400','easymoney','chka', 'h22laves@du.se', '0792573965');



select * from cars;