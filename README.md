# Handsfree for website's modules
Voice commands modules for [Handsfree for web](https://handsfreeforweb.com/) and [Handsfree for website](https://github.com/sljavi/handsfree-for-website)

If you're here most probably is because you're looking for how to add voice commands to the library [Handsfree for website](https://github.com/sljavi/handsfree-for-website) or to the chrome extension [Handsfree for web](https://handsfreeforweb.com/). 

In this repository, you can find the modules that define the supported voice commands. Check the [list of supported voice commands](https://github.com/sljavi/handsfree-for-website-modules/tree/master/src).

## How to add new voice commands?
If you know how to code in javascript, I recommend you start by reading the development section, fork this repository, implement the changes and submit a pull request.

If you don't know how to code a module, or you have some doubts, post an issue requesting more information or suggesting the new voice commands.

## Development
#### Project requirements
 - Git
 - Node >= 10
 - NPM >= 6

Install it locally by executing the following commands
```
git clone git@github.com:sljavi/handsfree-for-website-modules.git
cd handsfree-for-website-module
npm install
```

The voice command's [test page](https://sljavi.github.io/handsfree-for-website-modules/dist/index.html) can be opened just by executing 
```
npm run start
```

### Extending an existing module
You can add a new voice command or modify an existing one just by editing the code of an already defined module, the modules can be reviewed looking by the [src folder](https://github.com/sljavi/handsfree-for-website-modules/tree/master/src). If you don't know how to implement a voice command, keep reading this guide.

### Create a new module

In order to successfully add a module of voice commands, I recommend you first take a look at the existing modules and look for similar behaviors you can take as an example.

In order to propose a new voice command module you should:
 - Implement the module inside the [src folder](https://github.com/sljavi/handsfree-for-website-modules/tree/master/src)
 - Load the module in [src/index.js](https://github.com/sljavi/handsfree-for-website-modules/tree/master/src/index.js) and add it to the list of modules
 - [Optionally] Add some tests
 - [Optionally] Write some docs

### Module specification

A module is an object that defines contexts and commands. Let’s bring some short definitions:
 - Module: Group of contexts
 - Context: Group of commands
 - Commands: A function that is executed when its name is invoked

#### Modules
A module is just a wrapper of contexts and commands, in addition to them, it also defines a `name`, a `description` and an `icon`. Let's see a code example.

```javascript
const myModule = {
    name: 'Module name',
    description: 'My first module',
    icon: 'fa fa-search',
    contexts: [
      //we'll define contexts later
    ]
}
```
The `icon` is defined as a css class. See [font awesome icons](https://fontawesome.com/icons?d=gallery) for reference.

#### Contexts
At any moment there is always only one active context, the user can call for voice commands that are defined for that context. The main context is called `root`, most of the actions are defined for it. e.g. `scroll down`, `click` and `select`.

In addition to the `root` context, there is another special context called `global`. Any action defined inside of it will automatically be available for any context. The voice commands `help` and `exit` are defined under the `global` context. These voice commands are always available, but the global context is never active, it's used exclusively for extending the active context.

A module can define new contexts or extend existing ones, let's see a code example

```javascript
const myModule = {
    name: 'Module name',
    description: 'My first module',
    contexts: [{
      context: 'root',
      commands: [
        //we'll define commands later
      ]
    }, {
      context: 'global',
      commands: [
        //we'll define commands later
      ]
    }, {
      context: 'somethingNew',
      name: 'something new',
      commands: [
        //we'll define commands later
      ]
    }]
}
```

In this code example we've defined a new module that extends two existing contexts (`global` and `root`) and defines commands for a new context called `somethingNew`.

##### Setup and teardown hooks

In addition to the command list there are two hooks that can be defined within a context, their name are `setup` and `teardown`, as you might guess, the `setup` function is executed every time the context gets active, and the `teardown` function when the user leaves the context, let's see a code example.

```javascript
const myModule = {
    name: 'Module name',
    description: 'My first module',
    contexts: [{
      context: 'somethingNew',
      name: 'something new',
      setup: () => {
        console.log('I have the power!')
      },
      teardown: () => {
        console.log('The user left me')
      },
      commands: [
        //we'll define commands later
      ]
    }]
}
```

#### Commands
A voice command is a pair of two important things, a name and an action. When the name is invoked the action is executed. Let's enter into the details, what's a name for this tool? It basically is a string, could be one or more words. e.g. 'click', 'scroll down', '7', 'number 7'. And what about the actions? they're functions that will be executed automatically as soon as their name are invoked, let's see a code example.

```javascript
const myModule = {
    name: 'Module name',
    description: 'My first module',
    contexts: [{
      context: 'somethingNew',
      name: 'something new',
      commands: [{
        name: 'say hi',
        action: () => {
          alert('hello master')
        }
      }]
    }]
}
```

This module defines a new context with only a single command, but more can be added to the list if needed. As soon as the command is invoked an alert will be shown telling 'hello master'.

#### Command name " * " 

Sometimes we can't define all the supported commands by extension, let's imagine we want to support the voice command `open <website name here>`. There is no way to define a command for each website that exists in the entire web. In these cases we can define a command with the name `'*'`. It basically tells to the library, if there is no other better command for what the user has said, give it to me, I'll handle it. Let's see a code example that describes how to use it.

```javascript
const myModule = {
    name: 'Module name',
    description: 'My first module',
    contexts: [{
      context: 'somethingNew',
      name: 'something new',
      commands: [{
        name: 'open',
        action: () => {
            alert('tell "open" and the website you want to access')
        }
      }, {
        name: '*',
        action: ({commandName}) => {
          if (commandName.indexOf('open') === 0 && commandName.length > 5) {
            const address = commandName.replace('open', '').trim()
            window.location.href = address
            return {
                commandWasExecuted: true
            };
          }
        }
      }]
    }]
}
```
The example defines two commands, if the user only says "open", we'll request him to say "open {website name}". In case he says "open" and something else, the command takes what is after the word "open" and redirect the tab to it. 

You might have noticed that at the end of the `if`, the function returns the object. 

```javascript
{commandWasExecuted: true}
```
This is useful to tell the library that the voice command was executed successfully, otherwise, it will show an error alert saying that there is no voice command for what was mentioned.

Note: The open website command is just an example. It cannot be considered as production code.

#### Action function

When the voice command is invoked by the user, the action function is executed with some useful parameters:
 - `rootElement`: DOM element that wraps the library UI
 - `selectedElement`: DOM element selected by a previous command. i.e. after executing a click
 - `contextState`: An object that is received and can be updated within every execution of an action
 - `showHelp`: A boolean value, it tells to the library if it should show the help modal
 - `showHelpBar`: A boolean value, it tells to the library if it should show the help bar
 - `commandName`: A string that represents what the user has said
 - `spokenCommands`: The list of possible strings that the user has said. `commandName` points to the most probably.
 - `tools`: An object of libraries and helpers that can be useful to use. So far the included libraries are `jQuery`, `moment`, `domElementTypes`, `lodash` and `scroll`.
 
Some of these values can be edited when executing an action in order to tell something to the library or to receive an updated context state, to do so, an object with the new edited value must be returned by the function. Let's see a code example.

```javascript
const myModule = {
    name: 'Module name',
    description: 'My first module',
    contexts: [{
      context: 'somethingNew',
      name: 'something new',
      commands: [{
        name: 'open',
        action: ({contextState}) => {
            alert('tell "open" and the website you want to access')
            return {
                showHelpBar: true,
                contextState: {
                    attepts: (contextState.attepts || 0) + 1
                }
            }
        }
      }, {
        name: '*',
        action: ({commandName}) => {
          if (commandName.indexOf('open') === 0 && commandName.length > 5) {
            const address = commandName.replace('open', '').trim()
            window.location.href = address
            return {
                commandWasExecuted: true,
                showHelpBar: false,
                contextState: {
                  attepts: 0
                }
            };
          }
          return {
                contextState: {
                    attepts: (contextState.attepts || 0) + 1
                }
            }
        }
      }]
    }]
}
```

In the previous example, we have updated the context state to count how many times the user has failed trying to open a website. The `*` function also reads `commandName` to figure out which website the user wants to open.

As a final note, the context hooks, `setup` and `teardown` also receives the same parameters than the action functions and they are also allowed to edit the context state.

#### Command help
In addition to the `name` and the `action`, a command can also define `help` and `group` texts. Within `help` is expected to briefly describe what the command does. The property `group` is used to define a category. Some times modules define dozens of commands, in that case, it’s useful to group the commands in multiple categories in order to show them to the user in a more descriptive way.

### Internationalization

Modules and commands can be defined for multiple languages, at this moment all the voice commands of this repository are translated to English, Spanish and Portuguese. There is no official language or language by default when starting to define commands, you can define them using words or numbers of any language. Let's see how it looks an internationalized module.

```javascript
const myModule = {
    name: 'i18n-module-name',
    description: 'i18n-module-description',
    contexts: [{
      context: 'somethingNew',
      name: 'something new',
      commands: [{
        name: 'i18n-command-name',
        action: () => {
          alert('hello master')
        }
      }],
      i18n: {
        en: {
            'command-name': 'say hi'
        },
        es: {
            'command-name': 'di hola'
        }
    }
    }],
    i18n: {
        en: {
            'module-name': 'Module name',
            'module-description': 'My first module'
        },
        es: {
            'module-name': 'Nombre de módulo',
            'module-description': 'Mi primer módule'
        }
    }
}
```
This module supports two languages, English and Spanish, for both of them, it defines a `name`, `description` and a voice command.

When a name starts with `i18n-`, the tool will try to translate it by searching what is after of `i18n-` inside the `i18n` map. At a given moment there is always an active language, most of the time is the one selected by the user or as fallback the browser language.

There are two `i18n` objects, one is at the module level and the other at the context level. When translating the `name` and `description` of the module, the first map is used, when translating the command names, help or group properties the second one is used. Translations defined at the module level are not available at the context level.

## Reference

### Module

| Property | Value Type | Required | Description                                |
|----------|------------|----------|--------------------------------------------|
| name     | string     | yes      | Used for naming and identification         |
| description | string | yes | Used on module descriptions |
| icon | string | no | Used for module identification when the UI is compact. Icon example `fa fa-search`. See [font awesome icons](https://fontawesome.com/icons?d=gallery) for reference. |
| contexts | array | yes | List of module's contexts. See following table for reference |
| i18n | object | no | Language map that will be used to translate the values provided by `name` and `description` if they start with `'i18n-'`. |


### Context

| Property | Value Type | Required | Description                                |
|----------|------------|----------|--------------------------------------------|
| context  | string     | yes      | Used for identification         |
| name | string | yes | Used for naming |
| setup | function | no | Executed when the context gets active |
| teardown | function | no | Executed when the context is not longer active |
| htmlExample | string | no | A relevant piece of html that can be useful for targeting the voice commands defined into the context. i.e. if the context adds voice commands for a video player, the the value of this property would be a video player definition. |
| commands | array | no | Command list of the context. It isn't required because a context could be defined for extending a previous defined context with the same `context` name. |
| i18n | object | no | Language map that will be used to translate the values provided by `name`, `htmlExample` and the texts defined inside of `commands`|

### Command

| Property | Value Type | Required | Description                                |
|----------|------------|----------|--------------------------------------------|
| name  | string | yes | Command identification |
| action | function | yes | The function that will be executed when the user says the given `name` |
| help | string | yes | A description of the command. |
| group | string | no | A category name that could be useful for command grouping |
