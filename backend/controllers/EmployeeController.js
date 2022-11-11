import register from '../models/RegisterModel.js';
import previousChange from '../models/PreviousChange.js';

export const Editempctrl = async (req, res) => {
    const { Employee_Id } = req.params
    try {

        const empid = await register.findOneAndUpdate({ Employee_Id }, {
            ...req.body
        })

        const existmail = await register.findOne({ Email_Id: req.body.Email_Id });
        const existContact = await register.findOne({ ContactNo: req.body.ContactNo });
        const existempcode = await register.findOne({ Employeecode: req.body.Employeecode });

        if (!empid) return res.status(400).json({ error: "No details found" });

        if (existmail.Employee_Id == existContact.Employee_Id == existempcode.Employee_Id == Employee_Id) return res.status(200).json(`${req.body.Firstname}${req.body.Lastname}Updated and added to previous change`);
        else if (existmail.Employee_Id != Employee_Id && existmail) return (res.status(400).json({ error: "Email already exists" }));
        else if (existContact.Employee_Id != Employee_Id && existContact) return (res.status(400).json({ error: "Contact No already exists" }));
        else if (existempcode.Employee_Id != Employee_Id && existempcode) return (res.status(400).json({ error: "Employee Code already exists" }));
        if (req.body.Email_Id == req.body.AlternateEmail) return res.status(400).json({ error: "Alternate-Email and Official-Email should not be same" });
        const previous = await register.findOne({ Employee_Id });
        const userdata = await previousChange.create({ Employee_Id: previous.Employee_Id, Firstname: previous.Firstname, Lastname: previous.Lastname, Employeecode: previous.Employeecode, Reportingmanager: previous.Reportingmanager, Employeetype_Id: previous.Employeetype_Id, Email_Id: previous.Email_Id, Role_Id: previous.Role_Id, Designation_Id: previous.Designation_Id, ContactNo: previous.ContactNo, Joiningdate: previous.Joiningdate, Enddate: previous.Enddate });

        return res.status(200).json(`${req.body.Firstname}${req.body.Lastname}Updated and added to previous change`);

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const IsactiveEmp = async (req, res) => {
    const { Employee_Id, Isactive } = req.body
    try {

        if (!Employee_Id) return res.status(400).json({ error: "Employee Id is missing" });
        const isemp = await register.findOneAndUpdate({ Employee_Id }, { Isactive });
        return res.status(200).json(isemp);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const GetEmpPreviousChange = async (req, res) => {
    const { Employee_Id } = req.params
    try {
        const user = await previousChange.find({ Employee_Id });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}