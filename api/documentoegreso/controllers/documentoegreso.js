'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async saldos(ctx) {
        let egresos = await strapi.query('Documentoegreso').find({});
        let total = 0;
        for (let index = 0; index < egresos.length; index++) {
            const egreso = egresos[index];
            if(egreso.movimiento && egreso.movimiento.length > 0){
                for (let index = 0; index < egreso.movimiento.length; index++) {
                    const payment = egreso.movimiento[index];
                    total = total + payment.valor;
                }
            }
            
        }

        return { total : total || 0};
    }
};
