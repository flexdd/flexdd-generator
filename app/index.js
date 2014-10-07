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
          //this.installDependencies( { bower: false, skipInstall: false });

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
        type: 'input',
        name: 'textProjectName',
        message: 'What is your project name without any spaces eg. example-project',
        default: "flexdd-generated-project"
      },
      {
        type: 'input',
        name: 'googleAnalytics',
        message: 'What is your Google analytics code.',
        default: "UA-XXXXX-X"
      },
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
      /*{
        type: 'confirm',
        name: 'hasGrid',
        message: 'Will you be using a grid system',
        default: true
      },*/
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
      }/*,
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
      }*/
    ];

    /**
     * Store developers options for later use.
     */
    this.prompt( prompts, function ( props ) {

      this.textProjectName = props.textProjectName;
      this.googleAnalytics = props.googleAnalytics;
      this.hasFolderStructure = props.hasFolderStructure;
      this.hasCompass = props.hasCompass;
      this.hasGrid = props.hasGrid;
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

      // Folders
      this.mkdir( 'assets/' );
      this.mkdir( 'assets/sass/' );
      this.mkdir( 'assets/css/' );
      this.mkdir( 'assets/sass/objects/' );
      this.mkdir( 'assets/sass/partials/' );
      this.mkdir( 'assets/sass/type/' );
      this.mkdir( 'assets/js/' );

      // Root files
      this.copy('html/_index.html', 'index.html');
      this.copy('configs/_bower.json', 'bower.json');

      // CSS Files
      this.copy('sass/main.scss', 'assets/sass/main.scss');
      this.copy('sass/_vendor.scss', 'assets/sass/_vendor.scss');
      this.copy('sass/_variables.scss', 'assets/sass/_variables.scss');
      this.copy('sass/type/_type.scss', 'assets/sass/type/_type.scss');
      this.copy('sass/type/_icons.scss', 'assets/sass/type/_icons.scss');
      this.copy('sass/type/_fonts.scss', 'assets/sass/type/_fonts.scss');

    }

    // https://github.com/Igosuki/compass-mixins
    if( this.hasCompass ){
      this.components.push('compass-mixins');
    }

    // Include flexdd grid setup dep on susy
    if( this.hasGrid ){
      //this.components.push('flexdd-grid');
    }

    if( this.includeJQuery ){
      this.components.push('jquery');
    }

    if( this.includeAngular ){
      this.components.push('angular');
    }

    if( this.includeReact ){
      this.components.push('react');
    }

    if( this.includeModernizr ){
      this.components.push('modernizr');
    }

  }

});

module.exports = FlexddGenerator;