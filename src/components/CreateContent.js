import { Component } from 'react';

class CreateContent extends Component {
    render() {
      return(
        <article>
          <h2>Create</h2>
          <form action='/create_process' method='post'
            onSubmit={function(e){
            e.preventDefault(); // 기본 submit은 action url로 넘어감.
            this.props.onSubmit(
              e.target.title.value,
              e.target.desc.value
            );
            alert('submit complete');
            }.bind(this)} >
            <p><input type='text' name='title' placeholder='title'></input></p>
            <p><textarea name='desc' placeholder='description'></textarea></p>
            <p><input type='submit'></input></p>
          </form>
        </article>
      );
    }
  }

export default CreateContent;
