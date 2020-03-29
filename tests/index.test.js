import modules from '../src/index';

const langs = ['en', 'es', 'pt', 'yue'];

const getModuleTranslation = (module, key, lang) => {
  if (module[key].includes('i18n-')) {
    return module.i18n[lang][key];
  }
};

const getActionTranslation = (context, action, key, lang) => {
  if (action[key].includes('i18n-')) {
    const translationKey = action[key].replace('i18n-', '');
    return context.i18n[lang][translationKey];
  }
};

describe('Module list', () => {
  it('exports a list of objects', () => {
    expect(Array.isArray(modules)).toBe(true);
    modules.forEach((module, index) => {
      expect(typeof module).toEqual('object');
    });
  });
});

modules.forEach((module, index) => {
  const moduleName = getModuleTranslation(module, 'name', langs[0]) || `module number ${index}`;
  describe(`Module: ${moduleName}`, () => {
    it('defines a name', () => {
      expect(module.name).toBeTruthy();
    });
    it('defines a description', () => {
      expect(module.description).toBeTruthy();
    });
    it('defines an icon', () => {
      expect(module.icon).toBeTruthy();
    });
    it('defines a context list', () => {
      expect(Array.isArray(module.contexts)).toEqual(true);
    });

    langs.forEach((lang) => {
      describe(`language ${lang}`, () => {
        it('defines a name', () => {
          expect(getModuleTranslation(module, 'name', lang)).toBeTruthy();
        });
        it('defines a description', () => {
          expect(getModuleTranslation(module, 'description', lang)).toBeTruthy();
        });
      });
    });

    module.contexts.forEach((context) => {
      describe(`Context: ${context.context}`, () => {
        it('defines the context id', () => {
          expect(context.context).toBeTruthy();
        });
        if (!['root', 'global'].includes(context.context)) {
          it('defines the context name if it is not extending another context', () => {
            expect(context.name).toBeTruthy();
          });
        }
        it('defines commands', () => {
          expect(context.commands).toBeTruthy();
        });
        context.commands.forEach((command) => {
          const commandName = getActionTranslation(context, command, 'name', langs[0]) || command.name;
          describe(`Command: ${commandName}`, () => {
            it('defines name', () => {
              expect(command.name).toBeTruthy();
            });
            it('defines action', () => {
              expect(typeof command.action).toEqual('function');
            });
            it('defines help text', () => {
              expect(command.help).toBeTruthy();
            });
          });
        });
      });
    });
  });
});
