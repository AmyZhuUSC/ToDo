import React, {useState} from "react";

class ErrorB extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isError: false,
            errorInfo: null
        }
    }

    static getDerivedStateFromError(error) {
        this.state.isError = true;
    }

    static componentDidCatch(errorInfo) {
        this.state.errorInfo = errorInfo;
    }

    render() {
        if (this.state.isError) {
            return <div>There is an error: {this.state.errorInfo} </div>
        } else {
            return <>{this.props.children}</>
        }
    }
}

export default ErrorB;
