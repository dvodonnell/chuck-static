var lib = {
    express : require('express'),
    engines : {
        ejs : require('ejs')
    }
};

var ChuckStatic = function(config) {

    if (this._validateConfig(config)) {
        this._parseConfig(config);
        this._instantiate();
        this._initialize();
    }

};

ChuckStatic.prototype = {

    _validateConfig : function(config) {
        //TODO
        return true;
    },

    _parseConfig : function(config) {

        this.config = config;

    },

    _instantiate : function() {

        this.app = lib.express();

        this.app.set('views', this.config.paths.layout);
        this.app.engine('html', lib.engines.ejs.renderFile);

        this.app.get('*', function(req, res) {
            res.render('layout.html', {body : req.url});
        });

    },

    _initialize : function() {



    },

    run : function() {

        this.app.listen(this.config.server.port);

    }

};

module.exports = ChuckStatic;
