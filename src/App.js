import './App.css';
import { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';


class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      subject:{title:'WEB', sub:'world wide web!!!'},
      welcome:{title:'welcome', desc:'Hello, React'},
      selected_content_id:2,
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information.'},
        {id:2, title:'CSS', desc:'CSS is for design.'},
        {id:3, title:'Javascript', desc:'Javascript is for interactive.'}
      ]
    }
  }
  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data;
        }
        i += 1;
      }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id += 1;
        var _content = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        )
        this.setState({
          contents:_content,
          mode:'read',
          selected_content_id:this.max_content_id
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    }
    else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
        var _content = Array.from(this.state.contents);
        var i = 0;
        while(i < _content.length){
          if(_content[i].id === _id){
            _content[i]= {id:_id, title:_title, desc:_desc};
            break;
          }
          i += 1;
        }
        this.setState({
          contents:_content,
          mode:'read'
        });
        console.log(_title, _desc);
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render() {

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function(){ // event
            this.setState({mode:'welcome'});
          }.bind(this)}>
        </Subject>
        <TOC
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
          });
          }.bind(this)}
          data={this.state.contents}></TOC>

        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('really delete?')){
              var _content = Array.from(this.state.contents);
              var i = 0;
              while(i < _content.length){
                if(_content[i].id === this.state.selected_content_id){
                  _content.splice(i, 1);
                  break;
                }
                i += 1;
              }
              this.setState({
                contents:_content,
                mode:'welcome'
              })
              alert('deleted success!')
            }

          } else {
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}
          ></Control>
        {this.getContent()}
      </div>
    );
  }
}


export default App;
