import { h } from 'hyperapp'
import { Firebase } from '../_services'
import { SideBar} from './SideBar'
import { Card } from './Card'
import './template.styl'

export const templateActions = {
  clearTemplate: () => (state, actions) => actions.setTemplate({}),
  fetchTemplate: (match) => async (state, actions) => {
    actions.setTemplate(await Firebase.doc('templates', match.params.templateId))
  },
  setTemplate: value => state => ({ ...state, template: value }),
}

export const Template = ({ template }, actions) => ({ match }) =>
  <div  key="template"
        container="row #left @stretch" flex
        oncreate={() => actions.fetchTemplate(match)}
        ondestroy={actions.clearTemplate}>

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
