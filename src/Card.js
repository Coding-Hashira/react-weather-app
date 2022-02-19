import React from 'react'
import './card.css'

const Card = () => {
  return (
    <div className="Card">
      <main>
        <div className="searchBox">
          <input type="text" className="searchBar" placeholder="Search" />
        </div>
      </main>
    </div>
  )
}

export default Card