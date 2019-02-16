// TODO Care for window resize
// TODO Screen edge behaviour

export default class WikiAPI {

  constructor (lang='en') {
    this.lang = lang;
    this.endpoint = `https://${lang}.wikipedia.org/api/rest_v1/page`;
  }
  
  // Gets both the summary and media of a name
  lookup (name, cb) {
    this.fetch(name, 'summary', (summary) => {
      if (summary.type === 'disambiguation') {
        cb({text: 'AAAAH Disambiguation'});
      } else {
        this.fetch (name, 'media', (media) => {
          console.log('Output:', media);
          cb({text: summary.extract_html, image: media.items[0].thumbnail.source});
        });
      }
    });
  }
  
  // Calls the endpoints and returns empty data for errors
  fetch (name, type, cb) {
    fetch(`${this.endpoint}/${type}/${name}`)
    .then((res) => {
      res.json().then((obj) => {
        cb(obj);
      }).catch(() => {
        cb({});
      });
    });
  }

  // processJson (obj) {
  //   return {
  //     title: obj.title || 'No results',
  //     type: obj.type || 'standard',
  //     text: obj.extract_html || 'The search did not yield any results Try selecting the word again and make sure that you have set the right language.'
  //   };
  // }
}
