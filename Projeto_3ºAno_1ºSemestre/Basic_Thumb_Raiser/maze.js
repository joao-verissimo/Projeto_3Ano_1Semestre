import * as THREE from "three";
import * as TWEEN from "three/addons/libs/tween.module.js";
import Ground from "./ground.js";
import Wall from "./wall.js";
import Door from "./door.js";

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

export default class Maze {
    constructor(parameters) {
        this.onLoad = function (description) {
            // Store the maze's map and size
            this.map = description.map;
            this.size = description.size;

            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.initialPosition);
            this.initialDirection = description.initialDirection;

            // Store the maze's exit location
            this.exitLocation = this.cellToCartesian(description.exitLocation);

            // Create a group of objects
            this.object = new THREE.Group();

            // Create the ground
            this.ground = new Ground({ textureUrl: './textures/ground.jpg', size: description.size });
            this.object.add(this.ground.object);

            // Create a wall
            this.wall = new Wall({ textureUrl: './textures/wall.jpg' });
            const doors = [];
            this.door = new Door();
            this.elevator = new Wall({ textureUrl: './textures/elevator.jpg' });
            this.passage = new Wall({ textureUrl: './textures/passage.jpg' });

            // Build the maze
            let wallObject;
            for (let i = 0; i <= description.size.width; i++) { // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                for (let j = 0; j <= description.size.height; j++) { // In order to represent the southmost walls, the map height is one row greater than the actual maze height
                    /*
                     * description.map[][] | North wall | West wall
                     * --------------------+------------+-----------
                     *          0          |     No     |     No
                     *          1          |     No     |    Yes
                     *          2          |    Yes     |     No
                     *          3          |    Yes     |    Yes
                     * 
                     * description.map[][] | North door | West door
                     * --------------------+------------+-----------
                     *          4          |     No     |    Yes
                     *          5          |    Yes     |     No
                     *
                     * description.map[][] | North elevator | West elevator
                     * --------------------+----------------+--------------
                     *          6          |     No         |    Yes
                     *          7          |    Yes         |     No
                     * 
                     * description.map[][] | North passage | West passage
                     * --------------------+---------------+-------------
                     *          8          |     No        |    Yes
                     *          9          |    Yes        |     No
                     */
                    //wall
                    if (description.map[j][i] == 2 || description.map[j][i] == 3) {
                        wallObject = this.wall.object.clone();
                        wallObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(wallObject);
                    }
                    if (description.map[j][i] == 1 || description.map[j][i] == 3) {
                        wallObject = this.wall.object.clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                    }

                    //door
                    if (description.map[j][i] == 5) {
                        wallObject = this.door.getObject().clone();
                        wallObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(wallObject);
                        doors.push(wallObject);
                    }
                    if (description.map[j][i] == 4) {
                        wallObject = this.door.getObject().clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                        doors.push(wallObject);
                    }

                    //elevator
                    if (description.map[j][i] == 7) {
                        wallObject = this.elevator.object.clone();
                        wallObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(wallObject);
                    }
                    if (description.map[j][i] == 6) {
                        wallObject = this.elevator.object.clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                    }

                    //passage
                    if (description.map[j][i] == 9) {
                        wallObject = this.passage.object.clone();
                        wallObject.position.set(i - description.size.width / 2.0 + 0.5, 0.5, j - description.size.height / 2.0);
                        this.object.add(wallObject);
                    }
                    if (description.map[j][i] == 8) {
                        wallObject = this.passage.object.clone();
                        wallObject.rotateY(Math.PI / 2.0);
                        wallObject.position.set(i - description.size.width / 2.0, 0.5, j - description.size.height / 2.0 + 0.5);
                        this.object.add(wallObject);
                    }
                }
            }

            this.doors = doors;
            this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.loaded = true;
        }

        this.onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        this.onError = function (url, error) {
            console.error("Error loading resource " + url + " (" + error + ").");
        }

        for (const [key, value] of Object.entries(parameters)) {
            this[key] = value;
        }
        this.loaded = false;

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => this.onLoad(description),

            // onProgress callback
            xhr => this.onProgress(this.url, xhr),

            // onError callback
            error => this.onError(this.url, error)
        );
    }

    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3((position[1] - this.size.width / 2.0 + 0.5) * this.scale.x, 0.0, (position[0] - this.size.height / 2.0 + 0.5) * this.scale.z)
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [Math.floor(position.z / this.scale.z + this.size.height / 2.0), Math.floor(position.x / this.scale.x + this.size.width / 2.0)];
    }

    distanceToWestWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3 || this.map[indices[0]][indices[1]] == 4 || this.map[indices[0]][indices[1]] == 6 || this.map[indices[0]][indices[1]] == 8) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastWall(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == 1 || this.map[indices[0]][indices[1]] == 3 || this.map[indices[0]][indices[1]] == 4 || this.map[indices[0]][indices[1]] == 6 || this.map[indices[0]][indices[1]] == 8) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }

    distanceToNorthWall(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3 || this.map[indices[0]][indices[1]] == 5 || this.map[indices[0]][indices[1]] == 7 || this.map[indices[0]][indices[1]] == 9) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthWall(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == 2 || this.map[indices[0]][indices[1]] == 3 || this.map[indices[0]][indices[1]] == 5 || this.map[indices[0]][indices[1]] == 7 || this.map[indices[0]][indices[1]] == 9) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    }

    distanceToWestDoor(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 4) {
            return position.x - this.cellToCartesian(indices).x + this.scale.x / 2.0;
        }
        return Infinity;
    }

    distanceToEastDoor(position) {
        const indices = this.cartesianToCell(position);
        indices[1]++;
        if (this.map[indices[0]][indices[1]] == 4) {
            return this.cellToCartesian(indices).x - this.scale.x / 2.0 - position.x;
        }
        return Infinity;
    }

    distanceToNorthDoor(position) {
        const indices = this.cartesianToCell(position);
        if (this.map[indices[0]][indices[1]] == 5) {
            return position.z - this.cellToCartesian(indices).z + this.scale.z / 2.0;
        }
        return Infinity;
    }

    distanceToSouthDoor(position) {
        const indices = this.cartesianToCell(position);
        indices[0]++;
        if (this.map[indices[0]][indices[1]] == 5) {
            return this.cellToCartesian(indices).z - this.scale.z / 2.0 - position.z;
        }
        return Infinity;
    }

    checkDoorCollisions(playerPosition, playerRadius) {
        this.doors.forEach(child => {
            if (this.collision(playerPosition, playerRadius)) {
                this.openDoor(child);
            }
        });
    }

    openDoor(child) {
        console.log(child);
        let tween = new TWEEN.Tween(child.rotation)
        tween.to({ y: Math.PI / 2.0 }, 2000 * (1.0 - child.rotation.y / (Math.PI / 2.0)));
        tween.startFromCurrentValues();
    }

    collision(position, playerRadius) {
        return this.distanceToEastDoor(position) < playerRadius || this.distanceToWestDoor(position) < playerRadius || this.distanceToNorthDoor(position) < playerRadius || this.distanceToSouthDoor(position) < playerRadius;
    }

    foundExit(position) {
        return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
    };
}