/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./DataType','./Metadata'],function(q,D,M){"use strict";var b=function(C,o){M.apply(this,arguments);};b.prototype=Object.create(M.prototype);var h=Object.prototype.hasOwnProperty;function c(n){return n.charAt(0).toUpperCase()+n.slice(1);}var r=/(children|ies|ves|oes|ses|ches|shes|xes|s)$/i;var S={'children':-3,'ies':'y','ves':'f','oes':-2,'ses':-2,'ches':-2,'shes':-2,'xes':-2,'s':-1};function g(n){return n.replace(r,function($,p){var R=S[p.toLowerCase()];return typeof R==="string"?R:p.slice(0,R);});}function e(f,n){return function(){q.sap.log.warning("Usage of deprecated feature: "+n);return f.apply(this,arguments);};}function j(o,i){var a=null;for(var n in i){if(h.call(i,n)&&typeof o[n]==='undefined'){a=a||{};a[n]=i[n];}}return a;}var K={SPECIAL_SETTING:-1,PROPERTY:0,SINGLE_AGGREGATION:1,MULTIPLE_AGGREGATION:2,SINGLE_ASSOCIATION:3,MULTIPLE_ASSOCIATION:4,EVENT:5};b._guessSingularName=g;function k(C,n,i){i=typeof i!=='object'?{type:i}:i;this.name=n;this.type=i.type||'any';this.visibility=i.visibility||'public';this.defaultValue=i.defaultValue;this.appData=j(this,i);this._oParent=C;this._sUID="special:"+n;this._iKind=K.SPECIAL_SETTING;}function P(C,n,i){i=typeof i!=='object'?{type:i}:i;this.name=n;this.type=i.type||'string';this.group=i.group||'Misc';this.defaultValue=i.defaultValue!==null?i.defaultValue:null;this.bindable=!!i.bindable;this.deprecated=!!i.deprecated||false;this.visibility='public';this.appData=j(this,i);this._oParent=C;this._sUID=n;this._iKind=K.PROPERTY;var N=c(n);this._sMutator='set'+N;this._sGetter='get'+N;if(this.bindable){this._sBind='bind'+N;this._sUnbind='unbind'+N;}else{this._sBind=this._sUnbind=undefined;}this._oType=null;}P.prototype.generate=function(a){var t=this,n=t.name;a(t._sGetter,function(){return this.getProperty(n);});a(t._sMutator,function(v){this.setProperty(n,v);return this;},t);if(t.bindable){a(t._sBind,function(p,f,m){this.bindProperty(n,p,f,m);return this;},t);a(t._sUnbind,function(p){this.unbindProperty(n,p);return this;});}};P.prototype.getType=function(){return this._oType||(this._oType=D.getType(this.type));};P.prototype.getDefaultValue=function(){var d=this.defaultValue,t;if(d===null){t=this.getType();if(t instanceof D){d=t.getDefaultValue();}}return d;};P.prototype.get=function(i){return i[this._sGetter]();};P.prototype.set=function(i,v){return i[this._sMutator](v);};function A(C,n,i){i=typeof i!=='object'?{type:i}:i;this.name=n;this.type=i.type||'sap.ui.core.Control';this.altTypes=i.altTypes||undefined;this.multiple=typeof i.multiple==='boolean'?i.multiple:true;this.singularName=this.multiple?i.singularName||g(n):undefined;this.bindable=!!i.bindable;this.deprecated=i.deprecated||false;this.visibility=i.visibility||'public';this._doesNotRequireFactory=!!i._doesNotRequireFactory;this.appData=j(this,i);this._oParent=C;this._sUID='aggregation:'+n;this._iKind=this.multiple?K.MULTIPLE_AGGREGATION:K.SINGLE_AGGREGATION;var N=c(n);this._sGetter='get'+N;if(this.multiple){var a=c(this.singularName);this._sMutator='add'+a;this._sInsertMutator='insert'+a;this._sRemoveMutator='remove'+a;this._sRemoveAllMutator='removeAll'+N;this._sIndexGetter='indexOf'+a;}else{this._sMutator='set'+N;this._sInsertMutator=this._sRemoveMutator=this._sRemoveAllMutator=this._sIndexGetter=undefined;}this._sDestructor='destroy'+N;if(this.bindable){this._sBind='bind'+N;this._sUnbind='unbind'+N;}else{this._sBind=this._sUnbind=undefined;}}A.prototype.generate=function(d){var m=this,n=m.name;if(!m.multiple){d(m._sGetter,function(){return this.getAggregation(n);});d(m._sMutator,function(v){this.setAggregation(n,v);return this;},m);}else{d(m._sGetter,function(){return this.getAggregation(n,[]);});d(m._sMutator,function(a){this.addAggregation(n,a);return this;},m);d(m._sInsertMutator,function(i,a){this.insertAggregation(n,i,a);return this;},m);d(m._sRemoveMutator,function(a){return this.removeAggregation(n,a);});d(m._sRemoveAllMutator,function(){return this.removeAllAggregation(n);});d(m._sIndexGetter,function(a){return this.indexOfAggregation(n,a);});}d(m._sDestructor,function(){this.destroyAggregation(n);return this;});if(m.bindable){d(m._sBind,function(p,t,s,f){this.bindAggregation(n,p,t,s,f);return this;},m);d(m._sUnbind,function(p){this.unbindAggregation(n,p);return this;});}};A.prototype.getType=function(){return this._oType||(this._oType=D.getType(this.type));};A.prototype.get=function(i){return i[this._sGetter]();};A.prototype.set=function(i,v){return i[this._sMutator](v);};A.prototype.add=function(i,v){return i[this._sMutator](v);};A.prototype.insert=function(i,v,p){return i[this._sInsertMutator](v,p);};A.prototype.remove=function(i,v){return i[this._sRemoveMutator](v);};A.prototype.removeAll=function(i){return i[this._sRemoveAllMutator]();};A.prototype.indexOf=function(i,v){return i[this._sIndexGetter](v);};function l(C,n,i){i=typeof i!=='object'?{type:i}:i;this.name=n;this.type=i.type||'sap.ui.core.Control';this.multiple=i.multiple||false;this.singularName=this.multiple?i.singularName||g(n):undefined;this.deprecated=i.deprecated||false;this.visibility='public';this.appData=j(this,i);this._oParent=C;this._sUID='association:'+n;this._iKind=this.multiple?K.MULTIPLE_ASSOCIATION:K.SINGLE_ASSOCIATION;var N=c(n);this._sGetter='get'+N;if(this.multiple){var a=c(this.singularName);this._sMutator='add'+a;this._sRemoveMutator='remove'+a;this._sRemoveAllMutator='removeAll'+a;}else{this._sMutator='set'+N;this._sRemoveMutator=this._sRemoveAllMutator=undefined;}}l.prototype.generate=function(d){var t=this,n=t.name;if(!t.multiple){d(t._sGetter,function(){return this.getAssociation(n);});d(t._sMutator,function(v){this.setAssociation(n,v);return this;},t);}else{d(t._sGetter,function(){return this.getAssociation(n,[]);});d(t._sMutator,function(a){this.addAssociation(n,a);return this;},t);d(t._sRemoveMutator,function(a){return this.removeAssociation(n,a);});d(t._sRemoveAllMutator,function(){return this.removeAllAssociation(n);});}};l.prototype.getType=function(){return this._oType||(this._oType=D.getType(this.type));};l.prototype.get=function(i){return i[this._sGetter]();};l.prototype.set=function(i,v){return i[this._sMutator](v);};l.prototype.remove=function(i,v){return i[this._sRemoveMutator](v);};l.prototype.removeAll=function(i){return i[this._sRemoveAllMutator]();};function E(C,n,i){this.name=n;this.allowPreventDefault=i.allowPreventDefault||false;this.deprecated=i.deprecated||false;this.visibility='public';this.allowPreventDefault=!!i.allowPreventDefault;this.enableEventBubbling=!!i.enableEventBubbling;this.appData=j(this,i);this._oParent=C;this._sUID='event:'+n;this._iKind=K.EVENT;var N=c(n);this._sMutator='attach'+N;this._sDetachMutator='detach'+N;this._sTrigger='fire'+N;}E.prototype.generate=function(a){var t=this,n=t.name,i=t.allowPreventDefault,m=t.enableEventBubbling;a(t._sMutator,function(d,f,o){this.attachEvent(n,d,f,o);return this;},t);a(t._sDetachMutator,function(f,o){this.detachEvent(n,f,o);return this;});a(t._sTrigger,function(p){return this.fireEvent(n,p,i,m);});};E.prototype.attach=function(i,d,f,a){return i[this._sMutator](d,f,a);};E.prototype.detach=function(i,f,a){return i[this._sDetachMutator](f,a);};E.prototype.fire=function(i,p,a,d){return i[this._sTrigger](p,a,d);};b.prototype.metaFactorySpecialSetting=k;b.prototype.metaFactoryProperty=P;b.prototype.metaFactoryAggregation=A;b.prototype.metaFactoryAssociation=l;b.prototype.metaFactoryEvent=E;b.prototype.applySettings=function(C){var t=this,s=C.metadata;M.prototype.applySettings.call(this,C);function n(I,F){var R={},N;if(I){for(N in I){if(h.call(I,N)){R[N]=new F(t,N,I[N]);}}}return R;}function f(I,p){var R={},N;for(N in I){if(p===(I[N].visibility==='public')){R[N]=I[N];}}return R;}var a=/([a-z][^.]*(?:\.[a-z][^.]*)*)\./;function d(N){var m=a.exec(N);return(m&&m[1])||"";}this._sLibraryName=s.library||d(this.getName());this._mSpecialSettings=n(s.specialSettings,this.metaFactorySpecialSetting);this._mProperties=n(s.properties,this.metaFactoryProperty);var i=n(s.aggregations,this.metaFactoryAggregation);this._mAggregations=f(i,true);this._mPrivateAggregations=f(i,false);this._sDefaultAggregation=s.defaultAggregation||null;this._sDefaultProperty=s.defaultProperty||null;this._mAssociations=n(s.associations,this.metaFactoryAssociation);this._mEvents=n(s.events,this.metaFactoryEvent);if(typeof C.metadata["designTime"]==="boolean"){this._bHasDesignTime=C.metadata["designTime"];}else if(C.metadata["designTime"]){this._bHasDesignTime=true;this._oDesignTime=C.metadata["designTime"];}if(C.metadata.__version>1.0){this.generateAccessors();}};b.prototype.afterApplySettings=function(){M.prototype.afterApplySettings.call(this);var p=this.getParent();if(p instanceof b){this._mAllEvents=q.extend({},p._mAllEvents,this._mEvents);this._mAllProperties=q.extend({},p._mAllProperties,this._mProperties);this._mAllPrivateAggregations=q.extend({},p._mAllPrivateAggregations,this._mPrivateAggregations);this._mAllAggregations=q.extend({},p._mAllAggregations,this._mAggregations);this._mAllAssociations=q.extend({},p._mAllAssociations,this._mAssociations);this._sDefaultAggregation=this._sDefaultAggregation||p._sDefaultAggregation;this._sDefaultProperty=this._sDefaultProperty||p._sDefaultProperty;this._mAllSpecialSettings=q.extend({},p._mAllSpecialSettings,this._mSpecialSettings);}else{this._mAllEvents=this._mEvents;this._mAllProperties=this._mProperties;this._mAllPrivateAggregations=this._mPrivateAggregations;this._mAllAggregations=this._mAggregations;this._mAllAssociations=this._mAssociations;this._mAllSpecialSettings=this._mSpecialSettings;}};b.Kind=K;b.prototype.getLibraryName=function(){return this._sLibraryName;};b.prototype.addProperty=function(n,i){var p=this._mProperties[n]=new P(this,n,i);if(!this._mAllProperties[n]){this._mAllProperties[n]=p;}};b.prototype.hasProperty=function(n){return!!this._mAllProperties[n];};b.prototype.getProperty=function(n){var p=this._mAllProperties[n];return typeof p==='object'?p:undefined;};b.prototype.getProperties=function(){return this._mProperties;};b.prototype.getAllProperties=function(){return this._mAllProperties;};b.prototype.hasAggregation=function(n){return!!this._mAllAggregations[n];};b.prototype.getAggregation=function(n){n=n||this._sDefaultAggregation;var a=n?this._mAllAggregations[n]:undefined;return typeof a==='object'?a:undefined;};b.prototype.getAggregations=function(){return this._mAggregations;};b.prototype.getAllAggregations=function(){return this._mAllAggregations;};b.prototype.getAllPrivateAggregations=function(){return this._mAllPrivateAggregations;};b.prototype.getManagedAggregation=function(a){a=a||this._sDefaultAggregation;var o=a?this._mAllAggregations[a]||this._mAllPrivateAggregations[a]:undefined;return typeof o==='object'?o:undefined;};b.prototype.getDefaultAggregationName=function(){return this._sDefaultAggregation;};b.prototype.getDefaultAggregation=function(){return this.getAggregation();};b.prototype.getDefaultPropertyName=function(){return this._sDefaultProperty;};b.prototype.getDefaultProperty=function(){return this.getProperty(this.getDefaultPropertyName());};b.prototype.getPropertyLikeSetting=function(n){var p=this._mAllProperties[n];if(typeof p==='object'){return p;}p=this._mAllAggregations[n];return(typeof p==='object'&&p.altTypes&&p.altTypes.length>0)?p:undefined;};b.prototype.hasAssociation=function(n){return!!this._mAllAssociations[n];};b.prototype.getAssociation=function(n){var a=this._mAllAssociations[n];return typeof a==='object'?a:undefined;};b.prototype.getAssociations=function(){return this._mAssociations;};b.prototype.getAllAssociations=function(){return this._mAllAssociations;};b.prototype.hasEvent=function(n){return!!this._mAllEvents[n];};b.prototype.getEvent=function(n){var o=this._mAllEvents[n];return typeof o==='object'?o:undefined;};b.prototype.getEvents=function(){return this._mEvents;};b.prototype.getAllEvents=function(){return this._mAllEvents;};b.prototype.addSpecialSetting=function(n,i){var s=new k(this,n,i);this._mSpecialSettings[n]=s;if(!this._mAllSpecialSettings[n]){this._mAllSpecialSettings[n]=s;}};b.prototype.hasSpecialSetting=function(n){return!!this._mAllSpecialSettings[n];};b.prototype.getPropertyDefaults=function(){var d=this._mDefaults;if(d){return d;}if(this.getParent()instanceof b){d=q.extend({},this.getParent().getPropertyDefaults());}else{d={};}for(var s in this._mProperties){d[s]=this._mProperties[s].getDefaultValue();}this._mDefaults=d;return d;};b.prototype.createPropertyBag=function(){if(!this._fnPropertyBagFactory){this._fnPropertyBagFactory=function PropertyBag(){};this._fnPropertyBagFactory.prototype=this.getPropertyDefaults();}return new(this._fnPropertyBagFactory)();};b.prototype._enrichChildInfos=function(){q.sap.log.error("obsolete call to ManagedObjectMetadata._enrichChildInfos. This private method will be deleted soon");};b.prototype.getJSONKeys=function(){if(this._mJSONKeys){return this._mJSONKeys;}var a={},J={};function d(m){var n,i,p;for(n in m){i=m[n];p=a[n];if(!p||i._iKind<p._iKind){a[n]=J[n]=i;}J[i._sUID]=i;}}d(this._mAllSpecialSettings);d(this.getAllProperties());d(this.getAllAggregations());d(this.getAllAssociations());d(this.getAllEvents());this._mJSONKeys=J;this._mAllSettings=a;return this._mJSONKeys;};b.prototype.getAllSettings=function(){if(!this._mAllSettings){this.getJSONKeys();}return this._mAllSettings;};b.prototype.removeUnknownSettings=function(s){if(s==null){return s;}var v=this.getJSONKeys(),R={},n;for(n in s){if(h.call(v,n)){R[n]=s[n];}}return R;};b.prototype.generateAccessors=function(){var p=this.getClass().prototype,a=this.getName()+".",m=this._aPublicMethods,n;function d(f,i,o){if(!p[f]){p[f]=(o&&o.deprecated)?e(i,a+o.name):i;}m.push(f);}for(n in this._mProperties){this._mProperties[n].generate(d);}for(n in this._mAggregations){this._mAggregations[n].generate(d);}for(n in this._mAssociations){this._mAssociations[n].generate(d);}for(n in this._mEvents){this._mEvents[n].generate(d);}};function u(m){if(m._oDesignTime||!m._bHasDesignTime){return Promise.resolve(m._oDesignTime||null);}return new Promise(function(R){var s=q.sap.getResourceName(m.getName(),".designtime");sap.ui.require([s],function(d){m._oDesignTime=d;R(d);});});}b.prototype.loadDesignTime=function(){if(!this._oDesignTimePromise){var W;var p=this.getParent();if(p instanceof b){W=p.loadDesignTime();}else{W=Promise.resolve(null);}this._oDesignTimePromise=u(this).then(function(o){return W.then(function(a){return q.sap.extend(true,{},a,o);});});}return this._oDesignTimePromise;};var U={},w;function x(i){i=(w||(w=sap.ui.getCore().getConfiguration().getUIDPrefix()))+i;var C=U[i]||0;U[i]=C+1;return i+C;}b.uid=x;b.prototype.uid=function(){var i=this._sUIDToken;if(typeof i!=="string"){i=this.getName();i=i.slice(i.lastIndexOf('.')+1);i=i.replace(/([a-z])([A-Z])/g,"$1 $2").split(" ").slice(-1)[0];i=this._sUIDToken=i.replace(/([^A-Za-z0-9-_.:])|([0-9]+$)/g,"").toLowerCase();}return x(i);};var y;b.isGeneratedId=function(i){w=w||sap.ui.getCore().getConfiguration().getUIDPrefix();y=y||new RegExp("(^|-{1,3})"+q.sap.escapeRegExp(w));return y.test(i);};return b;},true);
