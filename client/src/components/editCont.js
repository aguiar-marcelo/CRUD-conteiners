import * as React from 'react';
//import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
//import DialogActions from '@mui/material/DialogActions';
//import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
//import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import Axios from 'axios'

import "./editCont.css";

export default function FormEditConteiner(props) {

  const [newNome, setNewNome] = useState(props.identificacao.nome);
  const [newCliente, setNewCliente] = useState(props.identificacao.cliente);
  const [newTipo, setNewTipo] = useState(props.identificacao.tipo);
  const [newStatus, setNewStatus] = useState(props.identificacao.status);
  const [newCategoria, setNewCategoria] = useState(props.identificacao.categoria);
  const updateConteiner = (id) => {
    Axios.put('http://localhost:8080/conteiner/update',
      {
        id: props.identificacao.id,
        nome: newNome,
        cliente: newCliente,
        tipo: newTipo,
        status: newStatus,
        categoria: newCategoria,

      }).then(() => {
        handleClose()
      })
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (  //props.indentificacao recebe
    <>
      <a onClick={handleClickOpen}>
        <i class="far fa-edit conteiner_item_update" title="Editar" ></i>
      </a>
      <Dialog open={open} onClose={handleClose}>

        <div className="form_box">
          <div className="edit_title">
            Editar Contêiner: {props.identificacao.nome}
          </div>
          <form>
            <p>Nome</p>
            <input
              type="text"
              placeholder="ex: ABDC1234567"
              maxLength={11}
              onChange={(event) => {
                setNewNome(event.target.value);
              }}
            />

            <p>Cliente</p>
            <input type="text"
              onChange={(event) => {
                setNewCliente(event.target.value);
              }}
            />

            <p>Tipo</p>
            <div className="radio_grid">
              <label className="radio_box">20 pés
                <input
                  type="radio"
                  name="tipo"
                  value={"20"}
                  onChange={(event) => {
                    setNewTipo(event.target.value);
                  }} />
                <span className="checkmark"></span>
              </label>

              <label className="radio_box">40 pés
                <input
                  type="radio"
                  name="tipo"
                  value={"40"}
                  onChange={(event) => {
                    setNewTipo(event.target.value);
                  }} />
                <span className="checkmark"></span>
              </label>
            </div>
            <p>Status</p>
            <div className="radio_grid">
              <label className="radio_box">Cheio
                <input
                  type="radio"
                  name="status"
                  value={'cheio'}
                  onChange={(event) => {
                    setNewStatus(event.target.value);
                  }} />
                <span className="checkmark"></span>
              </label>

              <label className="radio_box">Vazio
                <input
                  type="radio"
                  name="status"
                  value={'vazio'}
                  onChange={(event) => {
                    setNewStatus(event.target.value);
                  }} />
                <span className="checkmark"></span>
              </label>
            </div>

            <p>Categoria</p>
            <div className="radio_grid">
              <label className="radio_box">Importação
                <input
                  type="radio"
                  name="categoria"
                  value={'importacao'}
                  onChange={(event) => {
                    setNewCategoria(event.target.value);
                  }} />
                <span className="checkmark"></span>
              </label>
              <label className="radio_box">Exportação
                <input
                  type="radio"
                  name="categoria"
                  value={'exportacao'}
                  onChange={(event) => {
                    setNewCategoria(event.target.value);
                  }} />
                <span className="checkmark"></span>
              </label>
            </div>

          </form>
        </div>
        <div>
          {/* <button onClick={handleClose}>Cancelar</button> */}
          <input className="botao_submit" type="submit" onClick={updateConteiner} value="Adicionar" />
        </div>
      </Dialog>
    </>
  );
}

/*
<Dialog  open={open} onClose={handleClose}>
        <DialogTitle className="edit_title">Editar Contêiner</DialogTitle>
        <DialogContent className="edit_content">
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Editar</Button>
        </DialogActions>
      </Dialog>*/