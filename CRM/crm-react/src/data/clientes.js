export async function obtenerClientes(){
    const response = await fetch(import.meta.env.VITE_API_URL);
    const result = await response.json();

    return result;
}

export async function agregarCliente(datos){

    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await response.json();
    }catch(error){
        console.log(error);
    }

}