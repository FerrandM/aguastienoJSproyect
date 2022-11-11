const form_login = document.querySelector("form")

function login (succesfull){
    if(succesfull == true){
        window.location.href="../index.html"
    }
}

for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i)
    console.log("Key o clave: " + clave);
    console.log("Valor asignado: " + localStorage.getItem(clave));
}

form_login.addEventListener("submit",(e)=>{
    e.preventDefault()
    let form = e.target
    const usuario_login = {
        email: form.children[2].children[0].value,
        password: form.children[3].children[0].value
    }
    let clave = ("usuario("+usuario_login.email+")");

    let flag = true 
    let val = false

    let redpace = document.getElementById("password-check")

if ((JSON.parse(localStorage.getItem(clave))).email === usuario_login.email){
    if((JSON.parse(localStorage.getItem(clave))).password === usuario_login.password){
        val = true
        login(val)
        sessionStorage.setItem("valor", true)
    }else{ 
        redpace.innerHTML = `
            <input type="password" id="form2Example27" class="form-control form-control-lg" />
            <label class="form-label" for="form2Example27">Password</label>
            <h6>Contraseña o Email incorrecto</h6>
        `
        flag = false
    }
}
})   
