# hapi-algolia-search

[![Greenkeeper badge](https://badges.greenkeeper.io/sigfox/hapi-algolia-search.svg)](https://greenkeeper.io/)

Hapi plugin wrapping the JS [Algolia Search client](https://github.com/algolia/algoliasearch-client-js)

[Algolia](https://www.algolia.com/) is a "Search Engine as a Service", with high performance, great docs, and API clients available for many languages. Check it out !

## Table of Contents

- [Install](#install)
- [Register](#register)
- [Usage](#usage)
- [Questions and contributing](#questions-and-contributing)
- [License](#license)


## Install

```bash
$ npm install hapi-algolia-search
```

## Register

### Manually

```js
const HapiAlgoliaSearch = require('hapi-algolia-search');

const plugin = {
    register: HapiAlgoliaSearch,
    options: {
        appId: 'ABCDEFGHIJ',
        apiKey: 'LKHFDLSKHFLKSDFHLSKHFSLKFHLSKHDFLSKHDFLKHSDFL', 
        indexPrefix: 'dev_', //optional
        indexes: { 
            Users: 'usersIndex', 
            Products: 'productsIndex'
        },
        clientOptions: {
            timeout: 1000
        }
    }
};

server.register(plugin, (err) => {

     if (err) {
         console.log('Failed loading plugin');
     }
 });
```

### Via manifest

```json
{
    "servers": [{
        "port": 8080
    }],
    "plugins": {
        "hapi-algolia-search": {
            "appId": "ABCDEFGHIJ",
            "apiKey": "LKHFDLSKHFLKSDFHLSKHFSLKFHLSKHDFLSKHDFLKHSDFL", 
            "indexPrefix": "dev_",
            "indexes": { 
                "Users": "usersIndex", 
                "Products": "productsIndex"
            },
            "clientOptions": {
                "timeout": 1000
            }
        }
    }
}
```
### Configuration options

 - `appId` (required) your Algolia API App ID
 - `apiKey` (required) your Algolia API Api key
 - `indexes` (optional) you can specify indexes that will be automatically initialized and exposed by the plugin
 - `indexPrefix` (optional) a prefix you want to apply to all index names, i.e to reflect your current environment (https://www.algolia.com/doc/node#different-environments)
 - `clientOptions` (optional) see https://github.com/algolia/algoliasearch-client-js#client-options
 
## Usage

In your route handler :

```js

server.route({
    method: "GET",
    path: "/search/{term}",
    handler: function(request, reply) {
        const term = request.params.term;
        
        // search in the "product" index, initialized in the configuration example
        const productIndex = request.server.plugins['hapi-algolia-search'].indexes.Products;
        productsIndex.search(term, function(err, results){
            if(err) { return reply(err); } //please do a better error handling than this
            reply(results);
            // or reply(results.hits)
        })
        
        // or access the client directly for multiple indexes queries or other advanced stuff
        // see the official client docs : https://github.com/algolia/algoliasearch-client-js
        
        const algoliaClient = request.server.plugins['hapi-algolia-search'].client
        
        client.search(.....
    }
})


```

## Questions and contributing

Any issues or questions (no matter how basic), open an issue. Please check if it's not an 
issue with the Algolia API first. Also, please take the
initiative to include basic debugging information like operating system
and relevant version details such as:

```bash
$ npm version

#{ 'hapi-algolia-search': '1.0.0-alpha',
#  npm: '3.3.12',
#  ares: '1.10.1-DEV',
#  http_parser: '2.6.0',
#  icu: '56.1',
#  modules: '47',
#  node: '5.1.0',
#  openssl: '1.0.2d',
#  uv: '1.7.5',
#  v8: '4.6.85.31',
#  zlib: '1.2.8' }

```

Contributions are welcome. Your code should:

 - follow the [hapi.js coding conventions](http://hapijs.com/styleguide)

If you're changing something non-trivial, you may want to submit an issue
first.


## License

MIT

