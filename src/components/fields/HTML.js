import React, {Component,PropTypes} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import './styles.css';
import Config from   '../../config/app';


import {
  convertToRaw,
  convertFromHTML,
  ContentState,
  EditorState,
} from 'draft-js';


class HTML extends Component {

  constructor(props) {
    super(props);
    
    var contentBlocks=null;
    if(convertFromHTML(props.value).contentBlocks!=null){
       contentBlocks = convertFromHTML(props.value);
    }else{
       contentBlocks = convertFromHTML("Start typing your html");
    }
    const contentState = ContentState.createFromBlockArray(contentBlocks);


    this.state = {
      value:props.value,
      editorContents: [EditorState.createWithContent(contentState)],
    };
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    //console.log(event.target.value);
    this.props.updateAction(this.props.theKey,event.target.value);
  }

 
 onEditorStateChange(index, editorContent){
    let editorContents = this.state.editorContents;
    editorContents[index] = editorContent;
    editorContents = [...editorContents];
    
    var html=draftToHtml(convertToRaw(editorContents[0].getCurrentContent()))
    this.handleChange({target:{value:html}})
    this.setState({
      editorContents,
    });
  };


  render() {
    const { editorContents } = this.state;
    return (
            <div className={Config.designSettings.editElementDivClass}>
                <label className="control-label"></label>
                <Editor
                   hashtag={{}}
                  editorState={editorContents[0]}
                  onEditorStateChange={this.onEditorStateChange.bind(this, 0)}
                  toolbarClassName="toolbarClassName"
                 wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"

  
/>

              </div>
    )
  }
}
export default HTML;

HTML.propTypes = {
    updateAction:PropTypes.func.isRequired,
    theKey: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    class: PropTypes.string
};
