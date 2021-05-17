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
      $('.map').css('height', '300px');
      $('.mapa').css('opacity', '1');
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
        $("img").css("height", "60vh");
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
});

$(document).on('click','#codigo',function(){
  cordova.plugins.barcodeScanner.scan(
      function (result) {
        if(result.text != ""){
          alert("Resultado: " + result.text + "\n" +
                "Formato: " + result.format + "\n");
        }
        else{
          alert("Nenhum código detectado!");
        }
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Mire a câmera no código desejado", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417,CODE_39", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait|landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
    );
});
function testarConexao() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Conexão desconhecida';
    states[Connection.ETHERNET] = 'Conexão Ethernet';
    states[Connection.WIFI]     = 'Conexão WiFi';
    states[Connection.CELL_2G]  = 'Conexão Cell 2G';
    states[Connection.CELL_3G]  = 'Conexão Cell 3G';
    states[Connection.CELL_4G]  = 'Conexão Cell 4G';
    states[Connection.CELL]     = 'Conexão Cell genérica';
    states[Connection.NONE]     = 'Sem conexão';

    alert('Tipo de Conexão: ' + states[networkState]);
}

$(document).on('click','#conexao',function(){
    testarConexao();
});