import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";

export const RichTextEditor = ({
  value = "",
  onChange,
  placeholder = "Write here...",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder,
      }),
    ],

    content: value,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden">

      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b p-2 bg-gray-50">

        {/* Bold */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("bold")
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          <b>B</b>
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("italic")
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          <i>I</i>
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("underline")
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          <u>U</u>
        </button>

        {/* Bullet List */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("bulletList")
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          • List
        </button>

        {/* Ordered List */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("orderedList")
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          1. List
        </button>

      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="min-h-45 p-4"
      />

    </div>
  );
};