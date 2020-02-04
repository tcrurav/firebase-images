window.onload = initialize;

function initialize(){
    document.getElementById("form-file-upload")
        .addEventListener("submit", uploadFile);

    //downloadFile("Brasov.JPG");

    showBicycles();
}

function showBicycles(){
    var refBicycles = firebase.database().ref().child("BicycleStore/bicycles");
    var newColumns = "";
    refBicycles.on("value", function(snap){
        var data = snap.val();
        for(var key in data){
            newColumns += 
                '<div class="col-sm-4">' +
                    '<img class="img-fluid" src="' + data[key].image_url + 
                        '" alt="image"/>' +
                '</div>';
        }
        document.getElementById("new-columns").innerHTML = newColumns;
    });

    
}

function uploadFile(event){
    event.preventDefault();
    var formFileUpload = event.target;

    var file = formFileUpload.file.files[0];

    console.log(file);

    var ref = firebase.storage().ref().child("algo.jpg");
    ref.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
      
      var refDatabase = firebase.database().ref().child("BicycleStore/bicycles");
      refDatabase.push({
        model: "uno cualquiera",
        color: "uno cualquiera",
        stock: 20,
        image_url: 
      });

    });
}

function downloadFile(imageName){
    var storageRef = firebase.storage().ref();
    storageRef.child(imageName).getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
      
        // This can be downloaded directly:
        // var xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // xhr.onload = function(event) {
        //   var blob = xhr.response;
        // };
        // xhr.open('GET', url);
        // xhr.send();
      
        // Or inserted into an <img> element:
        var img = document.getElementById('downloaded-img');
        img.src = url;
      }).catch(function(error) {
        // Handle any errors
      });
}