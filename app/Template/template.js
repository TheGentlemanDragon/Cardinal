import { h } from 'hyperapp'
import Editor from '../Editor'
import './template.styl'

const Template = ({ games }) => ({ match }) =>
  <div class="page" container="column #top @stretch">
    <div class="page-title">
      Editor
    </div>

    <Editor container="column"
            element="$ctrl.element"
            card="$ctrl.card"
            ui="$ctrl.ui"
            data="$ctrl.data">
    </Editor>

    <div container="row #center @middle" flex>
      <card
          template="$ctrl.data.template"
          instance="$ctrl.card"
          mode="$ctrl.ui.mode"
          selected-element-id="$ctrl.element.id"
          style="transform: scale({{ $ctrl.ui.scale }}, {{ $ctrl.ui.scale }})"
          ng-click="$ctrl.selectElement($event)">
      </card>
    </div>
  </div>

export default Template
