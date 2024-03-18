import Experience from "../Experience.js";
import * as THREE from "three";

import Room from "./Room.js";
import Control from "./Control.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import EventEmitter from "events";

export default class World extends EventEmitter
{
    constructor()
    {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on("ready", () => {
            this.environment = new Environment();  
            this.floor = new Floor();
            this.room = new Room();
            this.controls = new Control();
            this.emit("worldready");
        })

        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        })
    }

    switchTheme(theme)
    {
        if(this.environment)
        {
            this.environment.switchTheme(theme);
            if (this.room) 
            {
                this.room.toggleRectLightsVisibility(theme === "dark");
            }
        }

        if(theme === "dark")
        {
            this.floor.plane1.position.y = -0.3;
        }

        if(theme === "light")
        {
            this.floor.plane1.position.y = -0.5;
        }
    }

    resize()
    {
    }

    update()
    {
        if(this.room)
        {
            this.room.update();
        }
        if(this.controls)
        {
            this.controls.update();
        }
    }
}