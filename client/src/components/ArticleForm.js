import React from "react";

class ArticleForm extends React.Component {
  state = {
    title: "",
    content: "",
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleContentChange = (e) => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({ ...this.state });
  };

  componentDidMount() {
    this.setState({ title: this.props.title, content: this.props.content });
  }

  render() {
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input
                type='text'
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </div>
            <div className='field'>
              <label>Content</label>
              <textarea
                type='text'
                value={this.state.content}
                onChange={this.handleContentChange}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button
                className='ui basic blue button'
                onClick={this.handleSubmit}
              >
                Submit
              </button>
              <button
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleForm;
