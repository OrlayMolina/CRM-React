import { Form, useNavigate, useLoaderData, redirect } from 'react-router-dom';
import { obtenerCliente, actualizarCliente } from '../data/clientes';
import Formulario from '../components/Formulario';
import Error from '../components/Error';

export async function loader({params}){
    const cliente = await obtenerCliente(params.clienteId);
    if(Object.values(cliente).length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'Cliente no exite'
        });
    }

    return cliente;
}

export async function action({request, params}){
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    const email = formData.get('email');
    
    //validación de datos
    const errores = [];
    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son obligatorios');
    }

    const validarEmail = (email) => {
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        if (!regex.test(email)) {
          errores.push('El Email no es válido');
        }
        
      };

      validarEmail(email);
    
    // Retornar los errores
    if(Object.keys(errores).length){    
        return errores;
    }

    //Actualizar el cliente
    await actualizarCliente(params.clienteId, datos);

    return redirect('/');
}

function EditarCliente() {

    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useLoaderData();

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3 text-2xl">A continuación podrás modificar los datos de un Cliente</p>

            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-md"
                    onClick={() => navigate(-1)}
                >
                    Volver
                </button>
            </div>

            <div className='bg-white shadow-md rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

                {errores?.length && errores.map( ( error, i ) => <Error key={i}>{error}</Error>)}

                <Form
                    method='post'
                    noValidate
                >
                    <Formulario 
                        cliente={cliente}
                    />

                    <input 
                        type="submit" 
                        className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-md'
                        value="Guardar Cliente"
                    />
                </Form>

            </div>
        </>
    )
}

export default EditarCliente
