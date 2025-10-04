import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { db } from './config';

const COLLECTION_NAME = 'products';

export interface Product {
  id: number;
  firebaseId?: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew: boolean;
  discount: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Obtener todos los productos
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('id', 'asc'));
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      products.push({
        firebaseId: doc.id,
        ...doc.data() as Product
      });
    });

    return products;
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    throw error;
  }
};

// Agregar un nuevo producto
export const addProduct = async (productData: Omit<Product, 'id' | 'firebaseId'>): Promise<Product> => {
  try {
    const products = await getAllProducts();
    const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;

    const newProduct = {
      ...productData,
      id: maxId + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), newProduct);

    return {
      firebaseId: docRef.id,
      ...newProduct
    } as Product;
  } catch (error) {
    console.error('Error agregando producto:', error);
    throw error;
  }
};

// Actualizar un producto existente
export const updateProduct = async (firebaseId: string, productData: Partial<Product>): Promise<Product> => {
  try {
    const productRef = doc(db, COLLECTION_NAME, firebaseId);

    const updatedProduct = {
      ...productData,
      updatedAt: new Date()
    };

    await updateDoc(productRef, updatedProduct);

    return {
      firebaseId,
      ...updatedProduct
    } as Product;
  } catch (error) {
    console.error('Error actualizando producto:', error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (firebaseId: string): Promise<{ success: boolean; firebaseId: string }> => {
  try {
    const productRef = doc(db, COLLECTION_NAME, firebaseId);
    await deleteDoc(productRef);

    return { success: true, firebaseId };
  } catch (error) {
    console.error('Error eliminando producto:', error);
    throw error;
  }
};

// Importar productos masivamente
export const importProducts = async (products: Product[]): Promise<{ success: boolean; count: number }> => {
  try {
    const batch = writeBatch(db);

    // Limpiar colección existente
    const existingProducts = await getAllProducts();
    existingProducts.forEach((product) => {
      if (product.firebaseId) {
        const productRef = doc(db, COLLECTION_NAME, product.firebaseId);
        batch.delete(productRef);
      }
    });

    // Agregar nuevos productos
    products.forEach((product) => {
      const productRef = doc(collection(db, COLLECTION_NAME));
      batch.set(productRef, {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    await batch.commit();

    return { success: true, count: products.length };
  } catch (error) {
    console.error('Error importando productos:', error);
    throw error;
  }
};

// Exportar productos
export const exportProducts = async (): Promise<Omit<Product, 'firebaseId' | 'createdAt' | 'updatedAt'>[]> => {
  try {
    const products = await getAllProducts();
    const cleanProducts = products.map(({ firebaseId, createdAt, updatedAt, ...product }) => product);
    return cleanProducts;
  } catch (error) {
    console.error('Error exportando productos:', error);
    throw error;
  }
};
