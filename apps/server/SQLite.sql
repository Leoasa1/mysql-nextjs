drop table if exists products, reviews;
create table products
  (id		int primary key AUTO_INCREMENT,
  username		varchar(20) not null,
  title		varchar(255) not null,
  product_desc		varchar(255),
  category		varchar(255),
  price		decimal(10,2) not null,
  created_at		timestamp default CURRENT_TIMESTAMP,
  foreign key (username) references user(username)
  );

insert into products (username, title, product_desc, category, price) values
  ('user1', 'iPhone 13 Pro', 'New model with improved camera and processor', 'Electronic', 999),
  ('user2', 'Macbook Pro', 'High-performance laptop for professionals', 'Electronic, Computer', 1999),
  ('user3', 'Samsung Galaxy S21', 'Android phone with 5G support and 120Hz display', 'Electronic', 799),
  ('user4', 'Sony WH-1000XM4', 'Wireless noise-canceling headphones with great sound quality', 'Electronic', 349),
  ('user5', 'Great Minds Think Alike', 'Book about people with great minds', 'Book', 299);

create table reviews 
  (id		int primary key AUTO_INCREMENT,
  username		varchar(15) not null,
  product_id		int not null,
  rating		ENUM('Excellent', 'Good', 'Fair', 'Poor') not null,
  review_text		varchar(255),
  created_at		timestamp default CURRENT_TIMESTAMP,
  constraint		unique_review_per_user unique (username, product_id),
  foreign key		(username) references user(username),
  foreign key		(product_id) references products(id)
  );

insert into reviews (username, product_id, rating, review_text) values
  ('user5', 1, 'Excellent', 'The camera is amazing!'),
  ('user4', 2, 'Fair', 'The battery life could be better'),
  ('user3', 3, 'Poor', 'The screen is not as good as advertised'),
  ('user2', 4, 'Good', 'Great sound quality but a bit heavy'),
  ('user1', 5, 'Excellent', 'I love the portability and the games selection'),
  ('user1', 2, 'Excellent', 'This product exceeded my expectations!'),
  ('user4', 3, 'Good', 'The price is reasonable for the quality of the product'),
  ('user3', 1, 'Poor', 'The camera quality is not as good as I expected'),
  ('user2', 5, 'Fair', 'The battery life could be improved'),
  ('user3', 4, 'Excellent', 'This is the best product I have ever used!');