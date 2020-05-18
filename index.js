const noise = new perlinNoise3d()

// Extra Parameters
let amplitude = 0.5
let speed = 1

// Cubes
let spacing = 0.25;
const startPos = new THREE.Vector3(0, 0, -5)
const cubeSize = new THREE.Vector3(0.25, 0.25, 0.25)
let width = 20
let height = 20
// ----

const arr = []
let idx = 0

document.querySelector('a-scene').addEventListener('loaded', () => {
    let grid = document.createElement("a-entity")
    for (let ix = 0; ix < width; ix++) {
        for (let iz = 0; iz < height; iz++) {
            let elem = document.createElement("a-box")
            elem.setAttribute("position", `${(ix - width / 2) * spacing}, 0, ${(iz - height / 2) * spacing}`)
            elem.setAttribute("width", cubeSize.x);
            elem.setAttribute("height", cubeSize.y);
            elem.setAttribute("depth", cubeSize.z);
            elem.setAttribute("color", "#0cf");
            arr[idx] = elem
            grid.appendChild(arr[idx])
            idx++
        }
    }

    grid.setAttribute("position", `${startPos.x} ${startPos.y} ${startPos.z}`)
    document.querySelector("a-scene").appendChild(grid)
        //  <a-box class="box" material="color: red" position="-2 2 -4.5" scale="0.5 0.5 0.5" noise-position></a-box>

    setInterval(() => {
        let time = Date.now() * 0.00005
            // let h = ((360 * (1.0 + time)) % 360) / 360
        let index = 0
        for (let ix = 0; ix < width; ix++) {
            for (let iz = 0; iz < height; iz++) {
                let c = arr[index].object3D
                if (!c.counter) c.counter = 0
                let m = arr[index].object3DMap.mesh
                const s = Math.sin(c.counter + dist(c.position.x, c.position.z, width / 2, height / 2))
                m.material.color.setHSL(s * 0.2, 0.5, 0.5)
                c.position.y = s * amplitude
                c.counter += 0.01 * speed
                index++
            }
        }
        // console.log(currentPosition.y)
    }, 1)
})

const dist = (x1, y1, x2, y2) => x1 - x2 + (y1 - y2)