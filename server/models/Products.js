class Product {
    constructor(id, name, price, category) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.category = category;
    }
  }
  
  const products = [
    new Product('P001', 'Laptop', 1000.0, 'Electronics'),
    new Product('P002', 'Phone', 500.0, 'Electronics'),
    new Product('P003', 'T-Shirt', 20.0, 'Fashion')
  ];
  
  module.exports = products;
  