import React from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './styles.css';

class DisplayEditor extends React.Component {
  state = {
    editorState: EditorState.createWithContent(
      convertFromRaw(this.props.rawContent)
    ),
  };
  render() {
    return (
      <div className="RichEditor-readonly">
        <div className="RichEditor-readonly-textArea" onClick={this.focus}>
          <Editor editorState={this.state.editorState} readOnly={true} />
        </div>
      </div>
    );
  }
}

export default DisplayEditor;
