import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from './firebase';

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
