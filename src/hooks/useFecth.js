import { useEffect, useState } from "react"



export const useFetch = (url) => {
    const [data, setData] = useState(null);

    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(null);

    const [loading, setLoding] = useState(false)
    const [error, setError] = useState(false);

    const [itemID, setItemID ] = useState(null)

    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
            
            setMethod("POST")
        }else if ( method === "DELETE" ) {
            setConfig({
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
            });
            setMethod("DELETE");
            setItemID(data);      
    }
}


    useEffect(() => {
        //Carregando os dados do back GET
        async function fetchData() {
            setLoding(true)
            
            try {
                const res = await fetch(url)
                const json = await res.json()
                setData(json)

                setMethod(null);
                
    
            } catch (error) {
                setError("Houve algum erro no carregamento dos dados")
                
            }
            setLoding(false)
        }
        fetchData()
    }, [url, callFetch]);

    useEffect(() => {
        //Inserindo novos dados POST
        const httpRequest = async () => {

            if (method === "POST") {
                
                let fetchOptions = [url, config]

                const res = await fetch(...fetchOptions)

                 const json = await res.json()

                 setCallFetch(json);        

                
            }else if(method === "DELETE"){
                const deleteURL = `${url}/${itemID}`;

                const res = await fetch(deleteURL, config);

                const json = await res.json;

                setCallFetch(json);   
            }
        };

        httpRequest();
    }, [config]);

    console.log(config);


    return { data, httpConfig, loading, error };

    };
