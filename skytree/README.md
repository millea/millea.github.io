# SKYTREE 360

Blenderで制作したスカイツリーモデルを360度回転・拡大できる静的サイトです。

## ローカルで確認

リポジトリのルートで `python -m http.server 8000` を実行し、`http://localhost:8000/skytree/skytree.html` を開きます。3Dデータの読み込みにはHTTPサーバーが必要です。

## 操作

- ドラッグまたは矢印キー：回転。ホイール／ピンチ：拡大縮小。
- 視点ボタン：全景、天望デッキ、天望回廊、足元。
- 自動回転、拡大・縮小、全景リセット、明暗背景の切り替え。
- スマートフォンでは横方向からドラッグを始めると回転、縦方向はページスクロール。

## 構成

- `skytree.html` / `skytree.css` / `viewer.js`：展示ページ。
- `assets/models/skytree.glb`：`outputs/tokyo_skytree_360.blend` の123個の形状をメッシュ化して書き出したモデル。Web上では元の寸法の0.01倍（高さ6.34単位）。元のBlenderモデルは変更していません。
- `assets/vendor/model-viewer.min.js`：model-viewer 4.1.0。同梱ライセンス参照。外部CDNに依存せず表示します。
- `assets/images/`：Blenderの確認画像から生成したWebP。
- `outputs/`：Blenderファイルと確認画像。
- `scripts/`：ローカルサーバーとブラウザ検証スクリプト。

ルートの `index.html` は従来の自己紹介ページです。両ページ間のリンクは設置していません。

ビルド不要でGitHub Pagesへ配信できます。コミット／push後に公開先へ反映されます。
実物の寸法情報の参考：[東京スカイツリー公式](https://www.tokyo-skytree.jp/about/outline/)。モデルは外観の近似表現です。
ビューアーのAPI：[model-viewer公式ドキュメント](https://modelviewer.dev/examples/stagingandcameras/)。
