import { useEffect, useState } from 'react';
import { Snackbar } from 'react-native-paper';

const useSnackbar = (initState: boolean = false) => {
  const [visible, setVisible] = useState(initState);
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

  return { visible, message, showSnackbar, hideSnackbar };
};

export default useSnackbar;