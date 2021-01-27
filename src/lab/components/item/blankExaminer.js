import React from 'react'

class BlankExaminer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="block-number-text">Lab Area {this.props.dropInt - 1}</p>

                <div className="ttiphover" style={{ cursor: 'pointer', position: 'absolute', width: '100%', top: 0}}>
                    <h1 style={{margin: 0, right: 0, top: 0, position: 'absolute', padding: '3%', borderRadius: '100%'}}>?</h1>
                    <p className="ttip" style={{ width: '100%', bottom: '-9vh' }}>Drag items here to use them and see their information.</p>
                </div>

            </div>
            <div className="dropzoneempty" style={{ width: '100%', height: '10vh' }}></div>
        </div>
    }
}

export default BlankExaminer