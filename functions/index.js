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

const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

const db = admin.firestore();
// const empresaService = require('./services/empresa.service');



let url = "smtps://deliverysamasapp%40gmail.com:"+encodeURIComponent('csztmuznaqymzyis') + "@smtp.gmail.com:465";
let transporter = nodemailer.createTransport(url);

// exports.enviarEmail = functions.https.onRequest((req, res) => {
exports.EnviandoEmail = functions.firestore.document('/solicitacao/{pushId}').onUpdate((snapshot, context) => {
        // cors(req, res, () => {
           let remetente = '"Kleber" <dev.kleber@gmail.com>';
           let assunto = 'assunto teste'
            let destinatarios = 'klebers@alunos.utfpr.edu.br'
            let corpo = 'corpo teste';
           let corpoHtml = 'corpo html';

            // let assunto = req.body['assunto teste'];
            // let destinatarios = req.body['dev.kleber@gmail.com']; // lista de e-mails destinatarios separados por ,
            // let corpo = req.body['corpo do e-mail'];
            // let corpoHtml = req.body['corpoHtml do e-mail'];



            let email = {
                from: remetente,
                to: destinatarios,
                subject: assunto,
                text: corpo,
                html: corpoHtml
            };

            transporter.sendMail(email, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Mensagem %s enviada: %s', info.messageId, info.response);
            });
        // });
});







// função chamada para buscar no bd as imagens e baixar como Base64 para utilizar no pdfMaker

const imageToBase64 = require('image-to-base64');

exports.solicitacaoImgBase64 = functions.https.onCall(async (data, context) => {
    // console.log('context1111111114:', context.rawRequest.ip);
    // console.log('context1111111333:', context.rawRequest.headers["user-agent"]);
    console.log('dentro do pagamento saddsad ada', context.auth);
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
                    return imagens;
                } else {
                    return imagens;
                }
        } catch (error) {
            return {cod: 'erro', descricao: 'Erro no salvar cach', error};
        }
    }
});
