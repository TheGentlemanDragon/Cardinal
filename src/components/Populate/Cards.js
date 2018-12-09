import { linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'

const createCard = () => emitEvent('createCard')

const updateCard = (event, key) => {
  const { value } = event.target
  emitEvent('createCard', { key, value })
}

const Cards = ({ cardId, cards }) => {
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
          Click &nbsp;
          <i class="icon-add-element" /> to add a card
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

const map = ({ cardId, cards }) => ({ cardId, cards })
export default mapStatesToProps(Cards, map)
