# このプロジェクトの作業ルール

## 既存ページの保持

- ルートの `index.html` は元の自己紹介ページとして残す。スカイツリーのページで置き換えない。
- 元のページ用の `style.css` と `images/` は、スカイツリーの変更に巻き込まない。
- `index.html` とスカイツリーのページには、どちらの方向にもリンクを設けない。ホームリンクやABOUTリンクからの接続も追加しない。

## スカイツリー関連の配置

スカイツリーに関するファイルはすべて `skytree/` 内に保存する。

```text
skytree/
  skytree.html       Webページ
  skytree.css        専用スタイル
  viewer.js          3D表示の操作
  assets/
    models/         Web用3Dモデル（GLB）
    images/         Web用画像
    vendor/         ライブラリとライセンス
  outputs/          Blenderファイル、レンダリング画像、確認画像
  scripts/          書き出し・ローカル確認・検証用スクリプト
  README.md         スカイツリーの操作・開発手順
```

- ページ名は `skytree/skytree.html` とする。`skytree.index` やルートの `skytree.html` に戻さない。
- HTML、画像、モデル、スクリプト間の参照は、移動後の配置に合った相対パスを使用する。
- スカイツリーのページには「millea」の文字を入れない。表示本文に加え、ページタイトル、ヘッダー、フッター、アクセシビリティ用ラベルにも使用しない。
- Blenderで生成したモデルを使用し、360度回転・拡大縮小できる機能を維持する。

## スキルの保存先

- このプロジェクト専用のスキルは `.agents/skills/<スキル名>/SKILL.md` に保存する。
- Blenderスキルの正本は `.agents/skills/blender/SKILL.md`。Blenderの制作・改良時はこのスキルを参照する。
- スキルの作業用コピーを保存するためのルートの `outputs/` は不要。再作成しない。
- `skytree/outputs/` は制作データの保存先であり、削除済みのルートの `outputs/` とは区別する。

## 変更後の確認

- ファイルを移動したら、HTML、スクリプト、README、スキル内の関連パスを更新する。
- ページ間の相互リンクがないこと、ローカルの参照ファイルが存在することを確認する。
- リポジトリのルートで `python -m http.server 8000` を実行した場合、確認URLは `http://localhost:8000/skytree/skytree.html`。
- 3D表示や操作を変更した場合は、読み込み・回転・拡大縮小とスマートフォン向けの表示を確認する。
