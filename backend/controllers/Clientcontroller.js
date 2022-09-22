import clients from "../models/ConfigurationModel/clients.js";


export const AddCLient = async (request, response) => {
    try {
        const { Client_Name, IsActive } = request.body;

        const Clientexist = await clients.findOne({ Client_Name });
        if (Clientexist) return response.status(400).json("Client Alredy Exist");

        const results = await clients.create({ Client_Name, IsActive: true })
        response.status(200).json(`${Client_Name} Added Successfully....!`);

    } catch (error) {
        response.status(400).json(error.message);
    }
};

export const GetClient = async (request, response) => {
    try {
        const getclient = await clients.find({ IsActive: true });
        response.status(200).json(getclient);

    } catch (error) {
        response.status(400).json(error.message);
    }
};
export const GetClientfalse = async (request, response) => {
    try {
        const getclientfalse = await clients.find({ IsActive: false });
        response.status(200).json(getclientfalse);

    } catch (error) {
        response.status(400).json(error.message);
    }
};

export const Editclient = async (request, response) => {
    try {
        const { Client_Name, IsActive } = request.body;

        const exists = await clients.findOne({ Client_Name });
        if (!exists) return response.status(400).json("User Dose Not Exist....!");

        const exist = await clients.findOneAndUpdate({ Client_Id }, { Client_Name, IsActive })
        response.json(`${Client_Name} Updated Successfully`)
    } catch (error) {
        response.status(400).json(error.message);
    }
}