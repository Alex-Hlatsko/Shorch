class Product {

    constructor(title, desc, price) {
        this.title = title;
        this.desc = desc;
        this.price = price;
        this.time = 10;

    }

    expiry = () => {
        if (this.time > 0) {
          this.time -= 1;
        } else {
          clearInterval(this.timer);
          console.log('Product expired');
          
        }
      }
    
      startExpiryTimer = () => {
        this.timer = setInterval(() => {
          this.expiry();
          this.updateTime(this.time); // Update time in the component
        }, 1000);
    }
      updateTime = () => {} 

}

export default Product;