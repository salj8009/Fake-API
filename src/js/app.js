const API = 'https://fakestoreapi.com/products';

const content = document.getElementById('content');

const filterText = document.getElementById('filter-text');
const btn = document.getElementById('btn-search');

async function fechData(urlAPI) {
    const response = await fetch(urlAPI);
    const data = await response.json();
    return data;
}

const CargaProductos = async () => {
    try {
        const productosRecibidos = await fechData(API);

        //const title = productos.map(item => item.title)
        const productos = productosRecibidos.forEach(element => {
            const vista = `
            <div class="product-container">
                <img class="product-image" src="${element.image}" alt="imagen product">
                <div class="product-details">
                <h3 class="product-name">Producto : ${element.title}</h3>
                <p>el precio es: ${element.price}</p>
                <p>Descripción del producto: ${element.description}</p>
                <p>Categoria : ${element.category}</p>
                <p>Rating : ${element.rating.rate}</>
                </div>
                
            </div>
            
            `
            content.innerHTML += vista;           

        });
       
        
    } catch (error) {
        console.log(error)
    }
}

CargaProductos(API);



btn.addEventListener('click' , () => {
    let paramSearch = parseInt(filterText.value);
    content.innerHTML = '';
    (async () =>{
        try {
            const productosABuscar= await fechData(API);
            if(paramSearch <= 5){
            let productRango = productosABuscar.filter(product => product.rating.rate <= paramSearch)
       
            productRango.forEach(prod => {
                const vistaSearch = `
            <div class="product-container">
                <img class="product-image" src="${prod.image}" alt="imagen product">
                <div class="product-details">
                <h3 class="product-name">Producto : ${prod.title}</h3>
                <p>el precio es: ${prod.price}</p>
                <p>Descripción del producto: ${prod.description}</p>
                <p>Categoria : ${prod.category}</p>
                <p>Rating : ${prod.rating.rate}</>
                </div>
                
            </div>
            
            `
            content.innerHTML += vistaSearch; 
            })
                 


            }else{
                alert('solo puedes buscar entre el rango de 1 a 5');
            }
        } catch (error) {
            
        }
        
    })()
    
})