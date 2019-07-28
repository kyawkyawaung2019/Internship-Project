$(document).ready(
	function() {
		$('#progress-bar').hide();
		$('#student').hide();
		$('#course').hide();
		$('#mediaMusic').hide();
		$('#mediaVideo').hide();
		$('#about').hide();

		$('#home').show();
	}
);
//
//////////////////////////////////////////////Show & hide function
//
function ShowHome(){
	$('#progress-bar').hide();
	$('#student').hide();
	$('#course').hide();
	$('#mediaMusic').hide();
	$('#mediaVideo').hide();
	$('#about').hide();
	
	$('#home').show();
};

function ShowStudent(){
	$('#progress-bar').hide();
	$('#home').hide();
	$('#course').hide();
	$('#mediaMusic').hide();
	$('#mediaVideo').hide();
	$('#about').hide();

	$('#student').show();
	
	RetrieveStudent();
};

function ShowCourse(){
	$('#progress-bar').hide();
	$('#home').hide();
	$('#student').hide();
	$('#mediaMusic').hide();
	$('#mediaVideo').hide();
	$('#about').hide();
	
	$('#course').show();
	
	RetrieveCourse();
};

function ShowMusic(){
	$('#progress-bar').hide();
	$('#home').hide();
	$('#student').hide();
	$('#course').hide();
	$('#mediaVideo').hide();
	$('#about').hide();
	
	$('#mediaMusic').show();
};

function ShowVideo(){
	$('#progress-bar').hide();
	$('#home').hide();
	$('#student').hide();
	$('#course').hide();
	$('#mediaMusic').hide();
	$('#about').hide();
	
	$('#mediaVideo').show();
};

function ShowAbout(){
	$('#progress-bar').hide();
	$('#home').hide();
	$('#student').hide();
	$('#course').hide();
	$('#mediaMusic').hide();
	$('#mediaVideo').hide();
	
	$('#about').show();
};
//
//////////////////////////////////////////////Student
//
// Insert Data Into Student Update Modal
function InsertDataIntoStudentUpdateModal(id){
	if(id != "")
	{
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8000/Student/"+id+"/",
			// data: JSON.stringify(),
			dataType: "json",
		}).then(function(data){
			$('#u_student_id').val(data.id);
			$('#student_id_row').hide();
			$('#u_student_name').val(data.student_name);
			$('#u_age').val(data.age);
			$('input[name=gender][value="'+data.gender+'"]').prop("checked", true);
			$('#u_address').val(data.address);
			$.ajax({
				url: "http://localhost:8000/Course/"+data.course_id+"/",
			}).then(function(courseData){
				CreateSelectBoxByCourseName(courseData.course_name);
			});
		});
	}
	else 
	{
		alert("ID is null");
	}
};

// Retrieve Student Information
function RetrieveStudent(){
	$('#studentTableBody').empty();
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/Student/",
		// data: JSON.stringify(),
		dataType: "json",
	}).then(function(data){
		// console.log(data)
		for(let i=0; i<data.results.length; i++){
			$.ajax({
				url: "http://localhost:8000/Course/"+data.results[i].course_id+"/",
			}).then(function(courseData){
				var tr = $('<tr>')
				$(tr).append('<td>'+data.results[i].id+'</td>')
				$(tr).append('<td>'+data.results[i].student_name+'</td>')
				$(tr).append('<td>'+data.results[i].age+'</td>')
				$(tr).append('<td>'+data.results[i].gender+'</td>')
				$(tr).append('<td>'+data.results[i].address+'</td>')
				$(tr).append('<td>'+courseData.course_name+'</td>')
				$(tr).append('<td><button type="button" class="btn btn-danger btn-md" data-toggle="modal" data-target="#studentUpdateModal" onclick="InsertDataIntoStudentUpdateModal('+data.results[i].id+');">EDIT</button></td>')
				$(tr).append('<td><img src="images/delete.png" height="35px" onclick="DeleteStudentById('+data.results[i].id+');"><td>')
				$('#studentTableBody').append(tr);
			});
		}
	});
};

// Update Student Information
function UpdateStudent(){
	var id = document.getElementById("u_student_id").value;
	$('#u_student_id').hide();
	var student_name = document.getElementById("u_student_name").value;
	var age = document.getElementById("u_age").value;
	var gender = $('input[name=gender]:checked').val();
	var address = document.getElementById("u_address").value;
	var courseId = $('#selCourseName option:selected').val();
	
	if(id != "" && student_name != "" && age != "" && gender != "" && address != "" && courseId != "")
	{
		var putData = {
			// "id": id,
			"student_name": student_name,
			"age": age,
			"gender": gender,
			"address": address,
			"course_id": courseId
		};
		$.ajax({
			type : "PUT",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Student/"+id+"/",
			data : JSON.stringify(putData),
			dataType: "json",
			success: function(){
				// alert("Successfully Update!");
				ClearStudentUpdateModal();
				$('#showStudent').click();
			}
		});
	}
	else 
	{
		alert("Please insert data!");
	}
};

// Delete Student Information
function DeleteStudent(){
	alert("Here");
	var id = document.getElementById("u_student_id").value;
	if(id != "")
	{
		$.ajax({
			type : "DELETE",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Student/"+id+"/",
			// data: JSON.stringify(),
			dataType: "json",
			success: function(){
				// alert("Successfully Delete!");
				ClearStudentUpdateModal();
				$('#showStudent').click();
			}
		});
	}
	else
	{
		alert("Please insert student ID");
	}
};

// Delete Student Information by id
function DeleteStudentById(id){
	if(id != "")
	{
		$.ajax({
			type : "DELETE",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Student/"+id+"/",
			// data: JSON.stringify(),
			dataType: "json",
			success: function(){
				// alert("Successfully Delete!");
				ClearStudentUpdateModal();
				$('#showStudent').click();
			}
		});
	}
	else
	{
		alert("Please insert student ID");
	}
};
//
/////////////////////////////////////////////Course
// Insert Data Into Course Update Modal
function InsertDataIntoCourseUpdateModal(id){
	if(id != "")
	{
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8000/Course/"+id+"/",
			// data: JSON.stringify(),
			dataType: "json",
		}).then(function(data){
			$('#u_course_id').val(data.id);
			$('#course_id_row').hide();
			$('#u_course_name').val(data.course_name);
			$('#u_major').val(data.major);
		});
	}
	else 
	{
		alert("ID is null");
	}
};

// Retrieve Course Information
function RetrieveCourse(){
	$('#courseTableBody').empty();
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/Course/",
		// data: JSON.stringify(),
		dataType: "json",
	}).then(function(data){
		// console.log(data.next)
		for(var i=0; i<data.results.length; i++){
			var id = data.results[i].id;
			var course_name = data.results[i].course_name;
			var major = data.results[i].major;
			document.getElementById("courseTableBody").insertRow(-1).innerHTML = '<tr><td>'+id+'</td>'+
																			'<td>'+course_name+'</td>'+
																			'<td>'+major+'</td>'+
																			'<td><button type="button" class="btn btn-danger btn-md" data-toggle="modal" data-target="#courseUpdateModal" onclick="InsertDataIntoCourseUpdateModal('+id+');">EDIT</button></td>'+
																			'<td><img src="images/delete.png" height="35px" onclick="DeleteCourseById('+id+');"></td></tr>';
		}
	});
};

// Update Course Information
function UpdateCourse(){
	var id = document.getElementById("u_course_id").value;
	var course_name = document.getElementById("u_course_name").value;
	var major = document.getElementById("u_major").value;
	if(id != "" && course_name != "" && major != "")
	{
		var putData = {
			// "id": id,
			"course_name": course_name,
			"major": major
		};
		$.ajax({
			type : "PUT",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Course/"+id+"/",
			data : JSON.stringify(putData),
			dataType: "json",
			success: function(){
				// alert("Successfully Update!");
				ClearCourseUpdateModal();
				$('#showCourse').click();
			}
		});
	}
	else 
	{
		alert("Please insert data");
	}
};

// Delete Course Information
function DeleteCourse(){
	var id = document.getElementById("u_course_id").value;
	if(id != "")
	{
		$.ajax({
			type : "DELETE",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Course/"+id+"/",
			// data: JSON.stringify(),
			dataType: "json",
			success: function(){
				// alert("Successfully Delete!");
				ClearCourseUpdateModal();
				$('#showCourse').click();
			}
		});
	}
	else 
	{
		alert("Please insert course ID");
	}
};

// Delete Course Information by id
function DeleteCourseById(id){
	if(id != "")
	{
		$.ajax({
			type : "DELETE",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Course/"+id+"/",
			// data: JSON.stringify(),
			dataType: "json",
			success: function(){
				// alert("Successfully Delete!");
				ClearCourseUpdateModal();
				$('#showCourse').click();
			}
		});
	}
	else 
	{
		alert("Please insert course ID");
	}
};
//
/////////////////////////////////////////////Clear & Hide Modal Data
// Clear studentUpdateModal data
function ClearStudentUpdateModal(){
	document.getElementById("u_student_id").value = "";
	document.getElementById("u_student_name").value = "";
	document.getElementById("u_age").value = "";
	// document.getElementById("u_gender").value = "";
	document.getElementById("u_address").value = "";
	//
	$('#studentUpdateModal').modal('hide');
};

// Clear courseUpdateModal data
function ClearCourseUpdateModal(){
	document.getElementById("u_course_id").value = "";
	document.getElementById("u_course_name").value = "";
	document.getElementById("u_major").value = "";
	//
	$('#courseUpdateModal').modal('hide');
};

//////////////////////////////////////////////////////////////
// Student register page
function StudentRegister(){
	window.location.assign("student.register.html");
};

// Course register page
function CourseRegister(){
	window.location.assign("course.register.html");
};

// Create select box by using course name
function CreateSelectBoxByCourseName(courseName){
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
			if(text == courseName)
			{
				option.selected = true;
			}
			option.value = val;
			var select = document.getElementById("selCourseName");
			select.appendChild(option);
		}
	});
};
