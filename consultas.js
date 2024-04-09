import pkg from 'pg';
const { Pool } = pkg;
import {config} from 'dotenv';

config();

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,    
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowExitOnIdle: true
})

const getPosts = async () => {
    const { rows } = await pool.query("SELECT * from posts");
    console.log(rows);
    return rows;
}

const agregarPost = async (titulo, img, descripcion) => {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3)"
    const values = [titulo, img, descripcion]
    await pool.query(consulta, values)
    console.log("Post agregado")
}

const registrarLike = async (id) => {{
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1"
    const data = [id]
    await pool.query(consulta, data);
}}

const eliminarPost = async (id) => {
    const consulta = "DELETE from posts WHERE id = $1"
    const data = [id]
    await pool.query(consulta, data)
    console.log("Post eliminado correctamente")
}

export {getPosts, agregarPost, registrarLike, eliminarPost}