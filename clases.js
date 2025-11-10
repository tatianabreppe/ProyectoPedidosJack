class Producto{
  constructor(id, categoria, nombre, precio, stock){
    this.id = id;
    this.categoria = categoria;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }
  getInfo(){
    return `${this.id} ${this.categoria} ${this.nombre} ${this.precio} ${this.stock}`;
  }
}


class ItemCarrito{
  constructor(nomProd){
    this.nomProd = nomProd;
  }
}

class Cliente{
  constructor(id){
    this.id = idCliente;
  }
}

class CarritoDeCompras{
  constructor(id, productos = []){
    this.productos = productos;
  }
}

let producto1 = new Producto(1, "juguete", "muenieco", 1000, 30);
console.log(producto1.getInfo())