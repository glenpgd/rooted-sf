import React from 'react';

class ErrorBoundary extends React.Component{
    constructor(){
        super();

        this.state = {
            hasErrored: false
        }
    }
    static getDerivedStateFromError(error){
        
        return{ }
    }
}

e