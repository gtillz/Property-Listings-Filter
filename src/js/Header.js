import React from 'react'
import propTypes from 'prop-types'
import image from '../images/house-location-pin.svg'
import Filter from './Filter'

let Header = ({filterVisible, toggleFilter, handleFilterChange, clearFilter}) => {
    return (
        <header className={`${filterVisible ? 'filter-is-visible': ''}`}>     
            <Filter toggleFilter={toggleFilter}
                    clearFilter={clearFilter}
                    handleFilterChange={handleFilterChange}
            /> 
            <img src={image} />
            <h1>Property Listings</h1>
            <button className="btn-filter" onClick={(e)=> toggleFilter(e)}>Filter</button>
        </header>
    )
}

Header.propTypes = {
    filterVisible: propTypes.bool.isRequired,
    clearFilter: propTypes.func.isRequired,
    toggleFilter: propTypes.func.isRequired,
    handleFilterChange: propTypes.func.isRequired
}

export default Header
