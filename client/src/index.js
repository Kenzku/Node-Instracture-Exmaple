/**
 * Created by Huang, Fuguo (aka ken) on 16/08/2017.
 */
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import intlUtils  from './utils/IntlUtils';
import {init} from './utils/Init';
import {IntlProvider} from 'react-intl';
import App from 'components/App';

function showLoading() {
  const styles = {};
  styles.loadingDiv = {};

  render(
    <div className='body' id='loadingDiv' style={styles.loadingDiv}>
      {/*your loading element here*/}
    </div>,
    document.getElementById('app')
  );
  setTimeout(() => {
    if (document.getElementById('loadingDiv'))
      document.getElementById('loadingDiv').innerHTML = 'System Unavailable, please try again later';
  }, 20000);
}

showLoading();

init(() => {
  //Get the local from the browser and make sure it comes back consistently in all cases

  let browser_lang = (navigator.userLanguage) ? navigator.userLanguage : navigator.language;
  if(!browser_lang) browser_lang = 'en';

  let locale = browser_lang.split('-');
  locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : browser_lang;

  let Messages = {locales: ['en'], formats: {}, messages: {}};

  //Load the nls files first, and once loaded display the app
  function startApp() {
    //For now we are not translating anything so we are setting the locale to be 'en' so that the browser local is ignored
    //We will remove this line as soon as we have translations
    locale = 'en';
    intlUtils.loadLocaleMessages(locale, m => {
      Messages = m;
      displayApp();
    });
  }

  function displayApp() {
    render(
      <IntlProvider locale={locale} defaultLocale='en' messages={Messages.messages} formats={Messages.formats}>
        <Router>
          <App/>
        </Router>
      </IntlProvider>,
      document.getElementById('app')
    );
  }

  //Handle the case where Sarafi does not define Intl window object
  if (!window.Intl) {
    const polyfillLoaders = {
      en: callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/en.js');
          callback();
        });
      },
      cs: callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/cs.js');
          callback();
        });
      },
      de: callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/de.js');
          callback();
        });
      },
      es: callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/es.js');
          callback();
        });
      },
      fr: callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/fr.js');
          callback();
        });
      },
      hu: callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/hu.js');
          callback();
        });
      },
      it: callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/it.js');
          callback();
        });
      },
      ja: callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/ja.js');
          callback();
        });
      },
      ko: callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/ko.js');
          callback();
        });
      },
      pl: callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/pl.js');
          callback();
        });
      },
      'pt-BR': callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/pt-BR.js');
          callback();
        });
      },
      ru: callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/ru.js');
          callback();
        });
      },
      th: callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/th.js');
          callback();
        });
      },
      'zh-CN': callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/zh-Hans-CN.js');
          callback();
        });
      },
      'zh-TW': callback => {
        require.ensure([], require => {
          require('intl');
          require('intl/locale-data/jsonp/zh-Hant-TW.js');
          callback();
        });
      }
    };
    if (locale in polyfillLoaders) {
      polyfillLoaders[locale](startApp);
    }
    else {
      polyfillLoaders.en(startApp);
    }
  }
  else {
    startApp();
  }
});
