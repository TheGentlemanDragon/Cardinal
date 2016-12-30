class ActionBarController {

  constructor(ActionBarService, ModalService) {
    this.ABS = ActionBarService;
    this.MS = ModalService;
  }

  $onInit() {}

  execute (action) {
    this.MS.show(action);
  }

}

module.exports = {
  controller: ActionBarController,
  templateUrl: './components/action-bar/action-bar.html'
};
