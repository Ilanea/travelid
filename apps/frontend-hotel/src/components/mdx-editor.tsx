import {
  BoldItalicUnderlineToggles,
  ListsToggle,
  MDXEditor,
  UndoRedo,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
import React from 'react';

const CustomMDXEditor = ({ markdown, onChange }) => {
  return (
    <MDXEditor
      markdown={markdown}
      className="border rounded-md p-4 min-h-[400px]"
      onChange={onChange}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
            </>
          ),
        }),
      ]}
    />
  );
};

export default CustomMDXEditor;
