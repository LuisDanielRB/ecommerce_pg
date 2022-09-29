const { Users } = require("../db");

const adminDelete = async (req, res) => {

}

const adminPut = async (req, res) => {
    const { idUser, idAdmin } = req.query
    const {status} = req.body

    const mStatus = status.charAt(0).toUpperCase() + status.slice(1);

    try {

        const validation = await Users.findOne({
            where: {
                id: idAdmin
            }
        })

        if (validation.status !== 'Admin') return res.json("You are not an admin")
       
        await Users.update({
            status: mStatus
        }, { where: { id: idUser } })

        const user = await Users.findOne({
            where: {
                id: idUser
            }
        })
        res.send(`${user.username} is now ${user.status}`)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    adminDelete,
    adminPut
};