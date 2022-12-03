import React from 'react';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import emailjs from "@emailjs/browser";
import axios from "axios";

const host = process.env.REACT_APP_HOST_BACKEND

function Confirmacion() {

  const submitForm = async () => {
    if(localStorage.getItem("name") !== "" || localStorage.getItem("rut") !== "" || localStorage.getItem("profesional") !== "" || localStorage.getItem("fecha") !== "" || localStorage.getItem("hora") !== "" || localStorage.getItem("phone") !== ""){
      try{
        const response = await axios.post((host+"/api/calendar/createCita"),{
          nombre: localStorage.getItem("name"),
          rut_cliente: localStorage.getItem("rut"),
          edad: localStorage.getItem("age"),
          telefono: localStorage.getItem("phone"), 
          correo: localStorage.getItem("email"),
          fecha: localStorage.getItem("fecha"),
          hora: localStorage.getItem("hora"),
          grupo: localStorage.getItem("grupo"),
          descripcion: localStorage.getItem("descripcion"),
          rut_prof: localStorage.getItem("profesional") 
        })

        if(response.status === 200){
          console.log(response.data.message)
        }
        else if(response.status === 201){
          emailjs.send("guardiavieja1","template_eso42io",{
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            codigo: response.data.code,
            fecha: localStorage.getItem("fecha"),
            hora: localStorage.getItem("hora")
          }
          ,"EaaNqcsoFQnUBoXtm");
          //resetCredentials()
        }
      }
      catch(err){
        console.log("Error")
      }
    }
    else{
      console.log("Error")
    }
  }

  Swal.fire({
      title: 'Pago confirmado!',
      text: 'Has click aqui para continuar',
      icon: 'success',
      confirmButtonText: 'Continuar'
  }).then((result) => {
    if (result.value) {
      submitForm()
    }
  })
//<a style="color:#FFF" href="http://localhost:3000/"></a>

  return (
    <div>
    <div><h1>{localStorage.getItem("name")}</h1></div>
    <div><h1>{localStorage.getItem("rut")}</h1></div>
    <div><h1>{localStorage.getItem("age")}</h1></div>
    <div><h1>{localStorage.getItem("phone")}</h1></div>
    <div><h1>{localStorage.getItem("email")}</h1></div>
    <div><h1>{localStorage.getItem("fecha")}</h1></div>
    <div><h1>{localStorage.getItem("hora")}</h1></div>
    <div><h1>{localStorage.getItem("grupo")}</h1></div>
    <div><h1>{localStorage.getItem("descripcion")}</h1></div>
    <div><h1>{localStorage.getItem("profesional")}</h1></div>
    </div>
  )
}



export default Confirmacion