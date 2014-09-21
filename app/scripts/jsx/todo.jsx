/** @jsx React.DOM */
      'use strict';

      var tasks = [];

      tasks.push({
          title: 'Task 1', completed: true
      });

      tasks.push({
          title: 'Task 2', completed: true
      });

      tasks.push({
          title: 'Task 3', completed: false
      });

      var SummaryView = React.createClass({
          render: function(){
              var completedCount = this.props.tasks.filter(function(t){
                  return t.completed;
              }).length;

              var total=this.props.tasks.length;

              return <div>
                      <p className="alert alert-info" role="alert">
                          Completed - {completedCount}
                     </p>
                     <p className="alert alert-info" role="alert">
                          Total - {total}
                     </p>
                     </div>;
          }
      });

      var TaskView = React.createClass({
          getInitialState: function(){
              return {task: this.props.task}
          },
          handleDoubleClick: function(e){
              console.log(e);
              var task = this.state.task;
              task.completed=!!!task.completed;
              console.log(task);
              this.setState({task: task});
          },
          render: function(){
            var status = this.state.task.completed ?
                  <span className="glyphicon glyphicon-ok pull-right"></span>:"";
              return <li className="list-group-item" onDoubleClick={this.handleDoubleClick}>
                      
                      {this.state.task.title}
                      {status}
                    </li>;
          }
      });

      var NewTaskView = React.createClass({
          propTypes: {
            onNewTask: React.PropTypes.func.isRequired
          },
          getInitialState: function(){
            return {output: ''};
          },
          handleChange: function(e){
              console.log(e);
              if(e.keyCode !== 13) return;
              //this.setState({output: e.target.value});
              this.props.onNewTask({
                title: this.refs.newTaskInput.getDOMNode().value
              });

              this.refs.newTaskInput.getDOMNode().value = '';
          },
          render: function(){
              return <div className="block">
                        <input type="text" ref="newTaskInput" onKeyUp={this.handleChange} className="form-control" placeholder="Tasks"/>
                        <span className="text-primary">{this.state.output}</span>

                     </div>;
          }
      });

      var TaskListView = React.createClass({
            getInitialState : function(){
                return {tasks: tasks};
            },
            handleNewTask: function(task){
                this.state.tasks.unshift(task);
                this.setState({tasks: this.state.tasks});
                //this.setState(this.state.tasks);
            },
            render: function(){
                console.log(this.state);
                var taskViews = this.state.tasks.map(
                    function(t, i){
                        return <TaskView task={t} key={i}/>;
                    });
                    //console.log(taskViews);

                    return <div>
                              <div>
                              <SummaryView tasks={this.state.tasks}/>
                             </div>
                             <div className="well"> 
                              <NewTaskView onNewTask={this.handleNewTask}/>
                              <div>
                                <ul className="list-group">{taskViews}</ul>
                              </div>
                             </div>
                           </div>
                
            }
            
      });

      

      React.renderComponent(
        <TaskListView/>,
        document.getElementById('app')
      );