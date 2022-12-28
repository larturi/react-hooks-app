/* eslint-disable react/prop-types */

import PropTypes from 'prop-types'

export const Search = ({ search, handleSearch, searchInput }) => {
  return (
    <div className="seacrh">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        ref={searchInput}
      />
    </div>
  )
}

Search.propTypes = {
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
}
