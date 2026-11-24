import { visit } from 'unist-util-visit';

// ":::note" コンテナディレクティブを note-box の div に変換する。
// ":::note{.info}" / ":::note{.warn}" / ":::note{.alert}" で種類を切り替え、
// ":::note[見出し]" で見出しを自由に指定できる（省略時は種類ごとのデフォルト見出し）。
const TYPES = ['info', 'warn', 'alert'];
const DEFAULT_TITLES = {
  default: '補足',
  info: '情報',
  warn: '注意',
  alert: '警告',
};

export default function remarkNote() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective' || node.name !== 'note') return;

      const classes = (node.attributes?.class ?? '').split(' ').filter(Boolean);
      const type = classes.find((c) => TYPES.includes(c));

      const data = node.data || (node.data = {});
      data.hName = 'div';
      data.hProperties = {
        className: ['note-box', type ? `note-box-${type}` : null].filter(Boolean),
      };

      const hasLabel = node.children[0]?.data?.directiveLabel;
      const titleNode = hasLabel
        ? node.children[0]
        : { type: 'paragraph', children: [{ type: 'text', value: DEFAULT_TITLES[type ?? 'default'] }] };
      const rest = hasLabel ? node.children.slice(1) : node.children;

      titleNode.data = { ...(titleNode.data ?? {}), hName: 'p', hProperties: { className: ['note-box-title'] } };

      node.children = [titleNode, ...rest];
    });
  };
}
