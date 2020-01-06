import React, { Component } from "react";
import axios from "axios";
// Components
import Btn from "../components/button.js";
// Images
import workers from "../img/workers.jpg";

class EncontreProfissionais extends Component {
  constructor() {
    super();
    this.state = {
      profissionaisEncontrados: [],
      filtrosMarcados: []
    };
    this.getProfissionais = this.getProfissionais.bind(this);
    this.getFiltros = this.getFiltros.bind(this);
    this.limparFiltros = this.limparFiltros.bind(this);
  }

  getFiltros = event => {
    alert(JSON.stringify("Arrumar, olhar event.target.value"));
  };

  getProfissionais() {
    console.log(JSON.parse(localStorage.getItem("filtrosMarcadosFixHub")));
    console.log(this.state.filtrosMarcados);
    try {
      axios.get("/pesquisaPrestadores").then(response => {
        this.setState({ profissionaisEncontrados: [] });
        this.setState({ profissionaisEncontrados: response.data });
        // console.log(response.data);
        // console.log(
        //   "ProfissionaisEncontrados: ",
        //   this.state.profissionaisEncontrados
        // );
      });
    } catch (error) {
      // console.error(error);
      alert("Falha na busca por profissionais");
    }
  }

  validateCheckbox = inputId => {
    const input = inputId;
    const ExcludedText = input.indexOf("Checkbox");
    const tag = input.slice(0, ExcludedText);

    let filtrosMarcados = this.state.filtrosMarcados;
    if (this.state.filtrosMarcados.indexOf(tag) === -1) {
      filtrosMarcados.push(tag);
    } else {
      filtrosMarcados = filtrosMarcados.filter(value => value !== tag);
    }

    localStorage.setItem(
      "filtrosMarcadosFixHub",
      JSON.stringify(filtrosMarcados)
    );

    this.setState({
      filtrosMarcados: JSON.parse(localStorage.getItem("filtrosMarcadosFixHub"))
    });
  };

  renderCheckbox = labelText => {
    const label = labelText;
    const inputId = label + "Checkbox";

    return (
      <div className="form-inline">
        {this.state.filtrosMarcados.indexOf(label) === -1 ? (
          <input
            type="checkbox"
            className="checkbox"
            id={inputId}
            onChange={() => this.validateCheckbox(inputId)}
          />
        ) : (
          <input
            type="checkbox"
            className="checkbox"
            id={inputId}
            onChange={() => this.validateCheckbox(inputId)}
            checked
          />
        )}
        <label
          className="form-check-label checkbox-label"
          onClick={() => this.validateCheckbox(inputId)}
        >
          {label}
        </label>
      </div>
    );
  };

  renderAccordion() {
    const filtros = [
      {
        categoria: "Reparos",
        tags: [
          "Eletricista",
          "Encanador",
          "Gesseiro",
          "Marceneiro",
          "Mecânico",
          "Pintor",
          "Vidraceiro"
        ]
      },
      {
        categoria: "Estética",
        tags: [
          "Barbeiro",
          "Cabelereiro",
          "Depilação",
          "Manicure",
          "Maquiagem",
          "Pedicure",
          "Sobrancelha"
        ]
      },
      {
        categoria: "Professores",
        tags: [
          "Aulas de Reforço",
          "Dança",
          "Espanhol",
          "Francês",
          "Inglês",
          "Música",
          "Pré-Vestibular"
        ]
      },
      {
        categoria: "Reparos2",
        tags: [
          "Eletricista",
          "Encanador",
          "Gesseiro",
          "Marceneiro",
          "Mecânico",
          "Pintor",
          "Vidraceiro"
        ]
      },
      {
        categoria: "Estética2",
        tags: [
          "Barbeiro",
          "Cabelereiro",
          "Depilação",
          "Manicure",
          "Maquiagem",
          "Pedicure",
          "Sobrancelha"
        ]
      },
      {
        categoria: "Professores2",
        tags: [
          "Aulas de Reforço",
          "Dança",
          "Espanhol",
          "Francês",
          "Inglês",
          "Música",
          "Pré-Vestibular"
        ]
      }
    ];

    return filtros.map(objeto => {
      return (
        <div className="col-6 col-md-4 col-lg-3 m-0 p-0">
          <div className="accordion-group accordion-card shadow mr-2">
            <div className="accordion-heading">
              <div
                className="accordion-toggle"
                data-toggle="collapse"
                data-parent="#accordionFiltros"
                href={"#collapse" + objeto.categoria}
              >
                <div className="card-heading">
                  <h5 className="green-text" >{objeto.categoria}</h5>
                </div>
              </div>
            </div>
            <div id={"collapse" + objeto.categoria} className="accordion-body collapse in">
              <div className="card-divider"></div>
            </div>
            <div className="inner-card-accordion">
              {objeto.tags.map(tag => {
                return (
                  <div
                    id={"collapse" + objeto.categoria}
                    className="accordion-body collapse out"
                  >
                    <div className="accordion-inner card-item">
                      {this.renderCheckbox(tag)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    });
  }

  limparFiltros() {
    localStorage.setItem("filtrosMarcadosFixHub", "[]");
    this.setState({
      filtrosMarcados: JSON.parse(localStorage.getItem("filtrosMarcadosFixHub"))
    });
  }
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("filtrosMarcadosFixHub")) === null) {
      localStorage.setItem("filtrosMarcadosFixHub", "[]");
    }
    this.setState({
      filtrosMarcados: JSON.parse(localStorage.getItem("filtrosMarcadosFixHub"))
    });
  }
  render() {
    return (
      <div>
        {/* <!-- Background verde água --> */}
        <div className="container-fluid bg-info">
          {/* <!-- Conteúdo principal da página --> */}
          <div className="container bg-white">
            {/* <!-- Primeira row --> */}
            <div className="row">
              <form className="col-12 mt-4 ">
                {/* Início do Jumbotron de borda verde que engloba toda a seção de pesquisa */}
                <div className="jumbotron-clear text-center mx-auto">
                  <div className="form-inline">
                    <label className="green-text">
                      <h1>Encontre Profissionais</h1>
                    </label>
                    <input
                      type="text"
                      className="form-control b-info type-field col-10 mr-2 "
                      placeholder="Busque por termos chave como eletricista, manicure, DJ e etc..."
                    />
                    <Btn text="Pesquisar" onClick={this.getProfissionais} />
                  </div>
                  {/* Inicio do Jumbotron cinza com filtros de pesquisa */}
                  <div className="jumbotron-green col-12 text-left">
                    <div className="accordion" id="accordionFiltros">
                    <Btn
                      text="Limpar Filtros"
                      className="btn btn-white shadow btn-sm mt-2"
                      onClick={this.limparFiltros}
                    />
                      <div className="d-flex flex-wrap">
                        {this.renderAccordion()}
                      </div>
                    </div>
                  </div>
                  {/* Fim do Jumbotron cinza com filtros de pesquisa */}
                </div>
                {/* Fim do Jumbotron de borda verde que engloba toda a seção de pesquisa */}
              </form>
            </div>
            {/* <!-- Fim da primeira row --> */}

            {/* <!-- Inicio da segunda row --> */}
            <div className="row">
              {/* <!-- Imagem à esquerda/baixo --> */}
              <div className="col-sm-12 col-lg-6 mb-4">
                <img
                  src={workers}
                  width="100%"
                  alt="Pessoas apertano as mãos"
                />
              </div>
              {/* <!-- Fim da Imagem à esquerda/baixo --> */}

              {/* <!-- Text-box com conteúdo à direita/abaixo da primeira imagem --> */}
              <div className="col-sm-12 p-3 col-lg-6 rounded my-auto text-center">
                <h1 className="green-text">
                  A qualquer hora em qualquer lugar
                </h1>
                <br />
                <h4 className="text-content text-justify">
                  Encontre o profissional adequado para as suas necessidades,
                  realize um busca mais profunda, contate e negocie com diversos
                  profissionais, cadastre-se para ter acesso a mais informações.
                </h4>
                <br />
                <Btn text="Cadastre-se" lead="/cadastro" />
              </div>
              {/* <!-- Fim da text-box com conteúdo à direita/abaixo da primeira imagem --> */}
            </div>
            {/* Fim da segunda row */}
          </div>
          {/* <!-- Conteúdo principal da página --> */}
        </div>
        {/* <!-- Fim do background verde água --> */}
      </div>
    );
  }
}

export default EncontreProfissionais;
