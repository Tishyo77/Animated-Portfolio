import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class Room
{
    constructor()
    {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.rectLights = [];
        
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.onMouseMove();
    }

    setModel()
    {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;  
        

            if(child instanceof THREE.Group)
            {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;  
                });
            }

            child.scale.set(0, 0, 0);
            if(child.name === "Cube")
            {
                //child.scale.set(1, 1, 1);
                child.position.set(0, 0, 0);
                child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });  

        const width = 0.7;
        const height = 0.3;
        const intensity = 1.5;
        const rectLight = new THREE.RectAreaLight(
            0xFF00EA, 
            intensity, 
            width, 
            height,
        );
        rectLight.position.set(-4.6, 5.75, -5);
        rectLight.rotation.y = Math.PI / 4;
        rectLight.rotation.x = 0;
        rectLight.rotation.z = 0;
        this.scene.add(rectLight);
        const rectLightHelper = new RectAreaLightHelper(rectLight);
        //rectLight.add(rectLightHelper);
        this.actualRoom.add(rectLight);

        const width1 = 0.85;
        const height1 = 0.55;
        const intensity1 = 3;
        const rectLight1 = new THREE.RectAreaLight(
            0xFF00EA, 
            intensity1, 
            width1, 
            height1,
        );
        rectLight1.position.set(8.3, 7.85, -2.25);
        rectLight1.rotation.y = -Math.PI / 4;
        this.scene.add(rectLight1);
        const rectLightHelper1 = new RectAreaLightHelper(rectLight1);
        //rectLight1.add(rectLightHelper1);
        this.actualRoom.add(rectLight1);

        const width2 = 1.9;
        const height2 = 0.101;
        const intensity2 = 3;
        const rectLight2 = new THREE.RectAreaLight(
            0x00FFA1, 
            intensity2, 
            width2, 
            height2,
        );
        rectLight2.position.set(-5.5, 16.5, -5);
        rectLight2.rotation.x = -Math.PI / 2;
        rectLight2.rotation.z = Math.PI / 4;
        this.scene.add(rectLight2);
        const rectLightHelper2 = new RectAreaLightHelper(rectLight2);
        //rectLight2.add(rectLightHelper2);
        this.actualRoom.add(rectLight2);

        const width3 = 1.9;
        const height3 = 0.099;
        const intensity3 = 3;
        const rectLight3 = new THREE.RectAreaLight(
            0x00FFA1, 
            intensity3, 
            width3, 
            height3,
        );
        rectLight3.position.set(5.5, 16.5, -5);
        rectLight3.rotation.x = -Math.PI / 2;
        rectLight3.rotation.z = -Math.PI / 4;
        this.scene.add(rectLight3);
        const rectLightHelper3 = new RectAreaLightHelper(rectLight3);
        //rectLight3.add(rectLightHelper3);
        this.actualRoom.add(rectLight3);

        const width4 = 1.5;
        const height4 = 0.10001;
        const intensity4 = 0.5;
        const rectLight4 = new THREE.RectAreaLight(
            0x00FFA1, 
            intensity4, 
            width4, 
            height4,
        );
        rectLight4.position.set(-3.5, 1.5, -6);
        rectLight4.rotation.x = -Math.PI / 2;
        rectLight4.rotation.z = Math.PI / 4;
        this.scene.add(rectLight4);
        const rectLightHelper4 = new RectAreaLightHelper(rectLight4);
        //rectLight4.add(rectLightHelper4);
        this.actualRoom.add(rectLight4);

        const width5 = 1.8;
        const height5 = 0.1001;
        const intensity5 = 0.5;
        const rectLight5 = new THREE.RectAreaLight(
            0x00FFA1, 
            intensity5, 
            width5, 
            height5,
        );
        rectLight5.position.set(5.5, 1.5, -5);
        rectLight5.rotation.x = -Math.PI / 2;
        rectLight5.rotation.z = -Math.PI / 4;
        this.scene.add(rectLight5);
        const rectLightHelper5 = new RectAreaLightHelper(rectLight5);
        //rectLight5.add(rectLightHelper5);
        this.actualRoom.add(rectLight5);

        this.rectLights.push(rectLight, rectLight1, rectLight2, rectLight3, rectLight4, rectLight5);

        this.rectLights.forEach(rectLight => {
            rectLight.visible = false;
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.12, 0.12, 0.12);
    }

    toggleRectLightsVisibility(isDarkMode) 
    {
        const visibility = isDarkMode ? true : false;

        this.rectLights.forEach(rectLight => {
            rectLight.visible = visibility;
        });
    }

    onMouseMove()
    {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });

    }

    resize()
    {
    }

    update()
    {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
    }
}