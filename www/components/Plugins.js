// This is a JavaScript file

$(document).on('click','#alerta',function(){
  navigator.notification.alert("Minha mensagem", null, "Aviso!", "Aceito");
});
$(document).on('click','#confirm',function(){
  function confirma(buttonIndex){
    if(buttonIndex == "1"){
      navigator.notification.alert("Escolheu a opção A");
    }
    else{
      navigator.notification.alert("Escolheu a opção B");
    }
  }

  navigator.notification.confirm("Escolha A ou B", confirma, "Escolha:", ['A','B']);
});
$(document).on('click','#beep',function(){
  navigator.notification.beep(3);
});
$(document).on('click','#vibrar',function(){
  navigator.vibrate(2000);
});

function mostraMapa(lat, long){
  L.mapquest.key = 'vWl7wnWveuqIZUXzHoQy2wh9BqBBqLwt';

        var map = L.mapquest.map('map', {
          center: [lat, long],
          layers: L.mapquest.tileLayer('map'),
          zoom: 15          
        });

        L.marker([lat, long], {
          icon: L.mapquest.icons.marker({ secondaryColor: '#FFFFFF', primaryColor: '#FF0000', size: 'sm'}),
          draggable: false
          
        }).addTo(map);

        map.addControl(L.mapquest.control());
};

$(document).on('click','#local',function(){
  
    var onSuccess = function(position) {
      mostraMapa(position.coords.latitude, position.coords.longitude);
    };
    function onError(error) {
        navigator.notification.alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});

$(document).on('click','#camera',function(){
    navigator.camera.getPicture(onSuccess, onFail, { 
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      correctOrientation: true,
      saveToPhotoAlbum: true
       });

    function onSuccess(imageURI) {
        var image = document.getElementById('imagem');
        image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
});