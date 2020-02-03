import { Component, linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'

import PropertyGroup from '../SideBar/PropertyGroup'
import { clone, differ, getTargetValue } from '../../modules/utils'

const createCard = () => emitEvent('createCard')

const saveCardData = (instance, data) => () => {
  instance.setState({ data: clone(data) })
  emitEvent('saveCard', data)
}

const selectCard = instance => card => {
  instance.setState({ data: clone(card.data) })
  emitEvent('setState', { card })
}

const updateData = instance => (key, event) => {
  const { data } = instance.state
  data[key] = getTargetValue(event)
  instance.setState({ data: clone(data) })
}

const resetData = (instance, data) => () =>
  instance.setState({ data: clone(data) })

const Field = ({ data = {}, element, key, updateData }) =>
  !element.type.startsWith('Static') && (
    <div class="sidebar-property" container="row #spread @center">
      <label for={key}>{element.name}</label>
      <input
        id={key}
        type="text"
        value={data[element.name]}
        onInput={linkEvent(element.name, updateData)}
      />
    </div>
  )

class Cards extends Component {
  state = {
    data: undefined,
  }

  // card will not be loaded on mount; set originalData state once loaded
  componentDidUpdate() {
    if (this.state.data || !this.props.card) {
      return
    }

    this.setState({ data: clone(this.props.card.data) })
  }

  render() {
    const {
      props: { card, cards, elements },
      state: { data },
    } = this

    const modified = card && differ(data, card.data)

    return (
      <>
        <div class="sidebar-section">
          {/* Cards Section Title */}
          <div class="sidebar-section-title" container="row #spread @center">
            <label flex>Cards</label>

            <i class="icon-add-element clickable" onClick={createCard} />
          </div>

          {/* No Cards */}
          {!cards.length && (
            <div class="sidebar-list-item" container="row #middle @center">
              Click &nbsp;
              <i class="icon-add-element" /> to add a card
            </div>
          )}

          {/* Cards List */}
          {cards.map(item => (
            <div
              key={`card-${item.name}`}
              class={
                'sidebar-list-item clickable' +
                (item === card ? ' selected' : '')
              }
              container="row #spread @center"
              onClick={linkEvent(item, selectCard(this))}
            >
              {/* Card Name */}
              <label flex>{item.name}</label>
            </div>
          ))}
        </div>

        {card && elements.length ? (
          // Fields List
          <PropertyGroup
            label="Fields"
            collapsable={false}
            actions={[
              <i
                class={'icon-restore clickable' + (!modified ? ' clean' : '')}
                onClick={modified && resetData(this, card.data)}
              />,
              <i
                class={
                  'icon-cloud-upload clickable' + (!modified ? ' clean' : '')
                }
                onClick={modified && saveCardData(this, data)}
              />,
            ]}
          >
            {/* Name */}
            {elements.map(element => {
              const id = `field-${element.name}`
              return (
                <Field
                  key={id}
                  data={data}
                  element={element}
                  updateData={updateData(this)}
                />
              )
            })}
          </PropertyGroup>
        ) : null}
      </>
    )
  }
}

const map = ({ card, cards, elements }) => ({
  card,
  cards,
  elements,
})
export default mapStatesToProps(Cards, map)
