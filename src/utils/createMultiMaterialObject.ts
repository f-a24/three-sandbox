/* THREE.SceneUtils.createMultiMaterialObjectがexamplesに移動してたのでimportが面倒なので */
import * as THREE from 'three';

export default (
  geometry: THREE.Geometry | THREE.BufferGeometry,
  materials: THREE.Material[]
) => {
  const group = new THREE.Group();
  materials.forEach(material => {
    group.add(new THREE.Mesh(geometry, material));
  });
  return group;
};
