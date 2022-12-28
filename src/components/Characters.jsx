import {
  useEffect,
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from 'react'
import { Search } from './Search'

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
  const [search, setSearch] = useState('')
  const searchInput = useRef(null)

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

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value)
  }, [])

  const filteredCharacters = useMemo(
    () =>
      characters.filter((character) => {
        return character.name.toLowerCase().includes(search.toLowerCase())
      }),
    [characters, search]
  )

  return (
    <div className="characters">
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}

      <Search
        search={search}
        handleSearch={handleSearch}
        searchInput={searchInput}
      />

      {filteredCharacters.map((character) => (
        <div key={character.id}>
          <h2>{character.name}</h2>
          <button type="button" onClick={() => handleClick(character)}>
            Agregar a favoritos
          </button>
        </div>
      ))}
    </div>
  )
}

export default Characters
