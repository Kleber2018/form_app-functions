const functions = require('firebase-functions');
const admin = require('firebase-admin');

const Sentry = require('@sentry/node');
// Sentry.init({ dsn: 'https://ea59a4c624de44f79e07c8a2001fea40@o362766.ingest.sentry.io/5196753' });

admin.initializeApp();

// app.use(cors({ origin: true }));

const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

const db = admin.firestore();
// const empresaService = require('./services/empresa.service');



let url = "smtps://deliverysamasapp%40gmail.com:"+encodeURIComponent('csztmuznaqymzyis') + "@smtp.gmail.com:465";
let transporter = nodemailer.createTransport(url);

exports.EnviandoEmail = functions.firestore.document('/question/{pushId}').onCreate((snapshot, context) => {

       console.log('snapshot chegando', snapshot.data());
    console.log('context chegando', context);
        let anexo;
        if(snapshot.data.opcao === 1){
            anexo = 'https://firebasestorage.googleapis.com/v0/b/form-dissertacao.appspot.com/o/diagnóstico-opção1.pdf?alt=media&token=afe77b81-893d-4737-addd-86bb936c2bcb'
        } else if(snapshot.data.opcao === 2){
            anexo = 'https://firebasestorage.googleapis.com/v0/b/form-dissertacao.appspot.com/o/diagnóstico-opção2.pdf?alt=media&token=6388dcbc-d6e4-4a5d-8621-478f7c56fc2c'
        } else if(snapshot.data.opcao === 3){
            anexo = 'https://firebasestorage.googleapis.com/v0/b/form-dissertacao.appspot.com/o/diagnóstico-opção3.pdf?alt=media&token=d89a9091-050a-414e-93f8-79f01793a3ca'
        } else if(snapshot.data.opcao === 4){
            anexo = 'https://firebasestorage.googleapis.com/v0/b/form-dissertacao.appspot.com/o/diagnóstico-opção4.pdf?alt=media&token=21096122-4b68-4c8b-a0c6-789e7c844752'
        } else if(snapshot.data.opcao === 5){
            anexo = 'https://firebasestorage.googleapis.com/v0/b/form-dissertacao.appspot.com/o/diagnóstico-opção5.pdf?alt=media&token=6e521d79-0034-4c88-a8bd-f2ff8da936f7'
        } else if(snapshot.data.opcao === 6){
            anexo = 'https://firebasestorage.googleapis.com/v0/b/form-dissertacao.appspot.com/o/diagnóstico-opção6.pdf?alt=media&token=472546e5-0300-4b19-bef7-12a051927430'
        } else if(snapshot.data.opcao === 7){
            anexo = 'https://firebasestorage.googleapis.com/v0/b/form-dissertacao.appspot.com/o/diagnóstico-opção7.pdf?alt=media&token=534dfbb5-42b7-4836-a4d1-ee0418505150'
        } else if(snapshot.data.opcao === 8){
            anexo = 'https://firebasestorage.googleapis.com/v0/b/form-dissertacao.appspot.com/o/diagnóstico-opção8.pdf?alt=media&token=364fa46a-6f8b-4a2d-94b4-90849f869375'
        } else if(snapshot.data.opcao === 9){
            anexo = 'https://firebasestorage.googleapis.com/v0/b/form-dissertacao.appspot.com/o/diagnóstico-opção9.pdf?alt=media&token=7c78a924-56b0-49e0-994f-6176c99ceccf'
        } else if(snapshot.data.opcao === 10){
            anexo = 'https://firebasestorage.googleapis.com/v0/b/form-dissertacao.appspot.com/o/diagnóstico-opção10.pdf?alt=media&token=3f5b4ba3-712c-46e3-a8b8-d9d0c5085400'
        } else if(snapshot.data.opcao === 11){
            anexo = 'https://firebasestorage.googleapis.com/v0/b/form-dissertacao.appspot.com/o/diagnóstico-opção11.pdf?alt=media&token=3c55cdea-f3ed-4be2-befa-95dd9caa3866'
        } else if(snapshot.data.opcao === 12){
            anexo = 'https://firebasestorage.googleapis.com/v0/b/form-dissertacao.appspot.com/o/diagnóstico-opção12.pdf?alt=media&token=8990e64e-b103-48bd-8fde-efd18f81bbb0'
        }



    let corpoHtml = "Olá," +
                "<br><br>Muito obrigada pela participação! Suas respostas com certeza ajudarão muito a formação do conhecimento científico!" +
                "<br><br>Como o prometido, segue em anexo o seu diagnóstico sobre a transformação das informações para a tomada de decisão de marketing na sua empresa. " +
                "<br><br>Ele foi preparado com muito carinho e com a intenção de devolver um pouco do conhecimento gerado na Academia. Espero que goste e que te ajude a dar mais clareza sobre seus processos." +
                "<br><br>Se tiver alguma dúvida ou se quiser conversar mais sobre como melhorar suas ações de marketing responda este e-mail. Eu terei o maior prazer em trocar uma ideia com você." +
                "<br><br>Abraços, \n" +
                "<br>Marina Proença\n" +
                "<br>Publicitária e Mestranda em Marketing na UFPR.\n";

            let assunto = 'Pesquisa - Marketing na sua Empresa'
            let remetente = '"Kleber" <dev.kleber@gmail.com>';
            let destinatarios = snapshot.data().grupo8.pergunta10.resposta

        console.log('destinatario', destinatarios)
        // cors(req, res, () => {

          //  let corpo = 'corpo teste';


            // let assunto = req.body['assunto teste'];
            // let destinatarios = req.body['dev.kleber@gmail.com']; // lista de e-mails destinatarios separados por ,
            // let corpo = req.body['corpo do e-mail'];
            // let corpoHtml = req.body['corpoHtml do e-mail'];



            let email = {
                from: remetente,
                to: destinatarios,
                subject: assunto,
                //text: corpo,
                html: corpoHtml,
                attachments: [{ // Basta incluir esta chave e listar os anexos
                    filename: 'diagnóstico.pdf', // O nome que aparecerá nos anexos
                    path: anexo // O arquivo será lido neste local ao ser enviado
                }]
            };

            transporter.sendMail(email, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Mensagem %s enviada: %s', info.messageId, info.response);
            });
        // });
});



