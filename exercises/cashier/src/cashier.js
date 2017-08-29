export function cashier() {
  // TODO: implement me

  let items = [];

  return {
    add(item){
      items.push(item);
      return this;
    },

    get length(){
      let sum = 0;
      for (let i=0; i< items.length; i++){
        sum = sum + items[i].qty;
      }
      return sum;
    },

    get total(){
      let tot = 0;
      for (let i=0; i< items.length; i++){
        tot = tot + (items[i].price * items[i].qty);
      }
      return tot;
    }
  }
}