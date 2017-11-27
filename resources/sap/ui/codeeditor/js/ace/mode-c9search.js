ace.define("ace/mode/c9search_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(r,a,b){"use strict";var o=r("../lib/oop");var l=r("../lib/lang");var T=r("./text_highlight_rules").TextHighlightRules;function s(c,f){try{return new RegExp(c,f);}catch(e){}}var C=function(){this.$rules={"start":[{tokenNames:["c9searchresults.constant.numeric","c9searchresults.text","c9searchresults.text","c9searchresults.keyword"],regex:/(^\s+[0-9]+)(:)(\d*\s?)([^\r\n]+)/,onMatch:function(v,c,d){var e=this.splitRegex.exec(v);var t=this.tokenNames;var f=[{type:t[0],value:e[1]},{type:t[1],value:e[2]}];if(e[3]){if(e[3]==" ")f[1]={type:t[1],value:e[2]+" "};else f.push({type:t[1],value:e[3]});}var g=d[1];var h=e[4];var m;var i=0;if(g&&g.exec){g.lastIndex=0;while(m=g.exec(h)){var j=h.substring(i,m.index);i=g.lastIndex;if(j)f.push({type:t[2],value:j});if(m[0])f.push({type:t[3],value:m[0]});else if(!j)break;}}if(i<h.length)f.push({type:t[2],value:h.substr(i)});return f;}},{regex:"^Searching for [^\\r\\n]*$",onMatch:function(v,c,d){var p=v.split("\x01");if(p.length<3)return"text";var e,f,g;var i=0;var t=[{value:p[i++]+"'",type:"text"},{value:f=p[i++],type:"text"},{value:"'"+p[i++],type:"text"}];if(p[2]!==" in"){g=p[i];t.push({value:"'"+p[i++]+"'",type:"text"},{value:p[i++],type:"text"});}t.push({value:" "+p[i++]+" ",type:"text"});if(p[i+1]){e=p[i+1];t.push({value:"("+p[i+1]+")",type:"text"});i+=1;}else{i-=1;}while(i++<p.length){p[i]&&t.push({value:p[i],type:"text"});}if(g){f=g;e="";}if(f){if(!/regex/.test(e))f=l.escapeRegExp(f);if(/whole/.test(e))f="\\b"+f+"\\b";}var h=f&&s("("+f+")",/ sensitive/.test(e)?"g":"ig");if(h){d[0]=c;d[1]=h;}return t;}},{regex:"^(?=Found \\d+ matches)",token:"text",next:"numbers"},{token:"string",regex:"^\\S:?[^:]+",next:"numbers"}],numbers:[{regex:"\\d+",token:"constant.numeric"},{regex:"$",token:"text",next:"start"}]};this.normalizeRules();};o.inherits(C,T);a.C9SearchHighlightRules=C;});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(r,e,m){"use strict";var R=r("../range").Range;var M=function(){};(function(){this.checkOutdent=function(l,i){if(!/^\s+$/.test(l))return false;return/^\s*\}/.test(i);};this.autoOutdent=function(d,a){var l=d.getLine(a);var b=l.match(/^(\s*\})/);if(!b)return 0;var c=b[1].length;var o=d.findMatchingBracket({row:a,column:c});if(!o||o.row==a)return 0;var i=this.$getIndent(d.getLine(o.row));d.replace(new R(a,0,a,c-1),i);};this.$getIndent=function(l){return l.match(/^\s*/)[0];};}).call(M.prototype);e.MatchingBraceOutdent=M;});ace.define("ace/mode/folding/c9search",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(r,e,m){"use strict";var o=r("../../lib/oop");var R=r("../../range").Range;var B=r("./fold_mode").FoldMode;var F=e.FoldMode=function(){};o.inherits(F,B);(function(){this.foldingStartMarker=/^(\S.*:|Searching for.*)$/;this.foldingStopMarker=/^(\s+|Found.*)$/;this.getFoldWidgetRange=function(s,f,a){var b=s.doc.getAllLines(a);var c=b[a];var d=/^(Found.*|Searching for.*)$/;var g=/^(\S.*:|\s*)$/;var h=d.test(c)?d:g;var j=a;var k=a;if(this.foldingStartMarker.test(c)){for(var i=a+1,l=s.getLength();i<l;i++){if(h.test(b[i]))break;}k=i;}else if(this.foldingStopMarker.test(c)){for(var i=a-1;i>=0;i--){c=b[i];if(h.test(c))break;}j=i;}if(j!=k){var n=c.length;if(h===d)n=c.search(/\(Found[^)]+\)$|$/);return new R(j,n,k,0);}};}).call(F.prototype);});ace.define("ace/mode/c9search",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/c9search_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/c9search"],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var C=r("./c9search_highlight_rules").C9SearchHighlightRules;var M=r("./matching_brace_outdent").MatchingBraceOutdent;var a=r("./folding/c9search").FoldMode;var b=function(){this.HighlightRules=C;this.$outdent=new M();this.foldingRules=new a();};o.inherits(b,T);(function(){this.getNextLineIndent=function(s,l,t){var i=this.$getIndent(l);return i;};this.checkOutdent=function(s,l,i){return this.$outdent.checkOutdent(l,i);};this.autoOutdent=function(s,d,c){this.$outdent.autoOutdent(d,c);};this.$id="ace/mode/c9search";}).call(b.prototype);e.Mode=b;});
