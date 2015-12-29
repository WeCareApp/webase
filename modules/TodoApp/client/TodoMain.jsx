import { Component } from 'react';
import ReactMixin from 'react-mixin';

import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';

import Tasks from 'TodoApp/collections/Tasks';
import style from './css/TodoApp.import.css';

@ReactMixin.decorate(TrackerReact)
export default class TodoMain extends Component {

  static defaultProps = {
    subscription: Meteor.isClient ? Meteor.subscribe('tasks') : {ready() {return true} }
  }

  constructor(props, context) {
    super(props);
    this.state = {
      hideCompleted: false
    }
  }

  componentWillUnmount() {
    this.props.subscription.stop();
  }

  user() {
    return Meteor.user();
  }

  tasks() {
    let taskFilter = {};

    console.dir(Tasks.find({}).fetch());

    if (this.state.hideCompleted) {
      taskFilter.checked = {$ne: true};
    }

    return Tasks.find(taskFilter, {sort: {createdAt: -1}}).fetch();
  }

  incompleteCount() {
    let count = Tasks.find({checked: {$ne: true}}).count();

    return count;
  }

  handleToggleHideCompleted = (e) => {
    this.setState({ hideCompleted: e.target.checked });
  }

  render() {

    let content = null;
    if (Meteor.isClient && !this.props.subscription.ready()) {
      // loading
      content = (
        <span style={{width:"42px", height:"42px"}} className="preloader" />
      );
    } else {
      content = (
        <TodoList tasks={this.tasks()} />
      )
    }

    return (
        <div className="page-content">
          <TodoHeader
              incompleteCount={this.incompleteCount()}
              hideCompleted={this.state.hideCompleted}
              toggleHideCompleted={this.handleToggleHideCompleted}
              user={this.user()}
          />
          <div className="content-block-title">Todo List <span className="badge bg-blue">{this.incompleteCount()}</span></div>
          {content}
          <div className="content-block-title">What about simple navigation?</div>
          <div className="list-block">
            <ul>
              <li><a href="#about" className="item-link">
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">About</div>
                  </div>
                </div></a></li>
              <li><a href="#services" className="item-link">
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">Services</div>
                  </div>
                </div></a></li>
              <li><a href="#form" className="item-link">
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title">Form</div>
                  </div>
                </div></a></li>
            </ul>
          </div>
        </div>
    );
  }
};
