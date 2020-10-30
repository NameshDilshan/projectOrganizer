$(document).ready( function (){
	loadServiceProviders();
	loadClients();
});

function loadServiceProviders(){ 													//  S E L E C T    I D   T O    C L I C K    F U N C T I O N 
	$.ajax({
		type : "GET",
		url : "serviceProviderApi",
		/* data : {
			"id" : id,
		}, */
		success : function(data) {
			var Response = data;
//			function pastCommentsTable(Response) {
				var tableID = "#serviceProvidersTable";
				var serviceProvidersTable;
				if ($.fn.dataTable.isDataTable(tableID)) {
					serviceProvidersTable = $(tableID).DataTable();
				} else {
					serviceProvidersTable = $(tableID).DataTable({
						paging : false
					});
				}
				  serviceProvidersTable.clear();
				 serviceProvidersTable.destroy() ; 		
						for ( var key in Response) {
							if (Response.hasOwnProperty(key)) {
								var val = Response[key];
								var rowNode = serviceProvidersTable.row.add(
										[ 		val.companyName, 
												val.tel,
												val.email,
												val.address,
												val.ownerName,
												val.ownerIdNo,
												val.websiteLink,
												val.description,
												val.isWedding,
												val.isBirthdayParty,
												val.isOfficeParty,
												" <button id="+val.id+" type = \"button\" class=\"btn btn-danger\" onClick=\"deleteServiceProvider(this.id)\" >Delete Client</button> "
										]).node();
                                        serviceProvidersTable.draw();
							}
						}
				$(function() {
					$('#serviceProvidersTable').DataTable({
						"paging" : true,
						"lengthChange" : true,
						"searching" : true,
						"ordering" : true,
						"info" : true,
						"autoWidth" : false
					});
				});
		},
		error : function(e) {
			console.log("ERROR: ", e);
			alert("Please Contact the System Admin");
		},
		done : function(e) {
			console.log("DONE");
		},
		complete : function(e) {
			console.log("serviceProvidersTable Completed ===");
		}
	});
}

function loadClients(){ 													//  S E L E C T    I D   T O    C L I C K    F U N C T I O N 
	$.ajax({
		type : "GET",
		url : "clientApi",
		/* data : {
			"id" : id,
		}, */
		success : function(data) {
			var Response = data;
//			function pastCommentsTable(Response) {
				var tableID = "#clientsTable";
				var clientsTable;
				if ($.fn.dataTable.isDataTable(tableID)) {
					clientsTable = $(tableID).DataTable();
				} else {
					clientsTable = $(tableID).DataTable({
						paging : false
					});
				}
				clientsTable.clear();
				clientsTable.destroy() ; 		
						for ( var key in Response) {
							if (Response.hasOwnProperty(key)) {
								var val = Response[key];
								var No = ++key;
								var rowNode = clientsTable.row.add(
										[ 		No,
												val.name, 
												val.email,
												" <button id="+val.googleId+" type = \"button\" class=\"btn btn-danger\" onClick=\"deleteitem(this.id)\" >Delete Client</button> "
												
										]).node();
                                        clientsTable.draw();
							}
						}
				$(function() {
					$('#clientsTable').DataTable({
						"paging" : true,
						"lengthChange" : true,
						"searching" : true,
						"ordering" : true,
						"info" : true,
						"autoWidth" : false
					});
				});
		},
		error : function(e) {
			console.log("ERROR: ", e);
			alert("Please Contact the System Admin");
		},
		done : function(e) {
			console.log("DONE");
		},
		complete : function(e) {
			console.log("clientsTable Completed ===");
		}
	});
}


function deleteitem(id){
	var url = "clientApi/"+ id;
	$.ajax({
		type : "DELETE",
		url : url,
		success : function(data) {
			Swal.fire({
                title: "Deleted Successfully",
                type: "success",
                icon: "success",
                showConfirmButton: false
            }).then(function (){
                loadServiceProviders();
				loadClients();
            });
		},
		error : function(e) {
			console.log("ERROR: ", e);
			Swal.fire(
                ' Sorry Delete Failed !!',
                'It seems that my server is not responding. Please try again later!!',
                'error'
                );
		},
		done : function(e) {
			console.log("DONE");
		},
		complete : function(e) {
			console.log("clientsTable Completed ===");
		}
	});
}

$('#serviceProvidersubmitbtn').click(function (event) {
    event.preventDefault(); // prevent default submit behaviour
    var formValues = $('input');
    console.log(formValues);
    var obj = {};
    $.map(formValues, function(n, i) {
        obj[n.name] = $(n).val();
    });
    var data = obj;
    console.log(data); 
        $this = $("#serviceProvidersubmitbtn");
        $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
        var url = "serviceProviderApi";
        $.ajax({
            url: url,
            data: data,
            type: 'POST',
            success: function () {
                // Success message
                Swal.fire({
                    title: "Service Provider Saved !",
                    type: "success",
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }).then(function (){
                    $("#serviceProviderForm").trigger("reset");   //clear all fields
                    $('#serviceProviderCreationModal').modal('hide');
                    loadServiceProviders();
					loadClients();
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
                $("#serviceProviderForm").trigger("reset");
            },
            complete: function () {
                setTimeout(function () {
                    $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                }, 1000);
            },
        }); 
});


function deleteServiceProvider(id){
	var url = "serviceProviderApi/"+ id;
	$.ajax({
		type : "DELETE",
		url : url,
		success : function(data) {
			Swal.fire({
                title: "Deleted Successfully",
                type: "success",
                icon: "success",
                showConfirmButton: false
            }).then(function (){
                loadServiceProviders();
				loadClients();
            });
		},
		error : function(e) {
			console.log("ERROR: ", e);
			Swal.fire(
                ' Sorry Delete Failed !!',
                'It seems that my server is not responding. Please try again later!!',
                'error'
                );
		},
		done : function(e) {
			console.log("DONE");
		},
		complete : function(e) {
			console.log("serviceProviderApi Completed ===");
		}
	});
}