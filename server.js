import { getPosts, agregarPost, registrarLike, eliminarPost} from './consultas.js'
import express, { json } from 'express';
const app = express();
import cors from 'cors';

app.use(express.json())
app.use(cors());

app.listen(3000, console.log('SERVIDOR ENCENDIDO 👍'))

app.get("/posts", async (req, res) => {  
    const posts = await getPosts()
    res.json(posts)
})

app.post("/posts", async (req, res) => {
    try {
        const { titulo, img, descripcion } = req.body
        await agregarPost(titulo, img, descripcion)
        res.json("Post agregado con éxito")
    } catch (error) {
        res.status(500).send("Error al agregar el post");
    }
})

app.put("/posts/like/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await registrarLike(id);
        console.log("Like modificado con éxito");
        res.send("Like registrado con éxito");
    } catch (error) {
        res.status(500).send("Error al registrar el like");
    }
});

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
    eliminarPost(id)
    console.log("Post eliminado con éxito")
    res.send("Post eliminado")
})