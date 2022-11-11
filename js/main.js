let login = document.getElementsByClassName("login")[0]
let value = sessionStorage.getItem("valor")
if((value) === "true"){
    login.innerHTML = `
        <a href="#">Cuenta<a>
        `
}else{
    login.innerHTML = `
    <a href="pages/login.html">Inicia sesión<a>
    `
}