import { linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'

const createCard = () => emitEvent('createCard')

const updateCard = (key, event) => {
  const { value } = event.target
  emitEvent('updateCard', { key, value })
}

const Field = ({ card, element, id }) =>
  !element.type.startsWith('Static') ? (
    <div class="sidebar-property" container="row #spread @center">
      <label for={id}>{element.name}</label>
      <input
        id={id}
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
        <div class="sidebar-list-item" container="row #middle @center">
          Click &nbsp;
          <i class="icon-add-element" /> to add a card
        </div>
      )}
      {[...cards]
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((card, index) => (
          <div
            key={`card-${card.name}`}
            class="sidebar-list-item"
            container="row #spread @center"
          >
            {/* Card Name */}
            <label flex>{card.name}</label>
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
        {elements.map(element => {
          const id = `field-${element.name}`
          return <Field key={id} id={id} card={card} element={element} />
        })}
      </div>
    ) : null}
  </>
)

const map = ({ card, cards, elements }) => ({ card, cards, elements })
export default mapStatesToProps(Cards, map)
