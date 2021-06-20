const child_process = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const visit = require("unist-util-visit");

module.exports = ({ markdownAST }, { lilypondPath = 'lilypond' }) => {
  visit(markdownAST, 'code', node => {
    const { lang, value: source } = node;

    // コードブロックの言語判定
    if (lang !== 'lilypond:embed') return;

    // LilyPond コードのハッシュから、一時生成ファイルのパスを決定
    const hash = crypto.createHash('sha256').update(source).digest('hex');
    const filename = `/tmp/lilypond-generated-${hash}`;
    const filenameWithExt = `${filename}.svg`;

    // LilyPond を実行し、 SVG ファイルを生成 (標準出力への出力は未サポート?)
    child_process.execFileSync(lilypondPath, [
      '-d', 'no-point-and-click',
      '-f', 'svg',
      '-o', filename,
      '-'
    ], { input: source });

    // 生成した SVG ファイルを読み取り、 SVG ファイルを削除
    const svg = fs.readFileSync(filenameWithExt, 'utf-8');
    fs.unlinkSync(filenameWithExt);

    // コードブロックノードを HTML ノードで上書き
    node.type = 'html';
    node.children = void 0;
    node.value = `<div class="lilypond-generated">${svg}</div>`;
  });
  return markdownAST;
};
