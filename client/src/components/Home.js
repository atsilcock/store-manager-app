import React, { useEffect, useState } from "react";

function Home() {
    const [stores, setStores] = useState([])

    

 
    useEffect(() => {
        fetch("http://127.0.0.1:5555/store",)
        .then(response => response.json())
        .then(data => setStores(data))
    },[])

    const storeList = stores.map(store => {
        return <ul key={store.id}> {store.name} Grocery | Store ID: {store.id} | {store.location} </ul>

    })
      
    return (
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h1>Grocery Stores</h1>
        {storeList}
      </div>
    )
}




export default Home