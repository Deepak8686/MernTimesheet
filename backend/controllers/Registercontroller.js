import register from '../models/RegisterModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { locationSuccess, locationError } from '../Common/location.js';

export const registerctrl = async (req, res) => {

    try {
        const { Firstname, Lastname, Employeecode, Reportingmanager, Employeetype_Id, Email_Id, AlternateEmail, Role_Id, Designation_Id, ContactNo, Isactive, Joiningdate, Enddate, password } = req.body

        const existingmail = await register.findOne({ Email_Id });
        const existingcontact = await register.findOne({ ContactNo });
        const existEmployeecode = await register.findOne({ Employeecode });

        const hasedPassword = await bcrypt.hash(password, 12);
        if (existingmail) return (res.status(400).json({ error: "Email already exists" }));
        if (existingcontact) return (res.status(400).json({ error: "Contact No already exists" }));
        if (existEmployeecode) return (res.status(400).json({ error: "Employee Code already exists" }));

        const regist = await register.create({ Firstname, Lastname, Employeecode, Reportingmanager, Employeetype_Id, Email_Id, AlternateEmail, Role_Id, Designation_Id, ContactNo, Isactive, Joiningdate, Enddate, password: hasedPassword })
        res.status(200).json(regist)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const Loginctrl = async (req, res) => {
    const { Email_Id, password } = req.body;
    try {

        const existingMail = await register.findOne({ Email_Id });
        if (!existingMail) return res.status(400).json({ error: "Email not registered" });

        const hasedPassword = await bcrypt.compare(password, existingMail.password);

        if (hasedPassword == true) {
            const token = jwt.sign({ name: existingMail.Username, id: existingMail._id }, 'FirstJwtTokenCreation', { expiresIn: '5h' });
            return res.status(200).json({ userId: existingMail._id, token, success: `${existingMail.Firstname + "" + existingMail.Lastname}, You are Logged in successfully` })

        } else {
            return res.status(400).json({ error: "Incorrect Password" });
        }


    } catch (error) {
        res.status(400).json({ error: "Network Error" });
    }
}
export const Changepassword = async (req, res) => {
    const { Email_Id, password } = req.body
    try {
        if (!Email_Id) return res.status(400).json({ error: "Email Id missing" });
        const hashpass = await bcrypt.hash(password, 12);
        const changePassword = await register.findOneAndUpdate({ Email_Id }, { password: hashpass });
        return res.status(200).json({ success: "Password Changed Successfully" })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }


}

export const Userctrl = async (req, res) => {

    const find = await register.find({}).sort({ Username: 1 });
    res.status(200).json(find);
}

export const Singleuserctrl = async (req, res) => {
    try {
        const { Email_Id } = req.params

        const user = await register.findOne({ Email_Id });
        return res.status(200).json(user);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
