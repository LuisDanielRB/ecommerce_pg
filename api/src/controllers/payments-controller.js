const { mercadopago } = require('../helpers/mercadopago')

const mercadopagoPayment = async (req, res) => {
    const { totalPrice } = req.body
    try {
        let preference = {
            items: [
                {
                    "title": "Finalizar la compra",
                    "description": "Con esta compra eres capaz de unirte a los eventos",
                    "category_id": "categoria123",
                    "quantity": 1,
                    "unit_price": totalPrice
                }
            ],
            back_urls: {
                failure: "http://127.0.0.1:5173/payment/failure",
                pending: "/pending",
                success: "http://127.0.0.1:5173/payment/success",
            },
            auto_return: "approved",
        };

        mercadopago.preferences.create(preference)
            .then(function (response) {
                console.log(response.body)
                res.json(response.body.init_point );
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    mercadopagoPayment,
}