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
    <div
      class="element"
      ng-repeat="element in $ctrl.template.elements track by element.id"
      ng-class="{
        editing: ($ctrl.mode === 'element' && element.id !== $ctrl.selectedElementId),
        selected: ($ctrl.mode === 'element' && element.id === $ctrl.selectedElementId)
        }"
      style="{{ element.style }}"
    >
      {/* {{ $ctrl.mode === 'preview' ? $ctrl.instance.data[$index] : element.name }} */}
    </div>
  </div>
)