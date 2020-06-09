const functions = require('firebase-functions');
const admin = require('firebase-admin');

const Sentry = require('@sentry/node');
// Sentry.init({ dsn: 'https://ea59a4c624de44f79e07c8a2001fea40@o362766.ingest.sentry.io/5196753' });

// const express = require('express');
// const app = express();
// const cors = require('cors');
//https://expressjs.com/en/resources/middleware/cors.html


admin.initializeApp();

// app.use(cors({ origin: true }));

const db = admin.firestore();
// const empresaService = require('./services/empresa.service');
const imageToBase64 = require('image-to-base64');



exports.solicitacaoImgBase64 = functions.https.onCall(async (data, context) => {
    // console.log('context1111111114:', context.rawRequest.ip);
    // console.log('context1111111333:', context.rawRequest.headers["user-agent"]);
    console.log('dentro');
    console.log('dentro do pagamento saddsad ada', context.auth);
    console.log('dadadasdadasd', data);
    if (!context.auth) {
        throw new functions.https.HttpsError('failed-precondition', 'Você não está autenticado');
    } else {
        try {
        var solicitacao =  await db.collection('solicitacao').doc(data.uid).get()
            .then(doc => {
                if (!doc.exists) {
                console.log('No such document!');
                return null
                } else {
                // console.log('Empresa data:', doc.data());
                return doc.data();
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });  
            var imagens = [''];
            
            if(solicitacao.img){
                switch(solicitacao.img.length){
                    case 1: 
                        imagens[0] = await imageToBase64(solicitacao.img[0]);
                        break;
                    case 2:
                        imagens[0] = await imageToBase64(solicitacao.img[0]);
                        imagens.push(await imageToBase64(solicitacao.img[1]));
                        break;
                    case 3:
                        imagens[0] = await imageToBase64(solicitacao.img[0]);
                        imagens.push(await imageToBase64(solicitacao.img[1]));
                        imagens.push(await imageToBase64(solicitacao.img[2]));
                        break;
                    case 4:
                        imagens[0] = await imageToBase64(solicitacao.img[0]);
                        imagens.push(await imageToBase64(solicitacao.img[1]));
                        imagens.push(await imageToBase64(solicitacao.img[2]));
                        imagens.push(await imageToBase64(solicitacao.img[3]));
                        break;
                    case 5:
                        imagens[0] = await imageToBase64(solicitacao.img[0]);
                        imagens.push(await imageToBase64(solicitacao.img[1]));
                        imagens.push(await imageToBase64(solicitacao.img[2]));
                        imagens.push(await imageToBase64(solicitacao.img[3]));
                        imagens.push(await imageToBase64(solicitacao.img[4]));
                        break;
                    default:
                        imagens[0] = await imageToBase64(solicitacao.img[0])
                        imagens.push(await imageToBase64(solicitacao.img[1]));
                        imagens.push(await imageToBase64(solicitacao.img[2]));
                        imagens.push(await imageToBase64(solicitacao.img[3]));
                        imagens.push(await imageToBase64(solicitacao.img[4]));
                        imagens.push(await imageToBase64(solicitacao.img[5]));
                        break;
                }
                // return await imageToBase64(solicitacao.img[0])
                //         .then((response) => { 
                //             console.log(response); 
                //             return response;
                //             })
                //         .catch(
                //             (error) => {
                //                 console.log(error); //Exepection error....
                //             }
                //         )

                // for (let index = 0; index < 5; index++) {
                //     imagens.push('vazio');
                // }
                // console.log('linha 53', imagens)
                //     for (let index = 0; index < solicitacao.img.length; index++) {
                //             imagens[index] =  imageToBase64(solicitacao.img[index])
                //                 // eslint-disable-next-line no-loop-func
                //                 .then((response) => {
                //                     console.log(response); 
                //                     return response;
                //                     })
                //                 .catch(
                //                     // eslint-disable-next-line no-loop-func
                //                     (error) => {
                //                         console.log(error); //Exepection error....
                //                     }
                //                 )
                //                 console.log('loop', imagens[index])
                //    }
                //     console.log('linha 57', imagens)
                    return imagens;
                } else {
                    return imagens;
                }
            
            // var idPedido = await pedidoService.insertNovoPedido(data.pedido, db)
          
        } catch (error) {
            return {cod: 'erro', descricao: 'Erro no salvar cach', error};
        }
    }
});
