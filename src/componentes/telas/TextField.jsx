
const TextField = ({ id, label, tipo, readonly, requerido,
    name, value, onchange, msgvalido, maximocaracteres, padding }) => {

    return (
       <div div className={'form-group mt-' + padding}>

            <label htmlFor={id} className="form-label fw-semibold">
                {label}
            </label>

            <input type={tipo}
                disabled={readonly}
                readOnly={readonly}
                required={requerido}
                className="form-control"
                id={id}
                name={name}
                value={value}
                onChange={onchange}
                maxLength={maximocaracteres}
            />

            <div className="valid-feedback">
                {msgvalido}
            </div>

            <div className="invalid-feedback">
                {label} é um campo obrigatório!
            </div>

        </div>
    );
    
}

export default TextField;