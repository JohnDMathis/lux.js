/* global require, module */
/* jshint -W098 */
( function( root, factory ) {
  if ( typeof define === "function" && define.amd ) {
    // AMD. Register as an anonymous module.
    define( [ "traceur", "react", "postal.request-response", "machina", "when", "when.pipeline", "when.parallel" ], factory );
  } else if ( typeof module === "object" && module.exports ) {
    // Node, or CommonJS-Like environments
    module.exports = function( postal, machina ) {
      return factory(
        require("traceur"), 
        require("react"), 
        postal, 
        machina, 
        require("when"), 
        require("when/pipeline"), 
        require("when/parallel"));
    };
  } else {
    throw new Error("Sorry - luxJS only support AMD or CommonJS module environments.");
  }
}( this, function( traceur, React, postal, machina, when, pipeline, parallel ) {
  
  var luxCh = postal.channel( "lux" );
  var stores = {};

  // jshint ignore:start
  function* entries(obj) {
    for(var k of Object.keys(obj)) {
      yield [k, obj[k]];
    }
  }
  // jshint ignore:end

  function configSubscription(context, subscription) {
    return subscription.withContext(context)
                       .withConstraint(function(data, envelope){
                          return !(envelope.hasOwnProperty("originId")) || 
                           (envelope.originId === postal.instanceId());
                       });
  }

  //import("./actionCreator.js");
  //import("./store.js");
  //import("./actionCoordinator.js");
  //import("./dispatcher.js");
  //import("./components.js");

  // jshint ignore: start
  return {
    channel: luxCh,
    stores,
    createStore,
    createControllerView,
    createComponent,
    removeStore,
    dispatcher,
    ActionCoordinator,
    getActionCreatorFor
  };
  // jshint ignore: end

}));