$(document).ready(function() {
    updateData();
});

function updateData() {
    $.get($(location).attr("href") + 'update',function(data,status) {
        if(status == 'success') {
            $('#moldingmachine1').empty();
            $.each(data, function(key, item) {
                var processInfo = calculateStatus(item.temp);
                var processStatus = setStatus(item.temp);
                
                $('#moldingmachine1').append('<tr>' +
                        '<td scope="row">' + item.name + '</td>' +
                        '<td><div>' + item.temp + '°C</div></td>' +
                        '<td><div class="progress">' +
                        '<div class="progress-bar progress-bar-striped progress-bar-animated ' + processInfo + '" id="'+ item.name +'-progress" role="progressbar" aria-valuenow="' + item.temp/10 + '" aria-valuemin="0" aria-valuemax="1000" style="width: '+ item.temp/10 +'%"></div></div></td><td>' +
                        processStatus + '</td></tr>');
            });
        }
    });
 }

function setStatus(temp) {
    if(temp <= 750) {
        return '<div class="text-center"><font color="green"><b>OK</b></font></div>';
    }
    if(temp > 750 && temp <= 900) {
        return '<div class="text-center"><font color="orange"><b>WARNING</b></font></div>';
    } else {
        return '<div class="text-center"><font color="red"><b>DANGER</b></font></div>';
    }
}

function calculateStatus(temp) {
    if(temp <= 250) {
        return "bg-success";
    }
    if(temp > 250 && temp <= 500) {
        return "bg-info";
    }
    if(temp > 500 && temp <= 750) {
        return "bg-warning";
    }
    if(temp > 750) {
        return "bg-danger";
    }
}

 setInterval(updateData, 1*1000);


 