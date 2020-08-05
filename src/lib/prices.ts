import request from "request";
import * as PricesAPI from '../types/pricesAPI';

/**
 * 
 * @param sku - The SKU of the item.
 * @param callback - The response of the body.
 */
export function getBPPrice(
    sku: string,
    callback: (err: null | Error, price?) => void
): void {
    request(
        {
            method: 'GET',
            url: 'https://api.prices.tf/items/' + sku,
            qs: {
                src: 'bptf'
            },
            json: true
        },
        function (err: null | Error, res, body) {
            if (err) 
                return callback(err);

            if(!body.success) 
                return callback(new Error('Success was false: ' + body.message));

            return callback(null, {
                body
            });
        }
    );
};

