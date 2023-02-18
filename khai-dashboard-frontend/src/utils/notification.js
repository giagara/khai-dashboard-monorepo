import { Store } from 'react-notifications-component';

export const notification = {
  show,
  getValidationErrors,
};

function show(title, message, type) {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
}

function getValidationErrors(errors) {
  let str = '';
  Object.keys(errors).map((error, index) => (str = str + '\n' + errors[error][0]));

  return str;
}
