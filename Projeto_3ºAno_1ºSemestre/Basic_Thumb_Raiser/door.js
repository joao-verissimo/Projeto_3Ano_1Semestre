import * as THREE from "three";
import * as TWEEN from "three/addons/libs/tween.module.js";

export default class Door {
    constructor() {
        const frameSize = { width: 1.2, height: 0.99, depth: 0.045 };
        const doorSize = { width: 1.1, height: 1, depth: 0.035, gap: 0.0465 };

        // Create a material
        const sideMaterial = new THREE.MeshBasicMaterial({ color: 0xc36e2d });

        // Create the frame
        let geometry = new THREE.BoxGeometry(frameSize.width, frameSize.height, frameSize.depth);

        // Create a texture
        let texture = new THREE.TextureLoader().load("./textures/door/frame_front.png");
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create a material
        let frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
        frontMaterial.transparent = true;

        // Create a texture
        texture = new THREE.TextureLoader().load("./textures/door/frame_back.png");
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create a material
        let backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
        backMaterial.transparent = true;

        // Create a mesh with the specified geometry and materials
        this.frame = new THREE.Mesh(geometry, [sideMaterial, sideMaterial, sideMaterial, sideMaterial, frontMaterial, backMaterial]);

        // Create the door
        geometry = new THREE.BoxGeometry(doorSize.width, doorSize.height, doorSize.depth);

        // Create a texture
        texture = new THREE.TextureLoader().load("./textures/door/door_front.png");
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create a material
        frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });

        // Create a texture
        texture = new THREE.TextureLoader().load("./textures/door/door_back.png");
        texture.colorSpace = THREE.SRGBColorSpace;

        // Create a material
        backMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });

        // Create a mesh with the specified geometry and materials
        this.doorMesh = new THREE.Mesh(geometry, [sideMaterial, sideMaterial, sideMaterial, sideMaterial, frontMaterial, backMaterial]);

        // Create a group
        this.doorGroup = new THREE.Group();

        // Add the frame and door mesh to the group
        this.doorGroup.add(this.frame);
        this.doorGroup.add(this.doorMesh);
        this.doorGroup.translateX(-doorSize.width / 2.0);

        // Set up the door animation
        this.doorState = "close";
        this.tween = new TWEEN.Tween(this.doorGroup.rotation);
    }

    openDoor() {
        if (this.doorState !== "open") {
            this.doorState = "open";
            this.tween.stop();
            this.tween.to({ y: Math.PI / 2.0 }, 2000 * (1.0 - this.doorGroup.rotation.y / (Math.PI / 2.0)));
            this.tween.startFromCurrentValues();
        }
    }

    stopDoor() {
        this.doorState = "stop";
        this.tween.stop();
    }

    closeDoor() {
        if (this.doorState !== "close") {
            this.doorState = "close";
            this.tween.stop();
            this.tween.to({ y: 0.0 }, 2000 * this.doorGroup.rotation.y / (Math.PI / 2.0));
            this.tween.startFromCurrentValues();
        }
    }

    getObject() {
        return this.doorGroup;
    }
}