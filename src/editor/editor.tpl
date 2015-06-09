<div layout="row" layout-align="start start">

  <!-- Navigation Controls -->
  <div  class="editor-controls"
        layout="column" layout-align="start start">

    <span md-ink-ripple
          ng-repeat="control in controls"
          ng-class="{selected: control.state == state}"
          ng-click="go(control.state)">
      <i class="mdi" ng-class="control.icon"></i>
      <md-tooltip md-direction="left" md-delay="100">
        {{ control.label }}
      </md-tooltip>
    </span>

  </div>

  <div ui-view class="editor-content" flex>

  </div>

</div>
