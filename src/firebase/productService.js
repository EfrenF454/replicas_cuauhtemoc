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

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('id', 'asc'));
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({
        firebaseId: doc.id, // ID del documento en Firebase
        ...doc.data()
      });
    });
    
    return products;
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    throw error;
  }
};

// Agregar un nuevo producto
export const addProduct = async (productData) => {
  try {
    // Obtener el siguiente ID disponible
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
    };
  } catch (error) {
    console.error('Error agregando producto:', error);
    throw error;
  }
};

// Actualizar un producto existente
export const updateProduct = async (firebaseId, productData) => {
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
    };
  } catch (error) {
    console.error('Error actualizando producto:', error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (firebaseId) => {
  try {
    const productRef = doc(db, COLLECTION_NAME, firebaseId);
    await deleteDoc(productRef);
    
    return { success: true, firebaseId };
  } catch (error) {
    console.error('Error eliminando producto:', error);
    throw error;
  }
};

// Importar productos masivamente (útil para migrar desde JSON)
export const importProducts = async (products) => {
  try {
    const batch = writeBatch(db);
    
    // Limpiar colección existente primero
    const existingProducts = await getAllProducts();
    existingProducts.forEach((product) => {
      const productRef = doc(db, COLLECTION_NAME, product.firebaseId);
      batch.delete(productRef);
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

// Exportar productos (para backup)
export const exportProducts = async () => {
  try {
    const products = await getAllProducts();
    // Remover campos específicos de Firebase para el export
    const cleanProducts = products.map(({ firebaseId, createdAt, updatedAt, ...product }) => product);
    return cleanProducts;
  } catch (error) {
    console.error('Error exportando productos:', error);
    throw error;
  }
};
