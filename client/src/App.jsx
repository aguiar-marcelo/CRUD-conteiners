import "./App.css";
import { useState } from "react";
import Axios from 'axios'
import React from "react";
import FormEditConteiner from "./components/editCont";
import FormEditMovi from "./components/editMovi";
import FormAddMovi from "./components/addMovi";
import Moment from 'moment';


function App() {
  // CRUD CONTEINER:
  const [nome, setNome] = useState("");
  const [cliente, setCliente] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");
  const [categoria, setCategoria] = useState("");
  const [conteinerList, setConteinerList] = useState([]);

  const [relatorioList, setRelatorioList] = useState([]);


  //CREATE
  const addConteiner = () => {
    Axios.post('http://localhost:8080/conteiner/criar', {
      nome: nome,
      cliente: cliente,
      tipo: tipo,
      status: status,
      categoria: categoria,
    })
  }

  //READ
  const getConteiner = () => {
    Axios.get('http://localhost:8080/conteiner').then((response) => {
      setConteinerList(response.data)
    });
  }

  //DELETE
  const deleteConteiner = (id) => {
    Axios.delete(`http://localhost:8080/conteiner/delete/${id}`).then(() => {
      getConteiner()
    })
  }

  /* ---------------------CRUD MOVIMENTAÇÃO ----------------------------------*/

  const [idConteiner, setidConteiner] = useState("");
  const [tipoMovi, setTipoMovi] = useState("");
  const [inicioMovi, setInicioMovi] = useState("");
  const [fimMovi, setFimMovi] = useState("");
  const [movimentacaoList, setMovimentacaoList] = useState([]);
  const [indexMov, setIndexMov] = useState(0)

  //READ
  const getMovimentacao = () => {
    Axios.get('http://localhost:8080/movimentacao').then((response) => {
      setMovimentacaoList(response.data)
    });
  }

  //DELETE
  const deleteMovimentacao = (id) => {
    Axios.delete(`http://localhost:8080/movimentacao/delete/${id}`).then(() => {
      getConteiner()
    })
  }

  /* ---------------------RELATORIO----------------------------------*/
  const getRelatorio = () => {
    Axios.get('http://localhost:8080/relatorio').then((response) => {
      setRelatorioList(response.data)
    });
  }

  //o que sera exibido
  getConteiner()
  getMovimentacao()
  getRelatorio() //ja se inicia exibindo os registros


  return (
    <>
      <div className="main">
        <div className="form_box">
          <div className="nav_form">Novo Contêiner</div>
          <form>
            <p>Nome</p>
            <input
              type="text"
              placeholder="ex: ABDC1234567"
              maxLength={11}
              required
              onChange={(event) => {
                setNome(event.target.value.toUpperCase());
              }}
            />

            <p>Cliente</p>
            <input type="text"
              required
              onChange={(event) => {
                setCliente(event.target.value);
              }}
            />

            <p>Tipo</p>
            <div className="radio_grid">
              <label className="radio_box">20 pés
                <input
                  type="radio"
                  name="tipo"
                  required
                  value={"20"}
                  onChange={(event) => {
                    setTipo(event.target.value);
                  }} />
                <span className="checkmark"></span>
              </label>

              <label className="radio_box">40 pés
                <input
                  type="radio"
                  name="tipo"
                  required
                  value={"40"}
                  onChange={(event) => {
                    setTipo(event.target.value);
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
                  required
                  value={'cheio'}
                  onChange={(event) => {
                    setStatus(event.target.value);
                  }} />
                <span className="checkmark"></span>
              </label>

              <label className="radio_box">Vazio
                <input
                  type="radio"
                  name="status"
                  required
                  value={'vazio'}
                  onChange={(event) => {
                    setStatus(event.target.value);
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
                  required
                  value={'importacao'}
                  onChange={(event) => {
                    setCategoria(event.target.value);
                  }} />
                <span className="checkmark"></span>
              </label>
              <label className="radio_box">Exportação
                <input
                  type="radio"
                  name="categoria"
                  required
                  value={'exportacao'}
                  onChange={(event) => {
                    setCategoria(event.target.value);
                  }} />
                <span className="checkmark"></span>
              </label>
            </div>

            <button className="botao_submit" type="submit" onClick={addConteiner}>{'Adicionar >>'} </button>
          </form>
        </div>


        <div className="conteiners">
          <div className="nav_conteiners">
            <div className="nav_conteiners_col">Nome</div>
            <div className="nav_conteiners_col">Cliente</div>
            <div className="nav_conteiners_col">Tipo</div>
            <div className="nav_conteiners_col">Status</div>
            <div className="nav_conteiners_col">Categoria</div>
          </div>

          {conteinerList.map((val, key) => {

            return (
              <div>
                <div className="conteiner_item" >
                  <div>{val.nome}</div>
                  <div>{val.cliente}</div>
                  <div>{val.tipo}</div>
                  <div>{val.status}</div>
                  <div>{val.categoria}</div>
                  <div className="conteiner_item_opcoes">

                    <a onClick={() => { deleteConteiner(val.id) }}>
                      <i class="fa fa-trash-o conteiner_item_delete" title="Deletar"></i>
                    </a>
                    <FormEditConteiner identificacao={val} ></FormEditConteiner>
                    <a onClick={() => { setIndexMov(val.id) }}>
                      <i class='far fa-caret-square-down drop_movi' title="Exibir Movimentações"></i>
                    </a>
                    <FormAddMovi onClick={() => { setIndexMov(val.id) }} identificacao={val}></FormAddMovi>
                  </div>
                </div>
              </div>

            )
          })}


        </div>


        {movimentacaoList.filter((mov) => mov.id_conteiner == indexMov).map((val, key) => {

          let inicio = Moment(val.fim).format("DD-MM-YYYY > h:mm:ss")
          let fim = Moment(val.inicio).format("DD-MM-YYYY > h:mm:ss")
          return (
            <div>
              <div className="movimentacao">
                <br />

                <div>{val.tipo}</div>
                <div>Inicio: {inicio}</div>
                <div>Fim: {fim}</div>
                <div><a onClick={() => { deleteMovimentacao(val.id) }}>
                  <i class="fa fa-trash-o conteiner_item_delete" title="Deletar"></i>
                </a>
                </div>
                <FormEditMovi identificacao={val} ></FormEditMovi>

                <div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
<div className="relatorio_box">
  Relatório: 
      {relatorioList.map((val, key) => {

        return (
          <>
          
            <div className="conteiner_relatorio" >
              <div>{val.cliente} </div>
              <div>{val.total_mov}</div>
              <div>{val.tipo}</div>
            </div>
          </>

        )
      })}
      </div>
    </>
  )


}


export default App;