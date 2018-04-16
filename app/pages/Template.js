import { h } from 'hyperapp'
import Card from '../components/Card'
import SideBar from '../components/SideBar'
import './Template.styl'

export default (_, { clearTemplate, fetchTemplate }) => ({ match }) => (
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
