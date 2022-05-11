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

import "./addMovi.css";

export default function FormAddMovi(props) {
    const [id_conteiner, setId_conteiner] = useState("");
    const [tipo, setTipo] = useState();
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");

    const addMovi = () => {
        Axios.post('http://localhost:8080/movimentacao/criar', {
            id_conteiner: props.identificacao.id,
            tipo: tipo,
            inicio: inicio,
            fim: fim
        })
        
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <a onClick={handleClickOpen}>
                <i className='fa fa-plus button-add' title="Adicionar Movimentação"></i>
            </a>
            <Dialog open={open} onClose={handleClose}>

                <div className="form_box">
                    <div className="edit_title">
                        Adicionar Movimentação: {props.identificacao.nome}
                    </div>
                    <form>
                        <p>Tipo</p>
                        <div className="radio_grid">
                            <label className="radio_box">Embarque
                                <input
                                    type="radio"
                                    name="tipo"
                                    value={"Embarque"}
                                    onChange={(event) => {
                                        setTipo(event.target.value);
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
                                        setTipo(event.target.value);
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
                                        setTipo(event.target.value);
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
                                        setTipo(event.target.value);
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
                                        setTipo(event.target.value);
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
                                        setTipo(event.target.value);
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
                                        setTipo(event.target.value);
                                    }}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <p>Inicio: {inicio}</p>
                        <input
                            type="datetime-local"
                            onChange={(event) => {
                                setInicio(event.target.value);
                            }} />
                        
                        <p>Fim: {fim}</p>
                        <input
                            type="datetime-local"
                            onChange={(event) => {
                                setFim(event.target.value);
                            }} />
                        <div>
                            <input className="botao_submit" type="submit" onClick={addMovi} value="Adicionar" />
                        </div>
                    </form>
                </div>


            </Dialog>
        </>
    );
}
