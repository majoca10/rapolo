'use strict';
const _ = require('lodash');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async saldos(ctx) {
        let ingresos = await strapi.query('Saldosingresos').find({});
        let egresos = await strapi.query('saldos').find({});

        let result_ingresos = _(ingresos).groupBy('fpago.descripcionpago').map((ingresos, key)=>{
            let sum = (collection)=>{
                let total = 0;
                
                collection.map((i)=>{
                    total = total + i.monto
                });

                return total;
            }
            return{
                forma_pago : key,
                total :  sum(ingresos)
            }
        }).value();

       let result_egresos =  _(egresos).groupBy('fpago.descripcionpago').map((egresos, key)=>{
            let sum = (collection)=>{
                let total = 0;
                
                collection.map((i)=>{
                    total = total + i.monto
                });

                return total;
            }
            return{
                forma_pago : key,
                total :  sum(egresos)
            }
        }).value();

        return {
            result_ingresos, 
            result_egresos
        }
    }
  };