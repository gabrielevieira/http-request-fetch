
import './App.css';

import { useState, useEffect } from "react";

import {useFetch} from './hooks/useFecth';

const url = "http://localhost:3000/products"


function App() {

  const {data: items, httpConfig, loading, error} = useFetch(url);

  const [products, setProducts] = useState([])

  const [name, setName] = useState("");
  const [price, setPrice] = useState("")

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(url)
  //     const data = await res.json()
  //     setProducts(data)
  //   }

  //   fetchData()
  // }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    // const res = await fetch(url, {
    //   method:"POST",
    //   headers:{
    //     "Content-type":"application/json"
    //   },
    //   body: JSON.stringify(products)
    // });

    // const addedProduct = await res.json();

    // setProducts((preventDefault) => [...preventDefault, addedProduct])

    httpConfig(product, "POST");

    setName("");
    setPrice("");

  }

  const handleDelete = (id) => {
    httpConfig(id, "DELETE")
   }


  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {loading && <p>Carregando dados ...</p>}
      {error && <p>{error}</p>}
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>{product.name} - R$: {product.price}  <button onClick={() => handleDelete(product.id)}>Excluir</button></li> 
        ))}

      </ul>
      <div className="add-products">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)}>
            </input>
          </label>
          <label>
            Preço:
            <input type="number" value={price} name="price" onChange={(e) => setPrice(e.target.value)}>
            </input>
          </label>
          {loading && <input type="submit" value="criar" disabled></input>}          
          {!loading && <input type="submit" value="criar"></input>}
        </form>
      </div>

    </div>
  );
}

export default App;
