import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from './firebase';

export const loginUser = async (email, password) => {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return "Пользователь с такой почтой не найден";
    }

    let userData = {};
    querySnapshot.forEach((doc) => {
      userData = doc.data();
    });

    if (userData.password === password) {
      return userData;
    } else {
      return "Неверный пароль";
    }
  } catch (error) {
    console.error("Ошибка при входе:", error);
    return "Ошибка при входе";
  }
};
