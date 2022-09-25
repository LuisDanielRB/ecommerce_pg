const { mercadopago } = require('../helpers/mercadopago')

const mercadopagoPayment = async (req, res) => {
    const { totalPrice } = req.body
    try {
        let preference = {
            items: [
                {
                    "title": "Realizar la compra",
                    "description": "Con esta compra eres capaz de unirte a los eventos",
                    "category_id": "categoria123",
                    "quantity": 1,
                    "unit_price": totalPrice
                }
            ],
            back_urls: {
                failure: "/failure",
                pending: "/pending",
                success: "http://127.0.0.1:5173",
            },
            auto_return: "approved",
        };

        mercadopago.preferences.create(preference)
            .then(function (response) {
                console.log(response)
                res.json({ global: response.body.init_point });
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    mercadopagoPayment
}