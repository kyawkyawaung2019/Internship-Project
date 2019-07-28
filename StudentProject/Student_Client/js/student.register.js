$(document).ready(function(){
	CreateSelectBoxByCourseName();
});

function BackHome(){
	window.location.assign("index.html");
};

// Insert Student Information
function CreateStudent(){
	var studentName = document.getElementById("reStudentName").value;
	var age = document.getElementById("reAge").value;
	var gender = $('input[name=gender]:checked').val();
	var address = document.getElementById("reAddress").value;
	var courseId = $('#selCourseName option:selected').val();
	
	if(studentName != "" && age != "" && gender != "" && address != "" && courseId != "")
	{
		var postData = {
			"student_name": studentName,
			"age": age,
			"gender": gender,
			"address": address,
			"course_id": courseId,
		};
		$.ajax({
			type: "POST",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Student/",
			data : JSON.stringify(postData),
			dataType: "json",
			success: function(){
				// alert("Sucessfully entered!");
				BackHome();
			}
		});
	}
	else 
	{
		alert("Please fill out this fields.");
	}
};

// Create select box by using course name
function CreateSelectBoxByCourseName(){
	$('#selCourseName').children().remove();
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/Course/",
		// data: JSON.stringify(),
		dataType: "json",
	}).then(function(data){
		for(var i=0; i<data.results.length; i++)
		{
			var val = data.results[i].id;
			var text = data.results[i].course_name;
			
			var option = document.createElement("option");
			option.text = text;
			option.value = val;
			var select = document.getElementById("selCourseName");
			select.appendChild(option);
		}
	});
};

