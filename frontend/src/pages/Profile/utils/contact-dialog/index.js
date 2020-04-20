import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import api from "../../../../services/api";

import { GiStoneBridge } from "react-icons/gi";
import "./styles.css";

export default function ContactDialog({ profileToId, name, email, phone }) {
  const [open, setOpen] = React.useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = JSON.parse(localStorage.getItem("currentToken"));
  const currentProfile = JSON.parse(localStorage.getItem("currentProfile"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (save) => {
    console.log("Save", save);
    if (!save) {
      setOpen(false);
    } else {
      if (currentProfile && currentProfile._id) {
        api
          .post(
            `interest-list/${currentProfile._id}`,
            {
              _id: profileToId,
            },
            config
          )
          .then((response) => {
            console.log("Adicionado na lista: ", response);
            setOpen(false);
          });
      } else {
        setOpen(false);
      }
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <GiStoneBridge size={23} color="#000" />
      </Button>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Informações de Contato"}
        </DialogTitle>
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
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            Enviar notificação
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
