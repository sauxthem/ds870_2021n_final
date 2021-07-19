const Associate = require("../models/Associate");
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
    async authenticateAssociate(req, res) {
        let {
            login,
            password,
        } = req.body;

        if (!login || !password) {
            return res
                .status(400)
                .json({msg: "You must inform the CNPJ and password!"});
        }

        try {
            let associate = await Associate.findOne({
                where: {cnpj: login},
            });

            if (!associate) {
                return res.status(404).json({msg: "User not found!"});
            }
            else {
                if (bcrypt.compareSync(password, associate.password)) {
                    const token = generateToken(associate.id, "Associate");

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

    async newAssociate(req, res) {
        let {
            companyName,
            cnpj,
            password,
            address
        } = req.body;

        if (companyName === undefined || cnpj === undefined || password === undefined) {
            return res
                .status(400)
                .json({msg: "You must inform a valid companyName, cnpj and password!"});
        }

        try {
            let associate = await Associate.findOne({
                where: {cnpj: cnpj}
            });

            if (associate) {
                return res
                    .status(400)
                    .json({ msg: "The informed CNPJ is already registered!"});
            }
        }
        catch (error) {
            return res
                .status(500)
                .json({msg: "There was an error while creating the Associate: " + error});
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

            let newAssociate = await Associate.create({
                companyName,
                cnpj,
                address,
                password: hash,
            });
            console.log("\nCreation successful - " + newAssociate.name + "\n");

            if (newAssociate) {
                return res
                    .status(201)
                    .json({msg: "New Associate created successfully."});
            }
            else {
                return res
                    .status(500)
                    .json({msg: "It was not possible to create the new associate."});
            }
        } catch (error) {
            return res
                .status(500)
                .json({msg: "There was an error while creating the Associate: " + error});
        }
    },

    async listAllAssociates(req, res) {
        try {
            const associates = await Associate.findAll({
                order: [["id", "ASC"]]
            });

            if (associates) {
                return res
                    .status(200)
                    .json({associates});
            }
            else {
                return res
                    .status(404)
                    .json({msg: "It was not possible to find the associates."});
            }
        } catch ( error ) {
            return res
                .status(500)
                .json({msg: "There was an error list associates: " + error.message});
        }
    },

    async getAssociateByCNPJ(req, res) {
        let cnpj = req.params.cnpj;

        if (cnpj === undefined || isNaN(cnpj)) {
            return res
                .status(400)
                .json({msg: "You must inform a valid CNPJ (Only numbers)!"});
        }
        else {
            try {
                const associate = await Associate.findOne({
                    where: {cnpj: cnpj}
                });

                if (associate) {
                    return res
                        .status(200)
                        .json({associate});
                }
                else {
                    return res
                        .status(404)
                        .json({msg: "No associate were found."});
                }
            } catch (error) {
                return res
                    .status(500)
                    .json({msg: "There was an error get associate: " + error.message});
            }
        }
    },

    async updateAssociate(req, res) {
        const associateId = req.params.id;
        const associate = req.body;

        let pwdValid = passwordValidation(req.body.password);

        if (pwdValid !== "OK") {
            return res
                .status(400)
                .json({msg: pwdValid})
        }

        if (associateId === undefined) {
            return res
                .status(400)
                .json({msg: "You must inform a valid ID!"});
        }
        else {
            const associateExists = await Associate.findByPk(associateId);
            if (associateExists === undefined) {
                return res
                    .status(404)
                    .json({msg: "The informed id doesn`t exists."});
            }
            else {
                try {
                    if (associate.companyName || associate.address || associate.cnpj || associate.password) {
                        if (associate.password){
                            let salt = bcrypt.genSaltSync(12);
                            let hash = bcrypt.hashSync(associate.password, salt);
                            associate.password = hash;
                        }
                        
                        await Associate.update(associate, {
                            where: {id: associateId},
                        });
                        return res
                            .status(200)
                            .json({msg: "Associate successfully updated!"});
                    }
                    else {
                        return res
                            .status(400)
                            .json({msg: "You must inform a companyName, cnpj and password!"});
                    }
                } catch (error) {
                    return res
                        .status(500)
                        .json({msg: "There was an error update associate: " + error.message});
                }
            }
        }
    },

    async selfUpdateAssociate(req, res) {
        const associateId = req.params.id;
        const associate = req.body;

        let pwdValid = passwordValidation(req.body.password);

        if (pwdValid !== "OK") {
            return res
                .status(400)
                .json({msg: pwdValid})
        }

        if (associateId === undefined) {
            return res
                .status(400)
                .json({msg: "You must inform a valid ID!"});
        }
        else {
            const associateExists = await Associate.findByPk(associateId);
            if (associateExists === undefined) {
                return res
                    .status(404)
                    .json({msg: "The informed id doesn`t exists."});
            }
            else if (associateExists.id != req.id) {
                return res 
                    .status(401)
                    .json({ msg: "You do not have permission to update this associate's data." });
            }
            else {
                try {
                    if (associate.companyName || associate.address || associate.cnpj || associate.password) {
                        if (associate.password){
                            let salt = bcrypt.genSaltSync(12);
                            let hash = bcrypt.hashSync(associate.password, salt);
                            associate.password = hash;
                        }

                        await Associate.update(associate, {
                            where: {id: associateId},
                        });
                        return res
                            .status(200)
                            .json({msg: "Associate successfully updated!"});
                    }
                    else {
                        return res
                            .status(400)
                            .json({msg: "You must inform a companyName, cnpj and password!"});
                    }
                } catch (error) {
                    return res
                        .status(500)
                        .json({msg: "There was an error update associate: " + error.message});
                }
            }
        }
    },

    async deleteAssociate(req, res) {
        const associateId = req.params.id;
        try {
            const deletedAssociate = await Associate.destroy({
                where: {id: associateId},
            });

            if (deletedAssociate !== 0) {
                return res
                    .status(200)
                    .json({msg: "Associate successfully deleted!"});
            }
            else {
                return res
                    .status(404)
                    .json({msg: "Associate not found."});
            }

        } catch ( error ) {
            return res
                .status(500)
                .json({msg: "There was an error delete associate: " + error.message});
        }
    },
};