ace.define('ace/mode/osxs', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text', 'ace/mode/text_highlight_rules'], function(require, exports, module) {
    var oop = require('ace/lib/oop');
    var TextMode = require('ace/mode/text').Mode;
    var TextHighlightRules = require('ace/mode/text_highlight_rules').TextHighlightRules;

    var MyCustomHighlightRules = function() {
        this.$rules = {
            'start': [
                {
                    token: 'keyword',
                    regex: '\\b(?:SET_MEMORY|SET_CPU|EXECUTE|IF|SLEEP|LOG|EXECUTE_FILE|SET)\\b'
                },
                {
                    token: 'variable.parameter',
                    regex: '{[a-zA-Z_][a-zA-Z0-9_]*}'
                },
                {
                    token: 'string',
                    regex: '".*?"'
                },
                {
                    token: 'constant.numeric',
                    regex: '\\b\\d+\\b'
                },
                {
                    token: 'comment',
                    regex: '#.*$'
                }
            ]
        };
        this.normalizeRules();
    };

    oop.inherits(MyCustomHighlightRules, TextHighlightRules);

    var MyCustomMode = function() {
        this.HighlightRules = MyCustomHighlightRules;
    };
    oop.inherits(MyCustomMode, TextMode);

    (function() {
        this.$id = 'ace/mode/osxs';
    }).call(MyCustomMode.prototype);

    exports.Mode = MyCustomMode;
});
