const { mercadopago } = require('../helpers/mercadopago')

const mercadopagoPayment = async (req, res) => {
    const { price } = req.body
    console.log(price);

    try {
        let preference = {
            items: [
                {
                    "title": "Realizar la compra",
                    "description": "Con esta compra eres capaz de unirte a los eventos",
                    "category_id": "categoria123",
                    "quantity": 1,
                    "unit_price": price
                }
            ],
            back_urls: {
                failure: "/failure",
                pending: "/pending",
                success: "http://localhost:5173/payment/success",
            },
            auto_return: "approved",
        };

        mercadopago.preferences.create(preference)
            .then(function (response) {
                res.json(response.body.init_point);
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