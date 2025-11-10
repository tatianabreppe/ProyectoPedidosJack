// Clase base: Registro
import mysql from "mysql2/promise";
//import agregado para el express
import express from "express";

class Registro {
  #nombre;
  #email;

  constructor(nombre, email) {
    this.#nombre = nombre;
    this.#email = email;
  }

  getNombre() { return this.#nombre; }
  getEmail() { return this.#email; }
  setNombre(nombre) { this.#nombre = nombre; }
  setEmail(email) { this.#email = email; }

  mostrarInfo() {
    return `Nombre: ${this.#nombre}, Email: ${this.#email}`;
  }

  // 🔍 Método para verificar si nombre o email existen en la base de datos
  async verificarEnBD() {
    // 1️⃣ Conexión a la base de datos
    const conexion = await mysql.createConnection({
      host: "localhost",
      user: "tu_usuario",
      password: "tu_contraseña",
      database: "tu_basedatos"
    });

    try {
      // 2️⃣ Verificar si el nombre existe
      const [rowsNombre] = await conexion.execute(
        "SELECT COUNT(*) AS total FROM usuarios WHERE nombre = ?",
        [this.#nombre]
      );

      // 3️⃣ Verificar si el email existe
      const [rowsEmail] = await conexion.execute(
        "SELECT COUNT(*) AS total FROM usuarios WHERE email = ?",
        [this.#email]
      );

      // 4️⃣ Respuestas personalizadas
      if (rowsNombre[0].total > 0) {
        console.log("⚠️  Existe nombre usuario");
      }

      if (rowsEmail[0].total > 0) {
        console.log("⚠️  Este mail ya está registrado");
      }

      if (rowsNombre[0].total === 0 && rowsEmail[0].total === 0) {
        console.log("✅ Usuario válido. No existe en la base de datos.");
      }

    } catch (error) {
      console.error("Error al verificar en la base de datos:", error.message);
    } finally {
      await conexion.end(); // cerrar conexión
    }
  }
}

// Clase derivada: Usuario
class Usuario extends Registro {
  // Atributo privado adicional
  #id;

  constructor(id, nombre, email) {
    // Llamamos al constructor de la clase padre (Registro)
    super(nombre, email);
    this.#id = id;
  }

  getId() {
    return this.#id;
  }

  setId(id) {
    this.#id = id;
  }

  // Sobrescribimos el método mostrarInfo para incluir el ID
  mostrarInfo() {
    return `ID: ${this.#id}, ${super.mostrarInfo()}`;
  }
}
//const para enlazar la bese de datos, falta mejorar
const app = express;
const port = 3060;
// Ejemplo de uso
const usuario1 = new Usuario(1, "Carlos Pérez", "carlos@example.com");

console.log(usuario1.mostrarInfo()); // ID: 1, Nombre: Carlos Pérez, Email: carlos@example.com

