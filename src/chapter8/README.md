# 初めての Three.js【メモ】

TypeScript x Webpack での挑戦

## 8 章　高度なメッシュとジオメトリ

ジオメトリのグループ化とマージ

- グループ化
  - THREE.Group
  - 大量のメッシュをグループ化するとパフォーマンス上の問題が発生するかも
    - 内部的には個別のオブジェクトをそれぞれ個別に操作しているから
- マージ
  - THREE.Geometry.merge()
    - 大量のメッシュを扱う場合はマージして一つのジオメトリにする

外部リソースからのジオメトリ読込

- この辺はThree.jsのバージョンによってサポートしているファイルフォーマット（loader）が変わってくるので省略
- 詳しくは公式ドキュメントを参照
- glTFを推奨していく流れのように感じる

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
