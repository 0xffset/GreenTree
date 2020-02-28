export class localstorage
{
    setItemLocalStorege(tokenName,tokenValue)
    {
        console.log(`${tokenName} and ${tokenValue}`)
        return localStorage.setItem(tokenName, tokenValue)
    }

    getItemLocalStorege(tokenName, tokenValue) {
        return localStorage.getItem(tokenName, tokenValue)
    }

    removeItemLocalStorage(TokenName) {
        return localStorage.removeItem(TokenName)
    }
}
