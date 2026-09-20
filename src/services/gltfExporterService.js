// HeritageQuest WebXR GLTF/GLB Exporter Service
// Dynamically converts procedural Three.js 3D monument models into binary .glb Blob URLs
// Enables native AR (WebXR / Google Scene Viewer / Apple AR Quick Look) via <model-viewer>

import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const glbCache = new Map();

/**
 * Convert a Three.js 3D monument group/scene into a binary .glb Blob URL
 * @param {string} monumentId - Unique monument identifier (e.g. 'taj-mahal', 'mysore-palace')
 * @param {THREE.Object3D} object3D - Three.js object group containing monument meshes & materials
 * @returns {Promise<string>} - Resolves to Blob URL (e.g. blob:http://localhost/...)
 */
export function exportMonumentToGLB(monumentId, object3D) {
  return new Promise((resolve, reject) => {
    if (!object3D) {
      return reject(new Error('No 3D object provided for AR export'));
    }

    // Return cached GLB blob URL if available
    if (glbCache.has(monumentId)) {
      return resolve(glbCache.get(monumentId));
    }

    const exporter = new GLTFExporter();
    const options = {
      binary: true,
      embedImages: true,
      maxTextureSize: 1024
    };

    exporter.parse(
      object3D,
      (gltfBuffer) => {
        try {
          const blob = new Blob([gltfBuffer], { type: 'model/gltf-binary' });
          const blobUrl = URL.createObjectURL(blob);
          glbCache.set(monumentId, blobUrl);
          resolve(blobUrl);
        } catch (err) {
          reject(err);
        }
      },
      (error) => {
        console.error('Error exporting 3D monument to GLB:', error);
        reject(error);
      },
      options
    );
  });
}

/**
 * Retrieve cached GLB Blob URL if available
 * @param {string} monumentId
 * @returns {string|null}
 */
export function getCachedGLB(monumentId) {
  return glbCache.get(monumentId) || null;
}
