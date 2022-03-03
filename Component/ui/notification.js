import ReactDOM from 'react-dom';

import classes from './notification.module.css';

function Notification(props) {
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  // Για την δυμιουργία του portal
  return ReactDOM.createPortal((
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
    // Εδώ ορίζουμε το portal που ουσιαστηκά θα συσχετίζετε
    // με το στοιχείο που έχει αυτό το id.
  ),document.getElementById('notification'));
}

export default Notification;
