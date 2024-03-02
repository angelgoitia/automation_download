$(document).ready(function () {
    generateOptions('since-hour', 1, 12);
    generateOptions('since-minutes', 0, 59);
    generateOptions('until-hour', 1, 12);
    generateOptions('until-minutes', 0, 59);

    $('form').submit(function (event) {
        event.preventDefault(); 
        
        const record = $('#record').val();
        const since_hour = $('#since-hour').val();
        const since_minutes = $('#since-minutes').val();
        const since_am_pm = $('#since-am-p').val();

        const until_hour = $('#until-hour').val();
        const until_minutes = $('#until-minutes').val();
        const until_am_pm = $('#until-am-p').val();
        
        const time_since = since_hour + ":" + since_minutes+" "+since_am_pm;
        const time_until = until_hour + ":" + until_minutes+" "+until_am_pm;

        const download_count = $('#download').val();

        console.log('Número de Registro:', record);
        console.log('Tiempo de Ejecución:'+ time_since +" - "+time_until);
        console.log('Cantidad de Descarga:', download_count);
    });

    $("#selectDirectory").click(function (e) { 
        e.preventDefault();
        window.electronAPI.openDirectory()
    });

});

function generateOptions(selectId, inicio, fin) {
    const select = $('#' + selectId);
    select.empty();

    for (let i = inicio; i <= fin; i++) {
        const optionValue = i < 10 ? '0' + i : i.toString();
        const option = $('<option>').val(optionValue).text(optionValue);
        select.append(option);
    }
}
// Maneja el resultado recibido desde el proceso principal
window.addEventListener('folder-selected', function(event) {
    // Obtiene el resultado desde el evento
    var folderPath = event.detail;
    $("#directory").val(folderPath);
});