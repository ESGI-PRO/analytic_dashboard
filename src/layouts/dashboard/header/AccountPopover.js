import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, Modal } from '@mui/material';
// mocks_
import getAccount from '../../../_mock/account';
import { logout } from '../../../services/api/index';
// components
import { LoginForm } from '../../../sections/auth/login';

const MENU_OPTIONS = [
  {
    label: 'Get New Analytics',
    icon: 'eva:home-fill',
  }
];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  border: '2px solid #fff',
  boxShadow: 24,
  py: 6,
  px: 6,
};

export default function AccountPopover() {
  const app = JSON.parse(localStorage.getItem('app'));
  const account = getAccount(app)
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    console.log('open called')
    setOpenModal(true)
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = async (option) => {
    if(option.label === 'Get New Analytics'){
      handleOpenModal()
    }
    if(option.label === 'Logout'){
      await handleLogout();
    }
    setOpen(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => {handleClose(option)}}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => handleClose({label: 'Logout'})} sx={{ m: 1 }}>
          Logout
        </MenuItem>


      </Popover>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LoginForm />
        </Box>
      </Modal>
    </>
  );
}