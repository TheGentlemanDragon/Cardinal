<div class="content-main">

  <div class="header">
    <span class="title">Cardinal</span>
    <span class="slash">/</span>
    <span><a href="#/decks">My Decks</a></span>
    <span class="slash">/</span>
    <span>{{ template.name }}</span>
  </div>


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

    <div flex ui-view>

    </div>

  </div>

</div>
