import fs from "fs";

const filePath = "./uploads/Agent/soba.gltf";

const gltf = JSON.parse(fs.readFileSync(filePath, "utf-8"));

gltf.scenes[0].extras = gltf.scenes[0].extras || {};

gltf.scenes[0].extras.env = {
    "lights": [
        {"type": "spotlight", "position": [1, 1, 1], "intensity": 1.5},
        {"type": "ambient", "intensity": 1.5}
    ],
    "background":
        {
            "type": "exr",
            "file": "/img/sky.exr"
        },
    "fog":
        {
            "args": ["#000000", 1, 3]
        },
    "toneMapping":
        {
            "type": "ACESFilmicToneMapping",
            "exposure": 1.2
        },
    "shadows":
        {
            "type": "PCFSoftShadowMap"
        },
    "EffectComposer": [
        {
            "type": "DepthOfField",
            "focusDistance": 0.02,
            "focalLength": 0.02,
            "bokehScale": 1.5
        }
    ]
}
// gltf.scenes[0].extras.dan = {}
delete gltf.scenes[0].extras.dan

fs.writeFileSync(filePath, JSON.stringify(gltf, null, 2), "utf-8");