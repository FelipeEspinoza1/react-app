import { set } from "mongoose";
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
    const dates = []

    for (var i=0; i<first.length; ++i) {
        dates[i] = first[i].fecha;
    }

    const years = [...new Set(dates.map(x => x.split('/')[2]))].sort()

    res.json({value: years, label: years})
}

export const getCitasFreq = async (_, res) => {
    const first = await Cita.find();
    res.json(first)
}