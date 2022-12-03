import Cita from "../models/Citas"
import Profesional from "../models/Profesionals"
import Calendar from "../models/Calendar"

const days = ["","lunes","martes","miercoles","jueves","viernes"]

export const getHours = async (req, res) => {
    const prof = await Profesional.findOne({rut: req.body.rut_prof})
    const citas = await Cita.find({fecha: req.body.fecha, id_prof:prof._id})

    var hours = prof.schedule[days[req.body.dia]]

    for(var i = 0; i < citas.length ; i++){
        const index = hours.indexOf(citas[i].hora)
        if(index > -1){
            hours.splice(index,1)
        }
    }

    res.status(200).json({horas: hours})
}

export const getCalendar = async (req, res) => {
    const dates = await Calendar.findOne({rut_prof: req.body.rut_prof})
    
    res.status(200).json(dates)
}

export const getCitas = async (req, res) => {
    const citas = await Cita.find();
    res.json(citas)
}

export const createCita = async (req, res) => {
    const citas = await Cita.find({fecha:req.body.fecha, hora:req.body.hora});
    console.log(citas, citas.length)
    var cita_finded = false
    for(var i = 0; i < citas.length && cita_finded; i++){
        if(citas[i].estado !== "cancelada")
        {
            cita_finded = true
        }
    }

    if(!cita_finded) {
        const profFound = await Profesional.findOne({rut: req.body.rut_prof});
        const id_prof = profFound._id;

        const estado = "pedido"
        const {nombre, rut_cliente, edad, telefono, fecha, correo, hora, grupo, descripcion} = req.body;

        // const S_fecha = fecha.split('/')
        // const S_hora = hora.split(':')
        // var codigo = ""

        // for(var i = 0; i < S_fecha.length ; i++){
        //     if(i === 0){
        //         codigo = codigo+S_fecha[i][0]+S_hora[0][0]+S_fecha[i][1]+S_hora[0][1]
        //     }
        //     else if(i === 1){
        //         codigo = codigo+S_fecha[i]+profFound.id_prof
        //     }
        //     else if(i === 2){
        //         codigo = codigo+S_fecha[i][0]+S_hora[1][0]+S_fecha[i][1]+S_fecha[i][2]+S_hora[1][1]
        //     }
        // }

        const nueva_cita = new Cita({id_prof, nombre, rut_cliente, edad, telefono, correo, fecha, hora, grupo, estado, descripcion});
        const citaSaved = await nueva_cita.save();
    
        res.status(201).json({message: "Se agendó correctamente la cita",code:citaSaved._id});
    }
    else {
        res.status(200).json({message: 'Ya hay una cita agendada en este dia y hora'})
    }
    
}

export const cancelCita = (req, res) => {
    
}

export const getCitasByRutClient = async (req, res) => {
    const citas = await Cita.find({rut_cliente: req.body.rut, id_prof: req.body.id_prof})
    
    var P_names = []
    for(var i = 0; i < citas.length; i++) {
        P_names.push({id:citas[i]._id, name:citas[i].nombre, edad:citas[i].edad, phone:citas[i].telefono, email:citas[i].correo, fecha:citas[i].fecha, hora:citas[i].hora, description:citas[i].descripcion, state:citas[i].estado})
    }
    res.status(200).json(P_names)
}

export const getCitasByCode = async (req, res) => {
    const citas = await Cita.find({_id: req.query.codigo});
    var P_names = []
    for(var i = 0; i < citas.length; i++) {
        
        const prof = await Profesional.findOne({ _id : citas[i].id_prof });
        P_names.push({nombre: citas[i].nombre, fecha: citas[i].fecha, hora: citas[i].hora, nombre_prof: (prof.nombre+" "+prof.apellido)})
    
    }
    res.status(200).json(P_names)
}

export const updateCitaState = async (req, res) => {
    try{
        const cita = await Cita.findOneAndUpdate({_id:req.body.id_cita},{estado:req.body.state})
        console.log(cita)
        res.status(200).json("Cambio exitoso")
    }catch(err){
        res.status(401)
    }
    
}

export const getCitasByDay = async (req, res) => {
    const citas = await Cita.find({fecha: req.body.fecha, id_prof: req.body.id_prof})
    var C = []
    for(var i = 0; i < citas.length; i++) {
        C.push({id:citas[i]._id, name:citas[i].nombre, edad:citas[i].edad, phone:citas[i].telefono, email:citas[i].correo, fecha:citas[i].fecha, hora:citas[i].hora, description:citas[i].descripcion, state:citas[i].estado})
    }
    res.status(200).json(C)
}

export const getCitasByWeek = async (req, res) => {
    const F = req.body.fechas
    const citas = await Cita.find({fecha: {$in: F}, id_prof: req.body.id_prof})

    var C = []
    for(var i = 0; i < citas.length; i++) {
        C.push({id:citas[i]._id, name:citas[i].nombre, edad:citas[i].edad, phone:citas[i].telefono, email:citas[i].correo, fecha:citas[i].fecha, hora:citas[i].hora, description:citas[i].descripcion, state:citas[i].estado})
    }
    
    res.status(200).json(C)
}

export const getProfesional = async (req, res) => {
    const prof = await Profesional.find({grupo: req.body.grupo})
    res.status(200).json({"prof": prof})
}