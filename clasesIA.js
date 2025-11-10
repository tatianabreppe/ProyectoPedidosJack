// Clase Producto
class Producto {
  constructor(id, nombre, precio, categoria, animal) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.animal = animal;
  }
}

// Clase ItemCarrito (une un producto con una cantidad)
class ItemCarrito {
  constructor(id, cantidad){
    this.producto = id;
    this.cantidad = cantidad;
  }

  getSubtotal() {
    return this.producto.precio * this.cantidad;
  }
}

// Clase Carrito (contiene varios ItemCarrito)
class Carrito {
  constructor() {
    this.items = [];
    this.estado = null; // (??) Vacio o no Vacio (??)
  }

  agregarProducto(producto, cantidad = 1) {
    const existente = this.items.find(
      item => item.producto.id === producto.id
    );

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.items.push(new ItemCarrito(producto, cantidad));
    }
  }

  eliminarProducto(idProducto) {
    this.items = this.items.filter(item => item.producto.id !== idProducto);
  }

  calcularTotal() {
    return this.items.reduce((total, item) => total + item.getSubtotal(), 0);
  }
}
