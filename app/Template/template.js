import { h } from 'hyperapp'
import { Firebase } from '../_services'
import { Card, SideBar } from './'
import './template.styl'

export const Template = (state, actions) => ({ match }) =>
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

Template.state = {
  template: {},
}

Template.actions = {
  clearTemplate: () => (state, actions) => actions.setTemplate({}),
  fetchTemplate: (match) => async (state, actions) => {
    actions.setTemplate(await Firebase.doc('templates', match.params.templateId))
  },
  setTemplate: value => state => ({ ...state, template: value }),
}
