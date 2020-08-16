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
    console.log('antes do if', snapshot.data().opcao)
        let anexo;
        if(snapshot.data().opcao === 1){
            anexo = [{ // Basta incluir esta chave e listar os anexos
                filename: 'diagnóstico1.pdf', // O nome que aparecerá nos anexos
                path: './assets/diagnóstico-opção1-min.pdf' // O arquivo será lido neste local ao ser enviado
            }]        } else if(snapshot.data().opcao === 2){
            anexo = [{ // Basta incluir esta chave e listar os anexos
                filename: 'diagnóstico2.pdf', // O nome que aparecerá nos anexos
                path: './assets/diagnóstico-opção2-min.pdf' // O arquivo será lido neste local ao ser enviado
            }]        } else if(snapshot.data().opcao === 3){
            anexo = [{ // Basta incluir esta chave e listar os anexos
                filename: 'diagnóstico3.pdf', // O nome que aparecerá nos anexos
                path: './assets/diagnóstico-opção3-min.pdf' // O arquivo será lido neste local ao ser enviado
            }]        } else if(snapshot.data().opcao === 4){
            anexo = [{ // Basta incluir esta chave e listar os anexos
                filename: 'diagnóstico4.pdf', // O nome que aparecerá nos anexos
                path: './assets/diagnóstico-opção4-min.pdf' // O arquivo será lido neste local ao ser enviado
            }]        } else if(snapshot.data().opcao === 5){
            anexo = [{ // Basta incluir esta chave e listar os anexos
                filename: 'diagnóstico5.pdf', // O nome que aparecerá nos anexos
                path: './assets/diagnóstico-opção5-min.pdf' // O arquivo será lido neste local ao ser enviado
            }]        } else if(snapshot.data().opcao === 6){
            anexo = [{ // Basta incluir esta chave e listar os anexos
                filename: 'diagnóstico6.pdf', // O nome que aparecerá nos anexos
                path: './assets/diagnóstico-opção6-min.pdf' // O arquivo será lido neste local ao ser enviado
            }]        } else if(snapshot.data().opcao === 7){
            anexo = [{ // Basta incluir esta chave e listar os anexos
                filename: 'diagnóstico7.pdf', // O nome que aparecerá nos anexos
                path: './assets/diagnóstico-opção7-min.pdf' // O arquivo será lido neste local ao ser enviado
            }]        } else if(snapshot.data().opcao === 8){
            anexo = [{ // Basta incluir esta chave e listar os anexos
                filename: 'diagnóstico8.pdf', // O nome que aparecerá nos anexos
                path: './assets/diagnóstico-opção8-min.pdf' // O arquivo será lido neste local ao ser enviado
            }]        } else if(snapshot.data().opcao === 9){
            anexo = [{ // Basta incluir esta chave e listar os anexos
                filename: 'diagnóstico9.pdf', // O nome que aparecerá nos anexos
                path: './assets/diagnóstico-opção9-min.pdf' // O arquivo será lido neste local ao ser enviado
            }]        } else if(snapshot.data().opcao === 10){
            anexo = [{ // Basta incluir esta chave e listar os anexos
                filename: 'diagnóstico10.pdf', // O nome que aparecerá nos anexos
                path: './assets/diagnóstico-opção10-min.pdf' // O arquivo será lido neste local ao ser enviado
            }]
        } else if(snapshot.data().opcao === 11){
            anexo = [{ // Basta incluir esta chave e listar os anexos
                filename: 'diagnóstico11.pdf', // O nome que aparecerá nos anexos
                path: './assets/diagnóstico-opção11-min.pdf' // O arquivo será lido neste local ao ser enviado
            }]
        } else if(snapshot.data().opcao === 12){
            anexo = [{ // Basta incluir esta chave e listar os anexos
                filename: 'diagnóstico12.pdf', // O nome que aparecerá nos anexos
                path: './assets/diagnóstico-opção12-min.pdf' // O arquivo será lido neste local ao ser enviado
            }]
        } else {
            console.log('nenhum if atendeu');
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

            console.log('anexo', anexo)

            let email = {
                from: remetente,
                to: destinatarios,
                subject: assunto,
                //text: corpo,
                html: corpoHtml,
                attachments: anexo
            };
            console.log(email)
            transporter.sendMail(email, (error, info) => {
                if (error) {
                    return console.log(error);
                } else {
                    console.log('Mensagem %s enviada: %s', info.messageId, info.response);
                    return info.response;
                }

            });
        // });
});



