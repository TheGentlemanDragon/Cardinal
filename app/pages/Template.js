import { h } from 'hyperapp'
import Card from '../components/Card'
import SideBar from '../components/SideBar'
import './Template.styl'

export default (_, { fetchTemplate, setTemplate }) => ({ match }) => (
  <div
    key="template"
    container="row #left @stretch"
    flex
    oncreate={() => fetchTemplate(match)}
    ondestroy={() => setTemplate({})}
  >
    <SideBar />

    <div container="column #center @center" flex>
      <Card scale="2" />
    </div>
  </div>
)
