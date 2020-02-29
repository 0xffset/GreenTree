export class localstorage
{
    setItemLocalStorege(tokenName,tokenValue)
    {
       
        return localStorage.setItem(tokenName, tokenValue)
    }

    getItemLocalStorege(tokenName, tokenValue) {
        return localStorage.getItem(tokenName, tokenValue)
    }

    removeItemLocalStorage(TokenName) {
        return localStorage.removeItem(TokenName)
    }
}
