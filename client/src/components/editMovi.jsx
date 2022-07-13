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
import Moment from 'moment';

import "./editMovi.css";

export default function FormEditMovi(props) {

  const [newTipo, setNewTipo] = useState(props.identificacao.tipo);
  const [newInicio, setNewInicio] = useState(props.identificacao.inicio);
  const [newFim, setNewFim] = useState(props.identificacao.fim);
  //var date = '2022-12-05T14:59:30.000Z'
  Moment.locale('en');

  const updateMovi = (id) => {
    Axios.put('http://localhost:8080/movimentacao/update',
      {
        id: props.identificacao.id,
        tipo: newTipo,
        inicio: Moment(newInicio).format('YYYY-MM-DD h:mm:ss'),
        fim: Moment(newFim).format('YYYY-MM-DD h:mm:ss')

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
            Editar Movimentação: {props.identificacao.nome}
          </div>
          <form>
            <p>Tipo  </p>
            <div className="radio_grid">
              <label className="radio_box">Embarque
                <input
                  type="radio"
                  name="tipo"
                  value={"Embarque"}
                  onChange={(event) => {
                    setNewTipo(event.target.value);
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <label className="radio_box">Descarga
                <input
                  type="radio"
                  name="tipo"
                  value={"Descarga"}
                  onChange={(event) => {
                    setNewTipo(event.target.value);
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <label className="radio_box">Gate-In
                <input
                  type="radio"
                  name="tipo"
                  value={"Gate-In"}
                  onChange={(event) => {
                    setNewTipo(event.target.value);
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <label className="radio_box">Gate-Out
                <input
                  type="radio"
                  name="tipo"
                  value={"Gate-Out"}
                  onChange={(event) => {
                    setNewTipo(event.target.value);
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <label className="radio_box">Reposicionamento
                <input
                  type="radio"
                  name="tipo"
                  value={"Reposicionamento"}
                  onChange={(event) => {
                    setNewTipo(event.target.value);
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <label className="radio_box">Pesagem
                <input
                  type="radio"
                  name="tipo"
                  value={"Pesagem"}
                  onChange={(event) => {
                    setNewTipo(event.target.value);
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <label className="radio_box">Scanner
                <input
                  type="radio"
                  name="tipo"
                  value={"Scanner"}
                  onChange={(event) => {
                    setNewTipo(event.target.value);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <p>Inicio: {Moment(newInicio).format('YYYY-MM-DD h:mm:ss')}</p>
            <input
              type="datetime-local"
              onChange={(event) => {
                setNewInicio(event.target.value);
              }} />
            <p>Fim: {Moment(newFim).format('YYYY-MM-DD h:mm:ss')}</p>
            <input
              type="datetime-local"
              onChange={(event) => {
                setNewFim(event.target.value);
              }} />
            <div>
              <input className="botao_submit" type="submit" onClick={updateMovi} value="Adicionar" />
            </div>
          </form>
        </div>


      </Dialog>
    </>
  );
}