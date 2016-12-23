'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    this.log(yosay(
      'Welcome to the ' + chalk.red('Keystone') + ' generator!'
    ));

    var prompts = [{
        type: 'input',
        name: 'name',
        message: 'Project Name'
      },
      {
        type: 'input',
        name: 'desc',
        message: 'Project Description'
      },
      {
        type: 'confirm',
        name: 'npm',
        message: 'Do you want Npm?'
      },
      {
        type: 'confirm',
        name: 'bower',
        message: 'Do you want Bower?'
      }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { appName: this.props.name,
        appDesc: this.props.desc }
    );

    this.fs.copyTpl(
      this.templatePath('CONTRIBUTING.md'),
      this.destinationPath('CONTRIBUTING.md'),
      { appName: this.props.name }
    );

    this.fs.copyTpl(
      this.templatePath('test/app.spec.js'),
      this.destinationPath('test/app.spec.js'),
      { appName: this.props.name }
    );

    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('.gitattributes'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('.yo-rc.json'),
      this.destinationPath('.yo-rc.json')
    );
  }

  install() {
    if (this.props.npm === true) {
      this.log(
        'Generating package.json ' + '\n'
      );
      this.spawnCommandSync('npm', ['init']);
    }

    if (this.props.bower === true) {
      this.log(
        'Generating bower.json ' + '\n'
      );
      this.spawnCommandSync('bower', ['init']);
    }
  }
};