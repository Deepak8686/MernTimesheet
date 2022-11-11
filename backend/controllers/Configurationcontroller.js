import clients from "../models/ConfigurationModel/clients.js";
import Designation from "../models/ConfigurationModel/Designation.js";
import Employeetype from "../models/ConfigurationModel/Employeetype.js";


export const addCLient = async (req, res) => {
    try {
        const { Client_Name, IsActive } = req.body;

        const Clientexist = await clients.findOne({ Client_Name });
        if (Clientexist) return res.status(400).json("Client Alredy Exist");

        const results = await clients.create({ Client_Name, IsActive: true })
        return res.status(200).json(`${Client_Name} Added Successfully....!`);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const addDesignation = async (req, res) => {
    try {
        const { Designation_Name, Isactive } = req.body;

        const exists = await Designation.findOne({ Designation_Name });
        if (exists) return res.status(400).json("Designation already exists");

        const result = await Designation.create({ Designation_Name, Isactive: true });
        return res.status(200).json(`${Designation_Name} added successfully`);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const addEmployeetype = async (req, res) => {
    try {
        const { Employeetype_Name, Isactive } = req.body;

        const exists = await Employeetype.findOne({ Employeetype_Name });
        if (exists) return res.status(400).json("Employeetype already exists");

        const result = await Employeetype.create({ Employeetype_Name, IsActive: true });
        return res.status(200).json(`${Employeetype_Name} added successfully`);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const getClient = async (req, res) => {
    try {

        const getclient = await clients.find({ IsActive: true });
        return res.status(200).json(getclient);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const getDeactiveClient = async (req, res) => {
    try {

        const getDeactive = await clients.find({ IsActive: false });
        return res.status(200).json(getDeactive);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const getDesignation = async (req, res) => {
    try {

        const getDesig = await Designation.find({ Isactive: true });
        return res.status(200).json(getDesig);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const getDeactiveDesignation = async (req, res) => {
    try {

        const getDeactDesig = await Designation.find({ Isactive: false });
        return res.status(200).json(getDeactDesig);

    } catch (error) {
        return res.json(error.message);
    }
}

export const getEmployeetype = async (req, res) => {
    try {

        const getEmptyp = await Employeetype.find({ Isactive: true });
        return res.status(200).json(getEmptyp);

    } catch (error) {
        return res.json(error.message);
    }
}

export const getDeactiveEmployeetype = async (req, res) => {
    try {

        const getDctEmptyp = await Employeetype.find({ Isactive: false });
        return res.status(200).json(getDctEmptyp);

    } catch (error) {
        return res.json(error.message);
    }
}

export const editClient = async (req, res) => {
    try {
        const { Client_Id } = req.params;

        const clientid = await register.findOneAndUpdate({ Client_Id }, {
            ...req.body
        })
        const existname = await clients.findOne({ Client_Name: req.body.Client_Name });

        if (!clientid) return res.status(400).json("No Data Found");
        if (existname.Client_Id == Client_Id) return res.status(200).json(`${Client_Name} Updated Successfully`);
        if (existname.Client_Id != Client_Id && existname) return res.status(400).json("Client Name already exists");

        return res.json(`${Client_Name} Updated Successfully`)

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const editDesignation = async (req, res) => {
    try {
        const { Designation_Id } = req.params;

        const desigid = await Designation.findOneAndUpdate({ Designation_Id }, {
            ...req.body
        })
        const existname = await Designation.findOne({ Designation_Name: req.body.Designation_Name });

        if (!Designation_Id) return res.status(400).json("No Data Found");
        if (existname.Designation_Id == Designation_Id) return res.status(200).json(`${Designation_Name} updated successfully`);
        if (existname.Designation_Id != Designation_Id && existname) return res.status(400).json("Designation already exists");

        return res.json(`${Designation_Name} updated successfully`);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const editEmployeetype = async (req, res) => {
    try {
        const { Employeetype_Id } = req.params;

        const emptypid = await Employeetype.findOneAndUpdate({ Employeetype_Id }, {
            ...req.body
        })
        const existname = await Employeetype.findOne({ Employeetype_Name: req.body.Employeetype_Name });

        if (!Employeetype_Id) return res.status(400).json("No Data Found");
        if (existname.Employeetype_Id == Employeetype_Id) return res.status(200).json(`${req.body.Employeetype_Name} updated successfully`);
        if (existname.Employeetype_Id != Employeetype_Id) return res.status(400).json("Employeetype already exists");

        return res.json(`${req.body.Employeetype_Name} updated successfully`);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}