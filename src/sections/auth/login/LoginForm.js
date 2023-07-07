import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { getAnalytics } from '../../../services/api/index';


const LoginForm = ({ isLogin }) => {
  const navigate = useNavigate();

  const [showApiKey, setShowApiKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    appId: '',
    apiKey: '',
  });

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  }

  const handleClick = async () => {
    setLoading(true);
    await getAnalytics({
      appName: value.appId,
      apiKey: value.apiKey,
    });
    if(localStorage.getItem("app")){
      navigate('/dashboard', { replace: true });
    }
    setLoading(false);

  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="appId" label="APP ID"  onChange={handleChange} />

       {isLogin ? <TextField
          name="apiKey"
          label="API KEY"
          onChange={handleChange}
          type={showApiKey ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowApiKey(!showApiKey)} edge="end">
                  <Iconify icon={showApiKey ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> : <TextField
        name="apiKey"
        label="API KEY"
        onChange={handleChange}
        type={'text' }
      /> }
      </Stack>

      <LoadingButton loading={loading} sx={{ mt: 5 }} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
       {isLogin ? "LOGIN" : "GET ANALYTICS"}
      </LoadingButton>
    </>
  );
}


LoginForm.propTypes = {
  isLogin: PropTypes.bool
};

export default LoginForm;