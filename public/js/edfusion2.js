setInterval(function(){ 
    var code = getUrlVars()['code'];
    var student_id = getUrlVars()['student_id'];
    fetch('./api/status', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({code: parseInt(code), student_id: parseInt(student_id)}),
    })
    .then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      }).then(function(data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        // { "userId": 1, "id": 1, "title": "...", "body": "..." }
        // console.log(data.msg == );
        if(data.msg == "ended"){ window.location.href = "./edfusion3.html?code="+code+"&student_id="+student_id+"&rating="+0; }
        else if(data.msg == true){
            document.getElementById("qbtn").disabled = true;
        }
        else if(data.msg == false){
            document.getElementById("qbtn").disabled = false;
        }
      });
}, 5000);

function updateConfusion(confusion){
    document.getElementById("confusion").innerHTML = confusion+"%";
    document.getElementById("msg").innerHTML = confusion > 66? "Confuzzled": confusion < 33? "Crystal Clear" : "Unsure" ;

    var code = getUrlVars()['code'];
    var student_id = getUrlVars()['student_id'];
    fetch('./api/confusion', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({code: parseInt(code), student_id: parseInt(student_id), confusion: parseInt(confusion)}),
    })
    .then(data => {
        // console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
}

function sendQuestion(){
    var question = document.getElementById("field").value;
    var code = getUrlVars()['code'];
    var student_id = getUrlVars()['student_id'];
    fetch('./api/question', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({code: parseInt(code), student_id: parseInt(student_id), question: question}),
    })
    .then(data => {
        // console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}