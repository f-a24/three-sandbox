# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 8 章　高度なメッシュとジオメトリ

### ハマったところ

- r99 で THREE.JSONLoader が削除されている
  - examples/js/loaders/deprecated/LegacyJSONLoader.js で対応
    - r111でLegacyJSONLoaderも削除
      - THREE.ObjectLoader使うみたい？ 
- 11. PDBLoader の onload コールバック関数の引数が違う
  - ×(geometry, geometryBonds)
  - ○(pdb: { geometryAtoms: THREE.BufferGeometry,
    geometryBonds: THREE.BufferGeometry,
    json: {
    atoms: any[],
    bonds: any[]
    }})
- r109でBabylonLoaderが削除
  - glTF使ってとのこと