import { useEffect, useState } from "react"

export function App({ offset = 20, limit = 20 }) { 

    const [poke, setPoke] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` 

    useEffect(() => {
        setLoading(true)
        fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`)
                }
                return response.json()
            })
            .then(data => {
                setPoke(data.results)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [URL])

    return (
        <div>
            <h1>APP</h1>
            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {poke.map((pokemon, index) => (
                    <li key={index}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    )
}
