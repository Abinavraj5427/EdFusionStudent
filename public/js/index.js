function joinClass(){
    var code = document.getElementById('pin').value;
    console.log(code);
    
    fetch('./api/student', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({code: parseInt(code)}),
    })
    .then(response => response.json())
    .then(data => {
        // console.log('Success:', data);
        if(data.success) window.location.href = "./edfusion2.html?code="+code+"&student_id="+data.student_id;
        else document.getElementById("error").innerHTML = "Incorrect pin. Please try again.";
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    
}