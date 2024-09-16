class Cart {
    constructor() {
      this.items = [];
    }
  
    addToCart(product, quantity) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
    }
  
    removeFromCart(productId, quantity) {
      const itemIndex = this.items.findIndex(item => item.product.id === productId);
      if (itemIndex !== -1) {
        if (quantity >= this.items[itemIndex].quantity) {
          this.items.splice(itemIndex, 1);
        } else {
          this.items[itemIndex].quantity -= quantity;
        }
      }
    }
  
    viewCart() {
      return this.items.map(item => ({
        product: item.product.name,
        pricePerItem: item.product.price,
        quantity: item.quantity,
        totalCost: item.product.price * item.quantity
      }));
    }
  
    calculateTotalCost() {
      return this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    }
  }
  
  module.exports = Cart;
  