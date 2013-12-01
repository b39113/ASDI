//Boyd Tiffin
//1312 - ASDI

// This checks to see if the page has loaded, then executes the code within
$(function(){


// Pageinit function runs the code inside when that page is called. This is due to jQM and how pages are coded within jQM.

// HOME page and specific functions to run on load
	$('#home').on('pageinit', function(){
		//code needed for home page goes here
	});	

// ADDITEM page and specific functions runnign on load	
	$('#additem').on('pageinit', function(){
		//any other code needed for addItem page goes here
		var myForm = $('#addService'),
			addServiceFormErrorsLink = $('#addServiceFormErrorsLink');
		    myForm.validate({
			    invalidHandler: function(myForm, validator){
				    addServiceFormErrorsLink.click();
		// THis is pulling the added jQM label of required and does not revalidate each time the form is submitted
				    var html = '';
				    for(var key in validator.submitted){
					    var label = $('label[for^="'+ key + '"]').not('[generated]');
					    var legend = label.closest('fieldset').find('.ui-controlgroup-label');
					    var fieldName = legend.length ? legend.text() : label.text();
					    html += '<li>' + fieldName +'</li>';
				    };
				    $("#addServiceFormErrors ul").html(html);
			    },
			    submitHandler: function(){
				    var data = myForm.serializeArray();
				    storeItem();
			    }
		    });
	});

// OPTIONS page functions that need to run specific to that page
	$('#options').on('pageinit', function(){
		$("#butClearAll").bind("click", function(){
			//Prompt user that this is unrecoverable and get confirmation
			var x = confirm("Clear All Data? This is not reversible");
			if(x){
				// User selected ok, so run the function
				deleteAll();
			}else{
				//User selected CANCEL, prompt and move on
				alert("Data has not been cleared! That was close...");
			}
			
		});
	});	
	
// VIEW ALL RECORDS PAGE
	$('#viewAll').on('pageinit', function(){
		// CORRECT APPEND STATEMENT
		for(var i=0, j=localStorage.length; i<j; i++){
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			// String to Obj
			var obj = JSON.parse(value); 
			console.log(obj);
			var createUL = document.createElement('ul');
			createUL.setAttribute("data-role", "listview");
			createUL.setAttribute("data-split-icon", "gear");
			createUL.setAttribute("data-inset", "true");
			$('#allRecordsParent').append(createUL).slideDown();
/* 			getImage(createSubList, obj.status[1]); */
			for(var d in obj){
				var createSubLi = document.createElement('li');
				createUL.appendChild(createSubLi);
				var optSubText = obj[d][0]+" " +obj[d][1];
				createSubLi.innerHTML = optSubText;
/* 				createSubList.appendChild(createLinks); */
			}
/* 			createItemLinks(localStorage.key(i), createLinks); // Creates the overall app edit and delete links */
		}
	});	


// Below are functions that can be called from any page, everything here needs to be stored as variables so that it is not run everytime a page loads

	var storeItem = function(key){
		if(!key){
			var id = Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		// Get all form data in an Object
		var idea = {};
			idea.scTitle = ["Title:", $('#scTitle').val()];
			idea.scDate = ["Service Date:", $('#scDate').val()];
			idea.scCompany = ["Servicer Name:", $('#scCompany').val()];
			idea.scPhone = ["Servicer Phone:", $('#scPhone').val()];
			idea.scWarranty = ["Servicer Warranty?:", $('#scWarranty').val()];
			idea.scWarDate = ["Warranty Expire:", $('#scWarDate').val()];
			idea.scDesc = ["Description:", $('#scDesc').val()];
			// Add Radio Check to get value
		localStorage.setItem(id, JSON.stringify(idea));
		alert("Service Record Logged!");
		window.location="#home";
	};
	
	var editItem = function(){
		alert("editItem function was called");
	};
	
	var deleteAll = function(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All data has been cleared!");
			window.location="#home";
			return false;
		}
	};
	
	var deleteItem = function(){
		alert("deleteItem function was called");
	};
	
});