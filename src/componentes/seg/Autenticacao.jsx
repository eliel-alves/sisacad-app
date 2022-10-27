import jwt_decode from "jwt-decode";

const NOMEAPP = 'LPESISACAD';

const pegaAutenticacao = () => {
    const localStorageAutenticacao = localStorage.getItem(NOMEAPP + '/autenticacao');

    const autenticacao = localStorageAutenticacao ?
        JSON.parse(localStorageAutenticacao) : null;

    if (autenticacao == null) {
        return null;
    }

    if (autenticacao.auth === false) {
        return null;
    } else {
        let decoded = jwt_decode(autenticacao.token);

        if (decoded.exp <= Math.floor( new Date() / 1000 )) {
            console.log('Token expirado');
            logout();
            return null;
        } else {
            return autenticacao;
        }
    }
}

const gravaAutenticacao = (json) => {
    const decodificado = jwt_decode(json.token);
    json.nome_usuario = decodificado.nome_usuario;
    json.email_usuario = decodificado.email_usuario;
    localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify(json));
}

const logout = () => {
    // Limpando o localStorage
    localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify({
        "auth": false,
        "token": ""
    }));
}

export default {
    pegaAutenticacao, gravaAutenticacao, logout
}