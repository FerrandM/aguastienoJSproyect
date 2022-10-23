const form_register = document.querySelector("form")

form_register.addEventListener("submit", (e)=>{
    e.preventDefault()
    let form = e.target
    const usuario = {
        nombre: form.children[0].children[0].value,
        email: form.children[1].children[0].value,
        password: form.children[2].children[0].value,
        rpassword: form.children[3].children[0].value
    }
    const usuario_storage = JSON.stringify(usuario)
    localStorage.setItem("usuario"+"("+form.children[1].children[0].value + ")", usuario_storage)
})
