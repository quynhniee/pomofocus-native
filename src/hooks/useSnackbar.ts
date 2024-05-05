import { useEffect, useState } from 'react';
import { Snackbar } from 'react-native-paper';

const useSnackbar = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setVisible(true);


    // Reset the message state after Snackbar.DURATION_SHORT
    setTimeout(() => {
      setMessage('');
    }, Snackbar.DURATION_SHORT);
  };

  const hideSnackbar = () => {
    setVisible(false);
    setMessage('');
  };

  useEffect(() => {
    console.log(message, visible); // Logs the updated values
  }, [message, visible]);


  return { visible, message, showSnackbar, hideSnackbar };
};

export default useSnackbar;