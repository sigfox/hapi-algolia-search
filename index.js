import algolia from 'algoliasearch';
import _ from 'lodash';
import Hoek from 'hoek';

exports.register = function(server, options, next) {
    Hoek.assert(options.appId, 'options.appId is required');
    Hoek.assert(options.apiKey, 'options.apiKey is required');

    const indexPrefix = options.indexPrefix || '';
    const clientOptions = options.clientOptions || {};

    var client = algolia(options.appId, options.apiKey, clientOptions);
    server.expose('client', client);
    if(options.indexes){
        var indexes = {};
        _.forIn(options.indexes, function(value, key){
            indexes[key] = client.initIndex(indexPrefix + value);
        });
        server.expose('indexes', indexes);
    }
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
