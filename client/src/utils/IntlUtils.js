/**
 * Created by Huang, Fuguo (aka ken) on 16/08/2017.
 */
import IntlMessageFormat from 'intl-messageformat';

const Messages = {
  locales: ['en'],
  formats: {
    date: {
      short: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      },
      med: {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
    },
    time: {
      hhmm: {
        hour: 'numeric',
        minute: '2-digit'
      }
    }
  },
  messages: {}
};


export default {
  loadLocaleMessages: (locale, callback) => {

    function messagesLoaded(translated_messages) {
      Messages.locales = [locale];
      Messages.messages = flattenMessages(translated_messages.default.messages);
      callback(Messages);
    }

    // Need to enumerate them rather than generate the path to the messages files
    // or webpack will put them all in 1 bundle, and we want them in separate
    // bundles.
    let localeMessagesLoaders = {
      en: callback => {
        callback(require('../messages/messages_en'));
      },
      cs: callback => {
        callback(require('../messages/messages_cs'));
      },
      de: callback => {
        callback(require('../messages/messages_de'));
      },
      es: callback => {
        callback(require('../messages/messages_es'));
      },
      fr: callback => {
        callback(require('../messages/messages_fr'));
      },
      hu: callback => {
        callback(require('../messages/messages_hu'));
      },
      it: callback => {
        require.ensure([], require => {
          callback(require('../messages/messages_it'));
        });
      },
      ja: callback => {
        callback(require('../messages/messages_ja'));
      },
      ko: callback => {
        callback(require('../messages/messages_ko'));
      },
      pl: callback => {
        callback(require('../messages/messages_pl'));
      },
      'pt-BR': callback => {
        callback(require('../messages/messages_pt-BR'));
      },
      ru: callback => {
        callback(require('../messages/messages_ru'));
      },
      th: callback => {
        callback(require('../messages/messages_th'));
      },
      'zh-CN': callback => {
        callback(require('../messages/messages_zh-CN'));
      },
      'zh-TW': callback => {
        callback(require('../messages/messages_zh-TW'));
      }
      // rtl languages
      ,
      ar: callback => {
        callback(require('../messages/messages_ar'));
      },
      he: callback => {
        callback(require('../messages/messages_he'));
      }
    };

    let locale2 = locale.replace(/-.*$/, '');

    if ('function' === typeof localeMessagesLoaders[locale]) {
      localeMessagesLoaders[locale](messagesLoaded);
    } else if ('function' === typeof localeMessagesLoaders[locale2]) {
      localeMessagesLoaders[locale2](messagesLoaded);
    } else {
      localeMessagesLoaders['en'](messagesLoaded);
    }

  },
  /**
   * given the messages object, return what is at the keys
   * messages: the messages catalog. if undefined, use our internal cached copy in Messages.messages
   * keys: either a string, in which case we look for messages[keys],
   *       or an array, in which case we look for messages[keys[0]][keys[1]]..[keys[n]]
   * Returns the value found at the requested location, or the dflt if provided, or the last key.
   */
  getMessage: (keys) => {
    let msg = '';
    let messages = Messages.messages;
    if (!messages) {
      return keys;
    }
    if (Array.isArray(keys))
      keys = keys.join('.');

    if (keys in messages)
      msg = messages[keys];
    else {
      msg = keys;
    }

    return msg;
  },

  /**
   * Format a message
   * message: a message in ICU Message syntax
   * values: an object whose keys are the message's arguments with values as the values
   * returns the formatted message.
   * For example
   *  intlUtils.formatMessage("Hello {name}", {name: "Bob"})
   * returns "Hello Bob"
   */
  formatMessage: (message, values) => {
    message = new IntlMessageFormat(message, Messages.locales, Messages.formats);
    return message.format(values);
  },

  /**
   * combines getMessage with formatMessage
   * messages: the message catalog (undefined is OK)
   * keys: key into the message catalog (see full description above in comment above getMessage)
   * values: object containing arguments for the message (see comment above formatMessage)
   */
  getFormattedMessage: (keys, values) => {
    if (Array.isArray(keys))
      keys = keys.join('.');
    if (!(Messages.messages)) {
      return keys + ' ' + JSON.stringify(values);
    }
    let message = this.getMessage(keys);
    return this.formatMessage(message, values);
  }

};

function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}


