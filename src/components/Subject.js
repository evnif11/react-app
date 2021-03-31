import { Component } from 'react';

class Subject extends Component {
  render() {
    // props + state
    // (props + state) 같다 -> 같은 그림이 나온다
    // props = {title: "ABC"} state = null

    // props: 내가 건들 수 없는 값 (주어진 값)
    // state: 내가 바꿀 수 있는 값

    // <Card content={content} />
    // jQuery content -> $(".profile").set("asdasdas")

    // jQuery DOM <-> Data
    // React Data -> DOM
    return(
      <header>
        <h1><a href='/' onClick={function(e) {
          e.preventDefault();
          this.props.onChangePage();
        }.bind(this)}>{this.props.title}</a></h1>
        {this.props.sub}
      </header>
    );
  }
}

export default Subject;
