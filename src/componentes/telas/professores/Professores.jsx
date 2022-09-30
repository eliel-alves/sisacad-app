import { useState, useEffect } from 'react';
import ProfessoresContext from './ProfessoresContext';
import Tabela from './Tabela';
import Form from './Form'

function Professores() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", cpf: "", titulacao: "", disciplina: ""
    })
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaDisciplinas, setListaDisciplinas] = useState([]);

    const recuperaProfessores = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/professores`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))
    }

    const recuperaDisciplinas = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/disciplinas`)
            .then(response => response.json())
            .then(data => setListaDisciplinas(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))
    }
	
    const recuperar = async codigo => {    
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/professores/${codigo}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))
    }

     const acaoCadastrar = async e => {
         e.preventDefault();
         const metodo = editar ? "PUT" : "POST";
         try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/professores`, {
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
            setAlerta({ "status": "error", "message": err })
        }       
        recuperaProfessores();
     }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/professores/${objeto.codigo}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
                recuperaProfessores();
            } catch (err) {
                setAlerta({ "status": "error", "message": err })
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaProfessores();
        recuperaDisciplinas();
    }, []);

    return (
        <ProfessoresContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,    
                recuperaProfessores,
                remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar,
                handleChange,
                listaDisciplinas
            }
        }>
            <Tabela />
            <Form />
        </ProfessoresContext.Provider>
    );
}

export default Professores;