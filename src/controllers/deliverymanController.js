const Deliveryman = require("../models/Deliveryman");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function passwordValidation(password) {
    if (password.length < 8)
        return "Password must have at least 8 characters!";
    else if (!password.match(/[A-Z]/g))
        return "Password must contain at least one upper case letter!";
    else if (!password.match(/[a-z]/g))
        return "Password must contain at least one lower case letter!";
    else if (!password.match(/[0-9]/g))
        return "Password must contain at least one number!";
    else return "OK";
}

function generateToken(id, role) {
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
    return jwt.sign({id, role}, process.env.JWT_SECRET, {
        expiresIn: 18000,
    });
}


module.exports = {
    async authenticateDeliveryman(req, res) {
        let {
            login,
            password,
        } = req.body;

        if (!login || !password) {
            return res
                .status(400)
                .json({msg: "You must inform the CPF and password!"});
        }

        try {
            let deliveryman = await Deliveryman.findOne({
                where: {cpf: login},
            });

            if (!deliveryman) {
                return res.status(404).json({msg: "User not found!"});
            }
            else {
                if (bcrypt.compareSync(password, deliveryman.password)) {
                    const token = generateToken(deliveryman.id, "Deliveryman");

                    return res
                        .status(200)
                        .setHeader("token", token)
                        .json({msg: "User successfully authenticated.", token});
                }
                else {
                    return res.status(401).json({msg: "Invalid user and/or password. "});
                }
            }
        }
        catch (error) {
            console.log(error);
           return res
                .status(500)
                .json({ msg: error.message});
        }
    },

    async newDeliveryman(req, res) {
        let {
            name,
            cpf,
            password,
            phone
        } = req.body;

        if (name === undefined || cpf === undefined || password === undefined || phone === undefined) {
            return res
                .status(400)
                .json({msg: "You must inform a valid name, cpf, password and phone!"});
        }

        try {
            let deliveryman = await Deliveryman.findOne({
                where: {cpf: cpf}
            });

            if (deliveryman) {
                return res
                    .status(400)
                    .json({ msg: "The informed CPF is already registered!"});
            }
        }
        catch (error) {
            return res
                .status(500)
                .json({msg: "There was an error while creating the Deliveryman : " + error});
        }

        let pwdValid = passwordValidation(password);

        if (pwdValid !== "OK") {
            return res
                .status(400)
                .json({msg: pwdValid})
        }

        try {

            let salt = bcrypt.genSaltSync(12);
            let hash = bcrypt.hashSync(password, salt);

            let newDeliveryman = await Deliveryman.create({
                name,
                cpf,
                password: hash,
                phone
            });
            console.log("\nCreation successful - " + newDeliveryman.name + "\n");

            if (newDeliveryman) {
                return res
                    .status(201)
                    .json({msg: "New Deliveryman created successfully."});
            }
            else {
                return res
                    .status(500)
                    .json({msg: "It was not possible to create the new deliveryman."});
            }
        } catch (error) {
            return res
                .status(500)
                .json({msg: "There was an error while creating the Deliveryman: " + error});
        }
    },

    async listAllDeliverymans(req, res) {
        try {
            const deliverymans = await Deliveryman.findAll({
                order: [["id", "ASC"]]
            });

            if (deliverymans) {
                return res
                    .status(200)
                    .json({deliverymans});
            }
            else {
                return res
                    .status(404)
                    .json({msg: "It was not possible to find the deliverymans."});
            }
        } catch ( error ) {
            return res
                .status(500)
                .json({msg: "There was an error list deliverymans: " + error.message});
        }
    },

    async getDeliverymanByCPF(req, res) {
        let cpf = req.params.cpf;

        if (cpf === undefined || isNaN(cpf)) {
            return res
                .status(400)
                .json({msg: "You must inform a valid CPF (Only numbers)!"});
        }
        else {
            try {
                const deliveryman = await Deliveryman.findOne({
                    where: {cpf: cpf}
                });

                if (deliveryman) {
                    return res
                        .status(200)
                        .json({deliveryman});
                }
                else {
                    return res
                        .status(404)
                        .json({msg: "No deliveryman were found."});
                }
            } catch (error) {
                return res
                    .status(500)
                    .json({msg: "There was an error get deliveryman: " + error.message});
            }
        }
    },

    async updateDeliveryman(req, res) {
        const deliverymanId = req.params.id;
        const deliveryman = req.body;

        let pwdValid = passwordValidation(req.body.password);

        if (pwdValid !== "OK") {
            return res
                .status(400)
                .json({msg: pwdValid})
        }

        if (deliverymanId === undefined) {
            return res
                .status(400)
                .json({msg: "You must inform a valid ID!"});
        }
        else {
            const deliverymanExists = await Deliveryman.findByPk(deliverymanId);
            if (deliverymanExists === undefined) {
                return res
                    .status(404)
                    .json({msg: "The informed id doesn`t exists."});
            }
            else {
                try {
                    if (deliveryman.name || deliveryman.address || deliveryman.cpf || deliveryman.password || deliveryman.phone) {
                        let salt = bcrypt.genSaltSync(12);
                        let hash = bcrypt.hashSync(deliveryman.password, salt);
                        deliveryman.password = hash;
                        await Deliveryman.update(deliveryman, {
                            where: {id: deliverymanId},
                        });
                        return res
                            .status(200)
                            .json({msg: "Deliveryman successfully updated!"});
                    }
                    else {
                        return res
                            .status(400)
                            .json({msg: "You must inform a companyName, cnpj and password!"});
                    }
                } catch (error) {
                    return res
                        .status(500)
                        .json({msg: "There was an error update deliveryman: " + error.message});
                }
            }
        }
    },

    async deleteDeliveryman(req, res) {
        const deliverymanId = req.params.id;
        try {
            const deletedDeliveryman = await Deliveryman.destroy({
                where: {id: deliverymanId},
            });

            if (deletedDeliveryman !== 0) {
                return res
                    .status(200)
                    .json({msg: "Deliveryman successfully deleted!"});
            }
            else {
                return res
                    .status(404)
                    .json({msg: "Deliveryman not found."});
            }

        } catch ( error ) {
            return res
                .status(500)
                .json({msg: "There was an error delete deliveryman: " + error.message});
        }
    },
};