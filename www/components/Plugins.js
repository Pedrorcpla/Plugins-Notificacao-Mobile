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
$(document).on('click','#local',function(){
  
    var onSuccess = function(position) {
        navigator.notification.alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n');
    };
    function onError(error) {
        navigator.notification.alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});