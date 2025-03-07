import { DB_NAME,DB_HOST,DB_USER,DB_PASSWORD,DB_PORT } from "../../config.js";
import { DataSource } from 'typeorm';
import { Producto } from "../../models/producto.entity.js";
import { Categoria } from "../../models/categoria.entity.js";
import { Oferta } from "../../models/oferta.entity.js";
import { Trueque } from "../../models/trueque.entity.js";
import { Valoracion } from "../../models/valoracion.entity.js";
import { Usuario } from "../../models/usuario.entity.js";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  logging: true,
  entities: [Producto,Categoria,Oferta,Trueque,Valoracion,Usuario],
  subscribers: [],
  migrations: [],
})


