window.onload = initialize;

function initialize(){
    document.getElementById("form-file-upload")
        .addEventListener("submit", uploadFile);
}

function uploadFile(event){
    event.preventDefault();
    var formFileUpload = event.target;

    var file = formFileUpload.file.files[0];

    console.log(file);

    var ref = firebase.storage().ref().child("algo.jpg");
    ref.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
}