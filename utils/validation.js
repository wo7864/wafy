export const emailValidation = (text) => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(regExp.test(text)) return true;
    return false;
}

export const pwValidation = (text) => {
    const regex = /^[A-Za-z0-9]{6,12}$/;
    if(regex.test(text)) return true;
    return false;
}

export const pwcValidation = (pw, pwc) => {
    if(pw === pwc) return true;
    return false;
}