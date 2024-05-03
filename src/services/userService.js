import { collection, query, where, getDocs, addDoc, getDoc, doc, arrayRemove, updateDoc } from "firebase/firestore";
import { db } from './firebase';
import { useUser } from '../UserContext'; // Импортируем хук useUser

export const loginUser = async (email, password, setUserData) => {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return "Пользователь с такой почтой не найден";
    }

    let userData = null;
    querySnapshot.forEach((doc) => {
      const userDataFromDB = doc.data();
      if (userDataFromDB.password === password) {
        userData = userDataFromDB;
      }
    });

    if (userData) {
      setUserData(userData); // Устанавливаем данные пользователя в контекст
      return null; // Возвращаем null, чтобы компонент мог отличить успешный вход от ошибки
    } else {
      return "Неверный пароль";
    }
  } catch (error) {
    console.error("Ошибка при входе:", error);
    return "Ошибка при входе";
  }
};

export const createUser = async (name, email, password, setUserData) => { // Добавляем параметр setUserData
    try {
      // Проверка наличия пользователя с такой же почтой в базе данных
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const existingUser = querySnapshot.docs.find(doc => doc.data().email === email);
      if (existingUser) {
        return "Пользователь с такой почтой уже существует";
      }
  
      // Регистрация нового пользователя
      await addDoc(collection(db, "users"), { name, email, password, products: [] });
  
      // Вызываем функцию setUserData для установки данных пользователя в контекст
      setUserData({ name, email, password, products: [] });
  
      return "success";
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      return "Ошибка при регистрации";
    }
  };

  export const getProductsByIds = async (productIds) => {
    try {
      const promises = productIds.map(async (productId) => {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          return null; // Если продукт не найден, возвращаем null
        }
      });
  
      const productResults = await Promise.all(promises);
      return productResults.filter(Boolean); // Убираем null значения из результата
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };
  export const removeProduct = async (email, productId) => {
    try {
      // Получаем ссылку на коллекцию пользователей и создаем запрос для поиска пользователя по email
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('email', '==', email));
  
      // Выполняем запрос и получаем результат
      const querySnapshot = await getDocs(q);
  
      // Если пользователь найден, обновляем его документ, удаляя продукт из массива
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          products: arrayRemove(productId)
        });
      });
  
      console.log('Product removed successfully');
      return 'success';
    } catch (error) {
      console.error('Error removing product:', error);
      throw new Error('Error removing product');
    }
  };
