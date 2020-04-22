import { Component, linkEvent } from 'inferno'

class PropertyGroup extends Component {
  state = {
    isOpen: true,
  }

  toggle(instance) {
    instance.setState({ isOpen: !instance.state.isOpen })
  }

  render() {
    const { isOpen } = this.state
    const { actions, children, collapsable = true, label } = this.props
    const cheveronPosition = isOpen ? 'cheveron-down' : 'cheveron-up'

    return (
      <div class="sidebar-section">
        <div class="sidebar-section-title" container="row #spread @center">
          <label flex>{label}</label>
          {actions}
          {collapsable && (
            <i
              class={`icon-${cheveronPosition} icon-lg clickable`}
              onClick={linkEvent(this, this.toggle)}
            />
          )}
        </div>
        {isOpen && children}
      </div>
    )
  }
}

export default PropertyGroup
