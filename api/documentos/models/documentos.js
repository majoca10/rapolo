'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
module.exports = {
  lifecycles: {
    async afterCreate(ingreso) {
      console.log("INGRESo", ingreso.estadodocumento.descripcion)
      if(ingreso.estadodocumento.descripcion === 'Finalizado'){
        if(ingreso.movimiento && ingreso.movimiento.length > 0){
          for (let index = 0; index < ingreso.movimiento.length; index++) {
              const pago  = ingreso.movimiento[index];
              
              let rs = await strapi.query('Saldosingresos').create({
                documentosingreso : ingreso.id,
                fecha : new Date(),
                fpago : pago.fpago.id,
                monto : pago.valor,
                periodo: ingreso.periodo.id
              });
          }
        }
      }
    },
    afterUpdate: async (ingreso) => {
      if(ingreso.estadodocumento.descripcion == 'Finalizado'){
        if(ingreso.movimiento && ingreso.movimiento.length > 0){
          await strapi.query('Saldosingresos').delete({ documentosingreso : ingreso.id});
          for (let index = 0; index < ingreso.movimiento.length; index++) {
            const pago  = ingreso.movimiento[index];
              
            let rs = await strapi.query('Saldosingresos').create({
              documentosingreso : ingreso.id,
              fecha : new Date(),
              fpago : pago.fpago.id,
              monto : pago.valor,
              periodo: ingreso.periodo.id
            });
          }
        }
      }
    },
  }
};