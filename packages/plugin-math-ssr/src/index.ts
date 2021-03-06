import type { BytemdPlugin } from 'bytemd';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { icons } from './icons';

export interface MathOptions {
  katexOptions?: Omit<katex.KatexOptions, 'displayMode'>;
}

export default function math({ katexOptions }: MathOptions = {}): BytemdPlugin {
  return {
    remark: (u) => u.use(remarkMath),
    rehype: (u) => u.use(rehypeKatex, katexOptions),
    toolbar: {
      mathInline: {
        tooltip: 'Math formula',
        icon: icons.math,
        onClick({ utils }) {
          utils.wrapText('$');
        },
      },
      math: {
        tooltip: 'Math formula block',
        icon: icons.mathBlock,
        onClick({ editor, utils }) {
          const { startLine } = utils.appendBlock('$$\n\\TeX\n$$');
          editor.setSelection(
            { line: startLine + 1, ch: 0 },
            { line: startLine + 1, ch: 4 }
          );
        },
      },
    },
  };
}
