// @ts-nocheck

// https://github.com/wooorm/xdm#syntax-highlighting-with-the-meta-field

import { visit } from 'unist-util-visit';

let regex = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;

export const rehypeMetaAttribute = (options = {}) => {
  return (tree) => {
    visit(tree, 'element', visitor);
  };

  function visitor(node, index, parentNode) {
    let match;

    if (node.tagName === 'code' && node.data && node.data.meta) {
      regex.lastIndex = 0; // Reset regex.

      while ((match = regex.exec(node.data.meta))) {
        node.properties[match[1]] = match[2] || match[3] || match[4] || '';
        parentNode.properties[match[1]] = match[2] || match[3] || match[4] || '';
      }
    }
  }
};
