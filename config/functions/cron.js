'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */
var API_KEY = 'key-e2a9ab9b571b498e49605f99b33380a6';
var DOMAIN = 'daimont.com';
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
const moment = require('moment');


module.exports = {
  /**
   * 0 7 * * *
   * Simple example.
   * Every monday at 1am.
   */
  '*/1 * * * *': async () =>{
    let rs = await strapi.api.documentoegreso.services.documentoegreso.find({ 'estadodocumento.descripcion':  'Pendiente'}, ['estadodocumento', 'tercero', 'user']);
    console.log("resultado egresos pendientes", rs);

    if(rs && rs.length > 0){
        for (let index = 0; index < rs.length; index++) {
            const egreso = rs[index];

            console.log(moment(egreso.fechafinal).format('YYYYMMDD'))
            console.log("dia recordatorio",  moment(egreso.fechafinal).subtract(egreso.recordia, 'd').format('YYYYMMDD'));

            if(moment(egreso.fechafinal).subtract(egreso.recordia, 'd').format('YYYYMMMDD') == (moment().format('YYYYMMMDD'))){
                console.log("enviando email...");
                const data = {
                    from: 'NOTIFICACION EGRESAAP <noreply@daimont.com>',
                    to: egreso.user.email,
                    subject: 'Una factura esta por vencerse. ',
                    text: `El pago de la factura a ${egreso.tercero.nombre} esta por vencerse!`
                };
                  
                mailgun.messages().send(data, (error, body) => {
                    console.log(body);
                });
            }else{
                console.log("No estamos en fecha cercana a vencimiento");
            }
        }
    }
  }
};