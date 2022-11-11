import mongoose from "mongoose";
import YearModel from "../models/TimesheetModel/YearModel.js";

export const addYear = async (req, res) => {
    try {
        const { Employee_Id, Status } = req.body;

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const currentDate = new Date().getDate();

        const exist = await YearModel.create({ year: currentYear, month: currentMonth, date: currentDate, Employee_Id, Status });
        return res.status(200).json(exist);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const getEmpstatus = async (req, res) => {
    try {
        mongoose.connect(process.env.MONGO_URI, function (err, db) {
            if (err) throw err;
            const dbo = db.db("test");
            db.collection('years').aggregate([
                {
                    $lookup:
                    {
                        from: 'registers',
                        localField: 'Employee_Id',
                        foreignField: 'Employee_Id',
                        as: 'empTimesheetstatus'
                    }
                }
            ]).toArray(function (err, res) {
                if (err) throw err;
                const result = JSON.stringify(res);
                console.log(result);
                db.close();
                return res.status(200).json(result);
            });
        });

    } catch (error) {
        return res.status(400).json(error.message);
    }
}