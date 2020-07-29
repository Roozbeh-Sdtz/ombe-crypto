import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'

class DropZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
    }

    handleChange(files) {

        this.props.setFiles(files)
    }

    render() {
        return (
            <DropzoneArea
                onChange={this.handleChange.bind(this)}
                filesLimit={1}
                maxFileSize={100000000}
                acceptedFiles={['.zip']}
            />
        )
    }
}

export default DropZone;