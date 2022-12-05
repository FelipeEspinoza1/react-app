import Cita from "../models/Citas";

export const getTypes = async (_, res) => {

    const citas = await Cita.find();
    res.json(citas)
}

export const getCitasCounter = async (_, res) => {
    
    const citas = await Cita.countDocuments();
    res.json(citas)
}

export const getYears = async (_, res) => {
    const first = await Cita.find().select("fecha");
    res.json(first)
}

export const getCitasFreq = async (_, res) => {
    const first = await Cita.find();
    res.json(first)
}