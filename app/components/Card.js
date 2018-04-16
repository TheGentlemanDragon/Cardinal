import { h } from 'hyperapp'
import './Card.styl'

export default ({ scale }) => (
  <div
    key="card"
    class="card"
    style={{
      transform: 'scale(2)',
    }}
  >
    <div class="element" />
  </div>
)
