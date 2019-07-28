function BackHome(){
	window.location.assign("index.html");
};

//Insert Course Information
function CreateCourse(){
	var courseName = document.getElementById("reCourseName").value;
	var major = document.getElementById("reMajor").value;
	if(courseName != "" && major != "")
	{
		var postData = {
			"course_name": courseName,
			"major": major
		};
		$.ajax({
			type: "POST",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Course/",
			data : JSON.stringify(postData),
			dataType: "json",
			success: function(){
				// alert("Sucessfully entered!");
				window.location.assign("index.html");
			}
		});
	}
	else 
	{
		alert("Please insert data");
	}
};