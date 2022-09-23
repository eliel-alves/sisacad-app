import { useState, useEffect } from 'react';
import DisciplinasContext from './DisciplinasContext';
import Tabela from './Tabela';
import Form from './Form'

function Disciplinas() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", descricao: "", sigla : ""
    })
    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperaDisciplinas = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/disciplinas`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => console.log('Erro: ' + err))
    }
	
    const recuperar = async codigo => {    
         await fetch(`${process.env.REACT_APP_ENDERECO_API}/disciplinas/${codigo}`)
             .then(response => response.json())
             .then(data => setObjeto(data))
             .catch(err => console.log(err))
     }

     const acaoCadastrar = async e => {
         e.preventDefault();
         const metodo = editar ? "PUT" : "POST";
         try {
             await fetch(`${process.env.REACT_APP_ENDERECO_API}/disciplinas`, {
                 method: metodo,
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify(objeto),
             }).then(response => response.json())
                 .then(json => {
                     setAlerta({ status: json.status, message: json.message });
                     setObjeto(json.objeto);
                     if (!editar) {
                         setEditar(true);
                     }
                 });
         } catch (err) {
             console.error(err.message);
         }       
         recuperaDisciplinas();
     }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/disciplinas/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaDisciplinas();
            } catch (err) {
                console.log('Erro: ' + err)
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaDisciplinas();
    }, []);

    return (
        <DisciplinasContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,               
                recuperaDisciplinas,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar,
                handleChange
            }
        }>
            <Tabela />
            <Form />
        </DisciplinasContext.Provider>
    );
}

export default Disciplinas;