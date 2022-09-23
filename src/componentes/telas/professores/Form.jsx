import { useContext } from 'react'
import DialogModal from '../DialogModal';
import TextField from '../TextField';
import SelectField from '../SelectField';
import ProfessoresContext from './ProfessoresContext';

function Form() {
    const { objeto, handleChange, acaoCadastrar, listaDisciplinas } = useContext(ProfessoresContext);

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
            labelmodal="Edição de Professor" idformulario="formulario"
            acaoCadastrar={acaoCadastrar}>

                <TextField id="txtID"
                    label="Código" tipo="number" readonly={true}
                    requerido={false} name="codigo" value={objeto.codigo}
                    onchange={handleChange}
                    maximocaracteres={5} />

                <TextField id="txtNome"
                    label="Nome" tipo="text" readonly={false}
                    requerido={true} name="nome" value={objeto.nome}
                    onchange={handleChange} padding="3"
                    maximocaracteres={40} />

                <TextField id="txtCpf"
                    label="CPF" tipo="text" readonly={false}
                    requerido={true} name="cpf" value={objeto.cpf}
                    onchange={handleChange} padding="3"
                    maximocaracteres={11} />
                
                <TextField id="txtTitulacao"
                    label="Titulação" tipo="text" readonly={false}
                    requerido={true} name="titulacao" value={objeto.titulacao}
                    onchange={handleChange} padding="3"
                    maximocaracteres={40} />
                    
                <SelectField value={objeto.disciplina}
                    id="selectDisciplina" name="disciplina" label="Disciplina"
                    onchange={handleChange} padding="3"
                    requerido={true}>
                    {listaDisciplinas.map((dis) => (
                        <option key={dis.codigo} value={dis.codigo}>
                            {dis.nome}
                        </option>
                    ))}
                </SelectField>

            </DialogModal>
        </div>

    )
}

export default Form;