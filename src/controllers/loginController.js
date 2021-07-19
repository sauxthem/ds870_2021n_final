const Login = require("../models/Login");
const Deliveryman = require("../models/Deliveryman");
const Associate = require("../models/Associate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function generateToken(id) {
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
    return jwt.sign({id}, process.env.JWT_SECRET, {});
}

module.exports = {

    async login(req, res){
        let {
            login,
            password,
        } = req.body;

        if (!login || !password) {
            return res
                .status(400)
                .json({msg: "You must inform the CNPJ/CPF and password!"});
        }

        try {
            let expiration = new Date();
            expiration.setHours(expiration.getHours() + 5);

            if (login.length > 11) {
                let associate = await Associate.findOne({
                    where: {cnpj: login},
                });

                if (!associate) {
                    return res.status(404).json({msg: "User not found!"});
                }
                else {
                    if (bcrypt.compareSync(password, associate.password)) {
                        const token = generateToken(associate.id);

                        await Login.create({
                            token,
                            expiration,
                            associateId: associate.id,
                        });

                        return res
                            .status(200)
                            .setHeader("token", token)
                            .json({msg: "User successfully authenticated.", token});
                    }
                    else {
                        return res.status(401).json({msg: "Invalid user and/or password. "});
                    }
                }
            } else {
                let deliveryman = await Deliveryman.findOne({
                    where: {cpf: login},
                });

                if (!deliveryman) {
                    return res.status(404).json({msg: "User not found!"});
                }
                else {
                    if (bcrypt.compareSync(password, deliveryman.password)) {
                        const token = generateToken(deliveryman.id);
                        await Login.create({
                            token,
                            expiration,
                            deliverymanId: deliveryman.id
                        });
                        return res
                            .status(200)
                            .setHeader("token", token)
                            .json({msg: "User successfully authenticated.", token});
                    }
                    else {
                        return res
                            .status(401)
                            .json({msg: "Invalid user and/or password. "});
                    }
                }
            }
        }
        catch (error){
            console.log(error);
           return res
                .status(500)
                .json({ msg: error.message});
        }
    },

    async logout(req, res) {
        const token = req.headers["token"];

        if (token === undefined) {
            return res
                .status(400)
                .json({msg: "You don't have a valid token!"});
        }
        else {
            const tokendb = await Login.findOne({
                where: {token}
            });

            if (tokendb === undefined) {
                return res
                    .status(404)
                    .json({msg: "The informed token doesn`t exists."});
            }
            else {
                try {
                    await Login.update({expiration: new Date()}, {
                        where: {token},
                    });
                    return res
                        .status(200)
                        .json({msg: "Logout successfully!"});
                } catch (error) {
                    return res
                        .status(500)
                        .json({msg: "There was an error Logout: " + error.message});
                }
            }
        }
    },
};