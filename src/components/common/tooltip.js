import React from "react";

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayTooltip: false
    };
    this.hideTooltip = this.hideTooltip.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
  }

  hideTooltip() {
    this.setState({ displayTooltip: false });
  }
  showTooltip() {
    this.setState({ displayTooltip: true });
  }

  render() {
    let message = this.props.message;
    let position = this.props.position;
    return (
      <span className="ab-tooltip" onMouseLeave={this.hideTooltip}>
        {this.state.displayTooltip && (
          <div className={`ab-tooltip-bubble tooltip-${position}`}>
            <div className="ab-tooltip-message">{message}</div>
          </div>
        )}
        <span className="ab-tooltip-trigger" onMouseOver={this.showTooltip}>
          {this.props.children}
        </span>
      </span>
    );
  }
}

export default Tooltip;
