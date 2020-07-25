function updateConfusion(confusion){
    var code = getUrlVars()['code'];
    var student_id = getUrlVars()['student_id'];
    fetch('http://localhost:8080/api/confusion', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({code: parseInt(code), student_id: parseInt(student_id), confusion: parseInt(confusion)}),
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
}

function sendQuestion(){
    
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}