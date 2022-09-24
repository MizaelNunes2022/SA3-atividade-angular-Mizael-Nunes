// quando a página estiver carregada por completo
$(document).ready(function () {

    $("#entrar").click(function () {
        let email = $("#email").val();
        let senha = $("#senha").val();

        console.log(podeCadastrar(email, senha));

        if (podeCadastrar(email, senha)) {
            alert("Preenchido corretamente")
        } else {
            alert("Preencher todos os campos")
        }
    })

    function podeCadastrar(e, s) {
        if (e == "" || s == "") { //sem preencher
            return false;
        } else {
            return true;
        }
    }

})// fim do jQuery Ready


