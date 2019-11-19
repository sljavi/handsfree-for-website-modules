import _ from 'lodash';

const langList = [{
  value: 'af-ZA',
  name: 'Afrikaans (South Africa)',
}, {
  value: 'am-ET',
  name: 'Amharic (Ethiopia)',
}, {
  value: 'hy-AM',
  name: 'Armenian (Armenia)',
}, {
  value: 'az-AZ',
  name: 'Azerbaijani (Azerbaijan)',
}, {
  value: 'id-ID',
  name: 'Indonesian (Indonesia)',
}, {
  value: 'ms-MY',
  name: 'Malay (Malaysia)',
}, {
  value: 'bn-BD',
  name: 'Bengali (Bangladesh)',
}, {
  value: 'bn-IN',
  name: 'Bengali (India)',
}, {
  value: 'ca-ES',
  name: 'Catalan (Spain)',
}, {
  value: 'cs-CZ',
  name: 'Czech (Czech Republic)',
}, {
  value: 'da-DK',
  name: 'Danish (Denmark)',
}, {
  value: 'de-DE',
  name: 'German (Germany)',
}, {
  value: 'en-AU',
  name: 'English (Australia)',
}, {
  value: 'en-CA',
  name: 'English (Canada)',
}, {
  value: 'en-GH',
  name: 'English (Ghana)',
}, {
  value: 'en-GB',
  name: 'English (United Kingdom)',
}, {
  value: 'en-IN',
  name: 'English (India)',
}, {
  value: 'en-IE',
  name: 'English (Ireland)',
}, {
  value: 'en-KE',
  name: 'English (Kenya)',
}, {
  value: 'en-NZ',
  name: 'English (New Zealand)',
}, {
  value: 'en-NG',
  name: 'English (Nigeria)',
}, {
  value: 'en-PH',
  name: 'English (Philippines)',
}, {
  value: 'en-ZA',
  name: 'English (South Africa)',
}, {
  value: 'en-TZ',
  name: 'English (Tanzania)',
}, {
  value: 'en-US',
  name: 'English (United States)',
}, {
  value: 'es-AR',
  name: 'Spanish (Argentina)',
}, {
  value: 'es-BO',
  name: 'Spanish (Bolivia)',
}, {
  value: 'es-CL',
  name: 'Spanish (Chile)',
}, {
  value: 'es-CO',
  name: 'Spanish (Colombia)',
}, {
  value: 'es-CR',
  name: 'Spanish (Costa Rica)',
}, {
  value: 'es-EC',
  name: 'Spanish (Ecuador)',
}, {
  value: 'es-SV',
  name: 'Spanish (El Salvador)',
}, {
  value: 'es-ES',
  name: 'Spanish (Spain)',
}, {
  value: 'es-US',
  name: 'Spanish (United States)',
}, {
  value: 'es-GT',
  name: 'Spanish (Guatemala)',
}, {
  value: 'es-HN',
  name: 'Spanish (Honduras)',
}, {
  value: 'es-MX',
  name: 'Spanish (Mexico)',
}, {
  value: 'es-NI',
  name: 'Spanish (Nicaragua)',
}, {
  value: 'es-PA',
  name: 'Spanish (Panama)',
}, {
  value: 'es-PY',
  name: 'Spanish (Paraguay)',
}, {
  value: 'es-PE',
  name: 'Spanish (Peru)',
}, {
  value: 'es-PR',
  name: 'Spanish (Puerto Rico)',
}, {
  value: 'es-DO',
  name: 'Spanish (Dominican Republic)',
}, {
  value: 'es-UY',
  name: 'Spanish (Uruguay)',
}, {
  value: 'es-VE',
  name: 'Spanish (Venezuela)',
}, {
  value: 'eu-ES',
  name: 'Basque (Spain)',
}, {
  value: 'il-PH',
  name: 'Filipino (Philippines)',
}, {
  value: 'fr-CA',
  name: 'French (Canada)',
}, {
  value: 'fr-FR',
  name: 'French (France)',
}, {
  value: 'gl-ES',
  name: 'Galician (Spain)',
}, {
  value: 'ka-GE',
  name: 'Georgian (Georgia)',
}, {
  value: 'gu-IN',
  name: 'Gujarati (India)',
}, {
  value: 'hr-HR',
  name: 'Croatian (Croatia)',
}, {
  value: 'zu-ZA',
  name: 'Zulu (South Africa)',
}, {
  value: 'is-IS',
  name: 'Icelandic (Iceland)',
}, {
  value: 'it-IT',
  name: 'Italian (Italy)',
}, {
  value: 'jv-ID',
  name: 'Javanese (Indonesia)',
}, {
  value: 'kn-IN',
  name: 'Kannada (India)',
}, {
  value: 'km-KH',
  name: 'Khmer (Cambodia)',
}, {
  value: 'lo-LA',
  name: 'Lao (Laos)',
}, {
  value: 'lv-LV',
  name: 'Latvian (Latvia)',
}, {
  value: 'lt-LT',
  name: 'Lithuanian (Lithuania)',
}, {
  value: 'hu-HU',
  name: 'Hungarian (Hungary)',
}, {
  value: 'ml-IN',
  name: 'Malayalam (India)',
}, {
  value: 'mr-IN',
  name: 'Marathi (India)',
}, {
  value: 'nl-NL',
  name: 'Dutch (Netherlands)',
}, {
  value: 'ne-NP',
  name: 'Nepali (Nepal)',
}, {
  value: 'nb-NO',
  name: 'Norwegian Bokmål (Norway)',
}, {
  value: 'pl-PL',
  name: 'Polish (Poland)',
}, {
  value: 'pt-BR',
  name: 'Portuguese (Brazil)',
}, {
  value: 'pt-PT',
  name: 'Portuguese (Portugal)',
}, {
  value: 'ro-RO',
  name: 'Romanian (Romania)',
}, {
  value: 'si-LK',
  name: 'Sinhala (Sri Lanka)',
}, {
  value: 'sk-SK',
  name: 'Slovak (Slovakia)',
}, {
  value: 'sl-SI',
  name: 'Slovenian (Slovenia)',
}, {
  value: 'su-ID',
  name: 'Sundanese (Indonesia)',
}, {
  value: 'sw-TZ',
  name: 'Swahili (Tanzania)',
}, {
  value: 'sw-KE',
  name: 'Swahili (Kenya)',
}, {
  value: 'fi-FI',
  name: 'Finnish (Finland)',
}, {
  value: 'sv-SE',
  name: 'Swedish (Sweden)',
}, {
  value: 'ta-IN',
  name: 'Tamil (India)',
}, {
  value: 'ta-SG',
  name: 'Tamil (Singapore)',
}, {
  value: 'ta-LK',
  name: 'Tamil (Sri Lanka)',
}, {
  value: 'ta-MY',
  name: 'Tamil (Malaysia)',
}, {
  value: 'te-IN',
  name: 'Telugu (India)',
}, {
  value: 'vi-VN',
  name: 'Vietnamese (Vietnam)',
}, {
  value: 'tr-TR',
  name: 'Turkish (Turkey)',
}, {
  value: 'ur-PK',
  name: 'Urdu (Pakistan)',
}, {
  value: 'ur-IN',
  name: 'Urdu (India)',
}, {
  value: 'el-GR',
  name: 'Greek (Greece)',
}, {
  value: 'bg-BG',
  name: 'Bulgarian (Bulgaria)',
}, {
  value: 'ru-RU',
  name: 'Russian (Russia)',
}, {
  value: 'sr-RS',
  name: 'Serbian (Serbia)',
}, {
  value: 'uk-UA',
  name: 'Ukrainian (Ukraine)',
}, {
  value: 'he-IL',
  name: 'Hebrew (Israel)',
}, {
  value: 'ar-IL',
  name: 'Arabic (Israel)',
}, {
  value: 'ar-JO',
  name: 'Arabic (Jordan)',
}, {
  value: 'ar-AE',
  name: 'Arabic (United Arab Emirates)',
}, {
  value: 'ar-BH',
  name: 'Arabic (Bahrain)',
}, {
  value: 'ar-DZ',
  name: 'Arabic (Algeria)',
}, {
  value: 'ar-SA',
  name: 'Arabic (Saudi Arabia)',
}, {
  value: 'ar-IQ',
  name: 'Arabic (Iraq)',
}, {
  value: 'ar-KW',
  name: 'Arabic (Kuwait)',
}, {
  value: 'ar-MA',
  name: 'Arabic (Morocco)',
}, {
  value: 'ar-TN',
  name: 'Arabic (Tunisia)',
}, {
  value: 'ar-OM',
  name: 'Arabic (Oman)',
}, {
  value: 'ar-PS',
  name: 'Arabic (State of Palestine)',
}, {
  value: 'ar-QA',
  name: 'Arabic (Qatar)',
}, {
  value: 'ar-LB',
  name: 'Arabic (Lebanon)',
}, {
  value: 'ar-EG',
  name: 'Arabic (Egypt)',
}, {
  value: 'fa-IR',
  name: 'Persian (Iran)',
}, {
  value: 'hi-IN',
  name: 'Hindi (India)',
}, {
  value: 'th-TH',
  name: 'Thai (Thailand)',
}, {
  value: 'ko-KR',
  name: 'Korean (South Korea)',
}, {
  value: 'nt-TW',
  name: 'Chinese, Mandarin (Traditional, Taiwan)',
}, {
  value: 'nt-HK',
  name: 'Chinese, Cantonese (Traditional, Hong Kong)',
}, {
  value: 'ja-JP',
  name: 'Japanese (Japan)',
}, {
  value: 'ns-HK',
  name: 'Chinese, Mandarin (Simplified, Hong Kong)',
}, {
  value: 'ns-CN',
  name: 'Chinese, Mandarin (Simplified, China)',
}];

export const langs = _.sortBy(langList, 'name');
