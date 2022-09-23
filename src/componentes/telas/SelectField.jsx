
const SelectField = (props) => {

    return (
        <div div className={'form-group mt-' + props.padding}>

            <label htmlFor={props.id} className="form-label fw-semibold">
                {props.label}
            </label>

            <select
                required={props.requerido}
                className="form-control"
                id={props.id}
                value={props.value}
                name={props.name}
                onChange={props.onchange}>
                <option disabled="true" value="">Selecione uma opção</option>
                {props.children}
            </select>            

            <div className="valid-feedback">
                {props.msgvalido}
            </div>

            <div className="invalid-feedback">
                {props.label} é um campo obrigatório!
            </div>

        </div>
    );
    
}

export default SelectField;