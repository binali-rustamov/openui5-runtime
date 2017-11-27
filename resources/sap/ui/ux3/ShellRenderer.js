/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/IconPool'],function(q,I){"use strict";var S={};S.render=function(r,c){var a=r;var p=c.isPaneOpen();var P=c.getPaneWidth()+sap.ui.ux3.Shell.SIDE_BAR_BASE_WIDTH;var R=sap.ui.getCore().getConfiguration().getRTL();var s=c.getId();if(sap.ui.ux3.Shell.FIRST_RENDERING){document.body.style.margin="0";}a.write("<div");a.writeControlData(c);a.addClass("sapUiUx3Shell");a.addClass("sapUiUx3ShellHead"+c.getHeaderType());a.addClass("sapUiUx3ShellDesign"+c.getDesignType());if(!c._hasDarkDesign()){a.addClass("sapUiUx3ShellDesignLight");}if(c.getFullHeightContent()){a.addClass("sapUiUx3ShellFullHeightContent");}if(!c.getApplyContentPadding()){a.addClass("sapUiUx3ShellNoContentPadding");}if(!c.getShowTools()){a.addClass("sapUiUx3ShellNoTools");}if(!c.getShowPane()){a.addClass("sapUiUx3ShellNoPane");}if(c._topSyncRefId&&!c.getAllowOverlayHeaderAccess()){a.addClass("sapUiUx3ShellBlockHeaderAccess");}a.writeClasses();a.write(">");a.write("<img id='"+s+"-hdrImg' class='sapUiUx3ShellHeaderImg' src='");var b=sap.ui.core.theming.Parameters._getThemeImage('sapUiUx3ShellHeaderImageURL',true);a.writeEscaped(b);a.write("' />");a.write("<header id='"+s+"-hdr' class='sapUiUx3ShellHeader' role='banner'>");var t=c._topSyncRefId?" tabindex='0'":"";a.write("<span class='sapUiUx3ShellFocusDummy' id='"+s+"-focusDummyHdrStart'"+t+"></span>");S.renderHeader(a,c);a.write("<span class='sapUiUx3ShellFocusDummy' id='"+s+"-focusDummyHdrEnd'"+t+"></span>");a.write("</header>");a.write("<div id='",s,"-bg' class='sapUiUx3ShellBg'></div>");a.write("<img id='",s,"-bgImg' class='sapUiUx3ShellBgImg' src='");b=sap.ui.core.theming.Parameters._getThemeImage('sapUiUx3ShellBackgroundImageURL',true);a.writeEscaped(b);a.write("'/>");var w=p?" style='margin-"+(R?"left":"right")+":"+(P+22)+"px'":"";a.write("<div id='",s,"-wBar'"+w+" class='sapUiUx3ShellWorksetBar'>");S.renderWorksetItems(a,c);a.write("</div>");a.write("<section id='"+s+"-tp' class='sapUiUx3ShellToolPaletteArea' role='complementary' data-sap-ui-fastnavgroup='true'>");S.renderToolPalette(a,c);a.write("</section>");var d=p?" style='"+(R?"left":"right")+":"+P+"px'":"";a.write("<div class='sapUiUx3ShellCanvas'"+d+" id='"+s+"-canvas'>");S.renderFacetBar(a,c);a.write("<article class='sapUiUx3ShellContent' id='"+s+"-content' role='main' data-sap-ui-fastnavgroup='true'>");var C=c.getContent();for(var i=0;i<C.length;i++){a.renderControl(C[i]);}a.write("</article><div class='sapUiUx3ShellNotifySpace'></div></div>");var t=c._topSyncRefId?" tabindex='0'":"";a.write("<span class='sapUiUx3ShellFocusDummy' id='"+s+"-focusDummyPane'"+t+"></span>");a.write("<aside id='"+s+"-paneBar' class='sapUiUx3ShellPaneBar "+(p?" sapUiUx3ShellPaneBarOpen sapUiUx3ShellPaneBarOpened":" sapUiUx3ShellPaneBarClose")+"' role='complementary' style='width:"+P+"px;'>");a.write("<section id='"+s+"-paneContent' style='width:"+c.getPaneWidth()+"px;' class='sapUiUx3ShellPaneBarContent' role='tabpanel'>");var e=c.getPaneContent();for(var i=0;i<e.length;i++){a.renderControl(e[i]);}a.write("</section>");a.write("<div id='"+s+"-paneBarRight' class='sapUiUx3ShellPaneBarRight' data-sap-ui-fastnavgroup='true'>");a.write("<ul id='"+s+"-paneBarEntries' class='sapUiUx3ShellPaneEntries' role='tablist'>");S.renderPaneBarItems(a,c);a.write("</ul>");a.write("<div id='"+s+"-paneBarOverflowButton' class='sapUiUx3ShellPaneOverflowButton'");a.addStyle("display","none;");a.writeStyles();a.write(">");a.write("<div id='"+s+"-paneBarOverflowWrapper' class='sapUiUx3ShellPaneOverflowWrapper'>");a.write("<span id='"+s+"-paneBarOverflowText' class='sapUiUx3ShellPaneOverflowText sapUiUx3ShellPaneEntry'>");a.write(sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3").getText("SHELL_MORE_BUTTON"));a.write("</span>");a.write("</div>");a.write("</div>");a.write("</div>");a.write("</aside>");a.write("<div class='sapUiUx3ShellCanvasBackground "+(p?"sapUiUx3ShellCanvasBackgroundOpen":"sapUiUx3ShellCanvasBackgroundClosed")+"' id='"+s+"-canvasBackground'"+d+">");a.write("<div class='sapUiUx3ShellCanvasBackgroundRight'></div>");a.write("</div>");a.write("<div id='"+s+"-notify' class='sapUiUx3ShellNotify'>");S.renderNotificationArea(a,c);a.write("</div>");a.write("</div>");};S.renderHeader=function(r,c){var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");var b=c.getAppIcon();r.write("<hr id='"+c.getId()+"-hdrLine'/>");r.write("<span id='"+c.getId()+"-hdr-items' class='sapUiUx3ShellHeaderTitleRight'>");var h=c.getHeaderItems();for(var i=0;i<h.length;i++){if(h[i]instanceof sap.ui.commons.MenuButton){if(h[i].getMenu()){h[i].getMenu().addStyleClass("sapUiMnuTop",true);}}r.renderControl(h[i]);if((i<(h.length-1))||(c.getShowLogoutButton())){r.write("<span class='sapUiUx3ShellHeaderSep'></span>");}}if(c.getShowLogoutButton()){r.write("<a id='"+c.getId()+"-logout' title='");r.write(c.getLogoutButtonTooltip()?q.sap.encodeHTML(c.getLogoutButtonTooltip()):a.getText("SHELL_LOGOUT"));r.write("' tabindex='0' role='button' class='sapUiUx3ShellHeaderButton sapUiUx3ShellHeader-logout'></a>");}r.write("</span>");r.write("<span class='sapUiUx3ShellHeaderTitleLeft' ");r.writeAttributeEscaped("title",c.getAppTitle());r.write(">");r.write("<img id='"+c.getId()+"-logoImg' src='");if(b){r.writeEscaped(c.getAppIcon());}else{var s=sap.ui.core.theming.Parameters._getThemeImage('sapUiUx3ShellApplicationImageURL',true);r.writeEscaped(s);}r.write("'");var d=c.getAppIconTooltip()||a.getText("SHELL_LOGO");r.writeAttributeEscaped("alt",d);r.writeAttributeEscaped("title",d);r.write(">");r.write("<span>");r.writeEscaped(c.getAppTitle());r.write("</span>");r.write("</span>");};S.renderToolPalette=function(r,c){var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");var s=c.getId();var t=c._topSyncRefId?" tabindex='0'":"";r.write("<span class='sapUiUx3ShellFocusDummy' id='"+c.getId()+"-focusDummyTPStart'"+t+"></span>");var A=a.getText("SHELL_TOOLPANE_GENERIC"),b=false,f=true,d="";if(c.getShowSearchTool()){b=true;d+="<a id='"+s+sap.ui.ux3.Shell.TOOL_PREFIX+s+"-searchTool' title='"+a.getText("SHELL_SEARCH")+"' class='sapUiUx3ShellTool sapUiUx3ShellTool-search' tabindex='0' role='button' aria-pressed='false'></a>";if(f){f=false;}else{A+=",";}A+=" "+a.getText("SHELL_SEARCH");}if(c.getShowFeederTool()){b=true;d+="<a id='"+s+sap.ui.ux3.Shell.TOOL_PREFIX+s+"-feederTool' title='"+a.getText("SHELL_FEEDER")+"' class='sapUiUx3ShellTool sapUiUx3ShellTool-feeder' tabindex='0' role='button' aria-pressed='false'></a>";if(f){f=false;}else{A+=",";}A+=" "+a.getText("SHELL_FEEDER");}if(b){r.write("<div role='toolbar'aria-describedby='"+s+"-genericToolsDescr'>");r.write("<span id='"+s+"-genericToolsDescr' style='display:none;'>"+A+"</span>");r.write(d+"</div>");}var T=c.getToolPopups();if(b&&(T.length>0)){r.write("<hr id='"+s+"-tp-separator' class='sapUiUx3ShellToolSep'/>");}if(T.length>0){r.write("<div role='toolbar' aria-describedby='"+s+"-appToolsDescr'>");r.write("<span id='"+s+"-appToolsDescr' style='display:none;'>"+a.getText("SHELL_TOOLPANE_APP")+"</span>");for(var i=0;i<T.length;i++){var o=T[i];if(o instanceof sap.ui.core.SeparatorItem){r.write("<hr class='sapUiUx3ShellToolSep'/>");}else{r.write("<a id='"+s+"-tool-"+o.getId()+"' class='sapUiUx3ShellTool'");var e=o.getTooltip_AsString();if(!e){e=o.getTitle();}if(e){r.write(" title='");r.writeEscaped(e);r.write("' ");}r.write(" tabindex='0' role='button' aria-pressed='false'>");var g=o.getIcon();if(I.isIconURI(g)){r.writeIcon(g,["sapUiUx3ShellToolFontIcon"],{"title":null,"aria-label":null});}else{r.write("<img src='");r.writeEscaped(g);r.write("' alt='' role='presentation'/>");}r.write("</a>");}}r.write("</div>");}r.write("<span class='sapUiUx3ShellFocusDummy' id='"+c.getId()+"-focusDummyTPEnd'"+t+"></span>");};S.renderPaneBarItems=function(r,c){var s=c.getId();var p=c.getPaneBarItems();var n=p.length;for(var i=0;i<n;i++){var a=p[i];var b=a.getId();r.write("<li");r.writeElementData(a);r.write(" role='tab' aria-controls='"+s+"-paneContent' aria-setsize='"+n+"' aria-posinset='"+(i+1)+"' tabindex='-1' class='sapUiUx3ShellPaneEntry");if(c._sOpenPaneId===b){r.write(" sapUiUx3ShellPaneEntrySelected");}r.write("'");if(a.getTooltip_AsString()){r.writeAttributeEscaped("title",a.getTooltip_AsString());}r.write(">");r.writeEscaped(a.getText().toUpperCase());r.write("</li>");}};S.renderNotificationArea=function(r,c){r.write("<div class='sapUiUx3ShellNotifyBG'></div>");if(c.getNotificationBar()){r.renderControl(c.getNotificationBar());}};S.renderWorksetItems=function(r,c){var i=c.getWorksetItems();c._oWorksetBar.setAssociatedItems(i);if(!c._oWorksetBar.isSelectedItemValid()&&(i.length>0)){c.setAssociation("selectedWorksetItem",i[0],true);c._oWorksetBar.setSelectedItem(i[0]);}if(r){r.renderControl(c._oWorksetBar);}};S.renderFacetBar=function(r,c){var s=sap.ui.getCore().byId(c.getSelectedWorksetItem());if(s){var p=s.getParent();if(p&&p instanceof sap.ui.ux3.NavigationItem){s=p;}var a=s.getSubItems();c._oFacetBar.setAssociatedItems(a);if(!c._oFacetBar.isSelectedItemValid()&&(a.length>0)){c._oFacetBar.setSelectedItem(a[0]);}}if(r){r.renderControl(c._oFacetBar);}};return S;},true);
