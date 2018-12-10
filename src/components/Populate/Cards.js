import { linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'

const createCard = () => emitEvent('createCard')

const updateCard = (key, event) => {
  const { value } = event.target
  emitEvent('updateCard', { key, value })
}

const Field = ({ card, element }) =>
  !element.type.startsWith('Static') ? (
    <div class="sidebar-item property" container="row #spread @center">
      <span>{element.name}</span>
      <input
        type="text"
        value={card.data[element.name]}
        onInput={linkEvent(element.name, updateCard)}
      />
    </div>
  ) : null

const Cards = ({ card, cards, elements }) => (
  <>
    <div class="sidebar-section">
      {/* Cards Section Title */}
      <div class="sidebar-section-title" container="row #spread @center">
        <label flex>Cards</label>

        <i class="icon-add-element clickable" onClick={createCard} />
      </div>

      {/* Cards List */}
      {!cards.size && (
        <div class="compose-element" container="row #middle @center">
          Click &nbsp;
          <i class="icon-add-element" /> to add a card
        </div>
      )}
      {[...cards]
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((card, index) => (
          <div
            key={`card-${card.name}`}
            class="compose-element"
            container="row #spread @center"
          >
            {/* Card Name */}
            <span flex>{card.name}</span>
          </div>
        ))}
    </div>
    {card && elements.length ? (
      <div class="sidebar-section">
        {/* Fields Section Title */}
        <div class="sidebar-section-title" container="row #spread @center">
          <label flex>Fields</label>
        </div>
        {/* Name */}
        {elements.map(element => (
          <Field key={`field-${element.name}`} card={card} element={element} />
        ))}
      </div>
    ) : null}
  </>
)

const map = ({ card, cards, elements }) => ({ card, cards, elements })
export default mapStatesToProps(Cards, map)
