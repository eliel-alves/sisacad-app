import { useContext } from 'react'
import DisciplinasContext from './DisciplinasContext';
import Alerta from '../../Alerta';

function Tabela() {

    const { setObjeto, alerta, setAlerta, listaObjetos, remover, setEditar, recuperar} = useContext(DisciplinasContext);

    return (
        <div style={{ padding: '20px' }}>
            <div class="d-flex justify-content-between">
                <h1>Disciplinas</h1>
                <div>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                        onClick={() => {
                            setObjeto({
                                codigo: 0,
                                nome: "",
                                descricao: "", 
                                sigla : ""
                            });
                            setEditar(false);
                            setAlerta({ status: "", message: "" });
                        }}>
                        Novo <i className="bi bi-file-earmark-plus"></i>
                    </button>
                </div>
            </div>

            <Alerta alerta={alerta} />

            {listaObjetos.length === 0 && <h3>Nenhuma disciplina encontrada!</h3>}
            {listaObjetos.length > 0 && (
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Sigla</th>
                            <th scope="col" style={{ textAlign : 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.sigla}</td>
                                <td align="center">
                                    <button className="btn btn-info me-2"
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={() => {
                                            recuperar(objeto.codigo);
                                            setEditar(true);
                                            setAlerta({ status: "", message: "" });
                                        }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto); }}>
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Tabela;