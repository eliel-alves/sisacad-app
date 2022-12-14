const DialogModal = ( props ) => {
    return (
        <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby={props.idmodal} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={props.idmodal}>{props.labelmodal}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id={props.idformulario} onSubmit={props.acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            {props.children}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success">Salvar
                                <i className="bi bi-check2-circle"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DialogModal;