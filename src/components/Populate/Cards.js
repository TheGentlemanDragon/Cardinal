import { linkEvent } from 'inferno'
import { connect } from 'inferno-context-api-store'

import { createCard, updateCard } from '../../modules/actions'

const Cards = ({ createCard, cardId, cards }) => {
  const card = cards[cardId]
  return (
    <div class="sidebar-section">
      {/* Cards Section Title */}
      <div class="sidebar-section-title" container="row #spread @center">
        <label flex>Cards</label>

        <i class="icon-add-element clickable" onClick={createCard} />
      </div>

      {/* Cards List */}
      {!cards.length && (
        <div class="compose-element" container="row #middle @center">
          Click &nbsp;<i class="icon-add-element" /> to add a card
        </div>
      )}
      {cards.map((card, index) => (
        <div class="compose-element" container="row #spread @center">
          {/* Card Name */}
          <span flex>{card.name}</span>
        </div>
      ))}

      {/* Name */}
      {card && (
        <div class="sidebar-item property" container="row #spread @center">
          <span>name</span>
          <input
            type="text"
            value={card.name}
            onInput={linkEvent('name', updateCard)}
          />
        </div>
      )}
    </div>
  )
}

export default connect(
  store => ({
    cardId: store.preview.cardId,
    cards: store.cards,
  }),
  {
    createCard,
    updateCard,
  }
)(Cards)
