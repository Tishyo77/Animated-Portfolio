import EventEmitter from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans";

export default class Preloader extends EventEmitter
{
    constructor()
    {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });

        this.preventScroll = false;
    }

    setAssets()
    {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description-1"));
        convert(document.querySelector(".hero-main-description-2"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
    }

    firstIntro()
    {
        this.preventScroll = true;
        return new Promise ((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document.querySelector(".preloader").classList.add("hidden");
                }
            })
            if(this.device === "desktop")
            {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: 0.7,
                    onComplete: resolve,
                });
            }
            else
            {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                });
            }

            this.timeline.to(".intro-text .animatedis", {
                yPercent: -100,
                stagger: 0.07,
                ease: "back.out(1.2)",
            }, "same")
            .to(".arrow-svg-wrapper", {
                opacity: 1,
                onComplete: resolve,
            }, "same")
            .to(".toggle-bar", {
                opacity: 1,
                onComplete: resolve,
            }, "same");
        });
        
    }

    secondIntro()
    {
        this.preventScroll = true;
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline();

            //if(this.device === "desktop")
            //{
                this.secondTimeline.to(".intro-text .animatedis", {
                    yPercent: 100,
                    stagger: 0.05,
                    ease: "back.in(1.5)",
                }, "fadeout")
                .to(".arrow-svg-wrapper", {
                    opacity: 0,
                }, "fadeout")
                .to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power1.out",
                }, "same")
                .to(this.roomChildren.cube.rotation, {
                    y: 2 * Math.PI + Math.PI / 4,
                }, "same")
                .to(this.roomChildren.cube.scale, {
                    x: 10,
                    y: 10,
                    z: 10,
                }, "same")
                .to(this.camera.orthographicCamera.position, {
                    y: 3.75,
                }, "same")
                .to(this.roomChildren.cube.position, {
                    x: 0,
                    y: 8.3915,
                    z: 0,
                }, "same")
                .set(this.roomChildren.body.scale, {
                    x: 1,  
                    y: 1,
                    z: 1,
                })
                .to(this.roomChildren.cube.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1,
                })
                .to(".hero-main-title .animatedis", {
                    yPercent: -100,
                    stagger: 0.07,
                    ease: "back.out(1.2)",
                }, "intro-1")
                .to(".hero-main-description-1 .animatedis", {
                    yPercent: -100,
                    stagger: 0.07,
                    ease: "back.out(1.2)",
                }, "intro-2")
                .to(".hero-main-description-2 .animatedis", {
                    yPercent: -100,
                    stagger: 0.07,
                    ease: "back.out(1.2)",
                }, "intro-2")
                .to(".hero-second-subheading .animatedis", {
                    yPercent: -100,
                    stagger: 0.07,
                    ease: "back.out(1.2)",
                }, "intro-1")
                .to(".second-sub .animatedis", {
                    yPercent: -100,
                    stagger: 0.07,
                    ease: "back.out(1.2)",
                }, "intro-2")
                .to(this.roomChildren.beanbags.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, ">-0.7")
                .to(this.roomChildren.desk.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, ">-0.7")
                .to(this.roomChildren.deskitems.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, ">-0.6")
                .to(this.roomChildren.shelf.scale, {
                    x: 5.546,
                    y: 5.546,
                    z: 5.546,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, ">-0.6")
                .to(this.roomChildren.plants.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, ">-0.5")
                .to(this.roomChildren.pc.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, ">-0.5")
                .to(this.roomChildren.floor.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, ">-0.4")
                .to(this.roomChildren.chair.scale, {
                    x: 0.05,
                    y: 0.05,
                    z: 0.05,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, ">-0.3")
                .to(this.roomChildren.chair.rotation, {
                    y: 4 * Math.PI,
                    ease: "power2.out",
                    duration: 2,
                }, ">-0.4")
                .to(this.roomChildren.ac.scale, {
                    x: 2.25,
                    y: 2.25,
                    z: 2.25,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, ">-0.2")
                .to(this.roomChildren.tv.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, ">-0.1")
                .to(".arrow-svg-wrapper", {
                    opacity: 1,
                    onComplete: resolve,
                })
            //}
            /* else
            {
                this.secondTimeline
                .to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power1.out",
                    duration: 0.7,
                });
            } */
        });
    }

    onScroll(e)
    {
        if (this.preventScroll) {
            e.preventDefault();
        }
        if(e.deltaY > 0)
        {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e)
    {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e)
    {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if(difference > 0)
        {
            this.removeEventListeners();
            this.playSecondIntro();
        }

        this.initialY = null;
    }

    removeEventListeners()
    {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.scrollOnceEvent);
        window.removeEventListener("touchmove", this.scrollOnceEvent);
    }

    async playIntro()
    {
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.scrollOnceEvent);
        window.addEventListener("touchmove", this.scrollOnceEvent);
    }

    async playSecondIntro()
    {
        this.moveFlag = false;
        await this.secondIntro();
        this.preventScroll = false;
        this.scaleFlag = false;
        //this.emit("enablecontrols");
    }

    move()
    {
        if(this.device === "desktop")
        {
            this.room.position.set(-1, 0, 0);
        }
        else
        {
            this.room.position.set(-1, 0, -1);
        }
    }

    scale()
    {
        if(this.device === "desktop")
        {
            this.room.position.set(0.12, 0.12, 0.12);
        }
        else
        {
            this.room.position.set(0.07, 0.07, 0.07);
        }
    }

    update()
    {
        if(this.moveFlag)
           this.move();

        //if(this.scaleFlag)
        //    this.scale();
    }
}