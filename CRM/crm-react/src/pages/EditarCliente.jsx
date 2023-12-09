import { obtenerCliente } from '../data/clientes';

export async function loader({params}){
    const cliente = await obtenerCliente(params.clienteId);
    console.log(cliente);

    return {};
}

function EditarCliente() {
  return (
    <div>
      Editando ...
    </div>
  )
}

export default EditarCliente
