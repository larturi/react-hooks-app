import { useEffect, useState } from 'react'

const Characters = () => {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const data = await response.json()
    setCharacters(data.results)
  }

  return (
    <div className="characters">
      {characters.map((character) => (
        <h2 key={character.id}>{character.name}</h2>
      ))}
    </div>
  )
}

export default Characters
