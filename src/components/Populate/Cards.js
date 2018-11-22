import { mapStatesToProps } from 'inferno-fluxible'

const Cards = ({ cardId, cards }) => {
  const card = cards[cardId]
  return (
    <div class="sidebar-section">
      {/* Cards Section Title */}
      <div class="sidebar-section-title" container="row #spread @center">
        <label flex>Cards</label>

        <i
          class="icon-add-element clickable"
          // TODO: onClick={createCard}
        />
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
            // TODO: onInput={linkEvent('name', updateCard)}
          />
        </div>
      )}
    </div>
  )
}

const map = ({ cardId, cards }) => ({ cardId, cards })
export default mapStatesToProps(Cards, map)
