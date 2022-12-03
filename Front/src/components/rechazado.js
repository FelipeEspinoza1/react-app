import React from 'react'
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'



function Rechazado() {

    Swal.fire({
        title: 'No se ha podido procesar el pago :(',
        text: 'Intentalo nuevamente!',
        icon: 'error',
        confirmButtonText: '<a style="color:#FFF" href="http://localhost:3000/detalle">Continuar</a> '
      })


  return (
    <div><h1></h1></div>
  )
}



export default Rechazado