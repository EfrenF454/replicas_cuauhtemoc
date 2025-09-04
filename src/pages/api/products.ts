import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'public', 'data', 'products.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const fileContents = fs.readFileSync(productsFilePath, 'utf8');
      const products = JSON.parse(fileContents);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al leer el archivo de productos' });
    }
  } else if (req.method === 'POST') {
    try {
      const products = req.body;
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
      res.status(200).json({ message: 'Productos guardados correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al guardar los productos' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
