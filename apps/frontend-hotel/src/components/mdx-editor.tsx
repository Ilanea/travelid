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

type CustomMDXEditorProps = {
  markdown: string;
  onChange: (markdown: string) => void;
};

const CustomMDXEditor = ({ markdown, onChange }: CustomMDXEditorProps) => {
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
