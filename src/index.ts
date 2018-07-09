// Copyright (c) Jupyter Development Team. 

// Distributed under the terms of the Modified BSD License. 

import { Menu } from "@phosphor/widgets";

import { ICommandPalette } from "@jupyterlab/apputils";

import { JupyterLab, JupyterLabPlugin } from "@jupyterlab/application";

import { PageConfig } from "@jupyterlab/coreutils";

import { IMainMenu } from "@jupyterlab/mainmenu";

/** 

* The command IDs used by the plugin. 

*/

export namespace CommandIDs {

  export const controlPanel: string = "vnc:control-panel";

}

/** 

* Activate the jupyterhub extension. 

*/

function activateHubExtension(

  app: JupyterLab,

  palette: ICommandPalette,

  mainMenu: IMainMenu

): void {

  // This config is provided by JupyterHub to the single-user server app 

  // in a dictionary: app.web_app.settings['page_config_data']. 

  let vncURL = PageConfig.getOption("vnc_url");

  if (!vncURL) {

    console.log("jupyterlab-vnc: No configuration found.");

    vncURL = "https://github.com/jupyterlab/jupyterlab";

    // return; 

  }

  console.log("jupyterlab-vnc: Found configuration ", {

    vncHost: vncURL

  });

  const category = "VNC";

  const { commands } = app;

  commands.addCommand(CommandIDs.controlPanel, {

    label: "Go To VNC",

    caption: "Open the VNC window in a new browser tab",

    execute: () => {

      window.open(vncURL, "_blank");

    }

  });

  // Add commands and menu itmes. 

  let menu = new Menu({ commands });

  menu.title.label = category;

  [CommandIDs.controlPanel].forEach(command => {

    palette.addItem({ command, category });

    menu.addItem({ command });

  });

  mainMenu.addMenu(menu, { rank: 100 });

}

/** 

* Initialization data for the jupyterlab_vnc extension. 

*/

const vncExtension: JupyterLabPlugin<void> = {

  activate: activateHubExtension,

  id: "jupyter.extensions.jupyterlab-vnc",

  requires: [ICommandPalette, IMainMenu],

  autoStart: true

};

export default vncExtension; 
