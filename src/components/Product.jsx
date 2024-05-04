import React, { useState } from 'react';
import { useUser } from '../UserContext';
import { removeProduct } from '../services/userService'; // Импортируем функцию удаления товара
import MessageOverlay from './MessageOverlay';

const Product = ({ id, title, desc, price }) => {
  const { userData, setUserData } = useUser(); // Получаем userData и setUserData из контекста
  const [spokenWord, setSpokenWord] = useState('');
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [isMicrophoneWorking, setIsMicrophoneWorking] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');

  const initSpeechRecognition = () => {
    // Проверяем поддержку распознавания речи в браузере
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onresult = (event) => {
        setSpokenWord(event.results[0][0].transcript);
      };
      recognition.onstart = () => {
        setIsMicrophoneWorking(true);
      };
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsMicrophoneWorking(false);
      };
      setSpeechRecognition(recognition);
    } else {
      console.error('Speech recognition not supported in this browser.');
    }
  };

  const handleVibration = () => {
    // Проверяем поддержку API вибрации
    if ('vibrate' in navigator) {
      // Задаем паттерн вибрации (время в миллисекундах)
      navigator.vibrate([200]);
    } else {
      console.error('Vibration API not supported in this browser.');
    }
  };


  const handleRemoveProduct = async (productId) => {
    try {
      if (!userData) return;

      setMessageText('Say "delete"');
      setShowMessage(true);

      // Инициализируем распознавание речи только если оно поддерживается
      if (speechRecognition === null) {
        initSpeechRecognition();
      }

      if (speechRecognition !== null) {
        speechRecognition.start();
        speechRecognition.onstart = () => {
          console.log('Microphone started');
        };
        speechRecognition.onresult = (event) => {
          console.log('Speech recognition result:', event.results[0][0].transcript);
          setSpokenWord(event.results[0][0].transcript);
        };
        speechRecognition.onresult = (event) => {
          const spokenWord = event.results[0][0].transcript.trim().toLowerCase();
          console.log('Speech recognition result:', spokenWord);
          if (spokenWord === 'delete') {
            setMessageText('Deleting...');
            setShowMessage(true);
            const updatedProducts = userData.products.filter((productId) => productId !== id);
            setUserData({ ...userData, products: updatedProducts });
            removeProduct(userData.email, productId).then(() => {
              setMessageText('');
              setShowMessage(false);
            });
          } else {
            setMessageText('Incorrect word, try again');
            setShowMessage(true);
            handleVibration(); // Вызываем функцию для вибрации
            setTimeout(() => {
              setMessageText('');
              setShowMessage(false);
            }, 3000);
          }
          speechRecognition.stop();
        };
        speechRecognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsMicrophoneWorking(false);
        };
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };


  return (
    <div className='card'>
      <div className="card-body">
        <h3 className='card-title'>{title}</h3>
        <p>Description: <span className='card-subtitle mb-2 text-body-secondary'>{desc}</span></p>
        <p className='card-text'>Price: ${price}</p>
        <button onClick={() => handleRemoveProduct(id)} className='btn btn-danger'>Remove</button>

        {/* Компонент для вывода сообщений */}
        {showMessage && <MessageOverlay message={messageText} duration={3000} onClose={() => setShowMessage(false)} />}
      </div>
    </div>
  );
};

export default Product;
