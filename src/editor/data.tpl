<h2>Data</h2>

<md-tabs>

  <md-tab label="Fields">

    <md-content
        class="md-padding"
        layout="column" layout-align="start start">

      <md-whiteframe class="md-whiteframe-z1 field"
          layout="row" layout-padding layout-margin
          ng-repeat="field in template.fields">

        <div layout="column">
          <md-button
              class="button"
              ng-disabled="$first"
              ng-click="moveFieldUp($index)"
              aria-label="move-up-{{field.name}}">
            <i class="mdi mdi-arrow-up"></i>
          </md-button>

          <md-button
              class="button"
              ng-disabled="$last"
              ng-click="moveFieldDown($index)"
              aria-label="move-down-{{field.name}}">
            <i class="mdi mdi-arrow-down"></i>
          </md-button>
        </div>

        <md-input-container>
          <label>Field Name</label>
          <input ng-model="field.name" ng-blur="saveTemplate()">
        </md-input-container>

        <md-select placeholder="Type" ng-model="field.type" ng-change="saveTemplate()">
          <md-optgroup label="Types">
            <md-option value="text">text</md-option>
            <md-option value="image">image</md-option>
          </md-optgroup>
        </md-select>

        <md-button
            class="button"
            ng-click="deleteField($index)"
            aria-label="delete-{{field.name}}">
          <i class="mdi mdi-delete"></i>
        </md-button>

      </md-whiteframe>

      <md-whiteframe class="md-whiteframe-z1 field"
          layout="row" layout-align="center end"
          layout-padding layout-margin>
        <md-button class="md-primary" ng-click="addField()">+ Add Field</md-button>
      </md-whiteframe>

    </md-content>
  </md-tab>

  <md-tab label="Values">
    <md-content class="md-padding">
      <table>
        <!-- Headers -->
        <tr>
          <th ng-repeat="field in template.fields">{{field.name}}</th>
        </tr>

        <!-- Values -->
        <tr>
          <td ng-repeat="field in template.fields">This is a value</td>
        </tr>

        <tr>
          <td></td>
        </tr>
      </table>
    </md-content>
  </md-tab>
</md-tabs>
