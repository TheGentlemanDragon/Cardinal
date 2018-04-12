import { h } from 'hyperapp'
import './card.styl'

export const Card = ({ scale }) => (
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
