'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var child_process = require('child_process');

var FlexddGenerator = yeoman.generators.Base.extend({

  /**
   * [init description]
   * @return {[type]} [description]
   */
  init: function () {

    this.pkg = require( '../package.json' );

    this.on( 'end', function () {

      if ( ! this.options[ 'skip-install' ] ) {

        // Lets build the bower file, and download the components.
        this.bowerInstall( this.components, { save: true }, function() {

          // lets install the npm packages
          this.installDependencies( { bower: false, skipInstall: false });

        }.bind( this ) );

      }

    }.bind( this ));

  },
  /**
   * [askFor description]
   * @return {[type]} [description]
   */
  askFor: function () {

    var done = this.async();

    // Have Yeoman greet the user.
    this.log( yosay( 'Welcome to the Flexdd frontend generator!' ) );

    var prompts = [
      {
        type: 'confirm',
        name: 'hasFolderStructure',
        message: 'Do you want a base folder structure setting up',
        default: true
      },
      {
        type: 'confirm',
        name: 'hasCompass',
        message: 'Will you be using Sass Compass',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeJQuery',
        message: 'Will you be using jQuery',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeAngular',
        message: 'Will you be using Angular.JS',
        default: false
      },
      {
        type: 'confirm',
        name: 'includeReact',
        message: 'Will you be using React.js',
        default: false
      },
      {
        type: 'confirm',
        name: 'includeModernizr',
        message: 'Will you be using Modernizr',
        default: true
      },
      {
        type: 'confirm',
        name: 'hasFader',
        message: 'Will the project include a JQuery fader.',
        default: false
      },
      {
        type: 'confirm',
        name: 'hasSlider',
        message: 'Will the project include a JQuery slider.',
        default: false
      },
      {
        type: 'confirm',
        name: 'hasGallery',
        message: 'Will the project include a JQuery gallery.',
        default: false
      },
      {
        type: 'confirm',
        name: 'hasAccordion',
        message: 'Will the project include a JQuery accordion.',
        default: false
      }
    ];

    /**
     * Store developers options for later use.
     */
    this.prompt( prompts, function ( props ) {

      this.hasCompass = props.hasCompass;
      this.hasFolderStructure = props.hasFolderStructure;
      this.includeJQuery = props.includeJQuery;
      this.includeAngular = props.includeAngular;
      this.includeReact = props.includeReact;
      this.hasFader = props.hasFader;
      this.hasGallery = props.hasGallery;
      this.hasSlider = props.hasSlider;
      this.hasAccordion = props.hasAccordion;

      done();

    }.bind(this));

  },
  /**
   * [app description]
   * @return {[type]} [description]
   */
  app: function () {

    this._copyTemplates();
    this._setupProject();

  },
  /**
   * [setupProject description]
   * @return {[type]} [description]
   */
  _setupProject: function() {

    this.components = [];
    this.components.push('flexdd-framework');

    if( this.hasFolderStructure ){

      this.mkdir( 'assets/' );
      this.mkdir( 'assets/sass/' );
      this.mkdir( 'assets/css/' );
      this.mkdir( 'assets/sass/objects/' );
      this.mkdir( 'assets/sass/partials/' );
      this.mkdir( 'assets/sass/type/' );
      this.mkdir( 'assets/js/' );

    }

  }

});

module.exports = FlexddGenerator;