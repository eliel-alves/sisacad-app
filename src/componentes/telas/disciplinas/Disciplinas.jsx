import { useState, useEffect } from 'react';
import DisciplinasContext from './DisciplinasContext';
import Tabela from './Tabela';
import Form from './Form';
import WithAuth from "../../seg/withAuth";
import Autenticacao from "../../seg/Autenticacao";
import { useNavigate } from "react-router-dom";

function Disciplinas() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", descricao: "", sigla: ""
    })

    const recuperaDisciplinas = async () => {
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/disciplinas`,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status);
                })
                .then(data => setListaObjetos(data))
                .catch(err => setAlerta({ "status": "error", "message": err }))
        } catch (err) {
            setAlerta({ "status": "error", "message": err })
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }
	
    const recuperar = async codigo => {
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/disciplinas/${codigo}`,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status);
                })
                .then(data => setObjeto(data))
                .catch(err => setAlerta({ "status": "error", "message": err }))
        } catch(err) {
            setAlerta({ "status": "error", "message": err })
            window.location.reload();
            navigate("/login", { replace: true });
        }
     }

     const acaoCadastrar = async e => {
         e.preventDefault();
         const metodo = editar ? "PUT" : "POST";
         try {
             await fetch(`${process.env.REACT_APP_ENDERECO_API}/disciplinas`,
                 {
                     method: metodo,
                     headers: {
                         "Content-Type": "application/json",
                         "x-access-token": Autenticacao.pegaAutenticacao().token
                     },
                     body: JSON.stringify(objeto)
                 })
                 .then(response => {
                     if (response.ok) {
                         return response.json();
                     }
                     throw new Error('Erro código: ' + response.status);
                 })
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
         recuperaDisciplinas();
     }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await fetch(`${process.env.REACT_APP_ENDERECO_API}/disciplinas/${objeto.codigo}`,
                    {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": Autenticacao.pegaAutenticacao().token
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Erro código: ' + response.status);
                    })
                    .then(json => setAlerta({
                        "status": json.status,
                        "message": json.message
                    }))
                recuperaDisciplinas();
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

export default WithAuth(Disciplinas);