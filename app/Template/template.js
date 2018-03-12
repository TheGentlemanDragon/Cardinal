import { h } from 'hyperapp'
import { Firebase } from '../_services'
import { SideBar} from './SideBar'
import { Card } from './Card'
import './template.styl'

export const templateActions = {
  fetchTemplate: (match) => async (state, actions) => {
    actions.setTemplate({})
  },
  setTemplate: value => state => ({ ...state, templates: value }),
}

export const Template = ({ template }, actions) => ({ match }) =>
  <div  key="template"
        container="row #left @stretch" flex>

    <SideBar />

    <div container="column #center @center" flex>
      <Card
          scale="2"
          template="$ctrl.data.template"
          instance="$ctrl.card"
          mode="$ctrl.ui.mode"
          selected-element-id="$ctrl.element.id"
          ng-click="$ctrl.selectElement($event)">
      </Card>
    </div>

  </div>
