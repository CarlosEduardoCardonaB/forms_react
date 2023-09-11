import React, { useState } from 'react'

export default function FormularioComponent() {

  const [usuario, setUsuarios] = useState({});

  const getFormData = e =>{
    //El preventDefault evita que al recargar la página se pierdan los datos del formulario y se vea el submit
    e.preventDefault();
    let data = e.target;

    //Para acceder a los valores lo hacemos mediante el atributo "name" de los campos del formulario
    let user = {
      nombre: data.nombre.value, //Este valor se trae del formulario con el atributo "name = nombre" y accedemos a su "value" y asi para los otros campos
      apellido: data.apellido.value,
      genero: data.genero.value,
      biografia: data.biografia.value,
      enviar: data.enviar.value
    }
    console.log(user);
    setUsuarios(user);
  }

  const cambiarDatos = e =>{
    //console.log(e.target.name);
    let name_del_input = e.target.name
    let usuario_para_modificar = usuario

    //De esta manera nos evitamos hacer una cantidad de if validando si el name del html modificado 
    //corresponde al del onChange. El valida que el name_del_input sea el que corresponde de usuario_para_modificar y 
    //le asigna el valor del e.target.value
    //usuario_para_modificar[name_del_input] = e.target.value

    //Una forma para sobreescribir el valor y asignar los campos entrantes en el submit del formulario es asi:

    setUsuarios(estadoPrevio =>({
      //Con estos tres puntos se mantiene el valor del array anterior. Por ejemplo, si tengo un array
      // var parts = [item1, item2] y luego lo quier agregar a un array mas grande, solo tengo que hacer esto:
      // var array_mas_grande = [item0, ...parts, item3, item4] y el resultado final será
      // [item0, item1, item2, item3]

      //En este caso recibimos el array tal como está y solo actualizamos el item que cambia con [name_del_input]: e.target.value
      ...estadoPrevio,
      [name_del_input]: e.target.value
    }))

    //Este método es igual al anterior solo que el anterior tiene el return implícito en loa paréntisis después de la flecha =>
    // setUsuarios(estadoPrevio => {
    //   return{
    //     ...estadoPrevio,
    //   [name_del_input]: e.target.value
    //   }      
    // })


    console.log(usuario_para_modificar)
    
  }
  
  return (
    <div>
        <h1>Formulario con React</h1>
        <form onSubmit={getFormData}>
            <input type='text' 
                   placeholder='Nombre' 
                   name='nombre'
                   onChange={cambiarDatos} 
            />

            <input type='text' 
                   placeholder='Apellido' 
                   name='apellido'
                   onChange={cambiarDatos}
            />

            <select name='genero' onChange={cambiarDatos}>
                <option value='hombre'>Hombre</option>
                <option value='mujer'>Mujer</option>
            </select>
            <textarea placeholder='Biografia' 
                      name='biografia'
                      onChange={cambiarDatos}
            >
            </textarea>
            <input type='submit' 
                   value='Enviar'
                   name= 'enviar'                   
            />
        </form>

        { usuario.enviar &&
        (
          <div className='info_usuarios label label-grey'>
            <strong>{usuario.nombre + ' '} {usuario.apellido + ' '}</strong>es un {usuario.genero + ' '}
            y su biografía es {usuario.biografia}
          </div>

        )//En esta condición validamos que el usaurio.enviar (este es el name del evento submit)
        //Se pueden colocar más condiciones para validar el formulario y que se muestre el div
        //por ej: usuario.enviar && usuario.biografia.lenght >= 1 && (...
      }
        
        
    </div>
  )
}
