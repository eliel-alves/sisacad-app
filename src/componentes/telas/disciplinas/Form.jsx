import { useContext } from 'react'
import DialogModal from '../DialogModal';
import TextField from '../TextField';
import DisciplinasContext from './DisciplinasContext';

function Form() {
    const { objeto, handleChange, acaoCadastrar } = useContext(DisciplinasContext);

    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <div>
            <DialogModal id="modalEdicao" idmodal="modalFormulario"
            labelmodal="Edição de Disciplina" idformulario="formulario"
            acaoCadastrar={acaoCadastrar}>         

                <TextField id="txtID"
                label="Código" tipo="number" readonly={true}
                requerido={false} name="codigo" value={objeto.codigo}
                onchange={handleChange}
                maximocaracteres={5}/>

                <TextField id="txtNome"
                label="Nome" tipo="text" padding="3"
                requerido={true} name="nome" value={objeto.nome}
                onchange={handleChange}
                maximocaracteres={40}/>

                <TextField id="txtDescricao"
                label="Descrição" tipo="text" padding="3"
                requerido={true} name="descricao" value={objeto.descricao}
                onchange={handleChange}
                maximocaracteres={40}/>

                <TextField id="txtSigla"
                label="Sigla" tipo="text" padding="3"
                requerido={true} name="sigla" value={objeto.sigla}
                onchange={handleChange}
                maximocaracteres={4}/>
                
            </DialogModal>
        </div>

    )
}

export default Form;