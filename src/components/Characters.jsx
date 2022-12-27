import { useEffect, useState, useReducer } from 'react'

const initialState = {
  favorites: [],
}

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      }
    default:
      return state
  }
}

const Characters = () => {
  const [characters, setCharacters] = useState([])

  const [favorites, dispatch] = useReducer(favoriteReducer, initialState)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const data = await response.json()
    setCharacters(data.results)
  }

  const handleClick = (favorite) => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
  }

  return (
    <div className="characters">
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}
      {characters.map((character) => (
        <>
          <h2 key={character.id}>{character.name}</h2>
          <button type="button" onClick={() => handleClick(character)}>
            Agregar a favoritos
          </button>
        </>
      ))}
    </div>
  )
}

export default Characters
