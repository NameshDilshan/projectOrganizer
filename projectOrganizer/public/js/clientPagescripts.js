
// Data Picker Initialization
$('.datepicker').datepicker({
    dateFormat: "dd-M-yy" 
});

$(document).ready( function (){
    $('#table_id').DataTable();
    $('#timeline').hide();
    weddingClientLoad();
    allServiceProvidersLoad();

});
function weddingClientLoad(){
    var googleId = $('#googleId').val();
    var url = "clientApi/" + googleId;
    $.ajax({
        url: url,
        type: 'GET',
        success: function (response) {
            console.log(response);
            var response = response[0];
            for(var k in response) {
                $("[name='" + k + "']").val(response[k]);
                $("#"+ k).html(response[k]);
             }
             
             //HIDE WEDDING BIRTHDAY AND OFFICE PARTY CHOOSE DIV
             /* if($("[name='setWeddingBudgetDate']").val() != null){
                $("#BirthdayPartyChooseDiv").hide(); 
                $("#officePartyChooseDiv").hide();
                $("#WeddingChooseDiv").show();
                allServiceProvidersLoad();
             } else if($("[name='setWeddingBudgetDate']").val() != null){
                $("#BirthdayPartyChooseDiv").hide(); 
                $("#officePartyChooseDiv").hide();
                $("#WeddingChooseDiv").show();
                allServiceProvidersLoad();
             } 
             if($("[name='setWeddingBudgetDate']").val() != null){
                $("#BirthdayPartyChooseDiv").hide(); 
                $("#officePartyChooseDiv").hide();
                $("#WeddingChooseDiv").show();
                allServiceProvidersLoad();
             } */ 
            // Success message
            Swal.fire({
                title: "Data Loaded !",
                type: "success",
                icon: "success",
                showConfirmButton: false
            }).then(function (){
                $('#timeline').show();
            });
        },
        error: function () {
            // Fail message
            Swal.fire(
                ' Sorry ',
                'It seems that my server is not responding. Please try again later!!',
                'error'
                );
            //clear all fields
            $("#weddingTaskForm").trigger("reset");
        },
        complete: function () {
            setTimeout(function () {
                $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
            }, 1000);
        },
    }); 
} 

function allServiceProvidersLoad(){
    $.ajax({
        url: "serviceProviderApi",
        type: 'GET',
        success: function (response) {
            
            for(i=0; i < response.length; i++){
                var obj =  response[i];
                console.log(obj.companyName);
                var element =     " <div class='col-md-2'> "
                +"    <div class='card text-center'> "
                +"        <div class='card-body'> "
                +"            <i class='ion ion-ios-checkmark-circle-outline display-4 text-success'></i> "
                +"            <h5 class='text-primary mt-4'>" + obj.companyName +"</h5> "
                +"            <p class='text-muted'>" + obj.description +"</p> "
                +"            <div class='mt-4'><a href='"+obj.websiteLink+"'  target='_blank' class='btn btn-primary btn-sm'>Go to Website</a></div> "
                +"        </div> "
                +"    </div> "
                +" </div> ";
                $('#serviceProvidersListDiv').append(element);
            }
            
             //HIDE WEDDING BIRTHDAY AND OFFICE PARTY CHOOSE DIV
             /* if($("[name='setWeddingBudgetDate']").val() != null){
                $("#BirthdayPartyChooseDiv").hide(); 
                $("#officePartyChooseDiv").hide();
                $("#WeddingChooseDiv").show();
             } else if($("[name='setWeddingBudgetDate']").val() != null){
                $("#BirthdayPartyChooseDiv").hide(); 
                $("#officePartyChooseDiv").hide();
                $("#WeddingChooseDiv").show();
             } 
             if($("[name='setWeddingBudgetDate']").val() != null){
                $("#BirthdayPartyChooseDiv").hide(); 
                $("#officePartyChooseDiv").hide();
                $("#WeddingChooseDiv").show();
             } */ 

            // Success message
            /* Swal.fire({
                title: "Data Loaded !",
                type: "success",
                icon: "success",
                showConfirmButton: false
            }).then(function (){
                $('#timeline').show();
            }); */
        },
        error: function () {
            // Fail message
            /* Swal.fire(
                ' Sorry ',
                'It seems that my server is not responding. Please try again later!!',
                'error'
                ); */
            //clear all fields
        },
        complete: function () {

        },
    }); 
} 

$('#Weddingdetailssubmitbtn').click(function (event) {
    event.preventDefault(); // prevent default submit behaviour
    var formValues = $('input');
    var googleId = $('#googleId').val();
    console.log(formValues);
    var obj = {};
    $.map(formValues, function(n, i) {
        obj[n.name] = $(n).val();
    });
    var data = obj;
    console.log(data); 
        $this = $("#Weddingdetailssubmitbtn");
        $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
        var url = "clientApi/" + googleId;
        $.ajax({
            url: url,
            data: data,
            type: 'PUT',
            success: function () {
                // Success message
                Swal.fire({
                    title: "Your Tasks Saved !",
                    type: "success",
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }).then(function (){
                    $("#weddingTaskForm").trigger("reset");   //clear all fields
                    $('#weddingModal').modal('hide');
                    weddingClientLoad();
                });
            },
            error: function () {
                // Fail message
                Swal.fire(
                    ' Sorry ',
                    'It seems that my server is not responding. Please try again later!!',
                    'error'
                    );
                //clear all fields
                $("#weddingTaskForm").trigger("reset");
            },
            complete: function () {
                setTimeout(function () {
                    $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                }, 1000);
            },
        }); 
});

$('#Birthdaydetailssubmitbtn').click(function (event) {
    event.preventDefault(); // prevent default submit behaviour
    var formValues = $('input');
    var googleId = $('#googleId').val();
    console.log(formValues);
    var obj = {};
    $.map(formValues, function(n, i) {
        obj[n.name] = $(n).val();
    });
    var data = obj;
    console.log(data); 
        $this = $("#Birthdaydetailssubmitbtn");
        $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
        var url = "clientApi/" + googleId;
        $.ajax({
            url: url,
            data: data,
            type: 'PUT',
            success: function () {
                // Success message
                Swal.fire({
                    title: "Your Tasks Saved !",
                    type: "success",
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }).then(function (){
                    $("#weddingTaskForm").trigger("reset");   //clear all fields
                    $('#weddingModal').modal('hide');
                    $('#birthdayModal').modal('hide');
                    weddingClientLoad();
                });
            },
            error: function () {
                // Fail message
                Swal.fire(
                    ' Sorry ',
                    'It seems that my server is not responding. Please try again later!!',
                    'error'
                    );
                //clear all fields
                $("#weddingTaskForm").trigger("reset");
            },
            complete: function () {
                setTimeout(function () {
                    $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                }, 1000);
            },
        }); 
});


