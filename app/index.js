'use strict';
var path = require('path');
var Generator = require('yeoman-generator');
var extend = require('deep-extend');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');

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
        message: 'Project Name',
        validate: function (input) {
            if (input.length > 0) {
              return true;
            }
          return 'Please enter a valid project name';
        }
      },
      {
        type: 'input',
        name: 'desc',
        message: 'Project Description',
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid project description';
        }
      },
      {
        type: 'confirm',
        name: 'npm',
        message: 'Do you want Npm?'
      },
      {
        type: 'input',
        name: 'npmName',
        message: 'name',
        when: function (answers) {
          return answers.npm;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid project name';
        }
      },
      {
        type: 'input',
        name: 'npmVersion',
        message: 'version',
        when: function (answers) {
          return answers.npm;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid project version';
        }
      },
      {
        type: 'input',
        name: 'npmDescription',
        message: 'description',
        when: function (answers) {
          return answers.npm;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid project description';
        }
      },
      {
        type: 'input',
        name: 'npmEntryPoint',
        message: 'entry point',
        when: function (answers) {
          return answers.npm;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid file name';
        }
      },
      {
        type: 'input',
        name: 'npmTestCommand',
        message: 'test command',
        when: function (answers) {
          return answers.npm;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid test command';
        }
      },
      {
        type: 'input',
        name: 'npmGitRepo',
        message: 'git repository',
        when: function (answers) {
          return answers.npm;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid git repository';
        }
      },
      {
        type: 'input',
        name: 'npmKeywords',
        message: 'keywords',
        when: function (answers) {
          return answers.npm;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid keywords';
        }
      },
      {
        type: 'input',
        name: 'npmAuthor',
        message: 'author',
        when: function (answers) {
          return answers.npm;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid author';
        }
      },
      {
        type: 'input',
        name: 'npmLicense',
        message: 'license',
        when: function (answers) {
          return answers.npm;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid license';
        }
      },
      {
        type: 'confirm',
        name: 'bower',
        message: 'Do you want Bower?'
      },
      {
        type: 'input',
        name: 'bowerName',
        message: 'name',
        when: function (answers) {
          return answers.bower;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid project name';
        }
      },
      {
        type: 'input',
        name: 'bowerVersion',
        message: 'version',
        when: function (answers) {
          return answers.bower;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid version';
        }
      },
      {
        type: 'input',
        name: 'bowerAuthor',
        message: 'authors',
        when: function (answers) {
          return answers.bower;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid author';
        }
      },
      {
        type: 'input',
        name: 'bowerDescription',
        message: 'description',
        when: function (answers) {
          return answers.bower;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid description';
        }
      },
      {
        type: 'input',
        name: 'bowerMainFile',
        message: 'main',
        when: function (answers) {
          return answers.bower;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid file';
        }
      },
      {
        type: 'input',
        name: 'bowerKeywords',
        message: 'keywords',
        when: function (answers) {
          return answers.bower;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid keyword';
        }
      },
      {
        type: 'input',
        name: 'bowerLicense',
        message: 'license',
        when: function (answers) {
          return answers.bower;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid license';
        }
      },
      {
        type: 'input',
        name: 'bowerHomepage',
        message: 'homepage',
        when: function (answers) {
          return answers.bower;
        },
        validate: function (input) {
          if (input.length > 0) {
            return true;
          }
          return 'Please enter a valid homepage';
        }
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
    if (this.props.npm === true) {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      extend(pkg, {
        "name": this.props.npmName,
        "version": this.props.npmVersion,
        "description": this.props.npmDescription,
        "author": this.props.npmAuthor,
        "main": this.props.npmEntryPoint,
        "keywords": [
          this.props.npmKeywords
        ],
        "repository": this.props.npmGitRepo,
        "directories": {
        "test": this.props.npmTestCommand
        },
        "scripts": {
        "test": this.props.npmTestCommand
        },
        "license": this.props.npmLicense
      });

      pkg.keywords = pkg.keywords || [];
      pkg.keywords.push('yeoman');

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    }

    if (this.props.bower === true) {
      var pkg = this.fs.readJSON(this.destinationPath('bower.json'), {});

      extend(pkg, {
        "name": this.props.bowerName,
        "version": this.props.bowerVersion,
        "authors": [
          this.props.bowerAuthor,
        ],
        "description": this.props.bowerDescription,
        "main": this.props.bowerMainFile,
        "keywords": [
          this.props.bowerKeywords
        ],
        "homepage": this.props.bowerHomepage,
        "license": this.props.bowerLicense,
        "ignore": [
          '**/.*',
          'node_modules',
          'bower_components',
          'test',
          'tests'
        ]
      });

      pkg.keywords = pkg.keywords || [];
      pkg.keywords.push('yeoman');

      this.fs.writeJSON(this.destinationPath('bower.json'), pkg);
    }

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
};

