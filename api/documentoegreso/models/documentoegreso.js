'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
module.exports = {
  lifecycles: {
    async afterCreate(egresos) {
      if(egresos.movimiento && egresos.movimiento.length > 0){
        for (let index = 0; index < egresos.movimiento.length; index++) {
            const pago  = egresos.movimiento[index];
            
            let rs = await strapi.query('saldos').create({
              documentoegreso : egresos.id,
              fecha : new Date(),
              fpago : pago.fpago.id,
              monto : pago.valor,
              periodo: egresos.periodo.id
            });
        }
      }
    },
    async beforeCreate(egresos) {
      let ingresos = await strapi.query('Saldosingresos').find({});
      let totalIngreso = 0;
      let totalEgreso = 0;

      ingresos.map((i)=>{
          totalIngreso  = totalIngreso + i.monto;
      });

      if(egresos.movimiento && egresos.movimiento.length > 0){
        for (let index = 0; index < egresos.movimiento.length; index++) {
            const pago  = egresos.movimiento[index];
            totalEgreso = totalEgreso + egresos.movimiento[index].valor;
        }
      }

      console.log("total ingreso", totalIngreso);
      console.log("total egreso", totalEgreso);
    }
  },
};