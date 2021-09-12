import React from "react";
import clas from "./ProfileInfo.module.css";

type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
};

class ProfileStatus extends React.Component<PropsType> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  handleFocus = (event: React.FocusEvent<HTMLInputElement> | any) => {
    event.target.select();
  };

  componentDidUpdate = (prevProps: PropsType) => {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  };

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode.bind(this)}>
              {this.props.status || "-----"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              autoFocus={this.handleFocus as any}
              onBlur={this.deactivateEditMode.bind(this)}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
