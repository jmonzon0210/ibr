// api/miembros.js
import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    // Obtener todos los miembros
    const miembros = await db.collection('miembros').find({}).toArray();
    res.status(200).json(miembros);
  } else if (req.method === 'POST') {
    // Agregar un nuevo miembro
    const nuevoMiembro = req.body;
    const response = await db.collection('miembros').insertOne(nuevoMiembro);
    res.status(201).json(response.ops[0]);
  } else {
    res.status(405).end(); // Método no permitido
  }
}
