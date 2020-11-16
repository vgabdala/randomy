import React, { Component } from "react";

class DynamicList extends Component {
  render() {
    return (
      <div>
        <h3 className="Section-title">{this.props.name}</h3>
        <div>{this.props.listItems}</div>
        <form onSubmit={this.props.onSubmit}>
          <input
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </form>
      </div>
    );
  }
}

export default DynamicList;
