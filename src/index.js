"use strict";
// Copyright (c) Jupyter Development Team. 
exports.__esModule = true;
// Distributed under the terms of the Modified BSD License. 
var widgets_1 = require("@phosphor/widgets");
var apputils_1 = require("@jupyterlab/apputils");
var coreutils_1 = require("@jupyterlab/coreutils");
var mainmenu_1 = require("@jupyterlab/mainmenu");
/**

* The command IDs used by the plugin.

*/
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.controlPanel = "vnc:control-panel";
})(CommandIDs = exports.CommandIDs || (exports.CommandIDs = {}));
/**

* Activate the jupyterhub extension.

*/
function activateHubExtension(app, palette, mainMenu) {
    // This config is provided by JupyterHub to the single-user server app 
    // in a dictionary: app.web_app.settings['page_config_data']. 
    var vncURL = coreutils_1.PageConfig.getOption("vnc_url");
    if (!vncURL) {
        console.log("jupyterlab-vnc: No configuration found.");
        vncURL = "https://github.com/jupyterlab/jupyterlab";
        // return; 
    }
    console.log("jupyterlab-vnc: Found configuration ", {
        vncHost: vncURL
    });
    var category = "VNC";
    var commands = app.commands;
    commands.addCommand(CommandIDs.controlPanel, {
        label: "Go To VNC",
        caption: "Open the VNC window in a new browser tab",
        execute: function () {
            window.open(vncURL, "_blank");
        }
    });
    // Add commands and menu itmes. 
    var menu = new widgets_1.Menu({ commands: commands });
    menu.title.label = category;
    [CommandIDs.controlPanel].forEach(function (command) {
        palette.addItem({ command: command, category: category });
        menu.addItem({ command: command });
    });
    mainMenu.addMenu(menu, { rank: 100 });
}
/**

* Initialization data for the jupyterlab_vnc extension.

*/
var vncExtension = {
    activate: activateHubExtension,
    id: "jupyter.extensions.jupyterlab-vnc",
    requires: [apputils_1.ICommandPalette, mainmenu_1.IMainMenu],
    autoStart: true
};
exports["default"] = vncExtension;
