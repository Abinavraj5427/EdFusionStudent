colorStars( getUrlVars()['rating'])

function fillStars(index){
    var code = getUrlVars()['code'];
    var student_id = getUrlVars()['student_id'];
    window.location.href = "./edfusion3.html?code="+code+"&student_id="+student_id+"&rating="+index;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function colorStars(index){
    //fill em up
    for(let i = 1;  i<=index; i++){
        document.getElementById("star"+i).src = "./assets/Icon_material-star.svg";
    }

}

function submitReview(){
    var rating = getUrlVars()['rating'];
    
    var code = getUrlVars()['code'];
    fetch('http://localhost:8080/api/rating', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({code: parseInt(code), rating: parseInt(rating)}),
    })
    .then(data => {
        // console.log('Success:', data);
        window.location.href = "./index.html";
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    // window.location.href = "./index.html";
}