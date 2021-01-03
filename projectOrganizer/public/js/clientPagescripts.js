
// Data Picker Initialization
$('.datepicker').datepicker({
    dateFormat: "dd-M-yy" 
});

$(document).ready( function (){
    $('#table_id').DataTable();
    $('#timeline').hide();
    ClientLoad();

});
function ClientLoad(){
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
             console.log(response.setWeddingBudgetDate);
             //HIDE WEDDING BIRTHDAY AND OFFICE PARTY CHOOSE DIV
             if(response.setWeddingBudgetDate){
                $("#BirthdayPartyChooseDiv").hide(); 
                $("#officePartyChooseDiv").hide();
                $("#WeddingChooseDiv").show();
                $('.weddingTimeline').show();
                $('.birthdayTimeline').hide();
                $('.officeTimeline').hide();
                allServiceProvidersLoad("wedding");
                $('#serviceProvidersSection').show();
             } else if(response.setaPartyBudgetDate){
                $("#BirthdayPartyChooseDiv").show(); 
                $('.weddingTimeline').hide();
                $('.birthdayTimeline').show();
                $('.officeTimeline').hide();
                $("#officePartyChooseDiv").hide();
                $("#WeddingChooseDiv").hide();    
                allServiceProvidersLoad("birthdayParty");
                $('#serviceProvidersSection').show();
             }else if(response.setOfficePartyBudgetDate){
                $("#BirthdayPartyChooseDiv").hide(); 
                $("#officePartyChooseDiv").show();
                $("#WeddingChooseDiv").hide();
                $('.weddingTimeline').hide();
                $('.birthdayTimeline').hide();
                $('.officeTimeline').show();
                allServiceProvidersLoad("officeParty");
                $('#serviceProvidersSection').show();
             }else{
                $("#BirthdayPartyChooseDiv").show(); 
                $("#officePartyChooseDiv").show();
                $("#WeddingChooseDiv").show();
                $('.weddingTimeline').hide();
                $('.birthdayTimeline').hide();
                $('.officeTimeline').hide();
                $('#serviceProvidersSection').hide();
             }


            // Success message
            Swal.fire({
                title: "Data Loaded !",
                type: "success",
                icon: "success",
                showConfirmButton: false
            }).then(function (){
                //$('#timeline').show();
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
                $(this).prop("disabled", false); // Re-enable submit button when AJAX call is complete
            }, 1000);
        },
    }); 
} 

function allServiceProvidersLoad(type){
    var requestType = "";
    $.ajax({
        url: "serviceProviderApi",
        type: 'GET',
        success: function(data){
            if(type == "wedding"){
                requestType = "isWedding";
            }else if(type == "birthdayParty"){
                requestType = "isBirthdayParty";
            }else if(type == "officeParty"){
                requestType = "isOfficeParty";
            }
            for(var z in data){
                var object =  data[z];
                if(object[requestType] == "YES"){
                    var element =     " <div class='col-md-2'> "
                    +"    <div class='card text-center'> "
                    +"        <div class='card-body'> "
                    +"            <i class='ion ion-ios-checkmark-circle-outline display-4 text-success'></i> "
                    +"            <h5 class='text-primary mt-4'>" + object.companyName +"</h5> "
                    +"            <p class='text-muted'>" + object.description +"</p> "
                    +"            <div class='mt-4'><a href='"+object.websiteLink+"'  target='_blank' class='btn btn-primary btn-sm'>Go to Website</a></div> "
                    +"        </div> "
                    +"    </div> "
                    +" </div> ";
                    $('#serviceProvidersListDiv').append(element);
                }
            }
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
                    ClientLoad();
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
                    /* $('#weddingModal').modal('hide'); */
                    $('#birthdayModal').modal('hide');
                    ClientLoad();
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

$('#Officedetailssubmitbtn').click(function (event) {
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
        $this = $("#Officedetailssubmitbtn");
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
                    /* $('#weddingModal').modal('hide'); */
                    $('#officePartyModal').modal('hide');
                    ClientLoad();
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
