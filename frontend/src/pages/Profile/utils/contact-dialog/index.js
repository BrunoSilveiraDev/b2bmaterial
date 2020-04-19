import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { FaRegHandshake } from "react-icons/fa";
import "./styles.css";

export default function ContactDialog({ name, email, phone}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button  onClick={handleClickOpen}>
      <FaRegHandshake  size={23} color="#000" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Informações de Contato"}</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
           Nome: {name}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
           Email: {email}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
          Telefone: {phone}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
       
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}