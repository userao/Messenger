import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  ru: {
    translation: {
      navbar: {
        brand: 'Hexlet chat',
        logInButton: 'Войти',
        logOutButton: 'Выйти',
      },
      loginPage: {
        header: 'Войти',
        usernameLabel: 'Ваш ник',
        passwordLabel: 'Ваш пароль',
        logInButton: 'Войти',
        invalidTooltip: 'Неверные имя пользователя или пароль',
        registerLink: 'Регистрация',
        footerText: 'Нет аккаунта?',
      },
      signupPage: {
        header: 'Регистрация',
        usernameLabel: 'Имя пользователя',
        passwordLabel: 'Пароль',
        passwordConfirmationLabel: 'Подтвердите пароль',
        registerButton: 'Зарегистрироваться',
        signupError: 'Пользователь с таким именем уже существует',
        usernameInvalidLength: 'От 3 до 20 символов',
        requiredField: 'Обязательное поле',
        passwordTooShort: 'Не менее 6 символов',
        confirmationMustMatch: 'Должно совпадать с паролем',
      },
      chatPage: {
        channelsHeader: 'Каналы',
        messagesCounter: '{{counter}} сообщений',
        messagesInputPlaceholder: 'Введите сообщение...',
      },
      addChannelModal: {
        header: 'Добавить канал',
        label: 'Имя канала',
        addButton: 'Отправить',
        closeButton: 'Отменить',
        invalidFeedback: 'Должно быть уникальным',
      },
      renameChannelModal: {
        header: 'Переименовать канал',
        label: 'Новое имя канала',
        addButton: 'Отправить',
        closeButton: 'Отменить',
        invalidFeedback: 'Должно быть уникальным',
      },
      deleteChannelModal: {
        header: 'Удалить канал',
        body: 'Уверены?',
        deleteButton: 'Удалить',
        closeButton: 'Отменить',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ru",
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;