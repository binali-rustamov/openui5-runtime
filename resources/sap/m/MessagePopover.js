/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./ResponsivePopover","./Button","./Toolbar","./ToolbarSpacer","./Bar","./List","./StandardListItem","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/HTML","./Text","sap/ui/core/Icon","./SegmentedButton","./Page","./NavContainer","./semantic/SemanticPage","./Link","./Popover","./MessagePopoverItem","./MessageView"],function(q,R,B,T,a,b,L,S,C,I,H,c,d,e,P,N,f,g,h,M,i){"use strict";var j=C.extend("sap.m.MessagePopover",{metadata:{library:"sap.m",properties:{asyncDescriptionHandler:{type:"any",group:"Behavior",defaultValue:null},asyncURLHandler:{type:"any",group:"Behavior",defaultValue:null},placement:{type:"sap.m.VerticalPlacementType",group:"Behavior",defaultValue:"Vertical"},initiallyExpanded:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.MessageItem",altTypes:["sap.m.MessagePopoverItem"],multiple:true,singularName:"item"},headerButton:{type:"sap.m.Button",multiple:false}},events:{afterOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},afterClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}},itemSelect:{parameters:{item:{type:"sap.m.MessagePopoverItem"},messageTypeFilter:{type:"sap.ui.core.MessageType"}}},listSelect:{parameters:{messageTypeFilter:{type:"sap.ui.core.MessageType"}}},longtextLoaded:{},urlValidated:{}}}});function k(s){return s.charAt(0).toUpperCase()+s.slice(1);}var l="sapMMsgPopover",D="320px",m="440px",n={back:I.getIconURI("nav-back"),close:I.getIconURI("decline"),information:I.getIconURI("message-information"),warning:I.getIconURI("message-warning"),error:I.getIconURI("message-error"),success:I.getIconURI("message-success")},A=["asyncDescriptionHandler","asyncURLHandler"],o={asyncDescriptionHandler:function(p){var s=p.item.getLongtextUrl();if(s){q.ajax({type:"GET",url:s,success:function(r){p.item.setDescription(r);p.promise.resolve();},error:function(){var E="A request has failed for long text data. URL: "+s;q.sap.log.error(E);p.promise.reject(E);}});}}};j.setDefaultHandlers=function(p){A.forEach(function(F){if(p.hasOwnProperty(F)){o[F]=p[F];}});};j.prototype.init=function(){var t=this;var p;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oMessageView=this._initMessageView();this._insertCloseBtn(this._oMessageView._oListHeader);this._insertCloseBtn(this._oMessageView._oDetailsHeader);this._oMessageView._oSegmentedButton.attachEvent("select",this._onSegButtonSelect,this);this._oPopover=new R(this.getId()+"-messagePopover",{showHeader:false,contentWidth:m,contentHeight:D,placement:this.getPlacement(),showCloseButton:false,verticalScrolling:false,horizontalScrolling:false,modal:false,afterOpen:function(E){t.fireAfterOpen({openBy:E.getParameter("openBy")});},afterClose:function(E){t._oMessageView._navContainer.backToTop();t.fireAfterClose({openBy:E.getParameter("openBy")});},beforeOpen:function(E){t.fireBeforeOpen({openBy:E.getParameter("openBy")});},beforeClose:function(E){t.fireBeforeClose({openBy:E.getParameter("openBy")});}}).addStyleClass(l);this._oPopover.addContent(this._oMessageView);this._oPopover.addAssociation("ariaLabelledBy",this.getId()+"-messageView-HeadingDescr",true);p=this._oPopover.getAggregation("_popup");p.oPopup.setAutoClose(false);p.addEventDelegate({onBeforeRendering:this.onBeforeRenderingPopover,onAfterRendering:this.onAfterRenderingPopover},this);if(sap.ui.Device.system.phone){this._oPopover.setBeginButton(new B({text:this._oResourceBundle.getText("MESSAGEPOPOVER_CLOSE"),press:this.close.bind(this)}));}A.forEach(function(F){if(o.hasOwnProperty(F)){this['set'+k(F)](o[F]);}},this);};j.prototype.onBeforeRenderingPopover=function(){if(this._bItemsChanged){var p=this.getItems();var t=this;this._oMessageView.destroyItems();p.forEach(function(r){r._updateProperties(function(){t._bItemsChanged=true;});this._oMessageView.addItem(r.clone("","",{cloneChildren:true,cloneBinding:true}));},this);this._bItemsChanged=false;}this._setInitialFocus();};j.prototype.onAfterRenderingPopover=function(){if(this._oPopover._oControl._sFocusControlId){this._oPopover._oControl._sFocusControlId=null;}};j.prototype.exit=function(){this._oResourceBundle=null;if(this._oMessageView){this._oMessageView.destroy();this._oMessageView=null;}if(this._oPopover){this._oPopover.destroy();this._oPopover=null;}};j.prototype.openBy=function(p){var r=this._oPopover.getAggregation("_popup"),s=p.getParent();if(r instanceof h){if((s instanceof T||s instanceof b||s instanceof f)){r.setShowArrow(false);r.setResizable(true);}else{r.setShowArrow(true);}}if(this._oPopover){this._restoreExpansionDefaults();this._oPopover.openBy(p);}return this;};j.prototype.close=function(){if(this._oPopover){this._oPopover.close();}return this;};j.prototype.isOpen=function(){return this._oPopover.isOpen();};j.prototype.toggle=function(p){if(this.isOpen()){this.close();}else{this.openBy(p);}return this;};j.prototype.setPlacement=function(p){this.setProperty("placement",p,true);this._oPopover.setPlacement(p);return this;};j.prototype.getDomRef=function(s){return this._oPopover&&this._oPopover.getAggregation("_popup").getDomRef(s);};j.prototype._initMessageView=function(){var t=this,p;p=new i(this.getId()+"-messageView",{listSelect:function(E){t.fireListSelect({messageTypeFilter:E.getParameter('messageTypeFilter')});},itemSelect:function(E){t.fireItemSelect({messageTypeFilter:E.getParameter('messageTypeFilter'),item:E.getParameter('item')});},longtextLoaded:function(){t.fireLongtextLoaded();},urlValidated:function(){t.fireUrlValidated();}});return p;};j.prototype._onSegButtonSelect=function(){if(this.isOpen()&&!this.getInitiallyExpanded()&&this._oPopover.hasStyleClass(l+"-init")){this._expandMsgPopover();}};j.prototype._restoreExpansionDefaults=function(){if(!this.getInitiallyExpanded()){this._collapseMsgPopover();this._oMessageView._oSegmentedButton.setSelectedButton("none");}else{this._expandMsgPopover();}};j.prototype._expandMsgPopover=function(){var s,p=D,s=this._oPopover.$("cont").css("height");if(this.getInitiallyExpanded()&&s!=="0px"){p=parseFloat(s)?s:p;}this._oPopover.setContentHeight(p).removeStyleClass(l+"-init");};j.prototype._collapseMsgPopover=function(){this._oPopover.addStyleClass(l+"-init").setContentHeight("auto");};j.prototype._insertCloseBtn=function(p){var s=this._oResourceBundle.getText("MESSAGEPOPOVER_CLOSE"),r=new B({icon:n["close"],visible:!sap.ui.Device.system.phone,tooltip:s,press:this.close.bind(this)}).addStyleClass(l+"CloseBtn");p.insertContent(r,3,true);};j.prototype._setInitialFocus=function(){if(this._oMessageView._isListPage()&&this.getInitiallyExpanded()){this._oPopover.setInitialFocus(this._oMessageView._oLists[this._sCurrentList||'all']);}};j.prototype._afterNavigate=function(){q.sap.delayedCall(0,this,"_restoreFocus");};j.prototype._restoreFocus=function(){if(this._oMessageView._isListPage()){var r=this._oRestoreFocus&&this._oRestoreFocus.control(0);r&&r.focus();}else{this._oMessageView._oBackButton.focus();}};j.prototype.setAsyncDescriptionHandler=function(p){this.setProperty('asyncDescriptionHandler',p,true);this._oMessageView.setProperty('asyncDescriptionHandler',p,true);return this;};j.prototype.setAsyncURLHandler=function(p){this.setProperty('asyncURLHandler',p,true);this._oMessageView.setProperty('asyncURLHandler',p,true);return this;};j.prototype.setHeaderButton=function(p){this._oMessageView.setHeaderButton(p);return this;};j.prototype.getHeaderButton=function(){return this._oMessageView.getHeaderButton();};j.prototype.setModel=function(p,s){this._oMessageView.setModel(p,s);return C.prototype.setModel.apply(this,arguments);};["invalidate","addStyleClass","removeStyleClass","toggleStyleClass","hasStyleClass","getBusyIndicatorDelay","setBusyIndicatorDelay","getVisible","setVisible","getBusy","setBusy"].forEach(function(s){j.prototype[s]=function(){if(this._oPopover&&this._oPopover[s]){var p=this._oPopover;var r=p[s].apply(p,arguments);return r===p?this:r;}};});["setModel","bindAggregation","setAggregation","insertAggregation","addAggregation","removeAggregation","removeAllAggregation","destroyAggregation"].forEach(function(F){j.prototype["_"+F+"Old"]=j.prototype[F];j.prototype[F]=function(){var r=j.prototype["_"+F+"Old"].apply(this,arguments);this._bItemsChanged=true;if(this._oPopover){this._oPopover.invalidate();}if(["removeAggregation","removeAllAggregation"].indexOf(F)!==-1){return r;}return this;};});return j;},true);