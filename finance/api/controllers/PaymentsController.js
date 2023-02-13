const database = require ('../models')

class PaymentsController {

    static async createPayment (req, res){
        const newPayment = req.body;
        newPayment.status = "CRIADO";
        const validationNameOnCard = /\b([A-Z][a-z]+[ ]*)+/;
        const validationNumberOnCard = /^([0-9]{16})$/;
        const validationCardExpiration = /^[0-9]{4}-(1[0-3]|0[1-9])$/;
        const validationCVV = /^[0-9]{3}$/;
        let countError = [];

        if ( newPayment.value <=0 ){
            countError.push("Enter a value greater than zero");
        }

        if (newPayment.nameOnCard.length<3 || !validationNameOnCard.exec(newPayment.nameOnCard)){
            countError.push("Enter a valid name");
        }

        if (!validationNumberOnCard.exec(newPayment.numberOnCard)){
            countError.push("Enter a valid card number");
        }

        if ((parseInt(newPayment.cardExpiration.slice(0,4))<2023) || !validationCardExpiration.exec(newPayment.cardExpiration)){
            countError.push("Enter a valid expiration date");
        }

        if (!validationCVV.exec(newPayment.cvv)){
            countError.push("Enter with a valid CVV card");
        }

        if (countError.length==0){
            try{
                const createNewPayment = await database.Payment.create(newPayment);
                const newFields = { links: [
                    {
                      "rel": "CANCELADO",
                      method: "PATCH",
                      "href": `http://localhost:3000/payments/${createNewPayment.id}/cancelado`
                    },
                    {
                      "rel": "CONFIRMADO",
                      method: "PATCH",
                      "href": `http://localhost:3000/payments/${createNewPayment.id}/confirmado`
                    },
                ]}
                await database.Payment.update(newFields, {where:{id:Number(createNewPayment.id)}})
                return res.status(201).location(`http://localhost:3000/payments/${createNewPayment.id}`).json({mensagem: `Payment ID: ${createNewPayment.id}  Payment Status: ${createNewPayment.status}`})
            
            } catch (error){
                return res.status(500).json(error.message)
            }
        }
        else{
            return res.status(400).json(countError)
        }
        
        

    }

    static async readAllPayment (req, res){
        try{
            const findPayment = await database.Payment.findAll({attributes: { exclude: ['cvv','links'] } })
            return res.status(200).json(findPayment)
        }catch(error){
            return res.status(404).json(error.message)

        }

    }

    static async readPaymentById (req, res){
        const { id } = req.params;
        try{
            const findPayment = await database.Payment.findOne( { where: { id: Number(id)}, attributes: { exclude: ['cvv'] } })
            return res.status(200).json(findPayment)
        }catch{
            return res.status(404).json({mensagem: `Payment ID: ${id}  not found!`})
        }

    }

    static async updatePayment (req, res){
        const { id, status } = req.params
        await database.Payment.update({status: status}, {where:{id:Number(id)}})
        const updateNewFinance = await database.Payment.findOne({ where: { id: Number(id)}, attributes: { exclude: ['links']}})
        return res.status(200).json(updateNewFinance)

    }

    static async changeStatusPayment (req, res){
        const { id } = req.params
        // const { status } = req.body

        const updateNewPayment = await database.Payment.findOne({ where: { id: Number(id)}})

        return res.status(200).json(updateNewPayment)

    }

    static async deletePayment (req, res){
        const { id } = req.params;
        try{
            await database.Payment.destroy({ where: { id: Number(id)}})
            return res.status(200).json({mensagem: `Payment ID: ${id}  removed!`})
        }catch{
            return res.status(404).json({mensagem: `Payment ID: ${id}  not found!`})
        }
        

    }

}

module.exports = PaymentsController