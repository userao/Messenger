import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      notFoundPage: {
        header: 'Страница не найдена',
        linkToMain: 'Вернуться на главную',
      },
      navbar: {
        brand: 'Hexlet chat',
        logInButton: 'Войти',
        logOutButton: 'Выйти',
      },
      loginPage: {
        header: 'Войти',
        usernameLabel: 'Ваш ник',
        passwordLabel: 'Пароль',
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
        confirmationMustMatch: 'Пароли должны совпадать',
      },
      chatPage: {
        channelsHeader: 'Каналы',
        messagesCounter: '{{counter}} сообщений',
        messagesInputPlaceholder: 'Введите сообщение...',
        ariaLabel: 'Новое сообщение',
        sendMessageSpan: 'Отправить сообщение',
        channelControlSpan: 'Управление каналом',
        renameButton: 'Переименовать',
        deleteButton: 'Удалить',
      },
      toastifyNotifications: {
        channelCreated: 'Канал создан!',
        channelRenamed: 'Канал переименован!',
        channelRemoved: 'Канал удалён!',
        connectionError: 'Ошибка соединения',
      },
      addChannelModal: {
        header: 'Добавить канал',
        label: 'Имя канала',
        addButton: 'Отправить',
        closeButton: 'Отменить',
        notUniqueError: 'Должно быть уникальным',
        invalidLengthError: 'От 3 до 20 символов',
      },
      renameChannelModal: {
        header: 'Переименовать канал',
        label: 'Новое имя канала',
        addButton: 'Отправить',
        closeButton: 'Отменить',
        invalidFeedback: 'Должно быть уникальным',
        notUniqueError: 'Должно быть уникальным',
        invalidLengthError: 'От 3 до 20 символов',
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
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
