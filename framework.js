const angular = require("angular");
const _ = require("lodash");
require("angular-aria");
require("angular-messages");
require("angular-animate");
require("angular-material");

angular.module("Demo", ["ngMessages", "ngAria", "ngAnimate", "ngMaterial"])
.component("forumList", {
  controller(Funny) {
    Funny.all()
      .then(s => { this.stories = s });
  },
  template: `
    <h1>Funnies</h1>

    <md-progress-circular md-mode="indeterminate"
                          ng-if="!$ctrl.stories">
    </md-progress-circular>
    
    <md-list flex>
      <md-list-item ng-repeat="story in $ctrl.stories track by story.id">
        {{ :: story.title }}
      </md-list-item>
    </md-list
  `,
})
.service("Funny", function($http) {
  this.all = function() {
    return $http.get("https://www.reddit.com/r/funny.json")
     .then(function(all) {
       return all.data.data.children.map(d => d.data)
     })
  }
})
