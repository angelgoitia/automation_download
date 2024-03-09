let optionForm = 1;
let urlWebsite = 'https://gestiona.comunidad.madrid/reee_etiqueta/showBuscadorEtiqueta.jsf';
var form_data;

$(document).ready(function () {

    $('form').submit(function (event) {
        event.preventDefault(); 
        form_data = new FormData(document.querySelector("form"));

        if(optionForm == 1){
            if(!form_data.get("record") || !form_data.get("name_file") || !form_data.get("directory"))
            {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Debe completar todos los campos",
                });
                return false;
	        }else{
                $('#iframe_website').removeAttr('src');
                $('#iframe_website').attr('src', urlWebsite);
            }
        }else{
            if(!form_data.get("formFile") || !form_data.get("directory_2"))
            {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Debe completar todos los campos",
                });
                return false;
	        }else{
                $('#iframe_website').removeAttr('src');
                $('#iframe_website').attr('src', urlWebsite);
            }
        }


    });

    $(".selectDirectory, .inputFile").click(function (e) { 
        e.preventDefault();
        // Send request to node
        window.electronAPI.openDirectory()
    });

    $('.form-check-input').change(function() {
        $("input").val("");
        $('#iframe_website').removeAttr('src');
        $(".formOptions").addClass("d-none");
        optionForm = $(this).val();
        if(optionForm == 1){
            $(".formIndividual").removeClass("d-none");
        }else{
            $(".formMultiple").removeClass("d-none");
        }
    });

    $(".downloadDemo").click(function (e) { 
        e.preventDefault();
        // Send request to node
        window.electronAPI.downloadDemo()
    });

});

// Handle the result received from the main process
window.addEventListener('folder-selected', function(event) {
    // Get the result from the event
    var folderPath = event.detail;
    if(optionForm == 1){
        $("#directory").val(folderPath);
    }else{
        $("#directory_2").val(folderPath);
    }
});

const webview = document.querySelector('#iframe_website');

webview.addEventListener("did-start-loading", () =>{
    console.log("did-start-loading")
})

let urlImg = "";

webview.addEventListener("did-stop-loading", () =>{
    console.log("did-stop-loading");
    urlImg = "";
    if(optionForm == 1){
        webview.executeJavaScript(`
            const input = document.getElementById('buscadorForm:idEregRefdocum');
            input.value = '` + form_data.get("record") +`';
        `);

        // Captura la imagen del contenido del webview
        var iframeDocument = document.getElementById('myIframe').contentDocument;
        html2canvas(iframeDocument.body).then(canvas => {
            // Convierte el canvas en una URL de imagen
            const imgData = canvas.toDataURL();
            
            // Muestra el swal.fire con la imagen capturada
            Swal.fire({
                title: 'Imagen capturada',
                imageUrl: imgData,
                imageAlt: 'Captura de pantalla',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Acción a realizar si se confirma la captura
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // Acción a realizar si se cancela la captura
                }
            });
        });
    }else{

    }

})
