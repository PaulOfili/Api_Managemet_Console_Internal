import React from 'react';
import { Link } from "react-router-dom";

class Dropdown extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {

        this.setState({
            visible: !this.state.visible,
        });
    }
    render(){
        const { visible } = this.state;
        const { resource } = this.props;
        return (
            <span className="table__action__dropdown" style={{"textAlign": "center", "borderRadius": "5px"}} onClick={() => this.toggle()}>
                <section className="action-dropdown">
                    <section className="dropdown-holder">
                        <span>
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 284.929 284.929" style={{"enableBackground" : "new 0 0 284.929 284.929"}} xmlSpace="preserve"><g><path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441 L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082 c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647 c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                        </span>
                    </section>
                    <section className={ visible ? 'action-options' : 'action-options d-none'}>
                        <section className="action-option">
                            <span className="option-row">
                                <span className="option-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 528.899 528.899" style={{"enableBackground": "new 0 0 528.899 528.899"}} xmlSpace="preserve"><g><path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z" fill="#565656"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span>
                                <span className="option-label"><Link to={`/dashboard/products/${resource}`}>view</Link></span>
                            </span>
                        </section>
                        <section className="action-option">
                            <span className="option-row">
                            <span className="option-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 774.266 774.266" style={{"enableBackground" : "new 0 0 774.266 774.266"}} xmlSpace="preserve"><g><g><path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875 C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916 c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703 c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282 c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802 H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z" fill="#d9534f"></path><rect x="475.031" y="286.593" width="48.418" height="396.942" fill="#d9534f"></rect><rect x="363.361" y="286.593" width="48.418" height="396.942" fill="#d9534f"></rect><rect x="251.69" y="286.593" width="48.418" height="396.942" fill="#d9534f"></rect></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span>
                                <span className="option-label">delete</span>
                            </span>
                        </section>
                    </section>
                </section>
            </span>
        )
    }
}

export default Dropdown;