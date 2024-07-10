define("ace/mode/typescript_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/javascript_highlight_rules"], function(require, exports) {
    "use strict";

    var oop = require("../lib/oop");
    var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;

    var TypeScriptHighlightRules = function() {
        JavaScriptHighlightRules.call(this);

        var tsRules = [
            {
                token: ["keyword.operator.ts"],
                regex: "(?:\\b(type|interface|implements|instanceof|public|private|protected|readonly|enum|as|is)\\b)"
            },
            {
                token: ["storage.type.variable.ts"],
                regex: "(?:\\b(string|any|number|boolean|Array|void)\\b)"
            }
        ];

        this.$rules.start = tsRules.concat(this.$rules.start);
        this.normalizeRules();
    };

    oop.inherits(TypeScriptHighlightRules, JavaScriptHighlightRules);

    exports.TypeScriptHighlightRules = TypeScriptHighlightRules;
});

define("ace/mode/ts", ["require", "exports", "module", "ace/lib/oop", "ace/mode/javascript", "ace/mode/typescript_highlight_rules", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle", "ace/worker/worker_client"], function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var JavaScriptMode = require("./javascript").Mode;
    var TypeScriptHighlightRules = require("./typescript_highlight_rules").TypeScriptHighlightRules;
    var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
    var CStyleFoldMode = require("./folding/cstyle").FoldMode;

    var Mode = function() {
        JavaScriptMode.call(this);
        this.HighlightRules = TypeScriptHighlightRules;
        this.$behaviour = new CstyleBehaviour();
        this.foldingRules = new CStyleFoldMode();
    };
    oop.inherits(Mode, JavaScriptMode);

    (function() {
        this.$id = "ace/mode/ts";

        this.createWorker = function(session) {
            return null;
        };

        this.getCompletions = function(state, session, pos, prefix) {
            var completions = JavaScriptMode.prototype.getCompletions.apply(this, arguments);

            var typescriptKeywords = [
                "interface", "implements", "namespace", "module", "enum", "type", "abstract", "as", "is",
                "keyof", "readonly", "declare", "async", "await", "infer", "never", "unknown"
            ];

            var typescriptTypes = [
                "any", "void", "number", "boolean", "string", "object", "never", "undefined", "null", "Array", "ReadonlyArray",
                "Partial", "Required", "Readonly", "Pick", "Record", "Exclude", "Extract", "Omit", "ReturnType", "InstanceType"
            ];

            typescriptKeywords.forEach(function(keyword) {
                completions.push({
                    caption: keyword,
                    value: keyword,
                    meta: "keyword",
                    score: 1000
                });
            });

            typescriptTypes.forEach(function(type) {
                completions.push({
                    caption: type,
                    value: type,
                    meta: "type",
                    score: 1000
                });
            });

            return completions;
        };
    }).call(Mode.prototype);

    exports.Mode = Mode;
});
