import React from 'react';

class ErrorBoundary extends React.Component{
    constructor(){
        super();

        this.state = {
            hasErrored: false
        }
    }
    static getDerivedStateFromError(error){
        // process the error
        return{ hasErrored: true}
    }


    componentDidCatch(error, info){
        console.log(error);
    }

    render(){
        if(this.state.hasErrored){
            return <div>Something wne wrong</div>
        }

        return this.props.children
    }
}

export default ErrorBoundary;