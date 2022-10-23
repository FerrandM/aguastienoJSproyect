let login = document.getElementsByClassName("login")[0]
if((sessionStorage.getItem("valor")) === true){
    login.innerHTML = `
        <a href="#">Cuenta<a>
        `
}else{
    login.innerHTML = `
    <a href="pages/login.html">Inicia sesión<a>
    `
}