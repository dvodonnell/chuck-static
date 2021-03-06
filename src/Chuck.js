var lib = {
    express : require('express'),
    middleware : {

    },
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
        this.fe = config.fe;

    },

    _instantiate : function() {

        var self = this;

        this.app = lib.express();

        this.app.set('views', this.config.paths.layout);
        this.app.engine('html', lib.engines.ejs.renderFile);

        this.app.get('*', function(req, res) {
            if (self.fe) {
                self.fe.run({
                    location : req.url
                });
                res.render('layout.html', {body : self.fe.renderStatic()});
            }
        });

    },

    _initialize : function() {



    },

    run : function() {

        this.app.listen(this.config.server.port);

    }

};

module.exports = ChuckStatic;
