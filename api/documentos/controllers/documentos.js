'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
module.exports = {
    async saldos(ctx) {
        let ingresos = await strapi.query('documentos').find({'estadodocumento.descripcion' : 'Finalizado'});
        let total = 0;

        for (let index = 0; index < ingresos.length; index++) {
            const ingreso = ingresos[index];
            if(ingreso.movimiento && ingreso.movimiento.length > 0){
                for (let index = 0; index < ingreso.movimiento.length; index++) {
                    const payment = ingreso.movimiento[index];
                    total = total + payment.valor;
                }
            }
            
        }

        return { total : total || 0};
    }
};
