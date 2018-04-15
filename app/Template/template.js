import { h } from 'hyperapp'
import { Firebase } from '../services'
import { Card, SideBar } from './'
import './template.styl'

export const Template = (state, { clearTemplate, fetchTemplate }) => ({
  match,
}) => (
  <div
    key="template"
    container="row #left @stretch"
    flex
    oncreate={() => fetchTemplate(match)}
    ondestroy={() => clearTemplate()}
  >
    <SideBar />

    <div container="column #center @center" flex>
      <Card scale="2" />
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
