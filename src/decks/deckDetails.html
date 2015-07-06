<!-- Deck detail -->

<md-dialog aria-label="Deck Details">

  <!-- Attribute Inputs -->

  <div class="deck-details">

    <md-input-container>
      <label>Name</label>
      <input  type="text"
              ng-model="deck.name"
              ng-keyup="checkDisableSave()">
    </md-input-container>

    <md-input-container>
      <label>Description</label>
      <textarea md-maxlength="255"
                ng-model="deck.description"
                ng-keyup="checkDisableSave()">
      </textarea>
    </md-input-container>

  </div>

  <!-- Tabs -->

  <md-tabs class="deck-tabs" md-selected="selectedTab">

    <!-- Templates Tab -->

    <md-tab id="tab1" aria-controls="tab1-content">
      Templates
    </md-tab>

    <!-- Cards Tab -->

    <md-tab id="tab2" aria-controls="tab2-content">
      Cards
    </md-tab>

  </md-tabs>

  <ng-switch on="selectedTab" class="tabpanel-container">

    <!-- Template Tab Content -->

    <div  class="deck-tab-contents"
          role="tabpanel" id="tab1-content"
          aria-labelledby="tab1" ng-switch-when="0">

      <div  class="template-item"
            layout="row" layout-align="space-between center"
            ng-repeat="template in templates"
            ng-click="toggleCheck(template)">

        <span>
          <i ng-if="!template.checked" class="mdi mdi-checkbox-blank-outline"></i>
          <i ng-if="template.checked" class="mdi mdi-checkbox-marked"></i>
        </span>
        
        <span>
          {{ template.name }}
        </span>

        <span ng-click="openTemplate(template)">
          <i class="mdi mdi-open-in-app hover-reveal"></i>
          <md-tooltip md-direction="right" md-delay="400">
            Open in editor
          </md-tooltip>
        </span>
      </div>
    </div>

    <!-- Card Tab Content -->

    <div  class="deck-tab-contents"
          role="tabpanel" id="tab2-content"
          aria-labelledby="tab2" ng-switch-when="1">
    </div>
  </ng-switch>

  <!-- Under Tabs -->

  <div layout="row" layout-margin layout-align="center center">
    
    <md-button
        class="md-raised" 
        ng-click="newItem(selectedTab == 0 ? 'template' : 'card')">
      New
    </md-button>

    <md-button
        class="md-raised"
        ng-disabled="checked.length == 0"
        ng-click="deleteItems(checked)">
      Delete
    </md-button>

  </div>

  <!-- Modal Actions -->

  <div class="md-actions" layout="row">

    <md-button class="md-warn" ng-click="delete()">
      Delete
    </md-button>

    <span flex></span>

    <md-button class="md-raised" ng-click="cancel()">
      Cancel
    </md-button>

    <md-button
        class="md-primary md-raised"
        ng-disabled="disableSave"
        ng-click="save()">
      Save
    </md-button>

  </div>

</md-dialog>