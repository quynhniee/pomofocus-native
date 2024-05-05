import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { authAction } from '../../redux/auth/auth';
import { View } from 'react-native';
import { removeItem } from '../../utils/storage';
import Stack from '../Stack';
import { theme } from '../../core/theme';
import SettingButton from '../setting';

const ButtonGroup = () => {
  const dispatch = useDispatch();
  const logoutHandle = async () => {
    dispatch(authAction.logout());
    await removeItem('token');
  };

  return (
    <Stack flexDirection='row' alignBlock='center' alignInline='space-between'>
      <SettingButton/>
      <Button icon="account-circle" mode='text' textColor='white' onPress={logoutHandle}>
        Logout
      </Button>
    </Stack>
  );
};

export default ButtonGroup;