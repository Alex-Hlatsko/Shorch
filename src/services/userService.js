import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
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