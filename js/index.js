

$(function(){
  var generateRandomPad = function(){
    var seed = $("#seed").val();
    var b64 = base64js.fromByteArray(new Uint8Array(sha256.update(seed).arrayBuffer()));

    for(var i=0; i<b64.length; i++){
      $('#pad-'+Math.floor(i/7)+(i%7)).text(b64[i]);
    }
  }
  $("#seed").keyup(function(){ generateRandomPad(); });
  generateRandomPad();

  $("#master-pass").keyup(function(){
    var mp = $('#master-pass').val();
    if(mp.length < 12){
      $('#master-pass-group').removeClass('has-success');
      $('#master-pass-group').addClass('has-error');
      $('#master-pass-error').text('Too short!');
    }else{
      $('#master-pass-group').removeClass('has-error');
      $('#master-pass-group').addClass('has-success');
      $('#master-pass-error').text('OK');
    }
  })

  $("#master-pass-confirm").keyup(function(){
    var mp = $('#master-pass').val();
    var mp_confirm = $('#master-pass-confirm').val();
    if(mp != mp_confirm){
      $('#master-pass-confirm-group').removeClass('has-success');
      $('#master-pass-confirm-group').addClass('has-error');
      $('#master-pass-confirm-error').text('Different');
    }else{
      $('#master-pass-confirm-group').removeClass('has-error');
      $('#master-pass-confirm-group').addClass('has-success');
      $('#master-pass-confirm-error').text('OK');
    }
  });

  var generatePassword = function(){
    var mp = $('#master-pass').val(),
        mac = $('#fqdn').val(),
        N = 1000;

    for(i=0; i<N; i++){
      mac = sha256.hmac.update(mp, mac).arrayBuffer();
    }
    var b64 = base64js.fromByteArray(new Uint8Array(mac));
    $("#pass").val(b64);
  }

  $("#form2").submit(function(){
    // asyncronous execution
    setTimeout(generatePassword, 0);
    return false;
  });

})




