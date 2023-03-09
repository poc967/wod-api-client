import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './styles.css';
import { Button } from '@blueprintjs/core';

class RichEditor extends React.Component {
  render() {
    return (
      <div className="RichEditor">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderBottom: 'solid lightgrey 1px',
          }}
        >
          <BlockControls
            toggle={this.props.toggleBlockStyle}
            editorState={this.props.editorState}
          />
          <InlineControls
            toggle={this.props.toggleInlineStyle}
            editorState={this.props.editorState}
          />
        </div>
        <div className="RichEditor-textArea" onClick={this.focus}>
          <Editor
            editorState={this.props.editorState}
            onChange={this.props.handleEditorChange}
          />
        </div>
      </div>
    );
  }
}

const BLOCK_TYPE = [
  { label: 'H1', style: 'header-one', icon: 'header-one' },
  { label: 'H2', style: 'header-two', icon: 'header-two' },
  { label: 'H3', style: 'header-three', icon: 'header-three' },
  { label: 'Blockquote', style: 'blockquote', icon: 'citation' },
  { label: 'UL', style: 'unordered-list-item', icon: 'properties' },
  { label: 'OL', style: 'ordered-list-item', icon: 'numbered-list' },
];
const INLINE_TYPES = [
  { label: 'Bold', style: 'BOLD', icon: 'bold' },
  { label: 'Italic', style: 'ITALIC', icon: 'italic' },
  { label: 'Underline', style: 'UNDERLINE', icon: 'underline' },
  { label: 'Monospace', style: 'CODE', icon: 'code' },
];

const BlockControls = (props) => {
  const selection = props.editorState.getSelection();
  const currentBlockType = props.editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-buttonGroup">
      {BLOCK_TYPE.map((blockType) => (
        <Button
          className="RichEditor-button"
          onClick={(e) => props.toggle(blockType.style)}
          icon={blockType.icon}
          minimal={true}
          intent="primary"
          active={blockType.style === currentBlockType}
        />
      ))}
    </div>
  );
};

const InlineControls = (props) => {
  let currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-buttonGroup">
      {INLINE_TYPES.map((inlineType) => (
        <Button
          onClick={(e) => props.toggle(inlineType.style)}
          icon={inlineType.icon}
          minimal={true}
          active={currentStyle.has(inlineType.style)}
          intent="primary"
        />
      ))}
    </div>
  );
};

export default RichEditor;
