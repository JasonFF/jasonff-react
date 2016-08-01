import React, {Component, PropTypes} from 'react';

export default class BlogForm extends Component {
  componentWillMount() {
    this.setState({
      title: '',
      content: ''
    })
  }
  componentDidMount() {
    if (!this.props.defaultValue.title) {
      const savingData = window.localStorage.saving||{};
      const {title, content} = JSON.parse(savingData);
      this.setState({
        title: title,
        content: content
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue.title) {
      let defaultValue = nextProps.defaultValue
      this.setState({
        title: defaultValue.title?defaultValue.title:'',
        content: defaultValue.content?defaultValue.content:''
      })
    }
  }
  componentDidUpdate() {
    if (this.state.startCursor) {
      const style = require('./BlogForm.scss');
      let _this = document.querySelector(`.${style.contentBox}`);
      _this.selectionStart = _this.selectionEnd = this.state.startCursor+4;
      this.setState({
        startCursor: 0
      })
    }
  }
  saveClick(e) {
    e.preventDefault()
    const formNode = e.target.parentNode.parentNode;
    const savingData = {
      title: formNode.querySelector('input').value,
      content: formNode.querySelector('textarea').value
    }
    window.localStorage.saving = JSON.stringify(savingData)
  }
  titleChange(e) {
    this.setState({
      title: e.target.value
    })
  }
  contentChange(e) {
    this.setState({
      content: e.target.value
    })
  }
  handleSubmit(e) {
    window.localStorage.saving = false;
    this.props.onSubmit(e)
  }
  handleKeyDown(e) {
    const style = require('./BlogForm.scss');
    if (e.keyCode === 9) {
      let _this = document.querySelector(`.${style.contentBox}`);
      let start = _this.selectionStart;
      let end = _this.selectionEnd;
      let value = _this.value;
      let content = value.substring(0, start) + "    " + value.substring(end);
      this.setState({
        content: content,
        startCursor: start
      })
      _this = document.querySelector(`.${style.contentBox}`);
      _this.selectionStart = _this.selectionEnd = start + 1;
      e.preventDefault()
    }
  }
  render() {
    const style = require('./BlogForm.scss');
    const {defaultValue} = this.props;
    return (
      <form className={style.form} onSubmit={(e)=>this.handleSubmit(e)}>
        <input onChange={(e)=>this.titleChange(e)} value={this.state.title} className={style.titleInput} name="title" type="text"/>
        <div className={style.toolbtns}>
          <button type='submit'>提交</button>
          <button onClick={(e)=>this.saveClick(e)}>保存</button>
        </div>
        <textarea onChange={(e)=>this.contentChange(e)} onKeyDown={(e)=>this.handleKeyDown(e)} value={this.state.content} className={style.contentBox} name="content"></textarea>
      </form>
    )
  }
}
BlogForm.defaultProps = {
  defaultValue: {
    title:'',
    content:''
  }
}
