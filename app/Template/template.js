import { h } from 'hyperapp'
import { Firebase } from '../services'
import { Card, SideBar } from './'
import './template.styl'

export const Template = (state, actions) => ({ match }) => (
  <div
    key="template"
    container="row #left @stretch"
    flex
    oncreate={() => actions.fetchTemplate(match)}
    ondestroy={actions.clearTemplate}
  >
    <SideBar />

    <div container="column #center @center" flex>
      <Card
        scale="2"
        template="$ctrl.data.template"
        instance="$ctrl.card"
        mode="$ctrl.ui.mode"
        selected-element-id="$ctrl.element.id"
        ng-click="$ctrl.selectElement($event)"
      />
    </div>
  </div>
)

Template.state = {
  template: {},
  elements: [],
}

Template.actions = {
  clearTemplate: () => (state, { setTemplate }) => setTemplate({}),
  fetchTemplate: match => async (state, { setTemplate }) =>
    setTemplate(await Firebase.doc('templates', match.params.templateId)),
  setTemplate: template => state => ({
    ...state,
    template: template,
    elements: template.elements || [],
  }),
}
