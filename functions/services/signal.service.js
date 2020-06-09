// API Push Notification
var sendPushOneSignal = function(data) {
  var headers = {
      "Content-Type": "application/json; charset=utf-8"
  };

  var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
  };

  var https = require('https');
  var req = https.request(options, function(resp) {  
      resp.on('data', function(data) {
      console.log("Response_24", JSON.parse(data));
      });
  });

  req.on('error', function(e) {
      console.log("ERROR 30:", e);
  });

  req.write(JSON.stringify(data));
  req.end();
};



var pushNovoPedidoCliente = function(id) {
    console.log('push notification', id)
  var messagePedidoEnviadoClient = { 
      app_id: "42e5d5f4-7b2a-4f2e-b6e2-ded7139361b5",
      template_id: "5a77e326-c4f6-4230-8eb2-12f0481bc675",
      include_player_ids: [id]
  };    
  sendPushOneSignal(messagePedidoEnviadoClient);
}



var pushNovoPedidoGestor = function(id) {
    console.log('push linha 45', id)
  var messagePedidoEnviadoClient = { 
      app_id: "0572ae3a-7580-40ca-9310-ec4e99326fd3",
      template_id: "c711067d-50de-4701-9b73-0c48fe39fb5f",
      include_player_ids: [id]
  };    
  sendPushOneSignal(messagePedidoEnviadoClient);
}

// STATUS
// pedido aceito: '2'
// pedido pronto: '3'
var pushStatusPedido = function(id, status, tipoEntrega) {
  var messagePedidoStatusClient;
  if(status === "2"){
      messagePedidoStatusClient = { 
          app_id: "42e5d5f4-7b2a-4f2e-b6e2-ded7139361b5",
          template_id: "3e892ddf-13f9-4217-8a83-fb376e9bbccb",
          include_player_ids: [id]
      }; 
      sendPushOneSignal(messagePedidoStatusClient);   
  } else if(status === "3") {
      if(tipoEntrega === 'retirar'){
          messagePedidoStatusClient = { 
              app_id: "42e5d5f4-7b2a-4f2e-b6e2-ded7139361b5",
              template_id: "74c90fc4-0251-4d2b-a1e6-48afbaf06130",
              include_player_ids: [id]
          }; 
          sendPushOneSignal(messagePedidoStatusClient);   
      } else if(tipoEntrega === 'entregar'){
          messagePedStatusClientEnt = { 
              app_id: "42e5d5f4-7b2a-4f2e-b6e2-ded7139361b5",
              template_id: "4c77ee63-6532-4ab4-9cde-0a64a1922edf",
              include_player_ids: [id]
          }; 
          sendPushOneSignal(messagePedStatusClientEnt);  
      }
  }
}



var novoPedidoPush = function(db, clienteUID, empresaUID) {
    // para o cliente
    console.log('cliente:',clienteUID, 'empresa', empresaUID )
    let userRef = db.collection('users').doc(clienteUID).get()
    .then(doc => {
        if (!doc.exists) {
            console.log('não existe 103');
        } else {
            console.log('push_id linha 94', doc.data().push_id);
            pushNovoPedidoCliente(doc.data().push_id);
        }
        return true;
    }).catch(err => {
        console.log('Error getting document 142', err);
        createLogErro('erro_142', err);
    });


    // para estabelecimento//corrigir pois não tem como ter o numero push em dois lugares
    let empresaRef = db.collection('empresa').doc(empresaUID).get()
    .then(doc => {
        if (!doc.exists) {
            console.log('não existe 124');
        } else {
            doc.data().gestores.forEach(element => {
                pushNovoPedidoGestor(element.push);
            });
        }
        return true;
    }).catch(err => {
        console.log('Error getting document 142', err);
        createLogErro('erro_142', err);
    });

    // return true;
 }




module.exports = {
  pushNovoPedidoCliente,
  pushStatusPedido,
  pushNovoPedidoGestor,
  novoPedidoPush
}