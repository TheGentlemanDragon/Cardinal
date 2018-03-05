import { h } from 'hyperapp'
import SideBar from './SideBar'
import Card from '../Card'
import './template.styl'

const Template = ({ games }) => ({ match }) =>
  <div container="row #left @stretch" flex>

    <SideBar />

    {/* Page */}
    <div class="" container="column #center @center" flex>

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

export default Template
